'use strict';

// ─── App controller ───────────────────────────────────────────────────────────

const UI = {
  activeTab:     'gear',
  gearFilter:    { monsterId: null, type: null, trackedOnly: false, isArmor: null },
  expandedGear:  new Set(),   // equipIds with grade controls open
  expandedMats:  new Set(),   // monster ids with mat list open in materials tab
};

// ─── Bootstrap ────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  renderNav();
  renderTab();
  bindNav();
  bindMain(); // single delegated handler — bound once for the lifetime of the app
});

function bindNav() {
  document.getElementById('nav').addEventListener('click', e => {
    const btn = e.target.closest('[data-tab]');
    if (!btn) return;
    UI.activeTab = btn.dataset.tab;
    renderNav();
    renderTab(true);
  });
}

// Single top-level delegated handler on #main — never removed or re-added
function bindMain() {
  const el = document.getElementById('main');

  el.addEventListener('change', e => {
    if (e.target.id === 'filter-monster') {
      UI.gearFilter.monsterId = e.target.value || null;
      renderTab();
    }
    if (e.target.id === 'filter-tracked') {
      UI.gearFilter.trackedOnly = e.target.checked;
      renderTab();
    }
  });

  el.addEventListener('click', e => {
    // ── gear track / grade controls ─────────────────────────────────────────
    const actionBtn = e.target.closest('[data-action]');
    if (actionBtn) {
      const { action, id, mat } = actionBtn.dataset;
      handleAction(action, id, mat);
      return;
    }

    // ── kind filter buttons ─────────────────────────────────────────────────
    const kindBtn = e.target.closest('[data-kind]');
    if (kindBtn) {
      const k = kindBtn.dataset.kind;
      UI.gearFilter.isArmor = k === 'armor' ? true : k === 'weapon' ? false : null;
      if (UI.gearFilter.isArmor !== false) UI.gearFilter.type = null;
      renderTab();
      return;
    }

    // ── weapon type filter buttons ──────────────────────────────────────────
    const typeBtn = e.target.closest('[data-type]');
    if (typeBtn) {
      const t = typeBtn.dataset.type;
      UI.gearFilter.type = UI.gearFilter.type === t ? null : t;
      renderTab();
      return;
    }

    // ── material monster section toggle ─────────────────────────────────────
    const matToggle = e.target.closest('[data-mat-toggle]');
    if (matToggle) {
      const mid = matToggle.dataset.matToggle;
      UI.expandedMats.has(mid) ? UI.expandedMats.delete(mid) : UI.expandedMats.add(mid);
      renderTab();
    }
  });
}

function handleAction(action, id, mat) {
  if (action === 'toggle') {
    const prog = AppState.getProgress(id);
    AppState.setTracked(id, !prog.tracked);
    if (!prog.tracked) UI.expandedGear.add(id);
    renderTab();
  }
  if (action === 'expand') {
    UI.expandedGear.has(id) ? UI.expandedGear.delete(id) : UI.expandedGear.add(id);
    renderTab();
  }
  if (action === 'current-inc') {
    const p = AppState.getProgress(id);
    const mx = maxStep(getMonsterForEquip(id)) ?? 50;
    AppState.setCurrentGrade(id, Math.min(mx, p.currentGrade + 1));
    renderTab();
  }
  if (action === 'current-dec') {
    const p = AppState.getProgress(id);
    AppState.setCurrentGrade(id, Math.max(0, p.currentGrade - 1));
    renderTab();
  }
  if (action === 'target-inc') {
    const p = AppState.getProgress(id);
    const mx = maxStep(getMonsterForEquip(id)) ?? 50;
    AppState.setTargetGrade(id, Math.min(mx, p.targetGrade + 1));
    renderTab();
  }
  if (action === 'target-dec') {
    const p = AppState.getProgress(id);
    AppState.setTargetGrade(id, Math.max(0, p.targetGrade - 1));
    renderTab();
  }
  if (action === 'inv-inc') {
    AppState.setInventory(mat, AppState.getInventory(mat) + 1);
    renderTab();
  }
  if (action === 'inv-dec') {
    AppState.setInventory(mat, AppState.getInventory(mat) - 1);
    renderTab();
  }
}

function renderNav() {
  const tabs = ['gear', 'materials', 'priority'];
  const labels = { gear: '⚔ Gear', materials: '💎 Materials', priority: '🎯 Priority' };
  document.getElementById('nav').innerHTML = tabs.map(t => `
    <button class="nav-btn${UI.activeTab === t ? ' active' : ''}" data-tab="${t}">
      ${labels[t]}
    </button>
  `).join('');
}

