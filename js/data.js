'use strict';

const WEAPON_TYPES = {
  sns: { id: 'sns', name: 'Sword & Shield', short: 'SnS' },
  gs:  { id: 'gs',  name: 'Great Sword',    short: 'GS'  },
  ls:  { id: 'ls',  name: 'Long Sword',     short: 'LS'  },
  hmr: { id: 'hmr', name: 'Hammer',         short: 'HMR' },
  db:  { id: 'db',  name: 'Dual Blades',    short: 'DB'  },
  lnc: { id: 'lnc', name: 'Lance',          short: 'LNC' },
  gl:  { id: 'gl',  name: 'Gunlance',       short: 'GL'  },
  cb:  { id: 'cb',  name: 'Charge Blade',   short: 'CB'  },
  lbg: { id: 'lbg', name: 'Light Bowgun',   short: 'LBG' },
  bow: { id: 'bow', name: 'Bow',            short: 'Bow' },
  hbg: { id: 'hbg', name: 'Heavy Bowgun',   short: 'HBG' },
};

const WEAPON_TYPE_ORDER = ['sns','gs','ls','hmr','db','lnc','gl','cb','lbg','bow','hbg'];

const ARMOR_SLOTS = ['head','chest','arms','waist','legs'];
const ARMOR_SLOT_NAMES = {
  head:  'Helm',
  chest: 'Mail',
  arms:  'Vambraces',
  waist: 'Coil',
  legs:  'Greaves',
};

const ELEMENT_META = {
  fire:    { name: 'Fire',    color: '#ef5350' },
  water:   { name: 'Water',   color: '#42a5f5' },
  thunder: { name: 'Thunder', color: '#ffca28' },
  ice:     { name: 'Ice',     color: '#80deea' },
  dragon:  { name: 'Dragon',  color: '#ab47bc' },
  poison:  { name: 'Poison',  color: '#ce93d8' },
  none:    { name: '—',       color: '#78909c' },
};

// Weapon types available per monster star rating (approximate — based on confirmed game data)
const WEAPONS_BY_TIER = {
  1: ['sns','gs','cb','gl','lbg','hbg'],
  2: ['sns','gs','ls','cb','gl','lbg','hbg'],
  3: ['sns','gs','ls','hmr','cb','gl','lbg','hbg'],
  4: ['sns','gs','ls','hmr','lnc','cb','gl','lbg','bow'],
  5: ['sns','gs','ls','hmr','db','lnc','gl','cb','lbg','bow','hbg'],
};

// Confirmed weapon names from game8.co; others are generated from prefix + descriptor
const WEAPON_NAME_OVERRIDES = {
  great_jagras: {
    sns: 'Jagras Edge', gs: 'Jagras Blade', cb: 'Jagras Strongarm',
    gl:  'Jagras Gunlance', lbg: 'Jagras Blitz', hbg: 'Jagras Assault',
  },
  rathalos: {
    sns: 'Flame Knife', gs: 'Flame Blade', ls: 'Wyvern Blade "Fall"',
    lnc: 'Flame Lance', gl: 'Rath Gunlance', cb: 'Rathsblade',
    lbg: 'Flame Blitz', bow: 'Rathslinger',
  },
};

const WEAPON_DESCRIPTORS = {
  sns: 'Edge', gs: 'Blade', ls: 'Sword', hmr: 'Hammer', db: 'Fangs',
  lnc: 'Lance', gl: 'Gunlance', cb: 'Strongarm', lbg: 'Blitz', bow: 'Bow', hbg: 'Assault',
};

