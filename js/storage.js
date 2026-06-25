'use strict';

// ─── Persistence via localStorage ────────────────────────────────────────────
//
// Schema:
//   mhnow_progress  → { [equipId]: { currentGrade, targetGrade, tracked } }
//   mhnow_inventory → { [materialId]: qty }  (materials user already has)

const KEYS = {
  progress:  'mhnow_progress',
  inventory: 'mhnow_inventory',
};

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(KEYS.progress) || '{}');
  } catch { return {}; }
}

function saveProgress(progress) {
  localStorage.setItem(KEYS.progress, JSON.stringify(progress));
}

function loadInventory() {
  try {
    return JSON.parse(localStorage.getItem(KEYS.inventory) || '{}');
  } catch { return {}; }
}

function saveInventory(inventory) {
  localStorage.setItem(KEYS.inventory, JSON.stringify(inventory));
}

// ─── App state (single source of truth) ──────────────────────────────────────

const AppState = {
  progress:  loadProgress(),   // { [id]: { currentGrade, targetGrade, tracked } }
  inventory: loadInventory(),  // { [materialId]: qty }

  // ── progress helpers ──────────────────────────────────────────────────────

  getProgress(id) {
    return this.progress[id] || { currentGrade: 0, targetGrade: 10, tracked: false };
  },

  setTracked(id, tracked) {
    const p = this.getProgress(id);
    this.progress[id] = { ...p, tracked };
    saveProgress(this.progress);
  },

  setCurrentGrade(id, grade) {
    const p = this.getProgress(id);
    const target = Math.max(grade, p.targetGrade);
    this.progress[id] = { ...p, currentGrade: grade, targetGrade: target };
    saveProgress(this.progress);
  },

  setTargetGrade(id, grade) {
    const p = this.getProgress(id);
    const current = Math.min(grade, p.currentGrade);
    this.progress[id] = { ...p, targetGrade: grade, currentGrade: current };
    saveProgress(this.progress);
  },

  // ── inventory helpers ─────────────────────────────────────────────────────

  getInventory(materialId) {
    return this.inventory[materialId] || 0;
  },

  setInventory(materialId, qty) {
    this.inventory[materialId] = Math.max(0, qty);
    saveInventory(this.inventory);
  },

  // ── derived ───────────────────────────────────────────────────────────────

  trackedIds() {
    return Object.entries(this.progress)
      .filter(([, p]) => p.tracked && p.targetGrade > p.currentGrade)
      .map(([id]) => id);
  },
};
