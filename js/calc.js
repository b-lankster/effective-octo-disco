'use strict';

// ─── Upgrade cost model ───────────────────────────────────────────────────────
//
// Material quantities per grade step are approximations; verify exact values
// at mhnow.me/material for your specific gear before farming.
//
// Each monster's materials are sorted by rarity and split into 4 tiers:
//   Tier 1 (G1-G4): lowest rarity  — very common drops
//   Tier 2 (G5-G7): mid rarity     — overgrade window
//   Tier 3 (G8-G9): higher rarity  — rare drops / breakable parts
//   Tier 4 (G10):   highest rarity — ultra-rare / gem-tier
//
// Quantities per step (weapon; armor is similar):
//   G1: 2×T1  G2: 3×T1  G3: 4×T1  G4: 3×T1
//   G5: 2×T2  G6: 3×T2  G7: 4×T2
//   G8: 2×T3  G9: 3×T3
//   G10: 1×T4

const GRADE_COSTS = [
  null,                        // index 0 (unused)
  { tier: 0, qty: 2, z: 100  },   // G1
  { tier: 0, qty: 3, z: 150  },   // G2
  { tier: 0, qty: 4, z: 200  },   // G3
  { tier: 0, qty: 3, z: 250  },   // G4
  { tier: 1, qty: 2, z: 500  },   // G5
  { tier: 1, qty: 3, z: 750  },   // G6
  { tier: 1, qty: 4, z: 1000 },   // G7
  { tier: 2, qty: 2, z: 1500 },   // G8
  { tier: 2, qty: 3, z: 2000 },   // G9
  { tier: 3, qty: 1, z: 3000 },   // G10
];

function getMaterialTiers(monster) {
  const sorted = [...monster.materials].sort((a, b) => a.rarity - b.rarity);
  const n = sorted.length;

  // Split into 4 roughly equal tiers; fall back to last if tier is empty
  const split = [
    sorted.slice(0, Math.max(1, Math.ceil(n * 0.4))),            // T1
    sorted.slice(Math.ceil(n * 0.4), Math.max(2, Math.ceil(n * 0.7))), // T2
    sorted.slice(Math.ceil(n * 0.7), Math.max(3, n - 1)),        // T3
    sorted.slice(-1),                                              // T4
  ];

  // Ensure no tier is empty
  for (let i = 1; i < 4; i++) {
    if (!split[i] || split[i].length === 0) split[i] = split[i - 1];
  }
  return split;
}

// Returns { materials: [{matId, name, rarity, qty}], zenny }
// for upgrading from fromGrade → toGrade (1-indexed, 0 = not forged)
function calcUpgradeCost(monster, fromGrade, toGrade) {
  if (toGrade <= fromGrade) return { materials: [], zenny: 0 };
  const tiers = getMaterialTiers(monster);
  const totals = {}; // matId → {mat, qty}
  let zenny = 0;

  for (let g = fromGrade + 1; g <= toGrade && g <= 10; g++) {
    const step = GRADE_COSTS[g];
    if (!step) continue;
    const mat = tiers[step.tier][0]; // use first mat from tier as representative
    if (!mat) continue;
    totals[mat.id] = totals[mat.id] || { mat, qty: 0 };
    totals[mat.id].qty += step.qty;
    zenny += step.z;
  }

  return {
    materials: Object.values(totals).map(({ mat, qty }) => ({
      matId: mat.id,
      name:  mat.name,
      rarity: mat.rarity,
      qty,
    })),
    zenny,
  };
}

// ─── Aggregate needs across all tracked gear ──────────────────────────────────
// Returns [ { monster, matId, name, rarity, needed, have, shortage } ]
// sorted by monster star desc, then rarity desc

function calcAllNeeds() {
  const tracked = AppState.trackedIds();
  const byMat = {}; // matId → entry

  for (const equipId of tracked) {
    // Resolve to weapon or armor piece
    const weapon = WEAPON_BY_ID[equipId];
    const armor  = ARMOR_BY_ID[equipId];
    const equip  = weapon || armor;
    if (!equip) continue;

    const monster = MONSTER_BY_ID[equip.monsterId];
    if (!monster) continue;

    const prog = AppState.getProgress(equipId);
    const cost = calcUpgradeCost(monster, prog.currentGrade, prog.targetGrade);

    for (const item of cost.materials) {
      const key = `${monster.id}__${item.matId}`;
      if (!byMat[key]) {
        byMat[key] = {
          monster,
          matId:  item.matId,
          name:   item.name,
          rarity: item.rarity,
          needed: 0,
        };
      }
      byMat[key].needed += item.qty;
    }
  }

  return Object.values(byMat)
    .map(entry => ({
      ...entry,
      have:     AppState.getInventory(entry.matId),
      shortage: Math.max(0, entry.needed - AppState.getInventory(entry.matId)),
    }))
    .sort((a, b) =>
      b.monster.stars - a.monster.stars ||
      b.rarity - a.rarity ||
      a.name.localeCompare(b.name)
    );
}

// ─── Monster priority ranking ─────────────────────────────────────────────────
// Score = sum over all tracked gear pieces from this monster of:
//   grades_remaining × rarity_weight × (event bonus)
//
// rarity_weight makes high-rarity materials count more (they require more hunts)

function calcMonsterPriority() {
  const tracked = AppState.trackedIds();
  const scores  = {}; // monsterId → { monster, score, pieces, gradesTotal }

  for (const equipId of tracked) {
    const equip   = WEAPON_BY_ID[equipId] || ARMOR_BY_ID[equipId];
    if (!equip) continue;
    const monster = MONSTER_BY_ID[equip.monsterId];
    if (!monster) continue;

    const prog         = AppState.getProgress(equipId);
    const gradesLeft   = Math.max(0, prog.targetGrade - prog.currentGrade);
    if (gradesLeft === 0) continue;

    // Weigh by avg rarity of materials needed in remaining grades
    const cost        = calcUpgradeCost(monster, prog.currentGrade, prog.targetGrade);
    const totalQty    = cost.materials.reduce((s, m) => s + m.qty, 0) || 1;
    const avgRarity   = cost.materials.reduce((s, m) => s + m.rarity * m.qty, 0) / totalQty;
    const rarityMult  = 1 + avgRarity / 8;

    // Account for materials you already have
    let shortageRatio = 1;
    if (cost.materials.length > 0) {
      const totalNeeded  = cost.materials.reduce((s, m) => s + m.qty, 0);
      const totalShort   = cost.materials.reduce((s, m) =>
        s + Math.max(0, m.qty - AppState.getInventory(m.matId)), 0);
      shortageRatio = totalShort / totalNeeded;
    }

    let pieceScore = gradesLeft * rarityMult * shortageRatio;
    if (monster.isEvent) pieceScore *= 2; // event = harder to access

    if (!scores[monster.id]) {
      scores[monster.id] = { monster, score: 0, pieces: 0, gradesTotal: 0 };
    }
    scores[monster.id].score      += pieceScore;
    scores[monster.id].pieces     += 1;
    scores[monster.id].gradesTotal += gradesLeft;
  }

  return Object.values(scores).sort((a, b) => b.score - a.score);
}