// ─── Monster roster ───────────────────────────────────────────────────────────
// materials[] sorted loosely common→rare; rarity 1=most common, 8=ultra-rare
// Upgrade tiers (G1-G10) are derived from these in calc.js
const MONSTERS = [
  {
    id: 'great_jagras', name: 'Great Jagras', prefix: 'Jagras',
    stars: 1, element: 'water', color: '#43a047', isEvent: false,
    materials: [
      { id: 'gj_scale',   name: 'Jagras Scale',       rarity: 1 },
      { id: 'gj_hide',    name: 'Jagras Hide',         rarity: 1 },
      { id: 'gj_claw',    name: 'Jagras Claw',         rarity: 1 },
      { id: 'gj_mane',    name: 'Jagras Mane',         rarity: 2 },
      { id: 'gj_prime',   name: 'Jagras Primescale',   rarity: 4 },
      { id: 'gj_gem',     name: 'Fanged Wyvern Gem',   rarity: 6 },
      { id: 'gem_shard',  name: 'Wyvern Gem Shard',    rarity: 8 },
    ],
  },
  {
    id: 'kulu_ya_ku', name: 'Kulu-Ya-Ku', prefix: 'Kuku',
    stars: 1, element: 'none', color: '#8d6e63', isEvent: false,
    materials: [
      { id: 'kk_scale',   name: 'Kulu Scale',     rarity: 1 },
      { id: 'kk_hide',    name: 'Kulu Hide',       rarity: 1 },
      { id: 'kk_beak',    name: 'Kulu Beak',       rarity: 1 },
      { id: 'kk_plume',   name: 'Kulu Plume',      rarity: 2 },
      { id: 'kk_prime',   name: 'Kulu Primescale', rarity: 4 },
      { id: 'kk_primhide',name: 'Kulu Primehide',  rarity: 6 },
      { id: 'kk_shard',   name: 'Wyvern Gem Shard',rarity: 8 },
    ],
  },
  {
    id: 'pukei_pukei', name: 'Pukei-Pukei', prefix: 'Pukei',
    stars: 1, element: 'poison', color: '#66bb6a', isEvent: false,
    materials: [
      { id: 'pp_scale',  name: 'Pukei Scale',     rarity: 1 },
      { id: 'pp_shell',  name: 'Pukei Shell',      rarity: 1 },
      { id: 'pp_tail',   name: 'Pukei Tail',       rarity: 1 },
      { id: 'pp_sac',    name: 'Pukei Sac',        rarity: 2 },
      { id: 'pp_quill',  name: 'Pukei Quill',      rarity: 4 },
      { id: 'pp_prime',  name: 'Pukei Primescale', rarity: 6 },
      { id: 'pp_shard',  name: 'Wyvern Gem Shard', rarity: 8 },
    ],
  },
  {
    id: 'barroth', name: 'Barroth', prefix: 'Barroth',
    stars: 2, element: 'none', color: '#a1887f', isEvent: false,
    materials: [
      { id: 'ba_tail',   name: 'Barroth Tail',      rarity: 1 },
      { id: 'ba_claw',   name: 'Barroth Claw',      rarity: 1 },
      { id: 'ba_shell',  name: 'Barroth Shell',     rarity: 1 },
      { id: 'ba_scalp',  name: 'Barroth Scalp',     rarity: 2 },
      { id: 'ba_ridge',  name: 'Barroth Ridge',     rarity: 4 },
      { id: 'ba_prime',  name: 'Barroth Primeshell',rarity: 6 },
      { id: 'ba_shard',  name: 'Wyvern Gem Shard',  rarity: 8 },
    ],
  },
  {
    id: 'great_girros', name: 'Great Girros', prefix: 'Girros',
    stars: 2, element: 'thunder', color: '#f9a825', isEvent: false,
    materials: [
      { id: 'gg_scale',  name: 'Girros Scale',     rarity: 2 },
      { id: 'gg_fang',   name: 'Girros Fang',      rarity: 2 },
      { id: 'gg_tail',   name: 'Girros Tail',      rarity: 2 },
      { id: 'gg_hood',   name: 'Girros Hood',      rarity: 2 },
      { id: 'gg_prime',  name: 'Girros Primescale',rarity: 4 },
      { id: 'gg_primfng',name: 'Girros Primefang', rarity: 6 },
      { id: 'gg_shard',  name: 'Wyvern Gem Shard', rarity: 8 },
    ],
  },
  {
    id: 'tobi_kadachi', name: 'Tobi-Kadachi', prefix: 'Tobi',
    stars: 2, element: 'thunder', color: '#26a69a', isEvent: false,
    materials: [
      { id: 'tk_scale',  name: 'Tobi Scale',      rarity: 2 },
      { id: 'tk_pelt',   name: 'Tobi Pelt',       rarity: 2 },
      { id: 'tk_memb',   name: 'Tobi Membrane',   rarity: 2 },
      { id: 'tk_claw',   name: 'Tobi Claw',       rarity: 2 },
      { id: 'tk_prime',  name: 'Tobi Primescale', rarity: 4 },
      { id: 'tk_elec',   name: 'Tobi Electrode',  rarity: 6 },
      { id: 'tk_shard',  name: 'Wyvern Gem Shard',rarity: 8 },
    ],
  },
  {
    id: 'radobaan', name: 'Radobaan', prefix: 'Radobaan',
    stars: 2, element: 'none', color: '#78909c', isEvent: false,
    materials: [
      { id: 'rado_scale', name: 'Radobaan Scale',    rarity: 2 },
      { id: 'rado_shell', name: 'Radobaan Shell',    rarity: 2 },
      { id: 'rado_tail',  name: 'Radobaan Tail',     rarity: 2 },
      { id: 'rado_oil',   name: 'Radobaan Oilshell', rarity: 2 },
      { id: 'rado_prime', name: 'Radobaan Primescale',rarity: 4 },
      { id: 'rado_marrow',name: 'Radobaan Marrow',   rarity: 6 },
      { id: 'rado_shard', name: 'Wyvern Gem Shard',  rarity: 8 },
    ],
  },
  {
    id: 'paolumu', name: 'Paolumu', prefix: 'Paolumu',
    stars: 3, element: 'none', color: '#f48fb1', isEvent: false,
    materials: [
      { id: 'paol_scale', name: 'Paolumu Scale',    rarity: 3 },
      { id: 'paol_pelt',  name: 'Paolumu Pelt',     rarity: 3 },
      { id: 'paol_web',   name: 'Paolumu Webbing',  rarity: 3 },
      { id: 'paol_shell', name: 'Paolumu Shell',    rarity: 3 },
      { id: 'paol_prime', name: 'Paolumu Primescale',rarity: 5 },
      { id: 'paol_pshell',name: 'Paolumu Primeshell',rarity: 6 },
      { id: 'paol_shard', name: 'Wyvern Gem Shard', rarity: 8 },
    ],
  },
  {
    id: 'jyuratodus', name: 'Jyuratodus', prefix: 'Jyura',
    stars: 3, element: 'water', color: '#1e88e5', isEvent: false,
    materials: [
      { id: 'jyu_shell',  name: 'Jyura Shell',     rarity: 3 },
      { id: 'jyu_scale',  name: 'Jyura Scale',     rarity: 3 },
      { id: 'jyu_fang',   name: 'Jyura Fang',      rarity: 3 },
      { id: 'jyu_fin',    name: 'Jyura Fin',        rarity: 3 },
      { id: 'jyu_prime',  name: 'Jyura Primescale', rarity: 5 },
      { id: 'jyu_pshell', name: 'Jyura Primeshell', rarity: 6 },
      { id: 'jyu_shard',  name: 'Wyvern Gem Shard', rarity: 8 },
    ],
  },
  {
    id: 'banbaro', name: 'Banbaro', prefix: 'Banbaro',
    stars: 3, element: 'ice', color: '#80deea', isEvent: false,
    materials: [
      { id: 'ban_shell',  name: 'Banbaro Shell',      rarity: 3 },
      { id: 'ban_ridge',  name: 'Banbaro Ridge',      rarity: 3 },
      { id: 'ban_tail',   name: 'Banbaro Tail',       rarity: 3 },
      { id: 'ban_pelt',   name: 'Banbaro Pelt',       rarity: 3 },
      { id: 'ban_prime',  name: 'Banbaro Primeshell', rarity: 5 },
      { id: 'ban_horn',   name: 'Banbaro Great Horn', rarity: 6 },
      { id: 'ban_shard',  name: 'Wyvern Gem Shard',   rarity: 8 },
    ],
  },
  {
    id: 'anjanath', name: 'Anjanath', prefix: 'Anja',
    stars: 4, element: 'fire', color: '#ef5350', isEvent: false,
    materials: [
      { id: 'anj_scale',  name: 'Anja Scale',    rarity: 4 },
      { id: 'anj_fang',   name: 'Anja Fang',     rarity: 4 },
      { id: 'anj_tail',   name: 'Anja Tail',     rarity: 4 },
      { id: 'anj_nose',   name: 'Anja Nosebone', rarity: 4 },
      { id: 'anj_prime',  name: 'Anja Primescale',rarity: 5 },
      { id: 'anj_plate',  name: 'Anjanath Plate', rarity: 6 },
      { id: 'anj_shard',  name: 'Wyvern Gem Shard',rarity: 8 },
    ],
  },
  {
    id: 'rathian', name: 'Rathian', prefix: 'Rathian',
    stars: 4, element: 'fire', color: '#66bb6a', isEvent: false,
    materials: [
      { id: 'ri_scale',   name: 'Rathian Scale',    rarity: 4 },
      { id: 'ri_shell',   name: 'Rathian Shell',    rarity: 4 },
      { id: 'ri_web',     name: 'Rathian Webbing',  rarity: 4 },
      { id: 'ri_spike',   name: 'Rathian Spike',    rarity: 4 },
      { id: 'ri_prime',   name: 'Rathian Primescale',rarity: 5 },
      { id: 'ri_plate',   name: 'Rathian Plate',    rarity: 6 },
      { id: 'ri_shard',   name: 'Wyvern Gem Shard', rarity: 8 },
    ],
  },
  {
    id: 'barioth', name: 'Barioth', prefix: 'Barioth',
    stars: 4, element: 'ice', color: '#b3e5fc', isEvent: false,
    materials: [
      { id: 'bari_claw',  name: 'Barioth Claw',       rarity: 4 },
      { id: 'bari_spike', name: 'Barioth Spike',      rarity: 4 },
      { id: 'bari_shell', name: 'Barioth Shell',      rarity: 4 },
      { id: 'bari_pclaw', name: 'Barioth Primeclaw',  rarity: 4 },
      { id: 'bari_tail',  name: 'Barioth Tail',       rarity: 4 },
      { id: 'bari_fang',  name: 'Barioth Amber Fang', rarity: 6 },
      { id: 'bari_shard', name: 'Wyvern Gem Shard',   rarity: 8 },
    ],
  },
  {
    id: 'legiana', name: 'Legiana', prefix: 'Legiana',
    stars: 5, element: 'ice', color: '#80cbc4', isEvent: false,
    materials: [
      { id: 'leg_scale',  name: 'Legiana Scale',    rarity: 5 },
      { id: 'leg_hide',   name: 'Legiana Hide',     rarity: 5 },
      { id: 'leg_claw',   name: 'Legiana Claw',     rarity: 5 },
      { id: 'leg_web',    name: 'Legiana Webbing',  rarity: 5 },
      { id: 'leg_prime',  name: 'Legiana Primescale',rarity: 5 },
      { id: 'leg_plate',  name: 'Legiana Plate',    rarity: 6 },
      { id: 'leg_shard',  name: 'Wyvern Gem Shard', rarity: 8 },
    ],
  },
  {
    id: 'diablos', name: 'Diablos', prefix: 'Diablos',
    stars: 5, element: 'none', color: '#d4a04a', isEvent: false,
    materials: [
      { id: 'dia_shell',  name: 'Diablos Shell',    rarity: 5 },
      { id: 'dia_fang',   name: 'Diablos Fang',     rarity: 5 },
      { id: 'dia_tail',   name: 'Diablos Tailcase', rarity: 5 },
      { id: 'dia_ridge',  name: 'Diablos Ridge',    rarity: 5 },
      { id: 'dia_prime',  name: 'Diablos Primeshell',rarity: 5 },
      { id: 'dia_marrow', name: 'Diablos Marrow',   rarity: 6 },
      { id: 'dia_shard',  name: 'Wyvern Gem Shard', rarity: 8 },
    ],
  },
  {
    id: 'rathalos', name: 'Rathalos', prefix: 'Rath',
    stars: 5, element: 'fire', color: '#e53935', isEvent: false,
    materials: [
      { id: 'ra_scale',   name: 'Rathalos Scale',    rarity: 5 },
      { id: 'ra_wing',    name: 'Rathalos Wingtalon',rarity: 5 },
      { id: 'ra_tail',    name: 'Rathalos Tail',     rarity: 5 },
      { id: 'ra_marrow',  name: 'Rathalos Marrow',   rarity: 5 },
      { id: 'ra_prime',   name: 'Rathalos Primescale',rarity: 5 },
      { id: 'ra_plate',   name: 'Rathalos Plate',    rarity: 6 },
      { id: 'ra_shard',   name: 'Wyvern Gem Shard',  rarity: 8 },
    ],
  },
  {
    id: 'zinogre', name: 'Zinogre', prefix: 'Zinogre',
    stars: 5, element: 'thunder', color: '#42a5f5', isEvent: false,
    materials: [
      { id: 'zin_claw',   name: 'Zinogre Claw',     rarity: 5 },
      { id: 'zin_shell',  name: 'Zinogre Shell',    rarity: 5 },
      { id: 'zin_tail',   name: 'Zinogre Tail',     rarity: 5 },
      { id: 'zin_fur',    name: 'Zinogre Shockfur', rarity: 5 },
      { id: 'zin_pclaw',  name: 'Zinogre Primeclaw',rarity: 5 },
      { id: 'zin_horn',   name: 'Zinogre Horn',     rarity: 6 },
      { id: 'zin_plate',  name: 'Zinogre Plate',    rarity: 8 },
    ],
  },
  {
    id: 'black_diablos', name: 'Black Diablos', prefix: 'B.Diablos',
    stars: 5, element: 'none', color: '#424242', isEvent: true,
    materials: [
      { id: 'bdia_shell', name: 'B. Diablos Shell',    rarity: 5 },
      { id: 'bdia_fang',  name: 'B. Diablos Fang',     rarity: 5 },
      { id: 'bdia_tail',  name: 'B. Diablos Tailcase', rarity: 5 },
      { id: 'bdia_ridge', name: 'B. Diablos Ridge',    rarity: 5 },
      { id: 'bdia_prime', name: 'B. Diablos Primeshell',rarity: 5 },
      { id: 'bdia_marrow',name: 'B. Diablos Marrow',   rarity: 6 },
    ],
  },
  {
    id: 'pink_rathian', name: 'Pink Rathian', prefix: 'P.Rathian',
    stars: 5, element: 'poison', color: '#ec407a', isEvent: true,
    materials: [
      { id: 'pri_scale',  name: 'P. Rathian Scale',    rarity: 5 },
      { id: 'pri_shell',  name: 'P. Rathian Shell',    rarity: 5 },
      { id: 'pri_web',    name: 'P. Rathian Webbing',  rarity: 5 },
      { id: 'pri_spike',  name: 'P. Rathian Spike',    rarity: 5 },
      { id: 'pri_prime',  name: 'P. Rathian Primescale',rarity: 5 },
      { id: 'pri_plate',  name: 'P. Rathian Plate',    rarity: 6 },
    ],
  },
  {
    id: 'azure_rathalos', name: 'Azure Rathalos', prefix: 'A.Rathalos',
    stars: 5, element: 'fire', color: '#1565c0', isEvent: true,
    materials: [
      { id: 'ara_scale',  name: 'A. Rathalos Scale',     rarity: 5 },
      { id: 'ara_wing',   name: 'A. Rathalos Wingtalon', rarity: 5 },
      { id: 'ara_tail',   name: 'A. Rathalos Tail',      rarity: 5 },
      { id: 'ara_marrow', name: 'A. Rathalos Marrow',    rarity: 5 },
      { id: 'ara_prime',  name: 'A. Rathalos Primescale',rarity: 5 },
      { id: 'ara_plate',  name: 'A. Rathalos Plate',     rarity: 6 },
    ],
  },
];

