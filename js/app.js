'use strict';

// ─── App controller ───────────────────────────────────────────────────────────

const UI = {
  activeTab:     'gear',
  gearFilter:    { monsterId: null, type: null, trackedOnly: false, isArmor: null },
  expandedGear:  new Set(),
  expandedMats:  new Set(),
  editingBuild:  null,   // build object being created/edited
  buildPicker:   null,   // { slotKey, step: 'monster'|'type', monsterId }
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
    if (e.target.id === 'build-filter-select') {
      AppState.setActiveBuild(e.target.value || null);
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
    const m = getMonsterForEquip(id);
    const mx = m ? maxStep(m) : 50;
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
    const m = getMonsterForEquip(id);
    const mx = m ? maxStep(m) : 50;
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

  // ── build actions ────────────────────────────────────────────────────────────
  if (action === 'build-new') {
    UI.editingBuild = {
      id: String(Date.now()),
      name: 'New Build',
      slots: Object.fromEntries(['weapon','head','chest','arms','waist','legs'].map(k => [k, { equipId: null, targetGrade: 0 }])),
      isNew: true,
    };
    UI.activeTab = 'builds';
    renderNav();
    renderTab();
  }
  if (action === 'build-edit') {
    const b = AppState.getBuild(id);
    if (b) { UI.editingBuild = JSON.parse(JSON.stringify(b)); renderTab(); }
  }
  if (action === 'build-delete') {
    const b = AppState.getBuild(id);
    if (b && confirm(`Delete "${b.name}"?`)) { AppState.deleteBuild(id); renderTab(); }
  }
  if (action === 'build-activate') {
    AppState.setActiveBuild(AppState.activeBuildId === id ? null : id);
    renderTab();
  }
  if (action === 'build-save') {
    if (UI.editingBuild) {
      const nameInput = document.getElementById('build-name-input');
      if (nameInput) UI.editingBuild.name = nameInput.value.trim() || 'Untitled Build';
      const isNew = UI.editingBuild.isNew;
      delete UI.editingBuild.isNew;
      AppState.saveBuild(UI.editingBuild);
      if (isNew) AppState.setActiveBuild(UI.editingBuild.id);
      UI.editingBuild = null;
      renderTab();
    }
  }
  if (action === 'build-cancel') {
    UI.editingBuild = null;
    UI.buildPicker  = null;
    renderTab();
  }
  if (action === 'build-slot-tap') {
    UI.buildPicker = { slotKey: id, step: 'monster', monsterId: null };
    renderTab();
  }
  if (action === 'build-slot-clear') {
    if (UI.editingBuild) {
      UI.editingBuild.slots[id] = { equipId: null, targetGrade: 0 };
      renderTab();
    }
  }
  if (action === 'build-picker-cancel') {
    UI.buildPicker = null;
    renderTab();
  }
  if (action === 'build-picker-back') {
    if (UI.buildPicker) { UI.buildPicker.step = 'monster'; UI.buildPicker.monsterId = null; renderTab(); }
  }
  if (action === 'build-picker-monster') {
    if (!UI.buildPicker || !UI.editingBuild) return;
    if (UI.buildPicker.slotKey === 'weapon') {
      UI.buildPicker.step = 'type';
      UI.buildPicker.monsterId = id;
      renderTab();
    } else {
      const monster = MONSTER_BY_ID[id];
      const armor   = ARMOR.find(a => a.monsterId === id && a.slot === UI.buildPicker.slotKey);
      if (armor && monster) UI.editingBuild.slots[UI.buildPicker.slotKey] = { equipId: armor.id, targetGrade: maxStep(monster) };
      UI.buildPicker = null;
      renderTab();
    }
  }
  if (action === 'build-picker-type') {
    if (!UI.buildPicker || !UI.editingBuild) return;
    const mid    = UI.buildPicker.monsterId;
    const monster = MONSTER_BY_ID[mid];
    const weapon  = WEAPONS.find(w => w.monsterId === mid && w.type === id);
    if (weapon && monster) UI.editingBuild.slots.weapon = { equipId: weapon.id, targetGrade: maxStep(monster) };
    UI.buildPicker = null;
    renderTab();
  }
  if (action === 'build-slot-target-inc') {
    if (!UI.editingBuild) return;
    const slot   = UI.editingBuild.slots[id];
    if (!slot?.equipId) return;
    const equip   = WEAPON_BY_ID[slot.equipId] ?? ARMOR_BY_ID[slot.equipId];
    const monster = equip ? MONSTER_BY_ID[equip.monsterId] : null;
    if (monster) { slot.targetGrade = Math.min(maxStep(monster), slot.targetGrade + 1); renderTab(); }
  }
  if (action === 'build-slot-target-dec') {
    if (!UI.editingBuild) return;
    const slot    = UI.editingBuild.slots[id];
    if (!slot?.equipId) return;
    const current = AppState.getProgress(slot.equipId).currentGrade;
    slot.targetGrade = Math.max(current, slot.targetGrade - 1);
    renderTab();
  }
}

function renderNav() {
  const tabs   = ['gear', 'materials', 'priority', 'builds'];
  const labels = { gear: '⚔ Gear', materials: '💎 Mats', priority: '🎯 Priority', builds: '🏗 Builds' };
  document.getElementById('nav').innerHTML = tabs.map(t => `
    <button class="nav-btn${UI.activeTab === t ? ' active' : ''}" data-tab="${t}">
      ${labels[t]}
    </button>
  `).join('');
}

function renderTab(resetScroll = false) {
  const el = document.getElementById('main');
  const savedScroll = resetScroll ? 0 : el.scrollTop;
  if (UI.activeTab === 'gear')           renderGearTab(el);
  else if (UI.activeTab === 'materials') renderMaterialsTab(el);
  else if (UI.activeTab === 'priority')  renderPriorityTab(el);
  else                                   renderBuildsTab(el);
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
  const activeBuild = AppState.activeBuildId ? AppState.getBuild(AppState.activeBuildId) : null;
  const needs = activeBuild ? calcBuildNeeds(activeBuild) : calcAllNeeds();

  if (needs.length === 0) {
    el.innerHTML = `
      <div class="tab-header"><h2>Materials Needed</h2></div>
      ${renderBuildFilterBar()}
      <p class="empty-msg">No tracked gear with remaining grades.<br>
        Head to <strong>Gear</strong> and start tracking.</p>`;
    return;
  }

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
    ${renderBuildFilterBar()}
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
  const activeBuild = AppState.activeBuildId ? AppState.getBuild(AppState.activeBuildId) : null;
  const ranked = activeBuild ? calcBuildPriority(activeBuild) : calcMonsterPriority();

  if (ranked.length === 0) {
    el.innerHTML = `
      <div class="tab-header"><h2>Hunt Priority</h2></div>
      ${renderBuildFilterBar()}
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
    ${renderBuildFilterBar()}
    <p class="priority-note">Ranked by how much you still need from each monster,
      weighted by material rarity and whether it's event-only.</p>
    <div class="priority-list">
      ${ranked.map((entry, i) => renderPriorityCard(entry, i + 1, maxScore, activeBuild)).join('')}
    </div>
  `;
}

function renderPriorityCard({ monster, score, pieces, stepsTotal }, rank, maxScore, activeBuild) {
  const pct = Math.round((score / maxScore) * 100);
  const urgencyClass = pct >= 75 ? 'urgency-high' : pct >= 40 ? 'urgency-mid' : 'urgency-low';

  let gearRows;
  if (activeBuild) {
    gearRows = ['weapon','head','chest','arms','waist','legs']
      .filter(sk => {
        const slot  = activeBuild.slots[sk];
        if (!slot?.equipId) return false;
        const equip = WEAPON_BY_ID[slot.equipId] ?? ARMOR_BY_ID[slot.equipId];
        return equip?.monsterId === monster.id && slot.targetGrade > AppState.getProgress(slot.equipId).currentGrade;
      })
      .map(sk => {
        const slot    = activeBuild.slots[sk];
        const isWep   = sk === 'weapon';
        const equip   = isWep ? WEAPON_BY_ID[slot.equipId] : ARMOR_BY_ID[slot.equipId];
        const type    = isWep
          ? `<span class="type-badge">${WEAPON_TYPES[equip.type].short}</span>`
          : `<span class="type-badge armor-badge">${ARMOR_SLOT_NAMES[equip.slot]}</span>`;
        const cur = stepLabel(monster, AppState.getProgress(slot.equipId).currentGrade);
        const tgt = stepLabel(monster, slot.targetGrade);
        return `<div class="priority-gear-row">${type}<span class="gear-name">${equip.name}</span><span class="grade-label">${cur}→${tgt}</span></div>`;
      }).join('');
  } else {
    const monsterEquip = [
      ...WEAPONS.filter(w => w.monsterId === monster.id),
      ...ARMOR.filter(a => a.monsterId === monster.id),
    ].filter(e => { const p = AppState.getProgress(e.id); return p.tracked && p.targetGrade > p.currentGrade; });
    gearRows = monsterEquip.map(e => {
      const p    = AppState.getProgress(e.id);
      const type = e.type
        ? `<span class="type-badge">${WEAPON_TYPES[e.type].short}</span>`
        : `<span class="type-badge armor-badge">${ARMOR_SLOT_NAMES[e.slot]}</span>`;
      return `<div class="priority-gear-row">${type}<span class="gear-name">${e.name}</span><span class="grade-label">${stepLabel(monster, p.currentGrade)}→${stepLabel(monster, p.targetGrade)}</span></div>`;
    }).join('');
  }

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


// ─── BUILD FILTER BAR ─────────────────────────────────────────────────────────

function renderBuildFilterBar() {
  if (AppState.builds.length === 0) return '';
  const opts = AppState.builds.map(b =>
    `<option value="${b.id}"${AppState.activeBuildId === b.id ? ' selected' : ''}>${b.name}</option>`
  ).join('');
  return `
    <div class="build-filter-bar">
      <select id="build-filter-select">
        <option value="">All tracked gear</option>
        ${opts}
      </select>
    </div>
  `;
}


// ─── BUILDS TAB ───────────────────────────────────────────────────────────────

function renderBuildsTab(el) {
  let html = UI.editingBuild ? renderBuildEditor() : renderBuildList();
  if (UI.buildPicker) html += renderBuildPicker();
  el.innerHTML = html;
}

function renderBuildList() {
  const builds = AppState.builds;
  return `
    <div class="tab-header">
      <h2>Builds</h2>
      <button class="new-build-btn" data-action="build-new">+ New</button>
    </div>
    ${builds.length === 0
      ? '<p class="empty-msg">No builds yet.<br>Tap <strong>+ New</strong> to create your first loadout.</p>'
      : `<div class="build-list">${builds.map(renderBuildCard).join('')}</div>`
    }
  `;
}

function renderBuildCard(build) {
  const isActive  = AppState.activeBuildId === build.id;
  const SLOT_KEYS = ['weapon','head','chest','arms','waist','legs'];

  const chips = SLOT_KEYS.map(sk => {
    const slot = build.slots[sk];
    if (!slot?.equipId) {
      const label = sk === 'weapon' ? '?' : ARMOR_SLOT_NAMES[sk].substring(0,3);
      return `<span class="slot-chip slot-chip-empty" title="${sk}">${label}</span>`;
    }
    const isWep    = sk === 'weapon';
    const equip    = isWep ? WEAPON_BY_ID[slot.equipId] : ARMOR_BY_ID[slot.equipId];
    const monster  = equip ? MONSTER_BY_ID[equip.monsterId] : null;
    const done     = AppState.getProgress(slot.equipId).currentGrade >= slot.targetGrade;
    const label    = isWep ? (WEAPON_TYPES[equip?.type]?.short || '?') : ARMOR_SLOT_NAMES[sk].substring(0,3);
    return `<span class="slot-chip${done ? ' slot-chip-done' : ''}"
      style="${monster ? `border-color:${monster.color}` : ''}"
      title="${equip?.name || sk}">${label}</span>`;
  }).join('');

  const filled    = SLOT_KEYS.filter(sk => build.slots[sk]?.equipId);
  const done      = filled.filter(sk => AppState.getProgress(build.slots[sk].equipId).currentGrade >= build.slots[sk].targetGrade);
  const pct       = filled.length ? Math.round(done.length / filled.length * 100) : 0;

  return `
    <div class="build-card${isActive ? ' build-card-active' : ''}">
      <div class="build-card-header">
        <div class="build-card-title">
          <span class="build-name">${build.name}</span>
          ${isActive ? '<span class="build-active-badge">Active</span>' : ''}
        </div>
        <div class="build-card-actions">
          <button class="build-btn${isActive ? ' build-btn-active' : ''}" data-action="build-activate" data-id="${build.id}">
            ${isActive ? 'Deactivate' : 'Set Active'}
          </button>
          <button class="build-btn" data-action="build-edit" data-id="${build.id}">Edit</button>
          <button class="build-btn build-btn-danger" data-action="build-delete" data-id="${build.id}">✕</button>
        </div>
      </div>
      <div class="build-slots-chips">${chips}</div>
      <div class="build-progress-line">
        <span class="build-progress-label">${done.length}/${filled.length} slots complete</span>
        ${filled.length > 0 ? `
          <div class="build-progress-bar">
            <div class="build-progress-fill" style="width:${pct}%"></div>
          </div>` : ''}
      </div>
    </div>
  `;
}

function renderBuildEditor() {
  const build = UI.editingBuild;
  const SLOT_KEYS  = ['weapon','head','chest','arms','waist','legs'];
  const SLOT_LABEL = { weapon:'Weapon', head:'Head', chest:'Chest', arms:'Arms', waist:'Waist', legs:'Legs' };
  return `
    <div class="tab-header">
      <h2>${build.isNew ? 'New Build' : 'Edit Build'}</h2>
    </div>
    <div class="build-editor">
      <div class="build-name-row">
        <input type="text" id="build-name-input" class="build-name-input"
          value="${build.name}" placeholder="Build name" />
      </div>
      <div class="build-slot-list">
        ${SLOT_KEYS.map(sk => renderBuildSlotCard(sk, SLOT_LABEL[sk], build.slots[sk])).join('')}
      </div>
      <div class="build-editor-footer">
        <button class="build-save-btn" data-action="build-save">Save Build</button>
        <button class="build-cancel-btn" data-action="build-cancel">Cancel</button>
      </div>
    </div>
  `;
}

function renderBuildSlotCard(slotKey, label, slot) {
  if (!slot?.equipId) {
    return `
      <div class="build-slot-card">
        <div class="build-slot-label">${label}</div>
        <button class="build-slot-empty" data-action="build-slot-tap" data-id="${slotKey}">
          Tap to pick…
        </button>
      </div>`;
  }
  const isWep   = slotKey === 'weapon';
  const equip   = isWep ? WEAPON_BY_ID[slot.equipId] : ARMOR_BY_ID[slot.equipId];
  const monster = equip ? MONSTER_BY_ID[equip.monsterId] : null;
  if (!equip || !monster) {
    return `<div class="build-slot-card"><div class="build-slot-label">${label}</div>
      <button class="build-slot-empty" data-action="build-slot-tap" data-id="${slotKey}">Tap to pick…</button></div>`;
  }
  const current = AppState.getProgress(slot.equipId).currentGrade;
  const done    = current >= slot.targetGrade;
  return `
    <div class="build-slot-card build-slot-filled-card">
      <div class="build-slot-label">${label}</div>
      <div class="build-slot-content">
        <div class="build-slot-piece-info" style="border-left:3px solid ${monster.color}">
          <span class="build-slot-piece-name">${equip.name}</span>
          <span class="build-slot-monster" style="color:${monster.color}">${monster.name}</span>
        </div>
        <div class="grade-row build-slot-grade-row">
          <label>Target</label>
          <button class="grade-btn" data-action="build-slot-target-dec" data-id="${slotKey}">−</button>
          <span class="grade-val">${stepLabel(monster, slot.targetGrade)}</span>
          <button class="grade-btn" data-action="build-slot-target-inc" data-id="${slotKey}">+</button>
          ${done
            ? '<span class="done-pill">✓</span>'
            : gradeBar(current, slot.targetGrade, monster)}
        </div>
        <div class="build-slot-row-btns">
          <button class="build-slot-change-btn" data-action="build-slot-tap" data-id="${slotKey}">Change</button>
          <button class="build-slot-clear-btn" data-action="build-slot-clear" data-id="${slotKey}">Clear</button>
        </div>
      </div>
    </div>`;
}

function renderBuildPicker() {
  const { slotKey, step, monsterId } = UI.buildPicker;
  const SLOT_LABEL = { weapon:'Weapon', head:'Head', chest:'Chest', arms:'Arms', waist:'Waist', legs:'Legs' };
  const isWep = slotKey === 'weapon';
  let content = '';

  if (step === 'type' && monsterId) {
    const monster   = MONSTER_BY_ID[monsterId];
    const available = WEAPONS.filter(w => w.monsterId === monsterId);
    content = `
      <p class="picker-subtitle">Pick type for
        <strong style="color:${monster.color}">${monster.name}</strong>:
      </p>
      <div class="picker-type-grid">
        ${available.map(w => `
          <button class="picker-type-btn" data-action="build-picker-type" data-id="${w.type}">
            ${WEAPON_TYPES[w.type].short}
          </button>`).join('')}
      </div>
      <button class="picker-back-btn" data-action="build-picker-back">← Different monster</button>`;
  } else {
    const monsters = isWep
      ? MONSTERS.filter(m => WEAPONS.some(w => w.monsterId === m.id))
      : MONSTERS.filter(m => ARMOR.some(a => a.monsterId === m.id && a.slot === slotKey));
    content = `
      <div class="picker-monster-list">
        ${monsters.map(m => `
          <button class="picker-monster-row" data-action="build-picker-monster" data-id="${m.id}">
            <div class="picker-pip" style="background:${m.color}"></div>
            <span class="picker-monster-name">${m.name}</span>
            <span class="picker-monster-stars" style="color:${m.color}">${starStr(m.stars)}</span>
            ${elemBadge(m.element)}
            ${m.isEvent ? '<span class="event-badge">EVENT</span>' : ''}
          </button>`).join('')}
      </div>`;
  }

  return `
    <div class="picker-overlay">
      <div class="picker-header">
        <span>Pick ${SLOT_LABEL[slotKey]}</span>
        <button class="picker-close-btn" data-action="build-picker-cancel">✕</button>
      </div>
      ${content}
    </div>`;
}
