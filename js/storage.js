'use strict';

// ─── Persistence via localStorage ────────────────────────────────────────────
//
// Schema v2:
//   mhnow_v2_progress  → { [equipId]: { currentGrade, targetGrade, tracked } }
//   mhnow_v2_inventory → { [materialId]: qty }
//
// Grade values are step counts from 0 (not crafted) up to (11 - monster.stars) * 5.
// Step 1 = Grade(stars)-Level1, step 5 = Grade(stars)-Level5, step 6 = Grade(stars+1)-Level1, etc.

const KEYS = {
  progress:  'mhnow_v2_progress',
  inventory: 'mhnow_v2_inventory',
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
  progress:  loadProgress(),
  inventory: loadInventory(),

  getProgress(id) {
    return this.progress[id] || { currentGrade: 0, targetGrade: 5, tracked: false };
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

  getInventory(materialId) {
    return this.inventory[materialId] || 0;
  },

  setInventory(materialId, qty) {
    this.inventory[materialId] = Math.max(0, qty);
    saveInventory(this.inventory);
  },

  trackedIds() {
    return Object.entries(this.progress)
      .filter(([, p]) => p.tracked && p.targetGrade > p.currentGrade)
      .map(([id]) => id);
  },
};