// ─── Derived datasets (built once at load) ────────────────────────────────────

function buildWeapons() {
  const out = [];
  for (const m of MONSTERS) {
    const types = WEAPONS_BY_TIER[m.stars] || WEAPONS_BY_TIER[5];
    const overrides = WEAPON_NAME_OVERRIDES[m.id] || {};
    for (const typeId of types) {
      out.push({
        id: `${m.id}__${typeId}`,
        monsterId: m.id,
        type: typeId,
        name: overrides[typeId] || `${m.prefix} ${WEAPON_DESCRIPTORS[typeId]}`,
        confirmed: !!overrides[typeId],
      });
    }
  }
  return out;
}

function buildArmor() {
  const out = [];
  for (const m of MONSTERS) {
    for (const slot of ARMOR_SLOTS) {
      out.push({
        id: `${m.id}__${slot}`,
        monsterId: m.id,
        slot,
        name: `${m.prefix} ${ARMOR_SLOT_NAMES[slot]}`,
      });
    }
  }
  return out;
}

const WEAPONS = buildWeapons();
const ARMOR   = buildArmor();

// Index lookups
const MONSTER_BY_ID = Object.fromEntries(MONSTERS.map(m => [m.id, m]));
const WEAPON_BY_ID  = Object.fromEntries(WEAPONS.map(w => [w.id, w]));
const ARMOR_BY_ID   = Object.fromEntries(ARMOR.map(a => [a.id, a]));