function renderTab(resetScroll = false) {
  const el = document.getElementById('main');
  const savedScroll = resetScroll ? 0 : el.scrollTop;
  if (UI.activeTab === 'gear')      renderGearTab(el);
  else if (UI.activeTab === 'materials') renderMaterialsTab(el);
  else                              renderPriorityTab(el);
  el.scrollTop = savedScroll;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function starStr(n)  { return '★'.repeat(n) + '☆'.repeat(Math.max(0, 6 - n)); }
function rarityBadge(r) {
  const colors = ['','#9e9e9e','#66bb6a','#42a5f5','#ab47bc','#ff7043','#ffca28','#e53935','#f50057'];
  return `<span class="rarity-badge" style="background:${colors[r] || '#9e9e9e'}">R${r}</span>`;
}
function elemBadge(element) {
  const m = ELEMENT_META[element];
  if (!m || element === 'none') return '';
  return `<span class="elem-badge" style="background:${m.color}">${m.name}</span>`;
}
function gradeBar(current, target, monster) {
  const mx  = maxStep(monster);
  const pct  = (current / mx) * 100;
  const tpct = (target  / mx) * 100;
  const cur  = stepLabel(monster, current);
  const tgt  = stepLabel(monster, target);
  return `
    <div class="grade-bar-wrap" title="${cur} → ${tgt}">
      <div class="grade-bar-fill"   style="width:${pct}%"></div>
      <div class="grade-bar-target" style="width:${tpct}%"></div>
      <span class="grade-bar-label">${cur}→${tgt}</span>
    </div>`;
}
function getMonsterForEquip(equipId) {
  const equip = WEAPON_BY_ID[equipId] ?? ARMOR_BY_ID[equipId];
  return equip ? MONSTER_BY_ID[equip.monsterId] : null;
}

// ─── GEAR TAB ─────────────────────────────────────────────────────────────────

function renderGearTab(el) {
  const f = UI.gearFilter;

  // Build filtered list
  let items = [];
  if (f.isArmor !== true) {
    items = items.concat(WEAPONS.map(w => ({ ...w, kind: 'weapon' })));
  }
  if (f.isArmor !== false) {
    items = items.concat(ARMOR.map(a => ({ ...a, kind: 'armor' })));
  }

  if (f.monsterId) items = items.filter(i => i.monsterId === f.monsterId);
  if (f.type)      items = items.filter(i => i.type === f.type);
  if (f.trackedOnly) items = items.filter(i => AppState.getProgress(i.id).tracked);

  // Group by monster
  const byMonster = {};
  for (const item of items) {
    (byMonster[item.monsterId] = byMonster[item.monsterId] || []).push(item);
  }
  const monsterOrder = MONSTERS
    .filter(m => byMonster[m.id])
    .map(m => m.id);

  const trackedCount = AppState.trackedIds().length;

  el.innerHTML = `
    <div class="tab-header">
      <h2>Gear Tracker</h2>
      <span class="tracked-pill">${trackedCount} tracked</span>
    </div>
    ${renderGearFilters()}
    <div id="gear-list">
      ${monsterOrder.length === 0
        ? '<p class="empty-msg">No gear matches your filters.</p>'
        : monsterOrder.map(mid => renderMonsterGearGroup(mid, byMonster[mid])).join('')
      }
    </div>
  `;

}

function renderGearFilters() {
  const f = UI.gearFilter;
  const monsters = MONSTERS.map(m =>
    `<option value="${m.id}" ${f.monsterId === m.id ? 'selected' : ''}>${m.name}</option>`
  ).join('');

  const typeButtons = ['weapon', 'armor'].map(k =>
    `<button class="filter-kind-btn${f.isArmor === (k === 'armor') ? ' active' : ''}"
      data-kind="${k}">${k === 'weapon' ? '⚔ Weapons' : '🛡 Armor'}</button>`
  ).join('');

  const weaponTypeFilters = f.isArmor !== true ? WEAPON_TYPE_ORDER.map(t =>
    `<button class="filter-type-btn${f.type === t ? ' active' : ''}" data-type="${t}">
      ${WEAPON_TYPES[t].short}
    </button>`
  ).join('') : '';

  return `
    <div class="filter-bar">
      <div class="filter-row">
        <select id="filter-monster">
          <option value="">All Monsters</option>
          ${monsters}
        </select>
        <label class="tracked-toggle">
          <input type="checkbox" id="filter-tracked" ${f.trackedOnly ? 'checked' : ''}>
          Tracked only
        </label>
      </div>
      <div class="filter-row">
        ${typeButtons}
        <button class="filter-kind-btn${f.isArmor === null ? ' active' : ''}" data-kind="all">All</button>
      </div>
      ${weaponTypeFilters ? `<div class="filter-row type-row">${weaponTypeFilters}</div>` : ''}
    </div>
  `;
}

function renderMonsterGearGroup(monsterId, items) {
  const monster = MONSTER_BY_ID[monsterId];
  const tracked = items.filter(i => AppState.getProgress(i.id).tracked);
  return `
    <div class="monster-group">
      <div class="monster-group-header" style="border-left: 4px solid ${monster.color}">
        <span class="monster-name">${monster.name}</span>
        <span class="monster-stars" style="color:${monster.color}">${starStr(monster.stars)}</span>
        ${elemBadge(monster.element)}
        ${monster.isEvent ? '<span class="event-badge">EVENT</span>' : ''}
        ${tracked.length ? `<span class="tracked-pill">${tracked.length}</span>` : ''}
      </div>
      <div class="gear-items">
        ${items.map(item => renderGearItem(item, monster)).join('')}
      </div>
    </div>
  `;
}

function renderGearItem(item, monster) {
  const prog    = AppState.getProgress(item.id);
  const tracked = prog.tracked;
  const expanded = UI.expandedGear.has(item.id);
  const kindLabel = item.kind === 'weapon'
    ? `<span class="type-badge">${WEAPON_TYPES[item.type]?.short || ''}</span>`
    : `<span class="type-badge armor-badge">${ARMOR_SLOT_NAMES[item.slot]}</span>`;
  const done = prog.currentGrade >= prog.targetGrade;

  return `
    <div class="gear-item${tracked ? ' tracked' : ''}${done && tracked ? ' done' : ''}"
         data-id="${item.id}">
      <div class="gear-item-main">
        <div class="gear-color-pip" style="background:${monster.color}"></div>
        <div class="gear-info">
          <span class="gear-name">${item.name}</span>
          <div class="gear-badges">${kindLabel}</div>
        </div>
        <div class="gear-controls">
          ${tracked && !done ? gradeBar(prog.currentGrade, prog.targetGrade, monster) : ''}
          <button class="track-btn${tracked ? ' tracked' : ''}" data-action="toggle" data-id="${item.id}">
            ${tracked ? (done ? '✓ Done' : '● Tracking') : '+ Track'}
          </button>
        </div>
      </div>
      ${tracked ? `
        <div class="grade-editor${expanded ? '' : ' collapsed'}" data-expand="${item.id}">
          <div class="grade-row">
            <label>Current</label>
            <button class="grade-btn" data-action="current-dec" data-id="${item.id}">−</button>
            <span class="grade-val">${stepLabel(monster, prog.currentGrade)}</span>
            <button class="grade-btn" data-action="current-inc" data-id="${item.id}">+</button>
          </div>
          <div class="grade-row">
            <label>Target</label>
            <button class="grade-btn" data-action="target-dec" data-id="${item.id}">−</button>
            <span class="grade-val">${stepLabel(monster, prog.targetGrade)}</span>
            <button class="grade-btn" data-action="target-inc" data-id="${item.id}">+</button>
          </div>
        </div>
        <button class="expand-btn" data-action="expand" data-id="${item.id}">
          ${expanded ? '▲ Less' : '▼ Set grades'}
        </button>
      ` : ''}
    </div>
  `;
}


// ─── MATERIALS TAB ────────────────────────────────────────────────────────────

function renderMaterialsTab(el) {
  const needs = calcAllNeeds();

  if (needs.length === 0) {
    el.innerHTML = `
      <div class="tab-header"><h2>Materials Needed</h2></div>
      <p class="empty-msg">No tracked gear with remaining grades.<br>
        Head to <strong>Gear</strong> and start tracking.</p>`;
    return;
  }

  // Group by monster
  const byMonster = {};
  for (const n of needs) {
    (byMonster[n.monster.id] = byMonster[n.monster.id] || { monster: n.monster, items: [] })
      .items.push(n);
  }
  const monsterOrder = MONSTERS.filter(m => byMonster[m.id]).map(m => m.id);

  const totalShortage = needs.reduce((s, n) => s + n.shortage, 0);

  el.innerHTML = `
    <div class="tab-header">
      <h2>Materials Needed</h2>
      <span class="tracked-pill">${totalShortage} items short</span>
    </div>
    <p class="disclaimer">Material costs from <a href="https://mhnow.me/material?lang=en" target="_blank">mhnow.me</a></p>
    <div id="mat-list">
      ${monsterOrder.map(mid => renderMonsterMaterials(byMonster[mid])).join('')}
    </div>
  `;

}

function renderMonsterMaterials({ monster, items }) {
  const open = UI.expandedMats.has(monster.id);
  const totalShort = items.reduce((s, i) => s + i.shortage, 0);
  return `
    <div class="monster-group">
      <div class="monster-group-header mat-header" data-mat-toggle="${monster.id}"
           style="border-left: 4px solid ${monster.color}; cursor:pointer">
        <span class="monster-name">${monster.name}</span>
        <span class="monster-stars" style="color:${monster.color}">${starStr(monster.stars)}</span>
        ${monster.isEvent ? '<span class="event-badge">EVENT</span>' : ''}
        ${totalShort > 0 ? `<span class="shortage-pill">${totalShort} needed</span>` : '<span class="done-pill">✓ Stocked</span>'}
        <span class="expand-indicator">${open ? '▲' : '▼'}</span>
      </div>
      ${open ? `
        <div class="mat-items">
          ${items.map(n => renderMaterialRow(n)).join('')}
        </div>
      ` : ''}
    </div>
  `;
}

function renderMaterialRow(n) {
  const short = n.shortage;
  return `
    <div class="mat-row${short === 0 ? ' mat-ok' : ''}">
      <div class="mat-info">
        ${rarityBadge(n.rarity)}
        <span class="mat-name">${n.name}</span>
      </div>
      <div class="mat-counts">
        <span class="mat-need">${n.needed}×</span>
        <div class="inv-control">
          <button class="inv-btn" data-action="inv-dec" data-mat="${n.matId}">−</button>
          <span class="inv-val" title="In inventory">${n.have} have</span>
          <button class="inv-btn" data-action="inv-inc" data-mat="${n.matId}">+</button>
        </div>
        ${short > 0
          ? `<span class="short-badge">−${short}</span>`
          : `<span class="ok-badge">✓</span>`}
      </div>
    </div>
  `;
}


// ─── PRIORITY TAB ─────────────────────────────────────────────────────────────

function renderPriorityTab(el) {
  const ranked = calcMonsterPriority();

  if (ranked.length === 0) {
    el.innerHTML = `
      <div class="tab-header"><h2>Hunt Priority</h2></div>
      <p class="empty-msg">Nothing tracked yet.<br>
        Head to <strong>Gear</strong> and flag what you're working on.</p>`;
    return;
  }

  const maxScore = ranked[0].score;

  el.innerHTML = `
    <div class="tab-header">
      <h2>Hunt Priority</h2>
      <span class="tracked-pill">${ranked.length} monsters</span>
    </div>
    <p class="priority-note">Ranked by how much you still need from each monster,
      weighted by material rarity and whether it's event-only.</p>
    <div class="priority-list">
      ${ranked.map((entry, i) => renderPriorityCard(entry, i + 1, maxScore)).join('')}
    </div>
  `;
}

function renderPriorityCard({ monster, score, pieces, stepsTotal }, rank, maxScore) {
  const pct = Math.round((score / maxScore) * 100);
  const urgencyClass = pct >= 75 ? 'urgency-high' : pct >= 40 ? 'urgency-mid' : 'urgency-low';

  // Break down tracked gear for this monster
  const monsterEquip = [
    ...WEAPONS.filter(w => w.monsterId === monster.id),
    ...ARMOR.filter(a => a.monsterId === monster.id),
  ].filter(e => {
    const p = AppState.getProgress(e.id);
    return p.tracked && p.targetGrade > p.currentGrade;
  });

  const gearRows = monsterEquip.map(e => {
    const p    = AppState.getProgress(e.id);
    const type = e.type
      ? `<span class="type-badge">${WEAPON_TYPES[e.type].short}</span>`
      : `<span class="type-badge armor-badge">${ARMOR_SLOT_NAMES[e.slot]}</span>`;
    const cur = stepLabel(monster, p.currentGrade);
    const tgt = stepLabel(monster, p.targetGrade);
    return `
      <div class="priority-gear-row">
        ${type}
        <span class="gear-name">${e.name}</span>
        <span class="grade-label">${cur}→${tgt}</span>
      </div>`;
  }).join('');

  return `
    <div class="priority-card ${urgencyClass}">
      <div class="priority-card-header" style="border-left: 5px solid ${monster.color}">
        <div class="rank-badge">#${rank}</div>
        <div class="priority-monster-info">
          <span class="monster-name">${monster.name}</span>
          <span class="monster-stars" style="color:${monster.color}">${starStr(monster.stars)}</span>
          ${elemBadge(monster.element)}
          ${monster.isEvent ? '<span class="event-badge">EVENT</span>' : ''}
        </div>
        <div class="priority-stats">
          <span>${pieces} piece${pieces !== 1 ? 's' : ''}</span>
          <span>${stepsTotal} steps</span>
        </div>
      </div>
      <div class="priority-bar-wrap">
        <div class="priority-bar" style="width:${pct}%; background:${monster.color}"></div>
      </div>
      <div class="priority-gear-breakdown">
        ${gearRows}
      </div>
    </div>
  `;
}
