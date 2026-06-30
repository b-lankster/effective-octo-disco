'use strict';

const WEAPON_TYPES = {
  sns: { id: 'sns', name: 'Sword & Shield', short: 'SnS' },
  gs:  { id: 'gs',  name: 'Great Sword',    short: 'GS'  },
  ls:  { id: 'ls',  name: 'Long Sword',     short: 'LS'  },
  hmr: { id: 'hmr', name: 'Hammer',         short: 'HMR' },
  hh:  { id: 'hh',  name: 'Hunting Horn',   short: 'HH'  },
  db:  { id: 'db',  name: 'Dual Blades',    short: 'DB'  },
  lnc: { id: 'lnc', name: 'Lance',          short: 'LNC' },
  gl:  { id: 'gl',  name: 'Gunlance',       short: 'GL'  },
  sa:  { id: 'sa',  name: 'Switch Axe',     short: 'SA'  },
  cb:  { id: 'cb',  name: 'Charge Blade',   short: 'CB'  },
  ig:  { id: 'ig',  name: 'Insect Glaive',  short: 'IG'  },
  lbg: { id: 'lbg', name: 'Light Bowgun',   short: 'LBG' },
  bow: { id: 'bow', name: 'Bow',            short: 'Bow' },
  hbg: { id: 'hbg', name: 'Heavy Bowgun',   short: 'HBG' },
};

const WEAPON_TYPE_ORDER = ['sns','gs','ls','hmr','hh','db','lnc','gl','sa','cb','ig','lbg','bow','hbg'];

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
  none:    { name: '—',  color: '#78909c' },
};

const MONSTER_WEAPONS = {
  'aknosom': ['gs', 'ls', 'db', 'lnc', 'gl', 'sa', 'ig'],
  'almudron': ['ls', 'hmr', 'db', 'gl', 'sa', 'lbg', 'bow'],
  'anjanath': ['sns', 'gs', 'ls', 'hmr', 'hh', 'db', 'gl', 'sa', 'ig', 'lbg', 'bow', 'hbg'],
  'arzuros': ['ls', 'hmr', 'hh', 'db', 'sa', 'bow', 'hbg'],
  'astalos': ['sns', 'gs', 'ls', 'hmr', 'hh', 'db', 'lnc', 'gl', 'sa', 'cb', 'ig', 'lbg', 'bow', 'hbg'],
  'azure_rathalos': ['sns', 'gs', 'ls', 'lnc', 'gl', 'sa', 'cb', 'ig', 'lbg', 'bow'],
  'banbaro': ['gs', 'ls', 'hmr', 'db', 'gl', 'sa', 'lbg', 'bow'],
  'barioth': ['sns', 'gs', 'ls', 'hmr', 'hh', 'db', 'lnc', 'gl', 'sa', 'cb', 'ig', 'lbg', 'bow', 'hbg'],
  'barroth': ['sns', 'gs', 'hmr', 'hh', 'lnc', 'gl', 'sa', 'lbg'],
  'basarios': ['ls', 'hmr', 'hh', 'lnc', 'cb', 'lbg', 'hbg'],
  'bazelgeuse': ['ls', 'hh', 'db', 'lnc', 'gl', 'sa', 'lbg'],
  'beotodus': ['gs', 'db', 'cb', 'ig', 'lbg'],
  'bishaten': ['sns', 'hmr', 'sa', 'lbg', 'bow', 'hbg'],
  'black_diablos': ['hmr', 'db', 'sa', 'cb', 'ig', 'bow', 'hbg'],
  'brute_tigrex': ['sns', 'gs', 'ls', 'hh', 'db', 'lnc', 'gl', 'sa', 'cb', 'ig', 'lbg', 'bow', 'hbg'],
  'chameleos': ['gs', 'ls', 'hmr', 'hh', 'db', 'gl', 'sa', 'cb', 'ig', 'lbg', 'bow', 'hbg'],
  'chatacabra': ['sns', 'hmr', 'cb', 'ig', 'hbg'],
  'coral_pukei_pukei': ['sns', 'gs', 'hmr', 'hh', 'lnc', 'sa', 'ig', 'lbg', 'bow', 'hbg'],
  'deviljho': ['sns', 'gs', 'ls', 'hmr', 'hh', 'db', 'lnc', 'gl', 'sa', 'cb', 'ig', 'lbg', 'bow', 'hbg'],
  'diablos': ['sns', 'gs', 'hmr', 'hh', 'db', 'lnc', 'gl', 'sa', 'cb', 'ig', 'bow', 'hbg'],
  'ebony_odogaron': ['db', 'lnc', 'cb', 'ig', 'lbg'],
  'espinas': ['sns', 'gs', 'ls', 'hmr', 'hh', 'db', 'lnc', 'gl', 'sa', 'cb', 'ig', 'lbg', 'bow', 'hbg'],
  'fulgur_anjanath': ['sns', 'gs', 'ls', 'hmr', 'hh', 'db', 'gl', 'sa', 'ig', 'lbg', 'bow', 'hbg'],
  'garangolm': ['sns', 'gs', 'ls', 'hmr', 'hh', 'db', 'lnc', 'gl', 'sa', 'cb', 'ig', 'lbg', 'bow', 'hbg'],
  'glavenus': ['sns', 'gs', 'ls', 'hmr', 'hh', 'db', 'lnc', 'gl', 'sa', 'cb', 'ig', 'lbg', 'bow', 'hbg'],
  'gold_rathian': ['sns', 'ls', 'hh', 'gl', 'sa', 'cb', 'lbg', 'bow', 'hbg'],
  'gossharag': ['sns', 'gs', 'hmr', 'lnc', 'cb', 'ig', 'lbg'],
  'great_girros': ['sns', 'gs', 'hmr', 'gl', 'cb'],
  'great_jagras': ['sns', 'gs', 'gl', 'sa', 'cb', 'lbg', 'hbg'],
  'great_wroggi': ['sns', 'ls', 'hmr', 'db', 'bow'],
  'jyuratodus': ['sns', 'gs', 'ls', 'hmr', 'hh', 'db', 'lnc', 'gl', 'sa', 'cb', 'ig', 'lbg', 'bow', 'hbg'],
  'khezu': ['sns', 'gs', 'hmr', 'hh', 'db', 'gl', 'sa', 'ig', 'lbg', 'bow'],
  'kirin': ['sns', 'gs', 'hh', 'db', 'lnc', 'sa', 'ig', 'lbg', 'hbg'],
  'kulu_ya_ku': ['ls', 'hmr', 'hh', 'db', 'lnc', 'ig', 'bow'],
  'kushala_daora': ['sns', 'gs', 'ls', 'hmr', 'hh', 'db', 'lnc', 'gl', 'sa', 'cb', 'ig', 'lbg', 'bow', 'hbg'],
  'lagombi': ['gs', 'ls', 'db', 'gl', 'sa', 'ig', 'hbg'],
  'legiana': ['sns', 'gs', 'ls', 'hh', 'db', 'lnc', 'gl', 'sa', 'cb', 'ig', 'lbg', 'bow', 'hbg'],
  'lunagaron': ['sns', 'gs', 'ls', 'hmr', 'hh', 'db', 'lnc', 'gl', 'sa', 'cb', 'ig', 'lbg', 'bow', 'hbg'],
  'magnamalo': ['sns', 'gs', 'ls', 'hmr', 'hh', 'db', 'lnc', 'gl', 'sa', 'cb', 'ig', 'lbg', 'bow', 'hbg'],
  'malzeno': ['sns', 'gs', 'ls', 'hmr', 'hh', 'db', 'lnc', 'gl', 'sa', 'cb', 'ig', 'lbg', 'bow', 'hbg'],
  'mizutsune': ['sns', 'gs', 'ls', 'hmr', 'hh', 'db', 'lnc', 'gl', 'sa', 'cb', 'ig', 'lbg', 'bow', 'hbg'],
  'namielle': ['sns', 'ls', 'hh', 'lnc', 'gl', 'sa', 'cb', 'ig', 'lbg', 'bow', 'hbg'],
  'nargacuga': ['sns', 'gs', 'ls', 'hmr', 'hh', 'db', 'lnc', 'gl', 'sa', 'cb', 'ig', 'lbg', 'bow', 'hbg'],
  'nergigante': ['sns', 'gs', 'ls', 'hmr', 'hh', 'db', 'lnc', 'gl', 'sa', 'cb', 'ig', 'lbg', 'bow', 'hbg'],
  'nightshade_paolumu': ['sns', 'gs', 'hmr', 'hh', 'lnc', 'sa', 'ig', 'lbg', 'bow', 'hbg'],
  'odogaron': ['db', 'lnc', 'cb', 'ig', 'lbg'],
  'paolumu': ['sns', 'hh', 'sa', 'lbg'],
  'pink_rathian': ['sns', 'ls', 'hh', 'gl', 'cb', 'bow'],
  'pukei_pukei': ['sns', 'gs', 'hmr', 'hh', 'lnc', 'sa', 'ig', 'bow', 'hbg'],
  'quematrice': ['sns', 'gs', 'ls', 'db', 'lnc', 'gl', 'bow'],
  'radobaan': ['sns', 'gs', 'hmr', 'hh', 'hbg'],
  'rajang': ['sns', 'gs', 'ls', 'hmr', 'hh', 'db', 'lnc', 'gl', 'sa', 'cb', 'ig', 'lbg', 'bow', 'hbg'],
  'rathalos': ['sns', 'gs', 'ls', 'hmr', 'hh', 'db', 'lnc', 'gl', 'sa', 'cb', 'ig', 'lbg', 'bow'],
  'rathian': ['sns', 'ls', 'hh', 'gl', 'sa', 'cb', 'ig', 'bow', 'hbg'],
  'seregios': ['sns', 'gs', 'ls', 'hmr', 'hh', 'db', 'lnc', 'gl', 'sa', 'cb', 'ig', 'lbg', 'bow', 'hbg'],
  'shogun_ceanataur': ['gs', 'ls', 'hmr', 'db', 'lnc', 'cb', 'bow', 'hbg'],
  'silver_rathalos': ['sns', 'gs', 'ls', 'hmr', 'db', 'lnc', 'gl', 'sa', 'cb', 'ig', 'lbg', 'bow'],
  'somnacanth': ['gs', 'ls', 'hmr', 'hh', 'db', 'cb', 'ig'],
  'stygian_zinogre': ['sns', 'gs', 'ls', 'hmr', 'hh', 'db', 'lnc', 'gl', 'sa', 'cb', 'ig', 'lbg', 'bow', 'hbg'],
  'teostra': ['sns', 'gs', 'ls', 'hmr', 'hh', 'lnc', 'sa', 'cb', 'lbg', 'bow', 'hbg'],
  'tigrex': ['sns', 'gs', 'ls', 'hmr', 'hh', 'db', 'lnc', 'gl', 'sa', 'cb', 'ig', 'lbg', 'bow', 'hbg'],
  'tobi_kadachi': ['sns', 'gs', 'ls', 'hmr', 'hh', 'db', 'lnc', 'gl', 'sa', 'cb', 'ig', 'lbg', 'bow', 'hbg'],
  'tzitzi_ya_ku': ['ls', 'db', 'ig', 'hbg'],
  'vipertobikadachi': ['ls', 'db', 'gl', 'cb', 'ig', 'bow', 'hbg'],
  'volvidon': ['hmr', 'lnc', 'gl', 'sa', 'cb', 'hbg'],
  'zinogre': ['sns', 'gs', 'ls', 'hmr', 'hh', 'db', 'lnc', 'gl', 'sa', 'cb', 'ig', 'lbg', 'bow', 'hbg'],
};

const WEAPON_DESCRIPTORS = {
  sns: 'Edge',  gs: 'Blade',     ls: 'Sword',    hmr: 'Hammer', hh: 'Horn',
  db:  'Fangs', lnc: 'Lance',    gl: 'Gunlance', sa:  'Axe',    cb: 'Strongarm',
  ig:  'Glaive', lbg: 'Blitz',  bow: 'Bow',      hbg: 'Assault',
};

// Display names for common (generic) materials
const COMMON_MATERIAL_NAMES = {
  'iron_ore':           'Iron Ore',
  'flowfern':           'Flowfern',
  'machalite_ore':      'Machalite Ore',
  'dragonite_ore':      'Dragonite Ore',
  'earth_crystal':      'Earth Crystal',
  'carpenterbug':       'Carpenterbug',
  'monster_bone_s':     'Monster Bone S',
  'fire_herb':          'Fire Herb',
  'monster_bone_m':     'Monster Bone M',
  'monster_bone_l':     'Monster Bone L',
  'monster_bone_plus':  'Monster Bone+',
  'elder_dragon_blood': 'Elder Dragon Blood',
  'dragonfell_berry':   'Dragonfell Berry',
  'godbug':             'Godbug',
  'nitroshroom':        'Nitroshroom',
  'parashroom':         'Parashroom',
  'sleep_herb':         'Sleep Herb',
  'snow_herb':          'Snow Herb',
  'thunderbug':         'Thunderbug',
  'toadstool':          'Toadstool',
  'wyvern_gem_shard':   'Wyvern Gem Shard',
};

// First word of exclusive mat ID → display suffix appended to monster name
const EXCLUSIVE_PART_NAMES = {
  'scale': 'Scale', 'claw': 'Claw', 'tail': 'Tail', 'hide': 'Hide',
  'shell': 'Shell', 'body': 'Pelt',  'plate': 'Plate', 'bone': 'Bone',
  'gem':   'Gem',   'head': 'Head',  'wing': 'Wing',   'blood': 'Blood',
  'bag':   'Sac',   'clamp': 'Clamp',
};

// ─── Monster roster (66 real monsters from mhnow.me, sorted by grade) ─────────
// commons: slot keys → generic material ID (e.g. 'r1_1' → 'iron_ore')
// exclusive: array of monster-specific part IDs; index 0 may be {weapon, armor}
// Grade upgrade steps: 0 = not crafted, 1-N where N = (11 - stars) * 5 = max upgrades to G10
const MONSTERS = [
  { id: "kulu_ya_ku", name: "Kulu-Ya-Ku", prefix: "Kulu",
    stars: 1, element: "none", color: "#78909c",
    isEvent: false, recipeGroup: "",
    commons: {"r1_1": "monster_bone_s", "r1_2": "godbug", "r2_1": "monster_bone_m", "r3_1": "monster_bone_l", "r3_2": "monster_bone_plus"},
    exclusive: [{"weapon": "scale_khaki", "armor": "hide_khaki"}, "head_khaki", "body_orange", "scale_khaki", "hide_khaki"] },
  { id: "barroth", name: "Barroth", prefix: "Barroth",
    stars: 1, element: "none", color: "#78909c",
    isEvent: false, recipeGroup: "",
    commons: {"r1_1": "monster_bone_s", "r1_2": "godbug", "r2_1": "monster_bone_m", "r3_1": "monster_bone_l", "r3_2": "carpenterbug"},
    exclusive: [{"weapon": "claw_warm", "armor": "shell_warm"}, "tail_warm", "head_warm", "body_warm", "shell_warm"] },
  { id: "great_jagras", name: "Great Jagras", prefix: "Jagras",
    stars: 1, element: "water", color: "#42a5f5",
    isEvent: false, recipeGroup: "",
    commons: {"r1_1": "iron_ore", "r1_2": "flowfern", "r2_1": "machalite_ore", "r3_1": "dragonite_ore", "r3_2": "earth_crystal"},
    exclusive: [{"weapon": "scale_yellow", "armor": "hide_yellow"}, "claw_yellow", "body_yellow", "scale_yellow", "gem_yellow"] },
  { id: "pukei_pukei", name: "Pukei-Pukei", prefix: "Pukei",
    stars: 1, element: "poison", color: "#ce93d8",
    isEvent: false, recipeGroup: "",
    commons: {"r1_1": "iron_ore", "r1_2": "toadstool", "r2_1": "machalite_ore", "r3_1": "dragonite_ore", "r3_2": "carpenterbug"},
    exclusive: [{"weapon": "scale_grass", "armor": "shell_grass"}, "tail_grass", "bag_grass", "wing_grass", "scale_grass"] },
  { id: "chatacabra", name: "Chatacabra", prefix: "Chatacabra",
    stars: 2, element: "none", color: "#78909c",
    isEvent: false, recipeGroup: "",
    commons: {"r1_1": "monster_bone_s", "r1_2": "godbug", "r2_1": "monster_bone_m", "r3_1": "monster_bone_l", "r3_2": "carpenterbug"},
    exclusive: [{"weapon": "scale_green", "armor": "hide_green"}, "shell_green", "head_green", "scale_green", "shell_green"] },
  { id: "arzuros", name: "Arzuros", prefix: "Arzuros",
    stars: 2, element: "none", color: "#78909c",
    isEvent: false, recipeGroup: "",
    commons: {"r1_1": "iron_ore", "r1_2": "godbug", "r2_1": "machalite_ore", "r3_1": "dragonite_ore", "r3_2": "carpenterbug"},
    exclusive: [{"weapon": "hide_blue", "armor": "shell_blue"}, "claw_blue", "body_blue", "hide_blue", "body_blue"] },
  { id: "basarios", name: "Basarios", prefix: "Basarios",
    stars: 2, element: "none", color: "#78909c",
    isEvent: false, recipeGroup: "",
    commons: {"r1_1": "iron_ore", "r1_2": "fire_herb", "r2_1": "machalite_ore", "r3_1": "dragonite_ore", "r3_2": "earth_crystal"},
    exclusive: [{"weapon": "shell_grey", "armor": "body_grey"}, "tail_grey", "wing_grey", "body_grey", "wing_grey"] },
  { id: "quematrice", name: "Quematrice", prefix: "Quematrice",
    stars: 2, element: "fire", color: "#ef5350",
    isEvent: false, recipeGroup: "",
    commons: {"r1_1": "iron_ore", "r1_2": "fire_herb", "r2_1": "machalite_ore", "r3_1": "dragonite_ore", "r3_2": "earth_crystal"},
    exclusive: [{"weapon": "scale_blue", "armor": "hide_blue"}, "tail_blue", "head_red", "scale_blue", "blood_red"] },
  { id: "tobi_kadachi", name: "Tobi-Kadachi", prefix: "Tobi",
    stars: 2, element: "thunder", color: "#ffca28",
    isEvent: false, recipeGroup: "",
    commons: {"r1_1": "monster_bone_s", "r1_2": "thunderbug", "r2_1": "monster_bone_m", "r3_1": "monster_bone_l", "r3_2": "monster_bone_plus"},
    exclusive: [{"weapon": "claw_green", "armor": "scale_green"}, "hide_green", "wing_green", "scale_green", "body_green"] },
  { id: "tzitzi_ya_ku", name: "Tzitzi-Ya-Ku", prefix: "Tzitzi",
    stars: 2, element: "none", color: "#78909c",
    isEvent: false, recipeGroup: "",
    commons: {"r1_1": "iron_ore", "r1_2": "thunderbug", "r2_1": "machalite_ore", "r3_1": "dragonite_ore", "r3_2": "earth_crystal"},
    exclusive: [{"weapon": "scale_blue", "armor": "hide_blue"}, "claw_blue", "body_blue", "hide_blue", "body_blue"] },
  { id: "lagombi", name: "Lagombi", prefix: "Lagombi",
    stars: 2, element: "ice", color: "#80deea",
    isEvent: false, recipeGroup: "",
    commons: {"r1_1": "monster_bone_s", "r1_2": "snow_herb", "r2_1": "monster_bone_m", "r3_1": "monster_bone_l", "r3_2": "monster_bone_plus"},
    exclusive: [{"weapon": "hide_silver", "armor": "head_sliver"}, "claw_silver", "body_silver", "hide_silver", "head_sliver"] },
  { id: "great_wroggi", name: "Great Wroggi", prefix: "Wroggi",
    stars: 2, element: "poison", color: "#ce93d8",
    isEvent: false, recipeGroup: "",
    commons: {"r1_1": "iron_ore", "r1_2": "toadstool", "r2_1": "machalite_ore", "r3_1": "dragonite_ore", "r3_2": "earth_crystal"},
    exclusive: [{"weapon": "bone_warm", "armor": "hide_warm"}, "claw_warm", "head_warm", "bone_warm", "head_warm"] },
  { id: "great_girros", name: "Great Girros", prefix: "Girros",
    stars: 2, element: "thunder", color: "#ffca28",
    isEvent: false, recipeGroup: "",
    commons: {"r1_1": "iron_ore", "r1_2": "parashroom", "r2_1": "machalite_ore", "r3_1": "dragonite_ore", "r3_2": "earth_crystal"},
    exclusive: [{"weapon": "claw_grey", "armor": "scale_grey"}, "tail_grey", "body_grey", "scale_grey", "claw_grey"] },
  { id: "radobaan", name: "Radobaan", prefix: "Radobaan",
    stars: 2, element: "none", color: "#78909c",
    isEvent: false, recipeGroup: "",
    commons: {"r1_1": "monster_bone_s", "r1_2": "sleep_herb", "r2_1": "monster_bone_m", "r3_1": "monster_bone_l", "r3_2": "monster_bone_plus"},
    exclusive: [{"weapon": "scale_silver", "armor": "scale_silver"}, "tail_silver", "shell_silver", "scale_silver", "body_silver"] },
  { id: "paolumu", name: "Paolumu", prefix: "Paolumu",
    stars: 3, element: "none", color: "#78909c",
    isEvent: false, recipeGroup: "",
    commons: {"r1_1": "iron_ore", "r1_2": "godbug", "r2_1": "machalite_ore", "r3_1": "dragonite_ore", "r3_2": "carpenterbug"},
    exclusive: [{"weapon": "scale_silver", "armor": "hide_silver"}, "wing_silver", "shell_pink", "scale_silver", "shell_pink"] },
  { id: "banbaro", name: "Banbaro", prefix: "Banbaro",
    stars: 3, element: "ice", color: "#80deea",
    isEvent: false, recipeGroup: "",
    commons: {"r1_1": "monster_bone_s", "r1_2": "godbug", "r2_1": "monster_bone_m", "r3_1": "monster_bone_l", "r3_2": "monster_bone_plus"},
    exclusive: [{"weapon": "shell_khaki", "armor": "body_khaki"}, "tail_khaki", "hide_khaki", "shell_khaki", "claw_khaki"] },
  { id: "aknosom", name: "Aknosom", prefix: "Aknosom",
    stars: 3, element: "fire", color: "#ef5350",
    isEvent: false, recipeGroup: "",
    commons: {"r1_1": "iron_ore", "r1_2": "fire_herb", "r2_1": "machalite_ore", "r3_1": "dragonite_ore", "r3_2": "earth_crystal"},
    exclusive: [{"weapon": "scale_silver", "armor": "body_silver"}, "head_red", "hide_red", "scale_silver", "body_silver"] },
  { id: "jyuratodus", name: "Jyuratodus", prefix: "Jyura",
    stars: 3, element: "water", color: "#42a5f5",
    isEvent: false, recipeGroup: "",
    commons: {"r1_1": "monster_bone_s", "r1_2": "flowfern", "r2_1": "monster_bone_m", "r3_1": "monster_bone_l", "r3_2": "carpenterbug"},
    exclusive: [{"weapon": "scale_khaki", "armor": "shell_khaki"}, "claw_khaki", "body_khaki", "scale_khaki", "shell_khaki"] },
  { id: "volvidon", name: "Volvidon", prefix: "Volvidon",
    stars: 3, element: "none", color: "#78909c",
    isEvent: false, recipeGroup: "",
    commons: {"r1_1": "iron_ore", "r1_2": "parashroom", "r2_1": "machalite_ore", "r3_1": "dragonite_ore", "r3_2": "earth_crystal"},
    exclusive: [{"weapon": "shell_red", "armor": "body_red"}, "claw_red", "bone_red", "body_red", "claw_red"] },
  { id: "bishaten", name: "Bishaten", prefix: "Bishaten",
    stars: 3, element: "none", color: "#78909c",
    isEvent: false, recipeGroup: "",
    commons: {"r1_1": "monster_bone_s", "r1_2": "godbug", "r2_1": "monster_bone_m", "r3_1": "monster_bone_l", "r3_2": "monster_bone_plus"},
    exclusive: [{"weapon": "hide_blue", "armor": "body_blue"}, "shell_blue", "claw_blue", "body_blue", "claw_blue"] },
  { id: "garangolm", name: "Garangolm", prefix: "Garang.",
    stars: 4, element: "none", color: "#78909c",
    isEvent: false, recipeGroup: "",
    commons: {"r1_1": "iron_ore", "r1_2": "godbug", "r2_1": "machalite_ore", "r3_1": "dragonite_ore", "r3_2": "earth_crystal"},
    exclusive: [{"weapon": "scale_brown", "armor": "shell_brown"}, "tail_brown", "body_brown", "scale_khaki", "body_brown"] },
  { id: "odogaron", name: "Odogaron", prefix: "Odogaron",
    stars: 4, element: "none", color: "#78909c",
    isEvent: false, recipeGroup: "",
    commons: {"r1_1": "monster_bone_s", "r1_2": "godbug", "r2_1": "monster_bone_m", "r3_1": "monster_bone_l", "r3_2": "monster_bone_plus"},
    exclusive: [{"weapon": "scale_wine", "armor": "body_wine"}, "tail_wine", "claw_wine", "scale_wine", "plate_wine"] },
  { id: "anjanath", name: "Anjanath", prefix: "Anja",
    stars: 4, element: "fire", color: "#ef5350",
    isEvent: false, recipeGroup: "",
    commons: {"r1_1": "monster_bone_s", "r1_2": "fire_herb", "r2_1": "monster_bone_m", "r3_1": "monster_bone_l", "r3_2": "monster_bone_plus"},
    exclusive: [{"weapon": "claw_pink", "armor": "scale_pink"}, "tail_pink", "bone_pink", "scale_pink", "plate_pink"] },
  { id: "almudron", name: "Almudron", prefix: "Almudron",
    stars: 4, element: "water", color: "#42a5f5",
    isEvent: false, recipeGroup: "",
    commons: {"r1_1": "iron_ore", "r1_2": "flowfern", "r2_1": "machalite_ore", "r3_1": "dragonite_ore", "r3_2": "earth_crystal"},
    exclusive: [{"weapon": "scale_brown", "armor": "shell_brown"}, "tail_brown", "claw_brown", "body_red", "body_red"] },
  { id: "shogun_ceanataur", name: "Shogun Ceanataur", prefix: "Shogun",
    stars: 4, element: "none", color: "#78909c",
    isEvent: false, recipeGroup: "",
    commons: {"r1_1": "monster_bone_s", "r1_2": "flowfern", "r2_1": "monster_bone_m", "r3_1": "monster_bone_l", "r3_2": "monster_bone_plus"},
    exclusive: [{"weapon": "scale_blue", "armor": "clamp_blue"}, "clamp_blue", "head_grey", "scale_blue", "scale_blue"] },
  { id: "khezu", name: "Khezu", prefix: "Khezu",
    stars: 4, element: "ice", color: "#80deea",
    isEvent: false, recipeGroup: "",
    commons: {"r1_1": "iron_ore", "r1_2": "thunderbug", "r1_3": "monster_bone_s", "r2_1": "machalite_ore", "r2_2": "monster_bone_m", "r3_1": "monster_bone_l", "r3_2": "monster_bone_plus", "r3_3": "dragonite_ore", "r3_4": "earth_crystal"},
    exclusive: [{"weapon": "claw_silver", "armor": "hide_silver"}, "blood_silver", "body_silver", "hide_silver", "body_silver"] },
  { id: "barioth", name: "Barioth", prefix: "Barioth",
    stars: 4, element: "ice", color: "#80deea",
    isEvent: false, recipeGroup: "",
    commons: {"r1_1": "iron_ore", "r1_2": "snow_herb", "r2_1": "machalite_ore", "r3_1": "dragonite_ore", "r3_2": "earth_crystal"},
    exclusive: [{"weapon": "claw_silver", "armor": "shell_silver"}, "tail_silver", "body_silver", "claw_silver", "claw_orange"] },
  { id: "beotodus", name: "Beotodus", prefix: "Beotodus",
    stars: 4, element: "ice", color: "#80deea",
    isEvent: false, recipeGroup: "",
    commons: {"r1_1": "monster_bone_s", "r1_2": "snow_herb", "r2_1": "monster_bone_m", "r3_1": "monster_bone_l", "r3_2": "monster_bone_plus"},
    exclusive: [{"weapon": "scale_blue", "armor": "shell_blue"}, "body_blue", "claw_blue", "scale_blue", "body_blue"] },
  { id: "lunagaron", name: "Lunagaron", prefix: "Luna.",
    stars: 4, element: "ice", color: "#80deea",
    isEvent: false, recipeGroup: "",
    commons: {"r1_1": "iron_ore", "r1_2": "snow_herb", "r2_1": "machalite_ore", "r3_1": "dragonite_ore", "r3_2": "earth_crystal"},
    exclusive: [{"weapon": "scale_blue", "armor": "shell_blue"}, "body_blue", "claw_orange", "scale_blue", "claw_orange"] },
  { id: "gossharag", name: "Gossharag", prefix: "Gossharag",
    stars: 4, element: "ice", color: "#80deea",
    isEvent: false, recipeGroup: "",
    commons: {"r1_1": "iron_ore", "r1_2": "snow_herb", "r2_1": "machalite_ore", "r3_1": "dragonite_ore", "r3_2": "earth_crystal"},
    exclusive: [{"weapon": "body_silver", "armor": "hide_blue"}, "claw_blue", "claw_blue", "shell_blue", "body_silver"] },
  { id: "rathian", name: "Rathian", prefix: "Rathian",
    stars: 4, element: "fire", color: "#ef5350",
    isEvent: false, recipeGroup: "",
    commons: {"r1_1": "monster_bone_s", "r1_2": "toadstool", "r2_1": "monster_bone_m", "r3_1": "monster_bone_l", "r3_2": "monster_bone_plus"},
    exclusive: [{"weapon": "scale_forest", "armor": "shell_green"}, "wing_forest", "body_forest", "scale_forest", "plate_green"] },
  { id: "somnacanth", name: "Somnacanth", prefix: "Somna.",
    stars: 4, element: "water", color: "#42a5f5",
    isEvent: false, recipeGroup: "",
    commons: {"r1_1": "monster_bone_s", "r1_2": "sleep_herb", "r2_1": "monster_bone_m", "r3_1": "monster_bone_l", "r3_2": "monster_bone_plus"},
    exclusive: [{"weapon": "scale_yellow", "armor": "shell_yellow"}, "claw_yellow", "body_purple", "scale_yellow", "body_purple"] },
  { id: "magnamalo", name: "Magnamalo", prefix: "Magn.",
    stars: 4, element: "fire", color: "#ef5350",
    isEvent: false, recipeGroup: "",
    commons: {"r1_1": "monster_bone_s", "r1_2": "nitroshroom", "r2_1": "monster_bone_m", "r3_1": "monster_bone_l", "r3_2": "monster_bone_plus"},
    exclusive: [{"weapon": "scale_purple", "armor": "shell_purple"}, "tail_purple", "claw_yellow", "body_purple", "plate_purple"] },
  { id: "brute_tigrex", name: "Brute Tigrex", prefix: "B.Tigrex",
    stars: 5, element: "none", color: "#78909c",
    isEvent: true, recipeGroup: "rare",
    commons: {"r1_1": "monster_bone_s", "r1_2": "carpenterbug", "r2_1": "monster_bone_m", "r3_1": "monster_bone_l", "r3_2": "carpenterbug"},
    exclusive: [{"weapon": "scale_grey", "armor": "shell_grey"}, "tail_grey", "claw_grey", "claw_grey", "head_grey", "plate_grey"] },
  { id: "nargacuga", name: "Nargacuga", prefix: "Nargacuga",
    stars: 5, element: "none", color: "#78909c",
    isEvent: true, recipeGroup: "rare",
    commons: {"r1_1": "iron_ore", "r1_2": "godbug", "r2_1": "machalite_ore", "r3_1": "dragonite_ore", "r3_2": "earth_crystal"},
    exclusive: [{"weapon": "scale_grey", "armor": "hide_grey"}, "tail_grey", "claw_grey", "body_grey", "wing_grey", "body_grey"] },
  { id: "seregios", name: "Seregios", prefix: "Seregios",
    stars: 5, element: "none", color: "#78909c",
    isEvent: true, recipeGroup: "rare",
    commons: {"r1_1": "monster_bone_s", "r1_2": "godbug", "r2_1": "monster_bone_m", "r3_1": "monster_bone_l", "r3_2": "carpenterbug"},
    exclusive: [{"weapon": "claw_yellow", "armor": "scale_yellow"}, "scale_yellow", "claw_yellow", "claw_yellow", "tail_yellow", "plate_yellow"] },
  { id: "diablos", name: "Diablos", prefix: "Diablos",
    stars: 5, element: "none", color: "#78909c",
    isEvent: false, recipeGroup: "sub",
    commons: {"r1_1": "monster_bone_s", "r1_2": "godbug", "r2_1": "monster_bone_m", "r3_1": "monster_bone_l", "r3_2": "carpenterbug"},
    exclusive: [{"weapon": "claw_brown", "armor": "shell_brown"}, "body_brown", "body_brown", "shell_brown", "body_brown"] },
  { id: "black_diablos", name: "Black Diablos", prefix: "B.Diablos",
    stars: 5, element: "none", color: "#78909c",
    isEvent: false, recipeGroup: "",
    commons: {"r1_1": "monster_bone_s", "r1_2": "godbug", "r2_1": "monster_bone_m", "r3_1": "monster_bone_l", "r3_2": "carpenterbug"},
    exclusive: [{"weapon": "claw_grey", "armor": "shell_grey"}, "body_grey", "body_grey", "shell_grey", "body_grey"] },
  { id: "rajang", name: "Rajang", prefix: "Rajang",
    stars: 5, element: "thunder", color: "#ffca28",
    isEvent: true, recipeGroup: "rare",
    commons: {"r1_1": "monster_bone_s", "r1_2": "thunderbug", "r2_1": "monster_bone_m", "r3_1": "monster_bone_l", "r3_2": "monster_bone_plus"},
    exclusive: [{"weapon": "claw_yellow", "armor": "body_grey"}, "tail_yellow", "claw_grey", "claw_yellow", "claw_yellow", "body_yellow"] },
  { id: "tigrex", name: "Tigrex", prefix: "Tigrex",
    stars: 5, element: "none", color: "#78909c",
    isEvent: true, recipeGroup: "rare",
    commons: {"r1_1": "monster_bone_s", "r1_2": "carpenterbug", "r2_1": "monster_bone_m", "r3_1": "monster_bone_l", "r3_2": "carpenterbug"},
    exclusive: [{"weapon": "scale_yellow", "armor": "shell_yellow"}, "tail_yellow", "claw_yellow", "claw_yellow", "head_yellow", "plate_yellow"] },
  { id: "espinas", name: "Espinas", prefix: "Espinas",
    stars: 5, element: "fire", color: "#ef5350",
    isEvent: true, recipeGroup: "rare",
    commons: {"r1_1": "monster_bone_s", "r1_2": "fire_herb", "r2_1": "monster_bone_m", "r3_1": "monster_bone_l", "r3_2": "monster_bone_plus"},
    exclusive: [{"weapon": "scale_green", "armor": "shell_green"}, "tail_green", "claw_red", "scale_green", "body_red", "plate_green"] },
  { id: "rathalos", name: "Rathalos", prefix: "Rathalos",
    stars: 5, element: "fire", color: "#ef5350",
    isEvent: false, recipeGroup: "",
    commons: {"r1_1": "iron_ore", "r1_2": "fire_herb", "r2_1": "machalite_ore", "r3_1": "dragonite_ore", "r3_2": "earth_crystal"},
    exclusive: [{"weapon": "scale_red", "armor": "claw_red"}, "tail_red", "body_red", "scale_red", "plate_red"] },
  { id: "azure_rathalos", name: "Azure Rathalos", prefix: "A.Rathalos",
    stars: 5, element: "fire", color: "#ef5350",
    isEvent: false, recipeGroup: "sub",
    commons: {"r1_1": "iron_ore", "r1_2": "fire_herb", "r2_1": "machalite_ore", "r3_1": "dragonite_ore", "r3_2": "earth_crystal"},
    exclusive: [{"weapon": "scale_blue", "armor": "claw_blue"}, "tail_blue", "body_blue", "scale_blue", "plate_blue"] },
  { id: "glavenus", name: "Glavenus", prefix: "Glavenus",
    stars: 5, element: "fire", color: "#ef5350",
    isEvent: true, recipeGroup: "rare",
    commons: {"r1_1": "monster_bone_s", "r1_2": "fire_herb", "r2_1": "monster_bone_m", "r3_1": "monster_bone_l", "r3_2": "monster_bone_plus"},
    exclusive: [{"weapon": "scale_red", "armor": "shell_purple"}, "tail_purple", "bone_red", "claw_purple", "shell_purple", "plate_red"] },
  { id: "coral_pukei_pukei", name: "Coral Pukei-Pukei", prefix: "C.Pukei",
    stars: 5, element: "water", color: "#42a5f5",
    isEvent: false, recipeGroup: "sub",
    commons: {"r1_1": "iron_ore", "r1_2": "flowfern", "r2_1": "machalite_ore", "r3_1": "dragonite_ore", "r3_2": "earth_crystal"},
    exclusive: [{"weapon": "scale_orange", "armor": "shell_orange"}, "tail_orange", "bag_orange", "wing_orange", "scale_orange"] },
  { id: "mizutsune", name: "Mizutsune", prefix: "Mizutsune",
    stars: 5, element: "water", color: "#42a5f5",
    isEvent: true, recipeGroup: "rare",
    commons: {"r1_1": "iron_ore", "r1_2": "flowfern", "r1_3": "monster_bone_s", "r2_1": "machalite_ore", "r2_2": "monster_bone_m", "r3_1": "dragonite_ore", "r3_2": "earth_crystal", "r3_3": "monster_bone_l", "r3_4": "monster_bone_plus"},
    exclusive: [{"weapon": "scale_silver", "armor": "hide_purple"}, "tail_purple", "claw_purple", "hide_purple", "claw_purple", "plate_purple"] },
  { id: "zinogre", name: "Zinogre", prefix: "Zinogre",
    stars: 5, element: "thunder", color: "#ffca28",
    isEvent: true, recipeGroup: "rare",
    commons: {"r1_1": "iron_ore", "r1_2": "thunderbug", "r2_1": "machalite_ore", "r3_1": "dragonite_ore", "r3_2": "carpenterbug"},
    exclusive: [{"weapon": "claw_green", "armor": "shell_green"}, "tail_green", "body_silver", "claw_green", "claw_green", "plate_green"] },
  { id: "fulgur_anjanath", name: "Fulgur Anjanath", prefix: "F.Anja",
    stars: 5, element: "thunder", color: "#ffca28",
    isEvent: true, recipeGroup: "rare",
    commons: {"r1_1": "monster_bone_s", "r1_2": "thunderbug", "r2_1": "monster_bone_m", "r3_1": "monster_bone_l", "r3_2": "carpenterbug"},
    exclusive: [{"weapon": "claw_silver", "armor": "scale_silver"}, "tail_silver", "bone_silver", "scale_silver", "scale_silver", "plate_silver"] },
  { id: "astalos", name: "Astalos", prefix: "Astalos",
    stars: 5, element: "thunder", color: "#ffca28",
    isEvent: true, recipeGroup: "rare",
    commons: {"r1_1": "iron_ore", "r1_2": "thunderbug", "r2_1": "machalite_ore", "r3_1": "dragonite_ore", "r3_2": "carpenterbug"},
    exclusive: [{"weapon": "scale_green", "armor": "shell_green"}, "tail_green", "head_green", "wing_green", "claw_green", "plate_green"] },
  { id: "legiana", name: "Legiana", prefix: "Legiana",
    stars: 5, element: "ice", color: "#80deea",
    isEvent: false, recipeGroup: "",
    commons: {"r1_1": "iron_ore", "r1_2": "snow_herb", "r2_1": "machalite_ore", "r3_1": "dragonite_ore", "r3_2": "earth_crystal"},
    exclusive: [{"weapon": "scale_blue", "armor": "hide_blue"}, "claw_blue", "wing_blue", "scale_blue", "plate_blue"] },
  { id: "ebony_odogaron", name: "Ebony Odogaron", prefix: "E.Odogaron",
    stars: 5, element: "dragon", color: "#ab47bc",
    isEvent: false, recipeGroup: "sub",
    commons: {"r1_1": "iron_ore", "r1_2": "dragonfell_berry", "r2_1": "machalite_ore", "r3_1": "dragonite_ore", "r3_2": "earth_crystal"},
    exclusive: [{"weapon": "scale_grey", "armor": "body_grey"}, "tail_grey", "claw_grey", "scale_grey", "plate_grey"] },
  { id: "deviljho", name: "Deviljho", prefix: "Deviljho",
    stars: 5, element: "dragon", color: "#ab47bc",
    isEvent: true, recipeGroup: "rare",
    commons: {"r1_1": "monster_bone_s", "r1_2": "dragonfell_berry", "r2_1": "monster_bone_m", "r3_1": "monster_bone_l", "r3_2": "monster_bone_plus"},
    exclusive: [{"weapon": "scale_forest", "armor": "hide_forest"}, "tail_forest", "claw_forest", "hide_forest", "head_forest", "blood_forest"] },
  { id: "stygian_zinogre", name: "Stygian Zinogre", prefix: "S.Zinogre",
    stars: 5, element: "dragon", color: "#ab47bc",
    isEvent: true, recipeGroup: "rare",
    commons: {"r1_1": "iron_ore", "r1_2": "dragonfell_berry", "r2_1": "machalite_ore", "r3_1": "dragonite_ore", "r3_2": "carpenterbug"},
    exclusive: [{"weapon": "claw_grey", "armor": "shell_grey"}, "tail_grey", "body_grey", "claw_grey", "claw_grey", "plate_grey"] },
  { id: "pink_rathian", name: "Pink Rathian", prefix: "P.Rathian",
    stars: 5, element: "poison", color: "#ce93d8",
    isEvent: false, recipeGroup: "sub",
    commons: {"r1_1": "monster_bone_s", "r1_2": "toadstool", "r2_1": "monster_bone_m", "r3_1": "monster_bone_l", "r3_2": "monster_bone_plus"},
    exclusive: [{"weapon": "scale_pink", "armor": "shell_pink"}, "wing_pink", "body_pink", "scale_pink", "plate_pink"] },
  { id: "vipertobikadachi", name: "Viper Tobi-Kadachi", prefix: "V.Tobi",
    stars: 5, element: "poison", color: "#ce93d8",
    isEvent: true, recipeGroup: "rare",
    commons: {"r1_1": "monster_bone_s", "r1_2": "parashroom", "r2_1": "monster_bone_m", "r3_1": "monster_bone_l", "r3_2": "monster_bone_plus"},
    exclusive: [{"weapon": "claw_orange", "armor": "scale_orange"}, "hide_orange", "wing_orange", "scale_orange", "body_orange", "body_orange"] },
  { id: "nightshade_paolumu", name: "Nightshade Paolumu", prefix: "N.Paolumu",
    stars: 5, element: "poison", color: "#ce93d8",
    isEvent: false, recipeGroup: "",
    commons: {"r1_1": "iron_ore", "r1_2": "sleep_herb", "r1_3": "monster_bone_s", "r1_4": "godbug", "r2_1": "machalite_ore", "r2_2": "monster_bone_m", "r3_1": "dragonite_ore", "r3_2": "earth_crystal", "r3_3": "monster_bone_plus", "r3_4": "monster_bone_l"},
    exclusive: [{"weapon": "scale_purple", "armor": "hide_purple"}, "wing_purple", "wing_purple", "scale_purple", "hide_purple"] },
  { id: "bazelgeuse", name: "Bazelgeuse", prefix: "Bazel.",
    stars: 5, element: "fire", color: "#ef5350",
    isEvent: true, recipeGroup: "rare",
    commons: {"r1_1": "iron_ore", "r1_2": "nitroshroom", "r2_1": "machalite_ore", "r3_1": "dragonite_ore", "r3_2": "earth_crystal"},
    exclusive: [{"weapon": "scale_silver", "armor": "shell_silver"}, "tail_silver", "claw_silver", "wing_silver", "body_red", "plate_silver"] },
  { id: "silver_rathalos", name: "Silver Rathalos", prefix: "S.Rathalos",
    stars: 6, element: "fire", color: "#ef5350",
    isEvent: true, recipeGroup: "rare",
    commons: {"r1_1": "iron_ore", "r1_2": "fire_herb", "r2_1": "machalite_ore", "r3_1": "dragonite_ore", "r3_2": "earth_crystal"},
    exclusive: [{"weapon": "scale_grey", "armor": "claw_grey"}, "tail_grey", "body_grey", "scale_grey", "claw_grey", "plate_grey"] },
  { id: "teostra", name: "Teostra", prefix: "Teostra",
    stars: 6, element: "fire", color: "#ef5350",
    isEvent: false, recipeGroup: "elder",
    commons: {"r4": "elder_dragon_blood"},
    exclusive: ["none", "none", {"weapon": "scale_red", "armor": "shell_red"}, "blood_red", "tail_red", "claw_red"] },
  { id: "namielle", name: "Namielle", prefix: "Namielle",
    stars: 6, element: "water", color: "#42a5f5",
    isEvent: false, recipeGroup: "elder",
    commons: {"r4": "elder_dragon_blood"},
    exclusive: ["none", "none", {"weapon": "claw_purple", "armor": "hide_purple"}, "blood_red", "tail_purple", "body_purple"] },
  { id: "kirin", name: "Kirin", prefix: "Kirin",
    stars: 6, element: "thunder", color: "#ffca28",
    isEvent: false, recipeGroup: "elder",
    commons: {"r4": "elder_dragon_blood"},
    exclusive: ["none", "none", {"weapon": "claw_blue", "armor": "hide_silver"}, "blood_red", "body_silver", "gem_blue"] },
  { id: "kushala_daora", name: "Kushala Daora", prefix: "Kushala",
    stars: 6, element: "ice", color: "#80deea",
    isEvent: false, recipeGroup: "elder",
    commons: {"r4": "elder_dragon_blood"},
    exclusive: ["none", "none", {"weapon": "scale_grey", "armor": "shell_grey"}, "blood_red", "tail_grey", "claw_grey"] },
  { id: "nergigante", name: "Nergigante", prefix: "Nergi.",
    stars: 6, element: "dragon", color: "#ab47bc",
    isEvent: false, recipeGroup: "elder",
    commons: {"r4": "elder_dragon_blood"},
    exclusive: ["none", "none", {"weapon": "scale_grey", "armor": "shell_grey"}, "blood_red", "tail_grey", "claw_grey"] },
  { id: "malzeno", name: "Malzeno", prefix: "Malzeno",
    stars: 6, element: "dragon", color: "#ab47bc",
    isEvent: false, recipeGroup: "elder",
    commons: {"r4": "elder_dragon_blood"},
    exclusive: ["none", "none", {"weapon": "scale_silver", "armor": "shell_silver"}, "blood_red", "tail_silver", "claw_silver"] },
  { id: "gold_rathian", name: "Gold Rathian", prefix: "G.Rathian",
    stars: 6, element: "fire", color: "#ef5350",
    isEvent: true, recipeGroup: "rare",
    commons: {"r1_1": "monster_bone_s", "r1_2": "toadstool", "r2_1": "monster_bone_m", "r3_1": "monster_bone_l", "r3_2": "monster_bone_plus"},
    exclusive: [{"weapon": "scale_yellow", "armor": "shell_yellow"}, "wing_yellow", "body_yellow", "scale_yellow", "wing_yellow", "plate_yellow"] },
  { id: "chameleos", name: "Chameleos", prefix: "Chameleos",
    stars: 6, element: "dragon", color: "#ab47bc",
    isEvent: false, recipeGroup: "elder",
    commons: {"r4": "elder_dragon_blood"},
    exclusive: ["none", "none", {"weapon": "bone_purole", "armor": "hide_purple"}, "blood_red", "tail_purple", "claw_purple"] }
];

MONSTERS.sort((a, b) => a.name.localeCompare(b.name));

// ─── Derived datasets (built once at load) ────────────────────────────────────

function buildWeapons() {
  const out = [];
  for (const m of MONSTERS) {
    const types = MONSTER_WEAPONS[m.id] || [];
    for (const typeId of types) {
      out.push({
        id: `${m.id}__${typeId}`,
        monsterId: m.id,
        type: typeId,
        name: `${m.prefix} ${WEAPON_DESCRIPTORS[typeId]}`,
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

const MONSTER_BY_ID = Object.fromEntries(MONSTERS.map(m => [m.id, m]));
const WEAPON_BY_ID  = Object.fromEntries(WEAPONS.map(w => [w.id, w]));
const ARMOR_BY_ID   = Object.fromEntries(ARMOR.map(a => [a.id, a]));

// ─── Skill data ───────────────────────────────────────────────────────────────
// Format: equipId → [{ id, thresholds: [[grade, level], ...] }]
// Grade is the actual grade number (e.g. 6), not a step count.
// Thresholds must be sorted ascending by grade.



const SKILL_NAMES = {
  'abnormal_status_enhancement': 'Status Sneak Attack',
  'airborne': 'Skyward Striker',
  'armor_up': 'Litheness',
  'artful_dodger': 'Artful Dodger',
  'artillery': 'Artillery',
  'attack_boost': 'Attack Boost',
  'attack_boost_secret': 'Advanced Attack Boost',
  'attack_up_critical_down': 'Raw Power',
  'auto_just_dodge': 'Perfectionist',
  'ballistic': 'Ballistics',
  'blast_attack': 'Blast Attack',
  'blast_resistance': 'Blast Resistance',
  'bleeding_resistance': 'Bleeding Resistance',
  'bloodblight_cloak': 'Blood Cloak',
  'bravery': 'Valor',
  'break_attack_boost': 'Pursuit',
  'brutal_strike': 'Critical Ferocity',
  'bubbly_dance': 'Bubbly Dance',
  'buildup_boost': 'Buildup Boost',
  'burst': 'Burst',
  'burst_dodger': 'Offensive Dodger',
  'burst_secret': 'Advanced Burst',
  'chameleos_poison': 'Chameleos Venomist',
  'charge_up': 'Blunt Force',
  'concentration': 'Concentration',
  'critical_boost': 'Critical Boost',
  'critical_element': 'Critical Element',
  'critical_eye': 'Critical Eye',
  'deathgaron': 'Bleeding Edge',
  'defense_boost': 'Defense Boost',
  'disable_perfect_evade': 'Reckless',
  'divine_blessing': 'Divine Blessing',
  'dragon_attack': 'Dragon Attack',
  'dragon_attack_boost_secret': 'Advanced Dragon Attack',
  'earplugs': 'Earplugs',
  'elder_dragon_resonance': 'Hunter's Unity',
  'ending_shot': 'Final Shot',
  'enhancement_normal_ammo': 'Normal/Element Ammo Boost',
  'enhancement_slicing_ammo': 'Slicing Ammo Boost',
  'evade_extender': 'Evade Extender',
  'evasive_reload': 'Evading Reload',
  'feat_of_agility': 'Quick Work',
  'fighting_spirit': 'Fighting Spirit',
  'fire_attack': 'Fire Attack',
  'fire_resistance': 'Fire Resistance',
  'firm_foothold': 'Firm Foothold',
  'focus': 'Focus',
  'fortify': 'Fortify',
  'guard': 'Guard',
  'guard_up': 'Guard Up',
  'guarding_reload': 'Defensive Loading',
  'guts': 'Guts',
  'health_boost': 'Health Boost',
  'hellfire_cloak': 'Hellfire Cloak',
  'heroics': 'Heroics',
  'high_performance_dragon': 'Vital Dragon',
  'high_performance_fire': 'Vital Fire',
  'high_performance_ice': 'Vital Ice',
  'high_performance_thunder': 'Vital Thunder',
  'high_performance_water': 'Vital Water',
  'ice_attack': 'Ice Attack',
  'ice_attack_boost_secret': 'Advanced Ice Attack',
  'ice_resistance': 'Ice Resistance',
  'kirin_robe': 'Kirin Flashstorm',
  'kushala_bless': 'Kushala Frostwind',
  'last_stand': 'Last Stand',
  'latent_power': 'Latent Power',
  'lock_on': 'Lock On',
  'malzeno_blood': 'Malzeno Crimsonblood',
  'morph_attack_boost': 'Morph Attack Boost',
  'morph_boost': 'Morph Boost',
  'move_forward_strengthen': 'Dauntless',
  'multi_attack_boost': 'Shared Sword',
  'multiplayer_boost': 'Shared Shield',
  'namielle_wave': 'Namielle Electrowave',
  'nergigante_greed': 'Nergigante Avidity',
  'offensive_guard': 'Offensive Guard',
  'paralysis_attack': 'Paralysis Attack',
  'paralysis_resistance': 'Paralysis Resistance',
  'part_break_special_boost': 'Special Partbreaker',
  'part_breaker_tail': 'Tail Partbreaker',
  'partbreaker': 'Partbreaker',
  'peak_performance': 'Peak Performance',
  'perfect_evade_attack_boost': 'Aggressive Dodger',
  'perfect_evade_sp_charge': 'Evasive Concentration',
  'poison_attack': 'Poison Attack',
  'poison_resistance': 'Poison Resistance',
  'power_burst': 'Combo Master',
  'power_prolonger': 'Power Prolonger',
  'powerhouse': 'Attack Efficacy',
  'powerhouse_critical': 'Critical Strength',
  'pursuit_paralysis': 'Paralysis Exploit',
  'pursuit_poison': 'Poison Exploit',
  'recoil_down': 'Recoil Down',
  'reload_speed': 'Reload Speed',
  'resentment': 'Resentment',
  'resuscitate': 'Resuscitate',
  'rising_tide': 'Rising Tide',
  'sleep_attack': 'Sleep Attack',
  'sleep_enhancement': 'Rude Awakener',
  'sleep_resistance': 'Sleep Resistance',
  'slugger': 'Slugger',
  'sneak_attack': 'Sneak Attack',
  'sp_insurance': 'Special Insurance',
  'sp_overdrive': 'Elemental Release',
  'spare_shot': 'Spare Shot',
  'special_boost': 'Special Boost',
  'teostra_bless': 'Teostra Blastpowder',
  'thunder_attack': 'Thunder Attack',
  'thunder_attack_boost_secret': 'Advanced Thunder Attack',
  'thunder_resistance': 'Thunder Resistance',
  'tremor_resistance': 'Tremor Resistance',
  'water_attack': 'Water Attack',
  'water_attack_boost_secret': 'Advanced Water Attack',
  'water_resistance': 'Water Resistance',
  'weakness_exploit': 'Weakness Exploit',
  'windproof': 'Windproof'
};

const GEAR_SKILLS = {
  'aknosom__arms': [
    { id: 'feat_of_agility', thresholds: [[3, 1]
    ] },
    { id: 'power_prolonger', thresholds: [[6, 1]
    ] }
  ],
  'aknosom__chest': [
    { id: 'guard', thresholds: [[6, 1]
    ] },
    { id: 'guarding_reload', thresholds: [[3, 1]
    ] }
  ],
  'aknosom__db': [
    { id: 'lock_on', thresholds: [[8, 1]
    ] }
  ],
  'aknosom__gl': [
    { id: 'lock_on', thresholds: [[8, 1]
    ] }
  ],
  'aknosom__gs': [
    { id: 'lock_on', thresholds: [[8, 1]
    ] }
  ],
  'aknosom__head': [
    { id: 'guarding_reload', thresholds: [[3, 1], [6, 2]
    ] }
  ],
  'aknosom__ig': [
    { id: 'lock_on', thresholds: [[8, 1]
    ] }
  ],
  'aknosom__legs': [
    { id: 'fire_attack', thresholds: [[3, 1], [6, 2]
    ] }
  ],
  'aknosom__lnc': [
    { id: 'lock_on', thresholds: [[8, 1]
    ] }
  ],
  'aknosom__ls': [
    { id: 'lock_on', thresholds: [[8, 1]
    ] }
  ],
  'aknosom__sa': [
    { id: 'lock_on', thresholds: [[8, 1]
    ] }
  ],
  'aknosom__waist': [
    { id: 'critical_eye', thresholds: [[3, 1]
    ] },
    { id: 'peak_performance', thresholds: [[6, 1]
    ] }
  ],
  'almudron__arms': [
    { id: 'artful_dodger', thresholds: [[6, 1]
    ] },
    { id: 'ballistic', thresholds: [[4, 1]
    ] }
  ],
  'almudron__bow': [
    { id: 'water_attack', thresholds: [[8, 1]
    ] }
  ],
  'almudron__chest': [
    { id: 'water_attack', thresholds: [[4, 1], [6, 2]
    ] },
    { id: 'water_attack_boost_secret', thresholds: [[4, 1]
    ] }
  ],
  'almudron__db': [
    { id: 'water_attack', thresholds: [[8, 1]
    ] }
  ],
  'almudron__gl': [
    { id: 'water_attack', thresholds: [[8, 1]
    ] }
  ],
  'almudron__head': [
    { id: 'sneak_attack', thresholds: [[6, 1]
    ] },
    { id: 'water_attack', thresholds: [[4, 1]
    ] },
    { id: 'water_attack_boost_secret', thresholds: [[4, 1]
    ] }
  ],
  'almudron__hmr': [
    { id: 'water_attack', thresholds: [[8, 1]
    ] }
  ],
  'almudron__lbg': [
    { id: 'water_attack', thresholds: [[8, 1]
    ] }
  ],
  'almudron__legs': [
    { id: 'feat_of_agility', thresholds: [[4, 1], [8, 2]
    ] },
    { id: 'lock_on', thresholds: [[6, 1]
    ] }
  ],
  'almudron__ls': [
    { id: 'water_attack', thresholds: [[8, 1]
    ] }
  ],
  'almudron__sa': [
    { id: 'water_attack', thresholds: [[8, 1]
    ] }
  ],
  'almudron__waist': [
    { id: 'reload_speed', thresholds: [[4, 1]
    ] },
    { id: 'spare_shot', thresholds: [[6, 1]
    ] },
    { id: 'water_attack_boost_secret', thresholds: [[4, 1]
    ] }
  ],
  'anjanath__arms': [
    { id: 'fire_attack', thresholds: [[4, 1], [6, 2]
    ] }
  ],
  'anjanath__bow': [
    { id: 'rising_tide', thresholds: [[8, 1]
    ] }
  ],
  'anjanath__chest': [
    { id: 'special_boost', thresholds: [[4, 1], [6, 2]
    ] }
  ],
  'anjanath__db': [
    { id: 'rising_tide', thresholds: [[8, 1]
    ] }
  ],
  'anjanath__gl': [
    { id: 'rising_tide', thresholds: [[8, 1]
    ] }
  ],
  'anjanath__gs': [
    { id: 'rising_tide', thresholds: [[8, 1]
    ] }
  ],
  'anjanath__hbg': [
    { id: 'rising_tide', thresholds: [[8, 1]
    ] }
  ],
  'anjanath__head': [
    { id: 'fire_attack', thresholds: [[4, 2]
    ] },
    { id: 'fire_resistance', thresholds: [[6, 1]
    ] }
  ],
  'anjanath__hh': [
    { id: 'rising_tide', thresholds: [[8, 1]
    ] }
  ],
  'anjanath__hmr': [
    { id: 'rising_tide', thresholds: [[8, 1]
    ] }
  ],
  'anjanath__ig': [
    { id: 'rising_tide', thresholds: [[8, 1]
    ] }
  ],
  'anjanath__lbg': [
    { id: 'rising_tide', thresholds: [[8, 1]
    ] }
  ],
  'anjanath__legs': [
    { id: 'peak_performance', thresholds: [[4, 1], [6, 2]
    ] }
  ],
  'anjanath__ls': [
    { id: 'rising_tide', thresholds: [[8, 1]
    ] }
  ],
  'anjanath__sa': [
    { id: 'rising_tide', thresholds: [[8, 1]
    ] }
  ],
  'anjanath__sns': [
    { id: 'rising_tide', thresholds: [[8, 1]
    ] }
  ],
  'anjanath__waist': [
    { id: 'fire_resistance', thresholds: [[4, 1]
    ] },
    { id: 'special_boost', thresholds: [[6, 1]
    ] }
  ],
  'arzuros__arms': [
    { id: 'concentration', thresholds: [[4, 1]
    ] },
    { id: 'focus', thresholds: [[2, 1], [6, 2]
    ] }
  ],
  'arzuros__bow': [
    { id: 'special_boost', thresholds: [[4, 1], [8, 2]
    ] }
  ],
  'arzuros__chest': [
    { id: 'multi_attack_boost', thresholds: [[2, 1], [4, 2], [6, 3]
    ] }
  ],
  'arzuros__db': [
    { id: 'special_boost', thresholds: [[4, 1], [8, 2]
    ] }
  ],
  'arzuros__hbg': [
    { id: 'special_boost', thresholds: [[4, 1], [8, 2]
    ] }
  ],
  'arzuros__head': [
    { id: 'multi_attack_boost', thresholds: [[2, 1]
    ] },
    { id: 'multiplayer_boost', thresholds: [[4, 1]
    ] }
  ],
  'arzuros__hh': [
    { id: 'special_boost', thresholds: [[4, 1], [8, 2]
    ] }
  ],
  'arzuros__hmr': [
    { id: 'special_boost', thresholds: [[4, 1], [8, 2]
    ] }
  ],
  'arzuros__legs': [
    { id: 'brutal_strike', thresholds: [[2, 1]
    ] },
    { id: 'special_boost', thresholds: [[6, 1]
    ] }
  ],
  'arzuros__ls': [
    { id: 'special_boost', thresholds: [[4, 1], [8, 2]
    ] }
  ],
  'arzuros__sa': [
    { id: 'special_boost', thresholds: [[4, 1], [8, 2]
    ] }
  ],
  'arzuros__waist': [
    { id: 'morph_boost', thresholds: [[2, 1], [6, 2]
    ] }
  ],
  'astalos__arms': [
    { id: 'auto_just_dodge', thresholds: [[6, 1]
    ] },
    { id: 'burst_dodger', thresholds: [[8, 1]
    ] },
    { id: 'thunder_attack_boost_secret', thresholds: [[5, 1]
    ] }
  ],
  'astalos__bow': [
    { id: 'thunder_attack', thresholds: [[5, 1]
    ] }
  ],
  'astalos__cb': [
    { id: 'thunder_attack', thresholds: [[5, 1]
    ] }
  ],
  'astalos__chest': [
    { id: 'auto_just_dodge', thresholds: [[6, 1], [8, 2]
    ] },
    { id: 'thunder_attack_boost_secret', thresholds: [[5, 1]
    ] }
  ],
  'astalos__db': [
    { id: 'thunder_attack', thresholds: [[5, 1]
    ] }
  ],
  'astalos__gl': [
    { id: 'thunder_attack', thresholds: [[5, 1]
    ] }
  ],
  'astalos__gs': [
    { id: 'thunder_attack', thresholds: [[5, 1]
    ] }
  ],
  'astalos__hbg': [
    { id: 'thunder_attack', thresholds: [[5, 1]
    ] }
  ],
  'astalos__head': [
    { id: 'reload_speed', thresholds: [[6, 1]
    ] },
    { id: 'thunder_attack', thresholds: [[8, 1]
    ] },
    { id: 'thunder_attack_boost_secret', thresholds: [[5, 1]
    ] }
  ],
  'astalos__hh': [
    { id: 'thunder_attack', thresholds: [[5, 1]
    ] }
  ],
  'astalos__hmr': [
    { id: 'thunder_attack', thresholds: [[5, 1]
    ] }
  ],
  'astalos__ig': [
    { id: 'thunder_attack', thresholds: [[5, 1]
    ] }
  ],
  'astalos__lbg': [
    { id: 'thunder_attack', thresholds: [[5, 1]
    ] }
  ],
  'astalos__legs': [
    { id: 'thunder_attack', thresholds: [[6, 1], [8, 2]
    ] },
    { id: 'thunder_attack_boost_secret', thresholds: [[5, 1]
    ] }
  ],
  'astalos__lnc': [
    { id: 'thunder_attack', thresholds: [[5, 1]
    ] }
  ],
  'astalos__ls': [
    { id: 'thunder_attack', thresholds: [[5, 1]
    ] }
  ],
  'astalos__sa': [
    { id: 'thunder_attack', thresholds: [[5, 1]
    ] }
  ],
  'astalos__sns': [
    { id: 'thunder_attack', thresholds: [[5, 1]
    ] }
  ],
  'astalos__waist': [
    { id: 'critical_element', thresholds: [[6, 1]
    ] },
    { id: 'critical_eye', thresholds: [[8, 1]
    ] },
    { id: 'thunder_attack_boost_secret', thresholds: [[5, 1]
    ] }
  ],
  'azure_rathalos__arms': [
    { id: 'critical_boost', thresholds: [[5, 1], [6, 2]
    ] }
  ],
  'azure_rathalos__bow': [
    { id: 'special_boost', thresholds: [[8, 1]
    ] }
  ],
  'azure_rathalos__cb': [
    { id: 'special_boost', thresholds: [[8, 1]
    ] }
  ],
  'azure_rathalos__chest': [
    { id: 'earplugs', thresholds: [[5, 1], [6, 2]
    ] },
    { id: 'fire_attack', thresholds: [[5, 1]
    ] }
  ],
  'azure_rathalos__gl': [
    { id: 'special_boost', thresholds: [[8, 1]
    ] }
  ],
  'azure_rathalos__gs': [
    { id: 'special_boost', thresholds: [[8, 1]
    ] }
  ],
  'azure_rathalos__head': [
    { id: 'focus', thresholds: [[5, 1], [6, 2]
    ] }
  ],
  'azure_rathalos__ig': [
    { id: 'special_boost', thresholds: [[8, 1]
    ] }
  ],
  'azure_rathalos__lbg': [
    { id: 'special_boost', thresholds: [[8, 1]
    ] }
  ],
  'azure_rathalos__legs': [
    { id: 'fire_attack', thresholds: [[6, 1]
    ] },
    { id: 'reload_speed', thresholds: [[5, 2]
    ] }
  ],
  'azure_rathalos__lnc': [
    { id: 'special_boost', thresholds: [[8, 1]
    ] }
  ],
  'azure_rathalos__ls': [
    { id: 'special_boost', thresholds: [[8, 1]
    ] }
  ],
  'azure_rathalos__sa': [
    { id: 'special_boost', thresholds: [[8, 1]
    ] }
  ],
  'azure_rathalos__sns': [
    { id: 'special_boost', thresholds: [[8, 1]
    ] }
  ],
  'azure_rathalos__waist': [
    { id: 'critical_boost', thresholds: [[6, 1]
    ] },
    { id: 'special_boost', thresholds: [[5, 1]
    ] }
  ],
  'banbaro__arms': [
    { id: 'offensive_guard', thresholds: [[3, 1], [6, 2]
    ] },
    { id: 'tremor_resistance', thresholds: [[4, 1]
    ] }
  ],
  'banbaro__bow': [
    { id: 'firm_foothold', thresholds: [[4, 1], [8, 2]
    ] }
  ],
  'banbaro__chest': [
    { id: 'concentration', thresholds: [[3, 1]
    ] },
    { id: 'partbreaker', thresholds: [[6, 1]
    ] }
  ],
  'banbaro__db': [
    { id: 'firm_foothold', thresholds: [[4, 1], [8, 2]
    ] }
  ],
  'banbaro__gl': [
    { id: 'firm_foothold', thresholds: [[4, 1], [8, 2]
    ] }
  ],
  'banbaro__gs': [
    { id: 'firm_foothold', thresholds: [[4, 1], [8, 2]
    ] }
  ],
  'banbaro__head': [
    { id: 'recoil_down', thresholds: [[4, 1]
    ] },
    { id: 'tremor_resistance', thresholds: [[3, 1]
    ] }
  ],
  'banbaro__hmr': [
    { id: 'firm_foothold', thresholds: [[4, 1], [8, 2]
    ] }
  ],
  'banbaro__lbg': [
    { id: 'firm_foothold', thresholds: [[4, 1], [8, 2]
    ] }
  ],
  'banbaro__legs': [
    { id: 'concentration', thresholds: [[6, 1]
    ] },
    { id: 'divine_blessing', thresholds: [[3, 1]
    ] }
  ],
  'banbaro__ls': [
    { id: 'firm_foothold', thresholds: [[4, 1], [8, 2]
    ] }
  ],
  'banbaro__sa': [
    { id: 'firm_foothold', thresholds: [[4, 1], [8, 2]
    ] }
  ],
  'banbaro__waist': [
    { id: 'attack_boost', thresholds: [[3, 1], [6, 2]
    ] },
    { id: 'firm_foothold', thresholds: [[4, 1]
    ] }
  ],
  'barioth__arms': [
    { id: 'ice_attack', thresholds: [[4, 1], [6, 2]
    ] }
  ],
  'barioth__bow': [
    { id: 'evade_extender', thresholds: [[8, 1]
    ] }
  ],
  'barioth__cb': [
    { id: 'evade_extender', thresholds: [[8, 1]
    ] }
  ],
  'barioth__chest': [
    { id: 'ice_attack', thresholds: [[6, 1]
    ] },
    { id: 'ice_resistance', thresholds: [[4, 1]
    ] }
  ],
  'barioth__db': [
    { id: 'evade_extender', thresholds: [[8, 1]
    ] }
  ],
  'barioth__gl': [
    { id: 'evade_extender', thresholds: [[8, 1]
    ] }
  ],
  'barioth__gs': [
    { id: 'evade_extender', thresholds: [[8, 1]
    ] }
  ],
  'barioth__hbg': [
    { id: 'evade_extender', thresholds: [[8, 1]
    ] }
  ],
  'barioth__head': [
    { id: 'airborne', thresholds: [[4, 1], [6, 2]
    ] },
    { id: 'evade_extender', thresholds: [[4, 1]
    ] }
  ],
  'barioth__hh': [
    { id: 'evade_extender', thresholds: [[8, 1]
    ] }
  ],
  'barioth__hmr': [
    { id: 'evade_extender', thresholds: [[8, 1]
    ] }
  ],
  'barioth__ig': [
    { id: 'evade_extender', thresholds: [[8, 1]
    ] }
  ],
  'barioth__lbg': [
    { id: 'evade_extender', thresholds: [[8, 1]
    ] }
  ],
  'barioth__legs': [
    { id: 'evade_extender', thresholds: [[6, 1]
    ] },
    { id: 'sneak_attack', thresholds: [[4, 1]
    ] }
  ],
  'barioth__lnc': [
    { id: 'evade_extender', thresholds: [[8, 1]
    ] }
  ],
  'barioth__ls': [
    { id: 'evade_extender', thresholds: [[8, 1]
    ] }
  ],
  'barioth__sa': [
    { id: 'evade_extender', thresholds: [[8, 1]
    ] }
  ],
  'barioth__sns': [
    { id: 'evade_extender', thresholds: [[8, 1]
    ] }
  ],
  'barioth__waist': [
    { id: 'airborne', thresholds: [[4, 1]
    ] },
    { id: 'ice_resistance', thresholds: [[6, 1]
    ] }
  ],
  'barroth__arms': [
    { id: 'guard', thresholds: [[2, 1], [6, 2]
    ] }
  ],
  'barroth__chest': [
    { id: 'offensive_guard', thresholds: [[2, 1], [6, 2]
    ] }
  ],
  'barroth__gl': [
    { id: 'defense_boost', thresholds: [[4, 1], [8, 2]
    ] }
  ],
  'barroth__gs': [
    { id: 'defense_boost', thresholds: [[4, 1], [8, 2]
    ] }
  ],
  'barroth__head': [
    { id: 'defense_boost', thresholds: [[2, 1]
    ] },
    { id: 'offensive_guard', thresholds: [[4, 1]
    ] }
  ],
  'barroth__hh': [
    { id: 'defense_boost', thresholds: [[4, 1], [8, 2]
    ] }
  ],
  'barroth__hmr': [
    { id: 'defense_boost', thresholds: [[4, 1], [8, 2]
    ] }
  ],
  'barroth__lbg': [
    { id: 'defense_boost', thresholds: [[4, 1], [8, 2]
    ] }
  ],
  'barroth__legs': [
    { id: 'defense_boost', thresholds: [[4, 1], [6, 2]
    ] },
    { id: 'recoil_down', thresholds: [[2, 1]
    ] }
  ],
  'barroth__lnc': [
    { id: 'defense_boost', thresholds: [[4, 1], [8, 2]
    ] }
  ],
  'barroth__sa': [
    { id: 'defense_boost', thresholds: [[4, 1], [8, 2]
    ] }
  ],
  'barroth__sns': [
    { id: 'defense_boost', thresholds: [[4, 1], [8, 2]
    ] }
  ],
  'barroth__waist': [
    { id: 'defense_boost', thresholds: [[2, 1]
    ] },
    { id: 'guard', thresholds: [[4, 1]
    ] }
  ],
  'basarios__arms': [
    { id: 'recoil_down', thresholds: [[2, 1], [6, 2]
    ] }
  ],
  'basarios__cb': [
    { id: 'heroics', thresholds: [[8, 1]
    ] }
  ],
  'basarios__chest': [
    { id: 'artillery', thresholds: [[2, 1], [6, 2]
    ] }
  ],
  'basarios__hbg': [
    { id: 'heroics', thresholds: [[8, 1]
    ] }
  ],
  'basarios__head': [
    { id: 'sleep_resistance', thresholds: [[2, 1], [4, 2]
    ] }
  ],
  'basarios__hh': [
    { id: 'heroics', thresholds: [[8, 1]
    ] }
  ],
  'basarios__hmr': [
    { id: 'heroics', thresholds: [[8, 1]
    ] }
  ],
  'basarios__lbg': [
    { id: 'heroics', thresholds: [[8, 1]
    ] }
  ],
  'basarios__legs': [
    { id: 'artillery', thresholds: [[2, 1]
    ] },
    { id: 'guard', thresholds: [[4, 1]
    ] }
  ],
  'basarios__lnc': [
    { id: 'heroics', thresholds: [[8, 1]
    ] }
  ],
  'basarios__ls': [
    { id: 'heroics', thresholds: [[8, 1]
    ] }
  ],
  'basarios__waist': [
    { id: 'fire_attack', thresholds: [[2, 1], [6, 2]
    ] }
  ],
  'bazelgeuse__arms': [
    { id: 'brutal_strike', thresholds: [[5, 1], [6, 2]
    ] }
  ],
  'bazelgeuse__chest': [
    { id: 'bravery', thresholds: [[5, 1], [6, 2], [8, 3]
    ] }
  ],
  'bazelgeuse__db': [
    { id: 'brutal_strike', thresholds: [[8, 1]
    ] }
  ],
  'bazelgeuse__gl': [
    { id: 'artillery', thresholds: [[8, 1]
    ] }
  ],
  'bazelgeuse__head': [
    { id: 'artillery', thresholds: [[8, 1]
    ] },
    { id: 'reload_speed', thresholds: [[5, 1], [6, 2]
    ] }
  ],
  'bazelgeuse__hh': [
    { id: 'partbreaker', thresholds: [[8, 1]
    ] }
  ],
  'bazelgeuse__lbg': [
    { id: 'evasive_reload', thresholds: [[8, 2]
    ] }
  ],
  'bazelgeuse__legs': [
    { id: 'blast_attack', thresholds: [[6, 1]
    ] },
    { id: 'bravery', thresholds: [[5, 1], [8, 2]
    ] }
  ],
  'bazelgeuse__lnc': [
    { id: 'offensive_guard', thresholds: [[8, 2]
    ] }
  ],
  'bazelgeuse__ls': [
    { id: 'feat_of_agility', thresholds: [[8, 1]
    ] }
  ],
  'bazelgeuse__sa': [
    { id: 'burst', thresholds: [[8, 2]
    ] }
  ],
  'bazelgeuse__waist': [
    { id: 'artillery', thresholds: [[5, 1], [6, 2]
    ] }
  ],
  'beotodus__arms': [
    { id: 'focus', thresholds: [[4, 1], [6, 2]
    ] },
    { id: 'lock_on', thresholds: [[4, 1]
    ] }
  ],
  'beotodus__cb': [
    { id: 'bravery', thresholds: [[8, 1]
    ] }
  ],
  'beotodus__chest': [
    { id: 'charge_up', thresholds: [[4, 1]
    ] },
    { id: 'slugger', thresholds: [[6, 2]
    ] }
  ],
  'beotodus__db': [
    { id: 'bravery', thresholds: [[8, 1]
    ] }
  ],
  'beotodus__gs': [
    { id: 'bravery', thresholds: [[8, 1]
    ] }
  ],
  'beotodus__head': [
    { id: 'peak_performance', thresholds: [[4, 2], [6, 3]
    ] }
  ],
  'beotodus__ig': [
    { id: 'bravery', thresholds: [[8, 1]
    ] }
  ],
  'beotodus__lbg': [
    { id: 'bravery', thresholds: [[8, 1]
    ] }
  ],
  'beotodus__legs': [
    { id: 'charge_up', thresholds: [[4, 1], [6, 2]
    ] }
  ],
  'beotodus__waist': [
    { id: 'guarding_reload', thresholds: [[4, 1], [6, 2]
    ] },
    { id: 'ice_attack', thresholds: [[8, 1]
    ] }
  ],
  'bishaten__arms': [
    { id: 'airborne', thresholds: [[4, 1]
    ] },
    { id: 'slugger', thresholds: [[3, 1], [6, 2]
    ] }
  ],
  'bishaten__bow': [
    { id: 'multi_attack_boost', thresholds: [[4, 1], [8, 2]
    ] }
  ],
  'bishaten__chest': [
    { id: 'burst', thresholds: [[4, 1], [6, 2]
    ] },
    { id: 'reload_speed', thresholds: [[3, 1]
    ] }
  ],
  'bishaten__hbg': [
    { id: 'multi_attack_boost', thresholds: [[4, 1], [8, 2]
    ] }
  ],
  'bishaten__head': [
    { id: 'pursuit_paralysis', thresholds: [[3, 1], [6, 2]
    ] }
  ],
  'bishaten__hmr': [
    { id: 'multi_attack_boost', thresholds: [[4, 1], [8, 2]
    ] }
  ],
  'bishaten__lbg': [
    { id: 'multi_attack_boost', thresholds: [[4, 1], [8, 2]
    ] }
  ],
  'bishaten__legs': [
    { id: 'feat_of_agility', thresholds: [[3, 1]
    ] },
    { id: 'focus', thresholds: [[6, 2]
    ] }
  ],
  'bishaten__sa': [
    { id: 'multi_attack_boost', thresholds: [[4, 1], [8, 2]
    ] }
  ],
  'bishaten__sns': [
    { id: 'multi_attack_boost', thresholds: [[4, 1], [8, 2]
    ] }
  ],
  'bishaten__waist': [
    { id: 'multi_attack_boost', thresholds: [[4, 1], [6, 2]
    ] },
    { id: 'pursuit_paralysis', thresholds: [[3, 1]
    ] }
  ],
  'black_diablos__arms': [
    { id: 'focus', thresholds: [[6, 1]
    ] },
    { id: 'resentment', thresholds: [[5, 1]
    ] }
  ],
  'black_diablos__bow': [
    { id: 'partbreaker', thresholds: [[8, 1]
    ] }
  ],
  'black_diablos__cb': [
    { id: 'partbreaker', thresholds: [[8, 1]
    ] }
  ],
  'black_diablos__chest': [
    { id: 'firm_foothold', thresholds: [[6, 1]
    ] },
    { id: 'resentment', thresholds: [[5, 2]
    ] }
  ],
  'black_diablos__db': [
    { id: 'partbreaker', thresholds: [[8, 1]
    ] }
  ],
  'black_diablos__hbg': [
    { id: 'partbreaker', thresholds: [[8, 1]
    ] }
  ],
  'black_diablos__head': [
    { id: 'partbreaker', thresholds: [[5, 2]
    ] },
    { id: 'resentment', thresholds: [[6, 1]
    ] }
  ],
  'black_diablos__hmr': [
    { id: 'partbreaker', thresholds: [[8, 1]
    ] }
  ],
  'black_diablos__ig': [
    { id: 'partbreaker', thresholds: [[8, 1]
    ] }
  ],
  'black_diablos__legs': [
    { id: 'heroics', thresholds: [[5, 1]
    ] },
    { id: 'offensive_guard', thresholds: [[6, 1]
    ] }
  ],
  'black_diablos__sa': [
    { id: 'partbreaker', thresholds: [[8, 1]
    ] }
  ],
  'black_diablos__waist': [
    { id: 'heroics', thresholds: [[6, 1]
    ] },
    { id: 'lock_on', thresholds: [[5, 1]
    ] }
  ],
  'brute_tigrex__arms': [
    { id: 'attack_boost_secret', thresholds: [[5, 1]
    ] },
    { id: 'recoil_down', thresholds: [[8, 1]
    ] },
    { id: 'reload_speed', thresholds: [[6, 1]
    ] }
  ],
  'brute_tigrex__bow': [
    { id: 'ballistic', thresholds: [[5, 1], [6, 2], [8, 3]
    ] }
  ],
  'brute_tigrex__cb': [
    { id: 'evasive_reload', thresholds: [[5, 1], [6, 2], [8, 3], [10, 5]
    ] }
  ],
  'brute_tigrex__chest': [
    { id: 'attack_boost', thresholds: [[8, 1]
    ] },
    { id: 'attack_boost_secret', thresholds: [[5, 1]
    ] },
    { id: 'lock_on', thresholds: [[6, 1]
    ] }
  ],
  'brute_tigrex__db': [
    { id: 'power_prolonger', thresholds: [[5, 1], [6, 2], [8, 3]
    ] }
  ],
  'brute_tigrex__gl': [
    { id: 'perfect_evade_attack_boost', thresholds: [[5, 1], [6, 2], [8, 3], [10, 5]
    ] }
  ],
  'brute_tigrex__gs': [
    { id: 'armor_up', thresholds: [[5, 1], [6, 2], [8, 3]
    ] }
  ],
  'brute_tigrex__hbg': [
    { id: 'guarding_reload', thresholds: [[5, 1], [6, 2], [8, 3]
    ] }
  ],
  'brute_tigrex__head': [
    { id: 'attack_boost_secret', thresholds: [[5, 1]
    ] },
    { id: 'disable_perfect_evade', thresholds: [[6, 1], [8, 2]
    ] }
  ],
  'brute_tigrex__hh': [
    { id: 'power_prolonger', thresholds: [[5, 1], [6, 2], [8, 3]
    ] }
  ],
  'brute_tigrex__ig': [
    { id: 'power_prolonger', thresholds: [[5, 1], [6, 2], [8, 3]
    ] }
  ],
  'brute_tigrex__lbg': [
    { id: 'ballistic', thresholds: [[5, 1], [6, 2], [8, 3]
    ] }
  ],
  'brute_tigrex__legs': [
    { id: 'attack_boost_secret', thresholds: [[5, 1]
    ] },
    { id: 'burst_dodger', thresholds: [[6, 1], [8, 2]
    ] }
  ],
  'brute_tigrex__lnc': [
    { id: 'move_forward_strengthen', thresholds: [[5, 1], [6, 2], [8, 3], [10, 5]
    ] }
  ],
  'brute_tigrex__ls': [
    { id: 'feat_of_agility', thresholds: [[5, 1], [6, 2], [8, 3]
    ] }
  ],
  'brute_tigrex__sa': [
    { id: 'armor_up', thresholds: [[5, 1], [6, 2], [8, 3]
    ] }
  ],
  'brute_tigrex__sns': [
    { id: 'perfect_evade_attack_boost', thresholds: [[5, 1], [6, 2], [8, 3], [10, 5]
    ] }
  ],
  'brute_tigrex__waist': [
    { id: 'attack_boost', thresholds: [[6, 1], [8, 2]
    ] },
    { id: 'attack_boost_secret', thresholds: [[5, 1]
    ] }
  ],
  'chameleos__arms': [
    { id: 'bravery', thresholds: [[6, 1], [8, 2]
    ] },
    { id: 'chameleos_poison', thresholds: [[6, 1]
    ] }
  ],
  'chameleos__bow': [
    { id: 'abnormal_status_enhancement', thresholds: [[8, 2]
    ] },
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] }
  ],
  'chameleos__cb': [
    { id: 'abnormal_status_enhancement', thresholds: [[8, 2]
    ] },
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] }
  ],
  'chameleos__chest': [
    { id: 'chameleos_poison', thresholds: [[6, 1]
    ] },
    { id: 'focus', thresholds: [[6, 1], [8, 2]
    ] }
  ],
  'chameleos__db': [
    { id: 'abnormal_status_enhancement', thresholds: [[8, 2]
    ] },
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] }
  ],
  'chameleos__gl': [
    { id: 'abnormal_status_enhancement', thresholds: [[8, 2]
    ] },
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] }
  ],
  'chameleos__gs': [
    { id: 'abnormal_status_enhancement', thresholds: [[8, 2]
    ] },
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] }
  ],
  'chameleos__hbg': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'sneak_attack', thresholds: [[8, 2]
    ] }
  ],
  'chameleos__head': [
    { id: 'abnormal_status_enhancement', thresholds: [[8, 1]
    ] },
    { id: 'chameleos_poison', thresholds: [[6, 1]
    ] },
    { id: 'pursuit_poison', thresholds: [[6, 1]
    ] }
  ],
  'chameleos__hh': [
    { id: 'abnormal_status_enhancement', thresholds: [[8, 2]
    ] },
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] }
  ],
  'chameleos__hmr': [
    { id: 'abnormal_status_enhancement', thresholds: [[8, 2]
    ] },
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] }
  ],
  'chameleos__ig': [
    { id: 'abnormal_status_enhancement', thresholds: [[8, 2]
    ] },
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] }
  ],
  'chameleos__lbg': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'sneak_attack', thresholds: [[8, 2]
    ] }
  ],
  'chameleos__legs': [
    { id: 'chameleos_poison', thresholds: [[6, 1]
    ] },
    { id: 'guard', thresholds: [[8, 1]
    ] },
    { id: 'offensive_guard', thresholds: [[6, 1]
    ] }
  ],
  'chameleos__ls': [
    { id: 'abnormal_status_enhancement', thresholds: [[8, 2]
    ] },
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] }
  ],
  'chameleos__sa': [
    { id: 'abnormal_status_enhancement', thresholds: [[8, 2]
    ] },
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] }
  ],
  'chameleos__waist': [
    { id: 'chameleos_poison', thresholds: [[6, 1]
    ] },
    { id: 'pursuit_poison', thresholds: [[6, 1], [8, 2]
    ] }
  ],
  'chatacabra__arms': [
    { id: 'armor_up', thresholds: [[2, 1], [4, 2]
    ] }
  ],
  'chatacabra__cb': [
    { id: 'armor_up', thresholds: [[4, 1]
    ] }
  ],
  'chatacabra__chest': [
    { id: 'armor_up', thresholds: [[2, 1]
    ] },
    { id: 'firm_foothold', thresholds: [[4, 1], [6, 2]
    ] }
  ],
  'chatacabra__hbg': [
    { id: 'armor_up', thresholds: [[4, 1]
    ] }
  ],
  'chatacabra__head': [
    { id: 'armor_up', thresholds: [[2, 1]
    ] },
    { id: 'sneak_attack', thresholds: [[4, 1], [6, 2]
    ] }
  ],
  'chatacabra__hmr': [
    { id: 'armor_up', thresholds: [[4, 1]
    ] }
  ],
  'chatacabra__ig': [
    { id: 'armor_up', thresholds: [[4, 1]
    ] }
  ],
  'chatacabra__legs': [
    { id: 'armor_up', thresholds: [[2, 1]
    ] },
    { id: 'evasive_reload', thresholds: [[4, 1], [6, 2]
    ] }
  ],
  'chatacabra__sns': [
    { id: 'armor_up', thresholds: [[4, 1]
    ] }
  ],
  'chatacabra__waist': [
    { id: 'armor_up', thresholds: [[2, 1]
    ] },
    { id: 'resentment', thresholds: [[4, 1], [6, 2]
    ] }
  ],
  'coral_pukei_pukei__arms': [
    { id: 'airborne', thresholds: [[6, 1]
    ] },
    { id: 'rising_tide', thresholds: [[5, 1]
    ] }
  ],
  'coral_pukei_pukei__bow': [
    { id: 'earplugs', thresholds: [[8, 1]
    ] }
  ],
  'coral_pukei_pukei__chest': [
    { id: 'power_prolonger', thresholds: [[5, 1], [6, 2]
    ] },
    { id: 'rising_tide', thresholds: [[8, 1]
    ] }
  ],
  'coral_pukei_pukei__gs': [
    { id: 'earplugs', thresholds: [[8, 1]
    ] }
  ],
  'coral_pukei_pukei__hbg': [
    { id: 'earplugs', thresholds: [[8, 1]
    ] }
  ],
  'coral_pukei_pukei__head': [
    { id: 'lock_on', thresholds: [[6, 1]
    ] },
    { id: 'weakness_exploit', thresholds: [[5, 1], [8, 2]
    ] }
  ],
  'coral_pukei_pukei__hh': [
    { id: 'earplugs', thresholds: [[8, 1]
    ] }
  ],
  'coral_pukei_pukei__hmr': [
    { id: 'earplugs', thresholds: [[8, 1]
    ] }
  ],
  'coral_pukei_pukei__ig': [
    { id: 'earplugs', thresholds: [[8, 1]
    ] }
  ],
  'coral_pukei_pukei__lbg': [
    { id: 'earplugs', thresholds: [[8, 1]
    ] }
  ],
  'coral_pukei_pukei__legs': [
    { id: 'power_prolonger', thresholds: [[5, 1]
    ] },
    { id: 'weakness_exploit', thresholds: [[6, 1]
    ] }
  ],
  'coral_pukei_pukei__lnc': [
    { id: 'earplugs', thresholds: [[8, 1]
    ] }
  ],
  'coral_pukei_pukei__sa': [
    { id: 'earplugs', thresholds: [[8, 1]
    ] }
  ],
  'coral_pukei_pukei__sns': [
    { id: 'earplugs', thresholds: [[8, 1]
    ] }
  ],
  'coral_pukei_pukei__waist': [
    { id: 'recoil_down', thresholds: [[6, 1]
    ] },
    { id: 'reload_speed', thresholds: [[5, 1]
    ] }
  ],
  'deviljho__arms': [
    { id: 'dragon_attack', thresholds: [[5, 1]
    ] },
    { id: 'peak_performance', thresholds: [[5, 1], [6, 2]
    ] }
  ],
  'deviljho__bow': [
    { id: 'peak_performance', thresholds: [[8, 2]
    ] }
  ],
  'deviljho__cb': [
    { id: 'latent_power', thresholds: [[8, 1]
    ] }
  ],
  'deviljho__chest': [
    { id: 'latent_power', thresholds: [[5, 1], [6, 2]
    ] }
  ],
  'deviljho__db': [
    { id: 'burst', thresholds: [[8, 2]
    ] }
  ],
  'deviljho__gl': [
    { id: 'artillery', thresholds: [[8, 1]
    ] }
  ],
  'deviljho__gs': [
    { id: 'focus', thresholds: [[8, 1]
    ] }
  ],
  'deviljho__hbg': [
    { id: 'guarding_reload', thresholds: [[8, 1]
    ] }
  ],
  'deviljho__head': [
    { id: 'dragon_attack', thresholds: [[5, 1]
    ] },
    { id: 'slugger', thresholds: [[5, 1], [6, 2]
    ] }
  ],
  'deviljho__hh': [
    { id: 'power_prolonger', thresholds: [[8, 1]
    ] }
  ],
  'deviljho__hmr': [
    { id: 'slugger', thresholds: [[8, 1]
    ] }
  ],
  'deviljho__ig': [
    { id: 'move_forward_strengthen', thresholds: [[8, 2]
    ] }
  ],
  'deviljho__lbg': [
    { id: 'rising_tide', thresholds: [[8, 2]
    ] }
  ],
  'deviljho__legs': [
    { id: 'guts', thresholds: [[5, 1], [6, 2]
    ] },
    { id: 'latent_power', thresholds: [[5, 1]
    ] }
  ],
  'deviljho__lnc': [
    { id: 'offensive_guard', thresholds: [[8, 2]
    ] }
  ],
  'deviljho__ls': [
    { id: 'feat_of_agility', thresholds: [[8, 1]
    ] }
  ],
  'deviljho__sa': [
    { id: 'morph_boost', thresholds: [[8, 1]
    ] }
  ],
  'deviljho__sns': [
    { id: 'airborne', thresholds: [[8, 2]
    ] }
  ],
  'deviljho__waist': [
    { id: 'dragon_attack', thresholds: [[5, 1], [6, 2]
    ] },
    { id: 'tremor_resistance', thresholds: [[5, 1]
    ] }
  ],
  'diablos__arms': [
    { id: 'heroics', thresholds: [[5, 2]
    ] },
    { id: 'partbreaker', thresholds: [[6, 1]
    ] }
  ],
  'diablos__bow': [
    { id: 'heroics', thresholds: [[8, 1]
    ] }
  ],
  'diablos__cb': [
    { id: 'heroics', thresholds: [[8, 1]
    ] }
  ],
  'diablos__chest': [
    { id: 'heroics', thresholds: [[6, 1]
    ] },
    { id: 'slugger', thresholds: [[5, 1]
    ] }
  ],
  'diablos__db': [
    { id: 'heroics', thresholds: [[8, 1]
    ] }
  ],
  'diablos__gl': [
    { id: 'heroics', thresholds: [[8, 1]
    ] }
  ],
  'diablos__gs': [
    { id: 'heroics', thresholds: [[8, 1]
    ] }
  ],
  'diablos__hbg': [
    { id: 'heroics', thresholds: [[8, 1]
    ] }
  ],
  'diablos__head': [
    { id: 'heroics', thresholds: [[5, 1], [6, 2]
    ] }
  ],
  'diablos__hh': [
    { id: 'heroics', thresholds: [[8, 1]
    ] }
  ],
  'diablos__hmr': [
    { id: 'heroics', thresholds: [[8, 1]
    ] }
  ],
  'diablos__ig': [
    { id: 'heroics', thresholds: [[8, 1]
    ] }
  ],
  'diablos__legs': [
    { id: 'partbreaker', thresholds: [[6, 1]
    ] },
    { id: 'slugger', thresholds: [[5, 2]
    ] }
  ],
  'diablos__lnc': [
    { id: 'heroics', thresholds: [[8, 1]
    ] }
  ],
  'diablos__sa': [
    { id: 'heroics', thresholds: [[8, 1]
    ] }
  ],
  'diablos__sns': [
    { id: 'heroics', thresholds: [[8, 1]
    ] }
  ],
  'diablos__waist': [
    { id: 'offensive_guard', thresholds: [[6, 1]
    ] },
    { id: 'partbreaker', thresholds: [[5, 1]
    ] }
  ],
  'ebony_odogaron__arms': [
    { id: 'deathgaron', thresholds: [[5, 1], [6, 2]
    ] }
  ],
  'ebony_odogaron__cb': [
    { id: 'critical_boost', thresholds: [[8, 1]
    ] }
  ],
  'ebony_odogaron__chest': [
    { id: 'critical_element', thresholds: [[8, 1]
    ] },
    { id: 'latent_power', thresholds: [[5, 1]
    ] }
  ],
  'ebony_odogaron__db': [
    { id: 'critical_boost', thresholds: [[8, 1]
    ] }
  ],
  'ebony_odogaron__head': [
    { id: 'deathgaron', thresholds: [[5, 1]
    ] },
    { id: 'resuscitate', thresholds: [[8, 1]
    ] }
  ],
  'ebony_odogaron__ig': [
    { id: 'critical_boost', thresholds: [[8, 1]
    ] }
  ],
  'ebony_odogaron__lbg': [
    { id: 'critical_boost', thresholds: [[8, 1]
    ] }
  ],
  'ebony_odogaron__legs': [
    { id: 'dragon_attack', thresholds: [[5, 1], [6, 2]
    ] },
    { id: 'evade_extender', thresholds: [[8, 1]
    ] }
  ],
  'ebony_odogaron__lnc': [
    { id: 'critical_boost', thresholds: [[8, 1]
    ] }
  ],
  'ebony_odogaron__waist': [
    { id: 'critical_boost', thresholds: [[5, 1], [6, 2]
    ] },
    { id: 'perfect_evade_sp_charge', thresholds: [[8, 1]
    ] }
  ],
  'espinas__arms': [
    { id: 'lock_on', thresholds: [[6, 1]
    ] },
    { id: 'part_break_special_boost', thresholds: [[5, 1], [8, 2]
    ] }
  ],
  'espinas__bow': [
    { id: 'part_break_special_boost', thresholds: [[5, 1], [8, 2]
    ] }
  ],
  'espinas__cb': [
    { id: 'part_break_special_boost', thresholds: [[5, 1], [8, 2]
    ] }
  ],
  'espinas__chest': [
    { id: 'break_attack_boost', thresholds: [[5, 1], [6, 2], [8, 3]
    ] }
  ],
  'espinas__db': [
    { id: 'part_break_special_boost', thresholds: [[5, 1], [8, 2]
    ] }
  ],
  'espinas__gl': [
    { id: 'part_break_special_boost', thresholds: [[5, 1], [8, 2]
    ] }
  ],
  'espinas__gs': [
    { id: 'part_break_special_boost', thresholds: [[5, 1], [8, 2]
    ] }
  ],
  'espinas__hbg': [
    { id: 'part_break_special_boost', thresholds: [[5, 1], [8, 2]
    ] }
  ],
  'espinas__head': [
    { id: 'health_boost', thresholds: [[6, 1]
    ] },
    { id: 'high_performance_fire', thresholds: [[5, 1]
    ] }
  ],
  'espinas__hh': [
    { id: 'part_break_special_boost', thresholds: [[5, 1], [8, 2]
    ] }
  ],
  'espinas__hmr': [
    { id: 'part_break_special_boost', thresholds: [[5, 1], [8, 2]
    ] }
  ],
  'espinas__ig': [
    { id: 'part_break_special_boost', thresholds: [[5, 1], [8, 2]
    ] }
  ],
  'espinas__lbg': [
    { id: 'part_break_special_boost', thresholds: [[5, 1], [8, 2]
    ] }
  ],
  'espinas__legs': [
    { id: 'high_performance_fire', thresholds: [[5, 1], [6, 2]
    ] }
  ],
  'espinas__lnc': [
    { id: 'part_break_special_boost', thresholds: [[5, 1], [8, 2]
    ] }
  ],
  'espinas__ls': [
    { id: 'part_break_special_boost', thresholds: [[5, 1], [8, 2]
    ] }
  ],
  'espinas__sa': [
    { id: 'part_break_special_boost', thresholds: [[5, 1], [8, 2]
    ] }
  ],
  'espinas__sns': [
    { id: 'part_break_special_boost', thresholds: [[5, 1], [8, 2]
    ] }
  ],
  'espinas__waist': [
    { id: 'break_attack_boost', thresholds: [[5, 1], [8, 2]
    ] },
    { id: 'partbreaker', thresholds: [[6, 1]
    ] }
  ],
  'fulgur_anjanath__arms': [
    { id: 'high_performance_thunder', thresholds: [[5, 1], [6, 2]
    ] }
  ],
  'fulgur_anjanath__bow': [
    { id: 'critical_element', thresholds: [[8, 1]
    ] }
  ],
  'fulgur_anjanath__chest': [
    { id: 'health_boost', thresholds: [[6, 1]
    ] },
    { id: 'high_performance_thunder', thresholds: [[5, 1]
    ] }
  ],
  'fulgur_anjanath__db': [
    { id: 'critical_element', thresholds: [[8, 1]
    ] }
  ],
  'fulgur_anjanath__gl': [
    { id: 'critical_element', thresholds: [[8, 1]
    ] }
  ],
  'fulgur_anjanath__gs': [
    { id: 'critical_element', thresholds: [[8, 1]
    ] }
  ],
  'fulgur_anjanath__hbg': [
    { id: 'brutal_strike', thresholds: [[8, 1]
    ] }
  ],
  'fulgur_anjanath__head': [
    { id: 'part_break_special_boost', thresholds: [[5, 1], [8, 2]
    ] },
    { id: 'special_boost', thresholds: [[6, 1]
    ] }
  ],
  'fulgur_anjanath__hh': [
    { id: 'critical_element', thresholds: [[8, 1]
    ] }
  ],
  'fulgur_anjanath__hmr': [
    { id: 'critical_element', thresholds: [[8, 1]
    ] }
  ],
  'fulgur_anjanath__ig': [
    { id: 'critical_element', thresholds: [[8, 1]
    ] }
  ],
  'fulgur_anjanath__lbg': [
    { id: 'brutal_strike', thresholds: [[8, 1]
    ] }
  ],
  'fulgur_anjanath__legs': [
    { id: 'attack_up_critical_down', thresholds: [[6, 1]
    ] },
    { id: 'concentration', thresholds: [[5, 1], [8, 2]
    ] }
  ],
  'fulgur_anjanath__ls': [
    { id: 'critical_element', thresholds: [[8, 1]
    ] }
  ],
  'fulgur_anjanath__sa': [
    { id: 'critical_element', thresholds: [[8, 1]
    ] }
  ],
  'fulgur_anjanath__sns': [
    { id: 'critical_element', thresholds: [[8, 1]
    ] }
  ],
  'fulgur_anjanath__waist': [
    { id: 'lock_on', thresholds: [[6, 1]
    ] },
    { id: 'special_boost', thresholds: [[5, 1], [8, 2]
    ] }
  ],
  'garangolm__arms': [
    { id: 'disable_perfect_evade', thresholds: [[4, 1], [6, 2]
    ] }
  ],
  'garangolm__bow': [
    { id: 'disable_perfect_evade', thresholds: [[4, 1]
    ] }
  ],
  'garangolm__cb': [
    { id: 'disable_perfect_evade', thresholds: [[4, 1]
    ] }
  ],
  'garangolm__chest': [
    { id: 'guard', thresholds: [[6, 1]
    ] },
    { id: 'guard_up', thresholds: [[4, 1]
    ] }
  ],
  'garangolm__db': [
    { id: 'disable_perfect_evade', thresholds: [[4, 1]
    ] }
  ],
  'garangolm__gl': [
    { id: 'disable_perfect_evade', thresholds: [[4, 1]
    ] }
  ],
  'garangolm__gs': [
    { id: 'disable_perfect_evade', thresholds: [[4, 1]
    ] }
  ],
  'garangolm__hbg': [
    { id: 'disable_perfect_evade', thresholds: [[4, 1]
    ] }
  ],
  'garangolm__head': [
    { id: 'brutal_strike', thresholds: [[4, 1], [6, 2]
    ] }
  ],
  'garangolm__hh': [
    { id: 'disable_perfect_evade', thresholds: [[4, 1]
    ] }
  ],
  'garangolm__hmr': [
    { id: 'disable_perfect_evade', thresholds: [[4, 1]
    ] }
  ],
  'garangolm__ig': [
    { id: 'disable_perfect_evade', thresholds: [[4, 1]
    ] }
  ],
  'garangolm__lbg': [
    { id: 'disable_perfect_evade', thresholds: [[4, 1]
    ] }
  ],
  'garangolm__legs': [
    { id: 'disable_perfect_evade', thresholds: [[4, 1]
    ] },
    { id: 'lock_on', thresholds: [[6, 1]
    ] }
  ],
  'garangolm__lnc': [
    { id: 'disable_perfect_evade', thresholds: [[4, 1]
    ] }
  ],
  'garangolm__ls': [
    { id: 'disable_perfect_evade', thresholds: [[4, 1]
    ] }
  ],
  'garangolm__sa': [
    { id: 'disable_perfect_evade', thresholds: [[4, 1]
    ] }
  ],
  'garangolm__sns': [
    { id: 'disable_perfect_evade', thresholds: [[4, 1]
    ] }
  ],
  'garangolm__waist': [
    { id: 'disable_perfect_evade', thresholds: [[4, 1]
    ] },
    { id: 'reload_speed', thresholds: [[6, 1], [8, 2]
    ] }
  ],
  'glavenus__arms': [
    { id: 'weakness_exploit', thresholds: [[5, 1], [6, 2]
    ] }
  ],
  'glavenus__bow': [
    { id: 'brutal_strike', thresholds: [[8, 1]
    ] }
  ],
  'glavenus__cb': [
    { id: 'brutal_strike', thresholds: [[8, 1]
    ] }
  ],
  'glavenus__chest': [
    { id: 'attack_up_critical_down', thresholds: [[6, 1], [8, 2]
    ] },
    { id: 'lock_on', thresholds: [[5, 1]
    ] }
  ],
  'glavenus__db': [
    { id: 'brutal_strike', thresholds: [[8, 1]
    ] }
  ],
  'glavenus__gl': [
    { id: 'brutal_strike', thresholds: [[8, 1]
    ] }
  ],
  'glavenus__gs': [
    { id: 'brutal_strike', thresholds: [[8, 1]
    ] }
  ],
  'glavenus__hbg': [
    { id: 'brutal_strike', thresholds: [[8, 1]
    ] }
  ],
  'glavenus__head': [
    { id: 'attack_up_critical_down', thresholds: [[5, 1], [6, 2]
    ] }
  ],
  'glavenus__hh': [
    { id: 'brutal_strike', thresholds: [[8, 1]
    ] }
  ],
  'glavenus__hmr': [
    { id: 'brutal_strike', thresholds: [[8, 1]
    ] }
  ],
  'glavenus__ig': [
    { id: 'brutal_strike', thresholds: [[8, 1]
    ] }
  ],
  'glavenus__lbg': [
    { id: 'brutal_strike', thresholds: [[8, 1]
    ] }
  ],
  'glavenus__legs': [
    { id: 'artful_dodger', thresholds: [[6, 1]
    ] },
    { id: 'burst', thresholds: [[5, 1], [8, 2]
    ] }
  ],
  'glavenus__lnc': [
    { id: 'brutal_strike', thresholds: [[8, 1]
    ] }
  ],
  'glavenus__ls': [
    { id: 'brutal_strike', thresholds: [[8, 1]
    ] }
  ],
  'glavenus__sa': [
    { id: 'brutal_strike', thresholds: [[8, 1]
    ] }
  ],
  'glavenus__sns': [
    { id: 'brutal_strike', thresholds: [[8, 1]
    ] }
  ],
  'glavenus__waist': [
    { id: 'feat_of_agility', thresholds: [[5, 1], [6, 2]
    ] },
    { id: 'sneak_attack', thresholds: [[8, 1]
    ] }
  ],
  'gold_rathian__arms': [
    { id: 'pursuit_poison', thresholds: [[6, 1], [8, 2]
    ] }
  ],
  'gold_rathian__bow': [
    { id: 'pursuit_poison', thresholds: [[6, 1], [8, 2]
    ] }
  ],
  'gold_rathian__cb': [
    { id: 'pursuit_poison', thresholds: [[6, 1], [8, 2]
    ] }
  ],
  'gold_rathian__chest': [
    { id: 'partbreaker', thresholds: [[6, 2]
    ] }
  ],
  'gold_rathian__gl': [
    { id: 'pursuit_poison', thresholds: [[6, 1], [8, 2]
    ] }
  ],
  'gold_rathian__hbg': [
    { id: 'pursuit_poison', thresholds: [[6, 1], [8, 2]
    ] }
  ],
  'gold_rathian__head': [
    { id: 'divine_blessing', thresholds: [[8, 2]
    ] },
    { id: 'resentment', thresholds: [[6, 1]
    ] }
  ],
  'gold_rathian__hh': [
    { id: 'critical_element', thresholds: [[6, 1], [8, 2]
    ] }
  ],
  'gold_rathian__lbg': [
    { id: 'pursuit_poison', thresholds: [[6, 1], [8, 2]
    ] }
  ],
  'gold_rathian__legs': [
    { id: 'poison_attack', thresholds: [[8, 1]
    ] },
    { id: 'pursuit_poison', thresholds: [[6, 1]
    ] }
  ],
  'gold_rathian__ls': [
    { id: 'pursuit_poison', thresholds: [[6, 1], [8, 2]
    ] }
  ],
  'gold_rathian__sa': [
    { id: 'pursuit_poison', thresholds: [[6, 1], [8, 2]
    ] }
  ],
  'gold_rathian__sns': [
    { id: 'pursuit_poison', thresholds: [[6, 1], [8, 2]
    ] }
  ],
  'gold_rathian__waist': [
    { id: 'lock_on', thresholds: [[6, 1]
    ] },
    { id: 'resuscitate', thresholds: [[8, 1]
    ] }
  ],
  'gossharag__arms': [
    { id: 'divine_blessing', thresholds: [[6, 1]
    ] },
    { id: 'ice_attack_boost_secret', thresholds: [[4, 1]
    ] }
  ],
  'gossharag__cb': [
    { id: 'brutal_strike', thresholds: [[8, 1]
    ] }
  ],
  'gossharag__chest': [
    { id: 'ice_attack', thresholds: [[6, 1], [8, 2]
    ] },
    { id: 'ice_attack_boost_secret', thresholds: [[4, 1]
    ] }
  ],
  'gossharag__gs': [
    { id: 'brutal_strike', thresholds: [[8, 1]
    ] }
  ],
  'gossharag__head': [
    { id: 'morph_attack_boost', thresholds: [[4, 1]
    ] },
    { id: 'morph_boost', thresholds: [[6, 1]
    ] }
  ],
  'gossharag__hmr': [
    { id: 'brutal_strike', thresholds: [[8, 1]
    ] }
  ],
  'gossharag__ig': [
    { id: 'brutal_strike', thresholds: [[8, 1]
    ] }
  ],
  'gossharag__lbg': [
    { id: 'brutal_strike', thresholds: [[8, 1]
    ] }
  ],
  'gossharag__legs': [
    { id: 'lock_on', thresholds: [[6, 1]
    ] },
    { id: 'morph_boost', thresholds: [[4, 1], [8, 2]
    ] }
  ],
  'gossharag__lnc': [
    { id: 'brutal_strike', thresholds: [[8, 1]
    ] }
  ],
  'gossharag__sns': [
    { id: 'brutal_strike', thresholds: [[8, 1]
    ] }
  ],
  'gossharag__waist': [
    { id: 'ice_attack_boost_secret', thresholds: [[4, 1]
    ] },
    { id: 'morph_attack_boost', thresholds: [[6, 1], [8, 2]
    ] }
  ],
  'great_girros__arms': [
    { id: 'earplugs', thresholds: [[6, 1]
    ] },
    { id: 'sneak_attack', thresholds: [[2, 1]
    ] }
  ],
  'great_girros__cb': [
    { id: 'sneak_attack', thresholds: [[8, 1]
    ] }
  ],
  'great_girros__chest': [
    { id: 'paralysis_resistance', thresholds: [[2, 1]
    ] },
    { id: 'sneak_attack', thresholds: [[6, 1]
    ] }
  ],
  'great_girros__gl': [
    { id: 'sneak_attack', thresholds: [[8, 1]
    ] }
  ],
  'great_girros__gs': [
    { id: 'sneak_attack', thresholds: [[8, 1]
    ] }
  ],
  'great_girros__head': [
    { id: 'paralysis_resistance', thresholds: [[2, 1], [4, 2]
    ] }
  ],
  'great_girros__hmr': [
    { id: 'sneak_attack', thresholds: [[8, 1]
    ] }
  ],
  'great_girros__legs': [
    { id: 'paralysis_attack', thresholds: [[2, 1], [6, 2]
    ] }
  ],
  'great_girros__sns': [
    { id: 'sneak_attack', thresholds: [[8, 1]
    ] }
  ],
  'great_girros__waist': [
    { id: 'earplugs', thresholds: [[4, 1], [6, 2]
    ] },
    { id: 'paralysis_attack', thresholds: [[2, 1]
    ] }
  ],
  'great_jagras__arms': [
    { id: 'firm_foothold', thresholds: [[2, 1]
    ] },
    { id: 'water_attack', thresholds: [[4, 1]
    ] }
  ],
  'great_jagras__cb': [
    { id: 'health_boost', thresholds: [[4, 1], [8, 2]
    ] }
  ],
  'great_jagras__chest': [
    { id: 'rising_tide', thresholds: [[2, 1], [6, 2]
    ] }
  ],
  'great_jagras__gl': [
    { id: 'health_boost', thresholds: [[4, 1], [8, 2]
    ] }
  ],
  'great_jagras__gs': [
    { id: 'health_boost', thresholds: [[4, 1], [8, 2]
    ] }
  ],
  'great_jagras__hbg': [
    { id: 'health_boost', thresholds: [[4, 1], [8, 2]
    ] }
  ],
  'great_jagras__head': [
    { id: 'firm_foothold', thresholds: [[2, 1], [6, 2]
    ] }
  ],
  'great_jagras__lbg': [
    { id: 'health_boost', thresholds: [[4, 1], [8, 2]
    ] }
  ],
  'great_jagras__legs': [
    { id: 'water_attack', thresholds: [[2, 1], [6, 2]
    ] }
  ],
  'great_jagras__sa': [
    { id: 'health_boost', thresholds: [[4, 1], [8, 2]
    ] }
  ],
  'great_jagras__sns': [
    { id: 'health_boost', thresholds: [[4, 1], [8, 2]
    ] }
  ],
  'great_jagras__waist': [
    { id: 'fortify', thresholds: [[2, 1], [6, 2]
    ] },
    { id: 'rising_tide', thresholds: [[4, 1]
    ] }
  ],
  'great_wroggi__arms': [
    { id: 'critical_eye', thresholds: [[2, 1], [6, 2]
    ] }
  ],
  'great_wroggi__bow': [
    { id: 'focus', thresholds: [[4, 1]
    ] }
  ],
  'great_wroggi__chest': [
    { id: 'ending_shot', thresholds: [[2, 1]
    ] },
    { id: 'recoil_down', thresholds: [[6, 1]
    ] }
  ],
  'great_wroggi__db': [
    { id: 'lock_on', thresholds: [[4, 1]
    ] }
  ],
  'great_wroggi__head': [
    { id: 'power_prolonger', thresholds: [[2, 1], [6, 2]
    ] }
  ],
  'great_wroggi__hmr': [
    { id: 'lock_on', thresholds: [[4, 1]
    ] }
  ],
  'great_wroggi__legs': [
    { id: 'ending_shot', thresholds: [[2, 1], [6, 2]
    ] }
  ],
  'great_wroggi__ls': [
    { id: 'lock_on', thresholds: [[4, 1]
    ] }
  ],
  'great_wroggi__sns': [
    { id: 'lock_on', thresholds: [[4, 1]
    ] }
  ],
  'great_wroggi__waist': [
    { id: 'guard', thresholds: [[2, 1], [4, 2]
    ] }
  ],
  'jyuratodus__arms': [
    { id: 'water_attack', thresholds: [[3, 1], [6, 2]
    ] }
  ],
  'jyuratodus__bow': [
    { id: 'last_stand', thresholds: [[8, 1]
    ] }
  ],
  'jyuratodus__cb': [
    { id: 'last_stand', thresholds: [[8, 1]
    ] }
  ],
  'jyuratodus__chest': [
    { id: 'last_stand', thresholds: [[4, 1]
    ] },
    { id: 'water_attack', thresholds: [[3, 1]
    ] }
  ],
  'jyuratodus__db': [
    { id: 'last_stand', thresholds: [[8, 1]
    ] }
  ],
  'jyuratodus__gl': [
    { id: 'last_stand', thresholds: [[8, 1]
    ] }
  ],
  'jyuratodus__gs': [
    { id: 'last_stand', thresholds: [[8, 1]
    ] }
  ],
  'jyuratodus__hbg': [
    { id: 'last_stand', thresholds: [[8, 1]
    ] }
  ],
  'jyuratodus__head': [
    { id: 'last_stand', thresholds: [[4, 1]
    ] },
    { id: 'water_resistance', thresholds: [[3, 1]
    ] }
  ],
  'jyuratodus__hh': [
    { id: 'last_stand', thresholds: [[8, 1]
    ] }
  ],
  'jyuratodus__hmr': [
    { id: 'last_stand', thresholds: [[8, 1]
    ] }
  ],
  'jyuratodus__ig': [
    { id: 'last_stand', thresholds: [[8, 1]
    ] }
  ],
  'jyuratodus__lbg': [
    { id: 'last_stand', thresholds: [[8, 1]
    ] }
  ],
  'jyuratodus__legs': [
    { id: 'focus', thresholds: [[3, 1], [6, 2]
    ] },
    { id: 'last_stand', thresholds: [[4, 1]
    ] }
  ],
  'jyuratodus__lnc': [
    { id: 'last_stand', thresholds: [[8, 1]
    ] }
  ],
  'jyuratodus__ls': [
    { id: 'last_stand', thresholds: [[8, 1]
    ] }
  ],
  'jyuratodus__sa': [
    { id: 'last_stand', thresholds: [[8, 1]
    ] }
  ],
  'jyuratodus__sns': [
    { id: 'last_stand', thresholds: [[8, 1]
    ] }
  ],
  'jyuratodus__waist': [
    { id: 'water_resistance', thresholds: [[3, 1], [4, 2]
    ] }
  ],
  'khezu__arms': [
    { id: 'fortify', thresholds: [[4, 1]
    ] },
    { id: 'sp_insurance', thresholds: [[4, 1], [6, 2]
    ] }
  ],
  'khezu__bow': [
    { id: 'peak_performance', thresholds: [[8, 1]
    ] }
  ],
  'khezu__chest': [
    { id: 'thunder_attack', thresholds: [[4, 1], [6, 2]
    ] }
  ],
  'khezu__db': [
    { id: 'peak_performance', thresholds: [[8, 1]
    ] }
  ],
  'khezu__gl': [
    { id: 'peak_performance', thresholds: [[8, 1]
    ] }
  ],
  'khezu__gs': [
    { id: 'peak_performance', thresholds: [[8, 1]
    ] }
  ],
  'khezu__head': [
    { id: 'paralysis_attack', thresholds: [[4, 1]
    ] },
    { id: 'sp_insurance', thresholds: [[6, 1]
    ] }
  ],
  'khezu__hh': [
    { id: 'peak_performance', thresholds: [[8, 1]
    ] }
  ],
  'khezu__hmr': [
    { id: 'peak_performance', thresholds: [[8, 1]
    ] }
  ],
  'khezu__ig': [
    { id: 'peak_performance', thresholds: [[8, 1]
    ] }
  ],
  'khezu__lbg': [
    { id: 'peak_performance', thresholds: [[8, 1]
    ] }
  ],
  'khezu__legs': [
    { id: 'focus', thresholds: [[4, 1]
    ] },
    { id: 'slugger', thresholds: [[6, 1]
    ] }
  ],
  'khezu__sa': [
    { id: 'peak_performance', thresholds: [[8, 1]
    ] }
  ],
  'khezu__sns': [
    { id: 'peak_performance', thresholds: [[8, 1]
    ] }
  ],
  'khezu__waist': [
    { id: 'paralysis_resistance', thresholds: [[4, 1], [6, 2]
    ] }
  ],
  'kirin__arms': [
    { id: 'critical_boost', thresholds: [[6, 1]
    ] },
    { id: 'kirin_robe', thresholds: [[6, 1]
    ] },
    { id: 'weakness_exploit', thresholds: [[8, 1]
    ] }
  ],
  'kirin__chest': [
    { id: 'critical_boost', thresholds: [[6, 1]
    ] },
    { id: 'critical_eye', thresholds: [[8, 1]
    ] },
    { id: 'kirin_robe', thresholds: [[6, 1]
    ] }
  ],
  'kirin__db': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'latent_power', thresholds: [[8, 1]
    ] }
  ],
  'kirin__gs': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'latent_power', thresholds: [[8, 1]
    ] }
  ],
  'kirin__hbg': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'latent_power', thresholds: [[8, 1]
    ] }
  ],
  'kirin__head': [
    { id: 'fighting_spirit', thresholds: [[8, 1]
    ] },
    { id: 'kirin_robe', thresholds: [[6, 1]
    ] },
    { id: 'lock_on', thresholds: [[6, 1]
    ] }
  ],
  'kirin__hh': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'latent_power', thresholds: [[8, 1]
    ] }
  ],
  'kirin__ig': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'latent_power', thresholds: [[8, 1]
    ] }
  ],
  'kirin__lbg': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'latent_power', thresholds: [[8, 1]
    ] }
  ],
  'kirin__legs': [
    { id: 'kirin_robe', thresholds: [[6, 1]
    ] },
    { id: 'recoil_down', thresholds: [[6, 1], [8, 2]
    ] }
  ],
  'kirin__lnc': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'latent_power', thresholds: [[8, 1]
    ] }
  ],
  'kirin__sa': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'latent_power', thresholds: [[8, 1]
    ] }
  ],
  'kirin__sns': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'latent_power', thresholds: [[8, 1]
    ] }
  ],
  'kirin__waist': [
    { id: 'critical_boost', thresholds: [[6, 1]
    ] },
    { id: 'kirin_robe', thresholds: [[6, 1]
    ] },
    { id: 'latent_power', thresholds: [[8, 1]
    ] }
  ],
  'kulu_ya_ku__arms': [
    { id: 'critical_eye', thresholds: [[4, 1]
    ] },
    { id: 'last_stand', thresholds: [[2, 1]
    ] }
  ],
  'kulu_ya_ku__bow': [
    { id: 'fortify', thresholds: [[4, 1], [8, 2]
    ] }
  ],
  'kulu_ya_ku__chest': [
    { id: 'guts', thresholds: [[2, 1], [6, 2]
    ] }
  ],
  'kulu_ya_ku__db': [
    { id: 'fortify', thresholds: [[4, 1], [8, 2]
    ] }
  ],
  'kulu_ya_ku__head': [
    { id: 'critical_eye', thresholds: [[4, 1]
    ] },
    { id: 'lock_on', thresholds: [[2, 1]
    ] }
  ],
  'kulu_ya_ku__hh': [
    { id: 'fortify', thresholds: [[4, 1], [8, 2]
    ] }
  ],
  'kulu_ya_ku__hmr': [
    { id: 'fortify', thresholds: [[4, 1], [8, 2]
    ] }
  ],
  'kulu_ya_ku__ig': [
    { id: 'fortify', thresholds: [[4, 1], [8, 2]
    ] }
  ],
  'kulu_ya_ku__legs': [
    { id: 'critical_eye', thresholds: [[2, 1], [6, 2]
    ] }
  ],
  'kulu_ya_ku__lnc': [
    { id: 'fortify', thresholds: [[4, 1], [8, 2]
    ] }
  ],
  'kulu_ya_ku__ls': [
    { id: 'fortify', thresholds: [[4, 1], [8, 2]
    ] }
  ],
  'kulu_ya_ku__waist': [
    { id: 'evade_extender', thresholds: [[4, 1]
    ] },
    { id: 'last_stand', thresholds: [[2, 1]
    ] }
  ],
  'kushala_daora__arms': [
    { id: 'evade_extender', thresholds: [[8, 1]
    ] },
    { id: 'focus', thresholds: [[6, 1]
    ] },
    { id: 'kushala_bless', thresholds: [[6, 1]
    ] }
  ],
  'kushala_daora__bow': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'windproof', thresholds: [[8, 2]
    ] }
  ],
  'kushala_daora__cb': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'windproof', thresholds: [[8, 2]
    ] }
  ],
  'kushala_daora__chest': [
    { id: 'health_boost', thresholds: [[8, 1]
    ] },
    { id: 'kushala_bless', thresholds: [[6, 1]
    ] },
    { id: 'partbreaker', thresholds: [[6, 1]
    ] }
  ],
  'kushala_daora__db': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'windproof', thresholds: [[8, 2]
    ] }
  ],
  'kushala_daora__gl': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'windproof', thresholds: [[8, 2]
    ] }
  ],
  'kushala_daora__gs': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'windproof', thresholds: [[8, 2]
    ] }
  ],
  'kushala_daora__hbg': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'windproof', thresholds: [[8, 2]
    ] }
  ],
  'kushala_daora__head': [
    { id: 'earplugs', thresholds: [[8, 1]
    ] },
    { id: 'kushala_bless', thresholds: [[6, 1]
    ] },
    { id: 'reload_speed', thresholds: [[6, 1]
    ] }
  ],
  'kushala_daora__hh': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'windproof', thresholds: [[8, 2]
    ] }
  ],
  'kushala_daora__hmr': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'windproof', thresholds: [[8, 2]
    ] }
  ],
  'kushala_daora__ig': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'windproof', thresholds: [[8, 2]
    ] }
  ],
  'kushala_daora__lbg': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'windproof', thresholds: [[8, 2]
    ] }
  ],
  'kushala_daora__legs': [
    { id: 'airborne', thresholds: [[6, 1]
    ] },
    { id: 'artful_dodger', thresholds: [[8, 1]
    ] },
    { id: 'kushala_bless', thresholds: [[6, 1]
    ] }
  ],
  'kushala_daora__lnc': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'windproof', thresholds: [[8, 2]
    ] }
  ],
  'kushala_daora__ls': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'windproof', thresholds: [[8, 2]
    ] }
  ],
  'kushala_daora__sa': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'windproof', thresholds: [[8, 2]
    ] }
  ],
  'kushala_daora__sns': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'windproof', thresholds: [[8, 2]
    ] }
  ],
  'kushala_daora__waist': [
    { id: 'kushala_bless', thresholds: [[6, 1]
    ] },
    { id: 'weakness_exploit', thresholds: [[6, 1]
    ] },
    { id: 'windproof', thresholds: [[8, 1]
    ] }
  ],
  'lagombi__arms': [
    { id: 'multiplayer_boost', thresholds: [[2, 1]
    ] },
    { id: 'resentment', thresholds: [[4, 1]
    ] }
  ],
  'lagombi__chest': [
    { id: 'attack_boost', thresholds: [[2, 1], [4, 2], [6, 3]
    ] }
  ],
  'lagombi__db': [
    { id: 'lock_on', thresholds: [[8, 1]
    ] }
  ],
  'lagombi__gl': [
    { id: 'lock_on', thresholds: [[8, 1]
    ] }
  ],
  'lagombi__gs': [
    { id: 'lock_on', thresholds: [[8, 1]
    ] }
  ],
  'lagombi__hbg': [
    { id: 'guard', thresholds: [[8, 1]
    ] }
  ],
  'lagombi__head': [
    { id: 'evade_extender', thresholds: [[4, 1]
    ] },
    { id: 'special_boost', thresholds: [[2, 1], [6, 2]
    ] }
  ],
  'lagombi__ig': [
    { id: 'lock_on', thresholds: [[8, 1]
    ] }
  ],
  'lagombi__legs': [
    { id: 'ice_attack', thresholds: [[2, 1], [6, 2]
    ] }
  ],
  'lagombi__ls': [
    { id: 'lock_on', thresholds: [[8, 1]
    ] }
  ],
  'lagombi__sa': [
    { id: 'lock_on', thresholds: [[8, 1]
    ] }
  ],
  'lagombi__waist': [
    { id: 'multiplayer_boost', thresholds: [[2, 1], [4, 2]
    ] }
  ],
  'legiana__arms': [
    { id: 'reload_speed', thresholds: [[5, 1], [6, 2]
    ] }
  ],
  'legiana__bow': [
    { id: 'divine_blessing', thresholds: [[5, 1], [8, 2]
    ] }
  ],
  'legiana__cb': [
    { id: 'divine_blessing', thresholds: [[5, 1], [8, 2]
    ] }
  ],
  'legiana__chest': [
    { id: 'divine_blessing', thresholds: [[5, 2]
    ] },
    { id: 'windproof', thresholds: [[6, 1]
    ] }
  ],
  'legiana__db': [
    { id: 'divine_blessing', thresholds: [[5, 1], [8, 2]
    ] }
  ],
  'legiana__gl': [
    { id: 'divine_blessing', thresholds: [[5, 1], [8, 2]
    ] }
  ],
  'legiana__gs': [
    { id: 'divine_blessing', thresholds: [[5, 1], [8, 2]
    ] }
  ],
  'legiana__hbg': [
    { id: 'divine_blessing', thresholds: [[5, 1], [8, 2]
    ] }
  ],
  'legiana__head': [
    { id: 'divine_blessing', thresholds: [[5, 1]
    ] },
    { id: 'ice_attack', thresholds: [[6, 1]
    ] }
  ],
  'legiana__hh': [
    { id: 'divine_blessing', thresholds: [[5, 1], [8, 2]
    ] }
  ],
  'legiana__ig': [
    { id: 'divine_blessing', thresholds: [[5, 1], [8, 2]
    ] }
  ],
  'legiana__lbg': [
    { id: 'divine_blessing', thresholds: [[5, 1], [8, 2]
    ] }
  ],
  'legiana__legs': [
    { id: 'ice_resistance', thresholds: [[6, 1]
    ] },
    { id: 'reload_speed', thresholds: [[5, 1]
    ] }
  ],
  'legiana__lnc': [
    { id: 'divine_blessing', thresholds: [[5, 1], [8, 2]
    ] }
  ],
  'legiana__ls': [
    { id: 'divine_blessing', thresholds: [[5, 1], [8, 2]
    ] }
  ],
  'legiana__sa': [
    { id: 'divine_blessing', thresholds: [[5, 1], [8, 2]
    ] }
  ],
  'legiana__sns': [
    { id: 'divine_blessing', thresholds: [[5, 1], [8, 2]
    ] }
  ],
  'legiana__waist': [
    { id: 'ice_attack', thresholds: [[5, 2]
    ] },
    { id: 'windproof', thresholds: [[6, 1]
    ] }
  ],
  'lunagaron__arms': [
    { id: 'charge_up', thresholds: [[4, 1], [6, 2]
    ] }
  ],
  'lunagaron__bow': [
    { id: 'high_performance_ice', thresholds: [[8, 1]
    ] }
  ],
  'lunagaron__cb': [
    { id: 'high_performance_ice', thresholds: [[8, 1]
    ] }
  ],
  'lunagaron__chest': [
    { id: 'high_performance_ice', thresholds: [[4, 1], [6, 2]
    ] }
  ],
  'lunagaron__db': [
    { id: 'high_performance_ice', thresholds: [[8, 1]
    ] }
  ],
  'lunagaron__gl': [
    { id: 'high_performance_ice', thresholds: [[8, 1]
    ] }
  ],
  'lunagaron__gs': [
    { id: 'high_performance_ice', thresholds: [[8, 1]
    ] }
  ],
  'lunagaron__hbg': [
    { id: 'high_performance_ice', thresholds: [[8, 1]
    ] }
  ],
  'lunagaron__head': [
    { id: 'ballistic', thresholds: [[6, 1]
    ] },
    { id: 'recoil_down', thresholds: [[4, 1], [8, 2]
    ] }
  ],
  'lunagaron__hh': [
    { id: 'high_performance_ice', thresholds: [[8, 1]
    ] }
  ],
  'lunagaron__hmr': [
    { id: 'high_performance_ice', thresholds: [[8, 1]
    ] }
  ],
  'lunagaron__ig': [
    { id: 'high_performance_ice', thresholds: [[8, 1]
    ] }
  ],
  'lunagaron__lbg': [
    { id: 'high_performance_ice', thresholds: [[8, 1]
    ] }
  ],
  'lunagaron__legs': [
    { id: 'ballistic', thresholds: [[4, 1], [8, 2]
    ] },
    { id: 'burst', thresholds: [[6, 1]
    ] }
  ],
  'lunagaron__lnc': [
    { id: 'high_performance_ice', thresholds: [[8, 1]
    ] }
  ],
  'lunagaron__ls': [
    { id: 'high_performance_ice', thresholds: [[8, 1]
    ] }
  ],
  'lunagaron__sa': [
    { id: 'high_performance_ice', thresholds: [[8, 1]
    ] }
  ],
  'lunagaron__sns': [
    { id: 'high_performance_ice', thresholds: [[8, 1]
    ] }
  ],
  'lunagaron__waist': [
    { id: 'health_boost', thresholds: [[4, 1], [6, 2], [8, 3]
    ] }
  ],
  'magnamalo__arms': [
    { id: 'blast_attack', thresholds: [[4, 1], [6, 2]
    ] }
  ],
  'magnamalo__bow': [
    { id: 'partbreaker', thresholds: [[8, 1]
    ] }
  ],
  'magnamalo__cb': [
    { id: 'partbreaker', thresholds: [[8, 1]
    ] }
  ],
  'magnamalo__chest': [
    { id: 'blast_resistance', thresholds: [[6, 1]
    ] },
    { id: 'reload_speed', thresholds: [[4, 2]
    ] }
  ],
  'magnamalo__db': [
    { id: 'partbreaker', thresholds: [[8, 1]
    ] }
  ],
  'magnamalo__gl': [
    { id: 'partbreaker', thresholds: [[8, 1]
    ] }
  ],
  'magnamalo__gs': [
    { id: 'partbreaker', thresholds: [[8, 1]
    ] }
  ],
  'magnamalo__hbg': [
    { id: 'partbreaker', thresholds: [[8, 1]
    ] }
  ],
  'magnamalo__head': [
    { id: 'hellfire_cloak', thresholds: [[4, 1], [6, 2]
    ] }
  ],
  'magnamalo__hh': [
    { id: 'partbreaker', thresholds: [[8, 1]
    ] }
  ],
  'magnamalo__hmr': [
    { id: 'partbreaker', thresholds: [[8, 1]
    ] }
  ],
  'magnamalo__ig': [
    { id: 'partbreaker', thresholds: [[8, 1]
    ] }
  ],
  'magnamalo__lbg': [
    { id: 'partbreaker', thresholds: [[8, 1]
    ] }
  ],
  'magnamalo__legs': [
    { id: 'blast_attack', thresholds: [[4, 1]
    ] },
    { id: 'sneak_attack', thresholds: [[6, 1]
    ] }
  ],
  'magnamalo__lnc': [
    { id: 'partbreaker', thresholds: [[8, 1]
    ] }
  ],
  'magnamalo__ls': [
    { id: 'partbreaker', thresholds: [[8, 1]
    ] }
  ],
  'magnamalo__sa': [
    { id: 'partbreaker', thresholds: [[8, 1]
    ] }
  ],
  'magnamalo__sns': [
    { id: 'partbreaker', thresholds: [[8, 1]
    ] }
  ],
  'magnamalo__waist': [
    { id: 'blast_resistance', thresholds: [[4, 1]
    ] },
    { id: 'hellfire_cloak', thresholds: [[6, 1]
    ] }
  ],
  'malzeno__arms': [
    { id: 'bloodblight_cloak', thresholds: [[6, 1]
    ] },
    { id: 'malzeno_blood', thresholds: [[6, 1]
    ] },
    { id: 'resuscitate', thresholds: [[8, 1]
    ] }
  ],
  'malzeno__bow': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'high_performance_dragon', thresholds: [[8, 1]
    ] }
  ],
  'malzeno__cb': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'high_performance_dragon', thresholds: [[8, 1]
    ] }
  ],
  'malzeno__chest': [
    { id: 'bloodblight_cloak', thresholds: [[6, 1], [8, 2]
    ] },
    { id: 'malzeno_blood', thresholds: [[6, 1]
    ] }
  ],
  'malzeno__db': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'high_performance_dragon', thresholds: [[8, 1]
    ] }
  ],
  'malzeno__gl': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'high_performance_dragon', thresholds: [[8, 1]
    ] }
  ],
  'malzeno__gs': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'high_performance_dragon', thresholds: [[8, 1]
    ] }
  ],
  'malzeno__hbg': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'high_performance_dragon', thresholds: [[8, 1]
    ] }
  ],
  'malzeno__head': [
    { id: 'high_performance_dragon', thresholds: [[6, 1], [8, 2]
    ] },
    { id: 'malzeno_blood', thresholds: [[6, 1]
    ] }
  ],
  'malzeno__hh': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'high_performance_dragon', thresholds: [[8, 1]
    ] }
  ],
  'malzeno__hmr': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'high_performance_dragon', thresholds: [[8, 1]
    ] }
  ],
  'malzeno__ig': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'high_performance_dragon', thresholds: [[8, 1]
    ] }
  ],
  'malzeno__lbg': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'high_performance_dragon', thresholds: [[8, 1]
    ] }
  ],
  'malzeno__legs': [
    { id: 'break_attack_boost', thresholds: [[6, 1], [8, 2]
    ] },
    { id: 'malzeno_blood', thresholds: [[6, 1]
    ] }
  ],
  'malzeno__lnc': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'high_performance_dragon', thresholds: [[8, 1]
    ] }
  ],
  'malzeno__ls': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'high_performance_dragon', thresholds: [[8, 1]
    ] }
  ],
  'malzeno__sa': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'high_performance_dragon', thresholds: [[8, 1]
    ] }
  ],
  'malzeno__sns': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'high_performance_dragon', thresholds: [[8, 1]
    ] }
  ],
  'malzeno__waist': [
    { id: 'fighting_spirit', thresholds: [[6, 1], [8, 2]
    ] },
    { id: 'malzeno_blood', thresholds: [[6, 1]
    ] }
  ],
  'mizutsune__arms': [
    { id: 'bubbly_dance', thresholds: [[5, 1]
    ] },
    { id: 'resuscitate', thresholds: [[6, 1]
    ] }
  ],
  'mizutsune__bow': [
    { id: 'artful_dodger', thresholds: [[8, 1]
    ] }
  ],
  'mizutsune__cb': [
    { id: 'artful_dodger', thresholds: [[8, 1]
    ] }
  ],
  'mizutsune__chest': [
    { id: 'bubbly_dance', thresholds: [[5, 1], [6, 2]
    ] }
  ],
  'mizutsune__db': [
    { id: 'artful_dodger', thresholds: [[8, 1]
    ] }
  ],
  'mizutsune__gl': [
    { id: 'artful_dodger', thresholds: [[8, 1]
    ] }
  ],
  'mizutsune__gs': [
    { id: 'artful_dodger', thresholds: [[8, 1]
    ] }
  ],
  'mizutsune__hbg': [
    { id: 'artful_dodger', thresholds: [[8, 1]
    ] }
  ],
  'mizutsune__head': [
    { id: 'water_attack', thresholds: [[5, 1], [6, 2]
    ] }
  ],
  'mizutsune__hh': [
    { id: 'artful_dodger', thresholds: [[8, 1]
    ] }
  ],
  'mizutsune__hmr': [
    { id: 'artful_dodger', thresholds: [[8, 1]
    ] }
  ],
  'mizutsune__ig': [
    { id: 'artful_dodger', thresholds: [[8, 1]
    ] }
  ],
  'mizutsune__lbg': [
    { id: 'artful_dodger', thresholds: [[8, 1]
    ] }
  ],
  'mizutsune__legs': [
    { id: 'resuscitate', thresholds: [[5, 1], [6, 2]
    ] }
  ],
  'mizutsune__lnc': [
    { id: 'artful_dodger', thresholds: [[8, 1]
    ] }
  ],
  'mizutsune__ls': [
    { id: 'artful_dodger', thresholds: [[8, 1]
    ] }
  ],
  'mizutsune__sa': [
    { id: 'artful_dodger', thresholds: [[8, 1]
    ] }
  ],
  'mizutsune__sns': [
    { id: 'artful_dodger', thresholds: [[8, 1]
    ] }
  ],
  'mizutsune__waist': [
    { id: 'perfect_evade_sp_charge', thresholds: [[5, 1], [6, 2]
    ] }
  ],
  'namielle__arms': [
    { id: 'critical_eye', thresholds: [[6, 1]
    ] },
    { id: 'namielle_wave', thresholds: [[6, 1]
    ] },
    { id: 'weakness_exploit', thresholds: [[8, 1]
    ] }
  ],
  'namielle__bow': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'weakness_exploit', thresholds: [[8, 1]
    ] }
  ],
  'namielle__cb': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'weakness_exploit', thresholds: [[8, 1]
    ] }
  ],
  'namielle__chest': [
    { id: 'critical_boost', thresholds: [[8, 1]
    ] },
    { id: 'latent_power', thresholds: [[6, 1]
    ] },
    { id: 'namielle_wave', thresholds: [[6, 1]
    ] }
  ],
  'namielle__gl': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'weakness_exploit', thresholds: [[8, 1]
    ] }
  ],
  'namielle__hbg': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'weakness_exploit', thresholds: [[8, 1]
    ] }
  ],
  'namielle__head': [
    { id: 'namielle_wave', thresholds: [[6, 1]
    ] },
    { id: 'recoil_down', thresholds: [[8, 1]
    ] },
    { id: 'reload_speed', thresholds: [[6, 1]
    ] }
  ],
  'namielle__hh': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'weakness_exploit', thresholds: [[8, 1]
    ] }
  ],
  'namielle__ig': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'weakness_exploit', thresholds: [[8, 1]
    ] }
  ],
  'namielle__lbg': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'weakness_exploit', thresholds: [[8, 1]
    ] }
  ],
  'namielle__legs': [
    { id: 'namielle_wave', thresholds: [[6, 1]
    ] },
    { id: 'perfect_evade_attack_boost', thresholds: [[6, 1], [8, 2]
    ] }
  ],
  'namielle__lnc': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'weakness_exploit', thresholds: [[8, 1]
    ] }
  ],
  'namielle__ls': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'weakness_exploit', thresholds: [[8, 1]
    ] }
  ],
  'namielle__sa': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'weakness_exploit', thresholds: [[8, 1]
    ] }
  ],
  'namielle__sns': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'weakness_exploit', thresholds: [[8, 1]
    ] }
  ],
  'namielle__waist': [
    { id: 'namielle_wave', thresholds: [[6, 1]
    ] },
    { id: 'water_attack', thresholds: [[6, 1], [8, 2]
    ] }
  ],
  'nargacuga__arms': [
    { id: 'buildup_boost', thresholds: [[5, 1], [6, 2], [8, 3]
    ] }
  ],
  'nargacuga__bow': [
    { id: 'resuscitate', thresholds: [[5, 1], [8, 2]
    ] }
  ],
  'nargacuga__cb': [
    { id: 'resuscitate', thresholds: [[5, 1], [8, 2]
    ] }
  ],
  'nargacuga__chest': [
    { id: 'critical_boost', thresholds: [[5, 1], [8, 2]
    ] },
    { id: 'lock_on', thresholds: [[6, 1]
    ] }
  ],
  'nargacuga__db': [
    { id: 'resuscitate', thresholds: [[5, 1], [8, 2]
    ] }
  ],
  'nargacuga__gl': [
    { id: 'resuscitate', thresholds: [[5, 1], [8, 2]
    ] }
  ],
  'nargacuga__gs': [
    { id: 'resuscitate', thresholds: [[5, 1], [8, 2]
    ] }
  ],
  'nargacuga__hbg': [
    { id: 'resuscitate', thresholds: [[5, 1], [8, 2]
    ] }
  ],
  'nargacuga__head': [
    { id: 'fighting_spirit', thresholds: [[5, 1]
    ] },
    { id: 'focus', thresholds: [[6, 1]
    ] }
  ],
  'nargacuga__hh': [
    { id: 'resuscitate', thresholds: [[5, 1], [8, 2]
    ] }
  ],
  'nargacuga__hmr': [
    { id: 'resuscitate', thresholds: [[5, 1], [8, 2]
    ] }
  ],
  'nargacuga__ig': [
    { id: 'resuscitate', thresholds: [[5, 1], [8, 2]
    ] }
  ],
  'nargacuga__lbg': [
    { id: 'resuscitate', thresholds: [[5, 1], [8, 2]
    ] }
  ],
  'nargacuga__legs': [
    { id: 'artful_dodger', thresholds: [[6, 1]
    ] },
    { id: 'buildup_boost', thresholds: [[5, 1], [8, 2]
    ] }
  ],
  'nargacuga__lnc': [
    { id: 'resuscitate', thresholds: [[5, 1], [8, 2]
    ] }
  ],
  'nargacuga__ls': [
    { id: 'resuscitate', thresholds: [[5, 1], [8, 2]
    ] }
  ],
  'nargacuga__sa': [
    { id: 'resuscitate', thresholds: [[5, 1], [8, 2]
    ] }
  ],
  'nargacuga__sns': [
    { id: 'resuscitate', thresholds: [[5, 1], [8, 2]
    ] }
  ],
  'nargacuga__waist': [
    { id: 'evasive_reload', thresholds: [[5, 1], [6, 2]
    ] },
    { id: 'peak_performance', thresholds: [[8, 1]
    ] }
  ],
  'nergigante__arms': [
    { id: 'guard', thresholds: [[8, 1]
    ] },
    { id: 'nergigante_greed', thresholds: [[6, 1]
    ] },
    { id: 'offensive_guard', thresholds: [[6, 1]
    ] }
  ],
  'nergigante__bow': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'partbreaker', thresholds: [[8, 2]
    ] }
  ],
  'nergigante__cb': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'partbreaker', thresholds: [[8, 2]
    ] }
  ],
  'nergigante__chest': [
    { id: 'evade_extender', thresholds: [[8, 1]
    ] },
    { id: 'nergigante_greed', thresholds: [[6, 1]
    ] },
    { id: 'sneak_attack', thresholds: [[6, 1]
    ] }
  ],
  'nergigante__db': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'partbreaker', thresholds: [[8, 2]
    ] }
  ],
  'nergigante__gl': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'partbreaker', thresholds: [[8, 2]
    ] }
  ],
  'nergigante__gs': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'partbreaker', thresholds: [[8, 2]
    ] }
  ],
  'nergigante__hbg': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'partbreaker', thresholds: [[8, 2]
    ] }
  ],
  'nergigante__head': [
    { id: 'artful_dodger', thresholds: [[8, 1]
    ] },
    { id: 'critical_eye', thresholds: [[6, 1]
    ] },
    { id: 'nergigante_greed', thresholds: [[6, 1]
    ] }
  ],
  'nergigante__hh': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'partbreaker', thresholds: [[8, 2]
    ] }
  ],
  'nergigante__hmr': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'partbreaker', thresholds: [[8, 2]
    ] }
  ],
  'nergigante__ig': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'partbreaker', thresholds: [[8, 2]
    ] }
  ],
  'nergigante__lbg': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'partbreaker', thresholds: [[8, 2]
    ] }
  ],
  'nergigante__legs': [
    { id: 'nergigante_greed', thresholds: [[6, 1]
    ] },
    { id: 'recoil_down', thresholds: [[8, 1]
    ] },
    { id: 'reload_speed', thresholds: [[6, 1]
    ] }
  ],
  'nergigante__lnc': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'partbreaker', thresholds: [[8, 2]
    ] }
  ],
  'nergigante__ls': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'partbreaker', thresholds: [[8, 2]
    ] }
  ],
  'nergigante__sa': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'partbreaker', thresholds: [[8, 2]
    ] }
  ],
  'nergigante__sns': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'partbreaker', thresholds: [[8, 2]
    ] }
  ],
  'nergigante__waist': [
    { id: 'attack_boost', thresholds: [[6, 1]
    ] },
    { id: 'nergigante_greed', thresholds: [[6, 1]
    ] },
    { id: 'partbreaker', thresholds: [[8, 1]
    ] }
  ],
  'nightshade_paolumu__arms': [
    { id: 'sleep_attack', thresholds: [[5, 1], [6, 2]
    ] }
  ],
  'nightshade_paolumu__bow': [
    { id: 'sneak_attack', thresholds: [[8, 1]
    ] }
  ],
  'nightshade_paolumu__chest': [
    { id: 'focus', thresholds: [[5, 1], [8, 2]
    ] },
    { id: 'sleep_resistance', thresholds: [[6, 1]
    ] }
  ],
  'nightshade_paolumu__gs': [
    { id: 'sneak_attack', thresholds: [[8, 1]
    ] }
  ],
  'nightshade_paolumu__hbg': [
    { id: 'sneak_attack', thresholds: [[8, 1]
    ] }
  ],
  'nightshade_paolumu__head': [
    { id: 'sleep_enhancement', thresholds: [[5, 1], [8, 2]
    ] }
  ],
  'nightshade_paolumu__hh': [
    { id: 'sneak_attack', thresholds: [[8, 1]
    ] }
  ],
  'nightshade_paolumu__hmr': [
    { id: 'sneak_attack', thresholds: [[8, 1]
    ] }
  ],
  'nightshade_paolumu__ig': [
    { id: 'sneak_attack', thresholds: [[8, 1]
    ] }
  ],
  'nightshade_paolumu__lbg': [
    { id: 'sneak_attack', thresholds: [[8, 1]
    ] }
  ],
  'nightshade_paolumu__legs': [
    { id: 'abnormal_status_enhancement', thresholds: [[6, 1]
    ] },
    { id: 'sleep_enhancement', thresholds: [[5, 1]
    ] }
  ],
  'nightshade_paolumu__lnc': [
    { id: 'sneak_attack', thresholds: [[8, 1]
    ] }
  ],
  'nightshade_paolumu__sa': [
    { id: 'sneak_attack', thresholds: [[8, 1]
    ] }
  ],
  'nightshade_paolumu__sns': [
    { id: 'sneak_attack', thresholds: [[8, 1]
    ] }
  ],
  'nightshade_paolumu__waist': [
    { id: 'evade_extender', thresholds: [[6, 1]
    ] },
    { id: 'sneak_attack', thresholds: [[5, 1], [8, 2]
    ] }
  ],
  'odogaron__arms': [
    { id: 'bleeding_resistance', thresholds: [[4, 1], [6, 2]
    ] },
    { id: 'feat_of_agility', thresholds: [[4, 1]
    ] }
  ],
  'odogaron__cb': [
    { id: 'perfect_evade_sp_charge', thresholds: [[8, 1]
    ] }
  ],
  'odogaron__chest': [
    { id: 'bleeding_resistance', thresholds: [[4, 1]
    ] },
    { id: 'critical_eye', thresholds: [[4, 1], [6, 2]
    ] }
  ],
  'odogaron__db': [
    { id: 'perfect_evade_sp_charge', thresholds: [[8, 1]
    ] }
  ],
  'odogaron__head': [
    { id: 'feat_of_agility', thresholds: [[4, 1], [6, 2]
    ] }
  ],
  'odogaron__ig': [
    { id: 'perfect_evade_sp_charge', thresholds: [[8, 1]
    ] }
  ],
  'odogaron__lbg': [
    { id: 'perfect_evade_sp_charge', thresholds: [[8, 1]
    ] }
  ],
  'odogaron__legs': [
    { id: 'perfect_evade_sp_charge', thresholds: [[4, 1], [6, 2]
    ] }
  ],
  'odogaron__lnc': [
    { id: 'perfect_evade_sp_charge', thresholds: [[8, 1]
    ] }
  ],
  'odogaron__waist': [
    { id: 'critical_eye', thresholds: [[4, 1]
    ] },
    { id: 'perfect_evade_sp_charge', thresholds: [[6, 1]
    ] }
  ],
  'paolumu__arms': [
    { id: 'concentration', thresholds: [[3, 1], [6, 2]
    ] },
    { id: 'divine_blessing', thresholds: [[4, 1]
    ] }
  ],
  'paolumu__chest': [
    { id: 'recoil_down', thresholds: [[3, 1], [6, 2]
    ] }
  ],
  'paolumu__head': [
    { id: 'concentration', thresholds: [[3, 1]
    ] },
    { id: 'windproof', thresholds: [[4, 1]
    ] }
  ],
  'paolumu__hh': [
    { id: 'divine_blessing', thresholds: [[4, 1], [8, 2]
    ] }
  ],
  'paolumu__lbg': [
    { id: 'divine_blessing', thresholds: [[4, 1], [8, 2]
    ] }
  ],
  'paolumu__legs': [
    { id: 'windproof', thresholds: [[3, 1], [6, 2]
    ] }
  ],
  'paolumu__sa': [
    { id: 'divine_blessing', thresholds: [[4, 1], [8, 2]
    ] }
  ],
  'paolumu__sns': [
    { id: 'divine_blessing', thresholds: [[4, 1], [8, 2]
    ] }
  ],
  'paolumu__waist': [
    { id: 'divine_blessing', thresholds: [[3, 1], [6, 2]
    ] }
  ],
  'pink_rathian__arms': [
    { id: 'critical_eye', thresholds: [[6, 1]
    ] },
    { id: 'windproof', thresholds: [[5, 2]
    ] }
  ],
  'pink_rathian__bow': [
    { id: 'evade_extender', thresholds: [[8, 1]
    ] }
  ],
  'pink_rathian__cb': [
    { id: 'evade_extender', thresholds: [[8, 1]
    ] }
  ],
  'pink_rathian__chest': [
    { id: 'dragon_attack', thresholds: [[5, 1]
    ] },
    { id: 'focus', thresholds: [[6, 1]
    ] }
  ],
  'pink_rathian__gl': [
    { id: 'evade_extender', thresholds: [[8, 1]
    ] }
  ],
  'pink_rathian__head': [
    { id: 'special_boost', thresholds: [[5, 1]
    ] },
    { id: 'windproof', thresholds: [[6, 1]
    ] }
  ],
  'pink_rathian__hh': [
    { id: 'evade_extender', thresholds: [[8, 1]
    ] }
  ],
  'pink_rathian__legs': [
    { id: 'dragon_attack', thresholds: [[6, 1]
    ] },
    { id: 'special_boost', thresholds: [[5, 2]
    ] }
  ],
  'pink_rathian__ls': [
    { id: 'evade_extender', thresholds: [[8, 1]
    ] }
  ],
  'pink_rathian__sns': [
    { id: 'evade_extender', thresholds: [[8, 1]
    ] }
  ],
  'pink_rathian__waist': [
    { id: 'critical_eye', thresholds: [[5, 1], [6, 2]
    ] }
  ],
  'pukei_pukei__arms': [
    { id: 'poison_attack', thresholds: [[2, 1]
    ] },
    { id: 'poison_resistance', thresholds: [[4, 1]
    ] }
  ],
  'pukei_pukei__bow': [
    { id: 'sneak_attack', thresholds: [[8, 1]
    ] }
  ],
  'pukei_pukei__chest': [
    { id: 'focus', thresholds: [[4, 1]
    ] },
    { id: 'poison_resistance', thresholds: [[2, 1]
    ] }
  ],
  'pukei_pukei__gs': [
    { id: 'sneak_attack', thresholds: [[8, 1]
    ] }
  ],
  'pukei_pukei__hbg': [
    { id: 'sneak_attack', thresholds: [[8, 1]
    ] }
  ],
  'pukei_pukei__head': [
    { id: 'focus', thresholds: [[2, 1]
    ] },
    { id: 'health_boost', thresholds: [[4, 1], [6, 2]
    ] }
  ],
  'pukei_pukei__hh': [
    { id: 'sneak_attack', thresholds: [[8, 1]
    ] }
  ],
  'pukei_pukei__hmr': [
    { id: 'sneak_attack', thresholds: [[8, 1]
    ] }
  ],
  'pukei_pukei__ig': [
    { id: 'sneak_attack', thresholds: [[8, 1]
    ] }
  ],
  'pukei_pukei__legs': [
    { id: 'health_boost', thresholds: [[2, 1]
    ] },
    { id: 'poison_resistance', thresholds: [[4, 1]
    ] }
  ],
  'pukei_pukei__lnc': [
    { id: 'sneak_attack', thresholds: [[8, 1]
    ] }
  ],
  'pukei_pukei__sa': [
    { id: 'sneak_attack', thresholds: [[8, 1]
    ] }
  ],
  'pukei_pukei__sns': [
    { id: 'sneak_attack', thresholds: [[8, 1]
    ] }
  ],
  'pukei_pukei__waist': [
    { id: 'poison_attack', thresholds: [[2, 1], [6, 2]
    ] }
  ],
  'quematrice__arms': [
    { id: 'recoil_down', thresholds: [[6, 1]
    ] },
    { id: 'spare_shot', thresholds: [[2, 1]
    ] }
  ],
  'quematrice__bow': [
    { id: 'bravery', thresholds: [[4, 1]
    ] }
  ],
  'quematrice__chest': [
    { id: 'enhancement_normal_ammo', thresholds: [[2, 1], [6, 2]
    ] },
    { id: 'spare_shot', thresholds: [[4, 1]
    ] }
  ],
  'quematrice__db': [
    { id: 'bravery', thresholds: [[4, 1]
    ] }
  ],
  'quematrice__gl': [
    { id: 'bravery', thresholds: [[4, 1]
    ] }
  ],
  'quematrice__gs': [
    { id: 'bravery', thresholds: [[4, 1]
    ] }
  ],
  'quematrice__head': [
    { id: 'artillery', thresholds: [[2, 1], [6, 2]
    ] },
    { id: 'lock_on', thresholds: [[4, 1]
    ] }
  ],
  'quematrice__legs': [
    { id: 'attack_boost', thresholds: [[2, 1], [4, 2], [6, 3]
    ] }
  ],
  'quematrice__lnc': [
    { id: 'bravery', thresholds: [[4, 1]
    ] }
  ],
  'quematrice__ls': [
    { id: 'bravery', thresholds: [[4, 1]
    ] }
  ],
  'quematrice__sns': [
    { id: 'bravery', thresholds: [[4, 1]
    ] }
  ],
  'quematrice__waist': [
    { id: 'concentration', thresholds: [[4, 1]
    ] },
    { id: 'move_forward_strengthen', thresholds: [[2, 1], [6, 2]
    ] }
  ],
  'radobaan__arms': [
    { id: 'sleep_resistance', thresholds: [[4, 1]
    ] },
    { id: 'slugger', thresholds: [[2, 1]
    ] }
  ],
  'radobaan__chest': [
    { id: 'defense_boost', thresholds: [[4, 1], [6, 2]
    ] },
    { id: 'sleep_attack', thresholds: [[2, 1]
    ] }
  ],
  'radobaan__gs': [
    { id: 'defense_boost', thresholds: [[4, 1], [8, 2]
    ] }
  ],
  'radobaan__hbg': [
    { id: 'defense_boost', thresholds: [[4, 1], [8, 2]
    ] }
  ],
  'radobaan__head': [
    { id: 'guard', thresholds: [[2, 1], [6, 2]
    ] }
  ],
  'radobaan__hh': [
    { id: 'defense_boost', thresholds: [[4, 1], [8, 2]
    ] }
  ],
  'radobaan__hmr': [
    { id: 'defense_boost', thresholds: [[4, 1], [8, 2]
    ] }
  ],
  'radobaan__legs': [
    { id: 'guard', thresholds: [[4, 1]
    ] },
    { id: 'sleep_resistance', thresholds: [[2, 1]
    ] }
  ],
  'radobaan__sns': [
    { id: 'defense_boost', thresholds: [[4, 1], [8, 2]
    ] }
  ],
  'radobaan__waist': [
    { id: 'sleep_attack', thresholds: [[2, 1], [6, 2]
    ] }
  ],
  'rajang__arms': [
    { id: 'fighting_spirit', thresholds: [[5, 1], [6, 2]
    ] }
  ],
  'rajang__bow': [
    { id: 'rising_tide', thresholds: [[8, 2]
    ] }
  ],
  'rajang__cb': [
    { id: 'feat_of_agility', thresholds: [[8, 1]
    ] }
  ],
  'rajang__chest': [
    { id: 'concentration', thresholds: [[6, 1]
    ] },
    { id: 'fighting_spirit', thresholds: [[5, 1]
    ] }
  ],
  'rajang__db': [
    { id: 'power_prolonger', thresholds: [[8, 2]
    ] }
  ],
  'rajang__gl': [
    { id: 'guarding_reload', thresholds: [[8, 1]
    ] }
  ],
  'rajang__gs': [
    { id: 'resentment', thresholds: [[8, 2]
    ] }
  ],
  'rajang__hbg': [
    { id: 'offensive_guard', thresholds: [[8, 2]
    ] }
  ],
  'rajang__head': [
    { id: 'thunder_resistance', thresholds: [[5, 1], [6, 2], [8, 3]
    ] }
  ],
  'rajang__hh': [
    { id: 'attack_up_critical_down', thresholds: [[8, 1]
    ] }
  ],
  'rajang__hmr': [
    { id: 'partbreaker', thresholds: [[8, 1]
    ] }
  ],
  'rajang__ig': [
    { id: 'airborne', thresholds: [[8, 2]
    ] }
  ],
  'rajang__lbg': [
    { id: 'artillery', thresholds: [[8, 1]
    ] }
  ],
  'rajang__legs': [
    { id: 'resentment', thresholds: [[5, 1], [6, 2]
    ] },
    { id: 'tremor_resistance', thresholds: [[8, 1]
    ] }
  ],
  'rajang__lnc': [
    { id: 'burst', thresholds: [[8, 2]
    ] }
  ],
  'rajang__ls': [
    { id: 'focus', thresholds: [[8, 1]
    ] }
  ],
  'rajang__sa': [
    { id: 'fighting_spirit', thresholds: [[8, 1]
    ] }
  ],
  'rajang__sns': [
    { id: 'slugger', thresholds: [[8, 2]
    ] }
  ],
  'rajang__waist': [
    { id: 'focus', thresholds: [[5, 1], [6, 2], [8, 3]
    ] }
  ],
  'rathalos__arms': [
    { id: 'attack_boost', thresholds: [[6, 1]
    ] },
    { id: 'fire_resistance', thresholds: [[5, 1]
    ] }
  ],
  'rathalos__bow': [
    { id: 'earplugs', thresholds: [[8, 1]
    ] }
  ],
  'rathalos__cb': [
    { id: 'earplugs', thresholds: [[8, 1]
    ] }
  ],
  'rathalos__chest': [
    { id: 'weakness_exploit', thresholds: [[5, 1], [6, 2]
    ] }
  ],
  'rathalos__db': [
    { id: 'earplugs', thresholds: [[8, 1]
    ] },
    { id: 'health_boost', thresholds: [[8, 1]
    ] }
  ],
  'rathalos__gl': [
    { id: 'earplugs', thresholds: [[8, 1]
    ] }
  ],
  'rathalos__gs': [
    { id: 'earplugs', thresholds: [[8, 1]
    ] }
  ],
  'rathalos__head': [
    { id: 'attack_boost', thresholds: [[5, 2]
    ] },
    { id: 'fire_attack', thresholds: [[6, 1]
    ] }
  ],
  'rathalos__hh': [
    { id: 'earplugs', thresholds: [[8, 1]
    ] }
  ],
  'rathalos__hmr': [
    { id: 'earplugs', thresholds: [[8, 1]
    ] }
  ],
  'rathalos__ig': [
    { id: 'earplugs', thresholds: [[8, 1]
    ] }
  ],
  'rathalos__lbg': [
    { id: 'earplugs', thresholds: [[8, 1]
    ] }
  ],
  'rathalos__legs': [
    { id: 'fire_resistance', thresholds: [[5, 1]
    ] },
    { id: 'weakness_exploit', thresholds: [[6, 1]
    ] }
  ],
  'rathalos__lnc': [
    { id: 'earplugs', thresholds: [[8, 1]
    ] }
  ],
  'rathalos__ls': [
    { id: 'earplugs', thresholds: [[8, 1]
    ] }
  ],
  'rathalos__sa': [
    { id: 'earplugs', thresholds: [[8, 1]
    ] }
  ],
  'rathalos__sns': [
    { id: 'earplugs', thresholds: [[8, 1]
    ] }
  ],
  'rathalos__waist': [
    { id: 'fire_attack', thresholds: [[6, 1]
    ] },
    { id: 'focus', thresholds: [[5, 1]
    ] }
  ],
  'rathian__arms': [
    { id: 'burst', thresholds: [[4, 1], [6, 2]
    ] },
    { id: 'lock_on', thresholds: [[4, 1]
    ] }
  ],
  'rathian__bow': [
    { id: 'health_boost', thresholds: [[4, 1], [8, 2]
    ] }
  ],
  'rathian__cb': [
    { id: 'health_boost', thresholds: [[4, 1], [8, 2]
    ] }
  ],
  'rathian__chest': [
    { id: 'poison_attack', thresholds: [[4, 1], [6, 2]
    ] }
  ],
  'rathian__gl': [
    { id: 'health_boost', thresholds: [[4, 1], [8, 2]
    ] }
  ],
  'rathian__hbg': [
    { id: 'health_boost', thresholds: [[4, 1], [8, 2]
    ] }
  ],
  'rathian__head': [
    { id: 'health_boost', thresholds: [[4, 2]
    ] },
    { id: 'poison_attack', thresholds: [[6, 1]
    ] }
  ],
  'rathian__hh': [
    { id: 'health_boost', thresholds: [[4, 1], [8, 2]
    ] }
  ],
  'rathian__ig': [
    { id: 'health_boost', thresholds: [[4, 1], [8, 2]
    ] }
  ],
  'rathian__legs': [
    { id: 'health_boost', thresholds: [[4, 1], [6, 2]
    ] }
  ],
  'rathian__ls': [
    { id: 'health_boost', thresholds: [[4, 1], [8, 2]
    ] }
  ],
  'rathian__sa': [
    { id: 'health_boost', thresholds: [[4, 1], [8, 2]
    ] }
  ],
  'rathian__sns': [
    { id: 'health_boost', thresholds: [[4, 1], [8, 2]
    ] }
  ],
  'rathian__waist': [
    { id: 'burst', thresholds: [[6, 1]
    ] },
    { id: 'poison_resistance', thresholds: [[4, 1]
    ] }
  ],
  'seregios__arms': [
    { id: 'attack_boost', thresholds: [[6, 1], [8, 2]
    ] },
    { id: 'powerhouse', thresholds: [[5, 1]
    ] }
  ],
  'seregios__bow': [
    { id: 'powerhouse', thresholds: [[8, 1]
    ] }
  ],
  'seregios__cb': [
    { id: 'powerhouse', thresholds: [[8, 1]
    ] }
  ],
  'seregios__chest': [
    { id: 'burst', thresholds: [[8, 1]
    ] },
    { id: 'powerhouse', thresholds: [[5, 1]
    ] }
  ],
  'seregios__db': [
    { id: 'powerhouse', thresholds: [[8, 1]
    ] }
  ],
  'seregios__gl': [
    { id: 'powerhouse', thresholds: [[8, 1]
    ] }
  ],
  'seregios__gs': [
    { id: 'powerhouse', thresholds: [[8, 1]
    ] }
  ],
  'seregios__hbg': [
    { id: 'powerhouse', thresholds: [[8, 1]
    ] }
  ],
  'seregios__head': [
    { id: 'powerhouse', thresholds: [[5, 1]
    ] },
    { id: 'powerhouse_critical', thresholds: [[8, 1]
    ] }
  ],
  'seregios__hh': [
    { id: 'powerhouse', thresholds: [[8, 1]
    ] }
  ],
  'seregios__hmr': [
    { id: 'powerhouse', thresholds: [[8, 1]
    ] }
  ],
  'seregios__ig': [
    { id: 'powerhouse', thresholds: [[8, 1]
    ] }
  ],
  'seregios__lbg': [
    { id: 'powerhouse', thresholds: [[8, 1]
    ] }
  ],
  'seregios__legs': [
    { id: 'lock_on', thresholds: [[5, 1]
    ] },
    { id: 'offensive_guard', thresholds: [[8, 1]
    ] },
    { id: 'powerhouse', thresholds: [[5, 1]
    ] }
  ],
  'seregios__lnc': [
    { id: 'powerhouse', thresholds: [[8, 1]
    ] }
  ],
  'seregios__ls': [
    { id: 'powerhouse', thresholds: [[8, 1]
    ] }
  ],
  'seregios__sa': [
    { id: 'powerhouse', thresholds: [[8, 1]
    ] }
  ],
  'seregios__sns': [
    { id: 'powerhouse', thresholds: [[8, 1]
    ] }
  ],
  'seregios__waist': [
    { id: 'ballistic', thresholds: [[8, 1]
    ] },
    { id: 'enhancement_normal_ammo', thresholds: [[5, 1]
    ] },
    { id: 'powerhouse', thresholds: [[5, 1]
    ] }
  ],
  'shogun_ceanataur__arms': [
    { id: 'lock_on', thresholds: [[4, 1]
    ] },
    { id: 'water_attack', thresholds: [[6, 1]
    ] },
    { id: 'water_attack_boost_secret', thresholds: [[4, 1]
    ] }
  ],
  'shogun_ceanataur__bow': [
    { id: 'break_attack_boost', thresholds: [[8, 1]
    ] }
  ],
  'shogun_ceanataur__cb': [
    { id: 'break_attack_boost', thresholds: [[8, 1]
    ] }
  ],
  'shogun_ceanataur__chest': [
    { id: 'enhancement_slicing_ammo', thresholds: [[4, 1]
    ] },
    { id: 'recoil_down', thresholds: [[6, 1], [8, 2]
    ] }
  ],
  'shogun_ceanataur__db': [
    { id: 'break_attack_boost', thresholds: [[8, 1]
    ] }
  ],
  'shogun_ceanataur__gs': [
    { id: 'break_attack_boost', thresholds: [[8, 1]
    ] }
  ],
  'shogun_ceanataur__hbg': [
    { id: 'break_attack_boost', thresholds: [[8, 1]
    ] }
  ],
  'shogun_ceanataur__head': [
    { id: 'break_attack_boost', thresholds: [[6, 1]
    ] },
    { id: 'high_performance_water', thresholds: [[4, 1]
    ] }
  ],
  'shogun_ceanataur__hmr': [
    { id: 'break_attack_boost', thresholds: [[8, 1]
    ] }
  ],
  'shogun_ceanataur__legs': [
    { id: 'enhancement_slicing_ammo', thresholds: [[4, 1], [6, 2]
    ] },
    { id: 'water_attack_boost_secret', thresholds: [[4, 1]
    ] }
  ],
  'shogun_ceanataur__lnc': [
    { id: 'break_attack_boost', thresholds: [[8, 1]
    ] }
  ],
  'shogun_ceanataur__ls': [
    { id: 'break_attack_boost', thresholds: [[8, 1]
    ] }
  ],
  'shogun_ceanataur__waist': [
    { id: 'part_breaker_tail', thresholds: [[4, 1]
    ] },
    { id: 'water_attack_boost_secret', thresholds: [[4, 1]
    ] }
  ],
  'silver_rathalos__arms': [
    { id: 'latent_power', thresholds: [[6, 2]
    ] }
  ],
  'silver_rathalos__bow': [
    { id: 'critical_element', thresholds: [[6, 1], [8, 2]
    ] }
  ],
  'silver_rathalos__cb': [
    { id: 'critical_element', thresholds: [[6, 1], [8, 2]
    ] }
  ],
  'silver_rathalos__chest': [
    { id: 'critical_boost', thresholds: [[8, 1]
    ] },
    { id: 'fire_attack', thresholds: [[6, 1]
    ] }
  ],
  'silver_rathalos__db': [
    { id: 'critical_element', thresholds: [[6, 1], [8, 2]
    ] },
    { id: 'pursuit_poison', thresholds: [[8, 1]
    ] }
  ],
  'silver_rathalos__gl': [
    { id: 'critical_element', thresholds: [[6, 1], [8, 2]
    ] }
  ],
  'silver_rathalos__gs': [
    { id: 'critical_element', thresholds: [[6, 1], [8, 2]
    ] }
  ],
  'silver_rathalos__head': [
    { id: 'critical_element', thresholds: [[6, 1], [8, 2]
    ] }
  ],
  'silver_rathalos__hmr': [
    { id: 'critical_element', thresholds: [[6, 1], [8, 2]
    ] }
  ],
  'silver_rathalos__ig': [
    { id: 'critical_element', thresholds: [[6, 1], [8, 2]
    ] },
    { id: 'pursuit_poison', thresholds: [[8, 1]
    ] }
  ],
  'silver_rathalos__lbg': [
    { id: 'critical_element', thresholds: [[6, 1], [8, 2]
    ] }
  ],
  'silver_rathalos__legs': [
    { id: 'critical_element', thresholds: [[6, 1]
    ] },
    { id: 'weakness_exploit', thresholds: [[8, 1]
    ] }
  ],
  'silver_rathalos__lnc': [
    { id: 'critical_element', thresholds: [[6, 1], [8, 2]
    ] }
  ],
  'silver_rathalos__ls': [
    { id: 'critical_element', thresholds: [[6, 1], [8, 2]
    ] }
  ],
  'silver_rathalos__sa': [
    { id: 'critical_element', thresholds: [[6, 1], [8, 2]
    ] }
  ],
  'silver_rathalos__sns': [
    { id: 'critical_element', thresholds: [[6, 1], [8, 2]
    ] }
  ],
  'silver_rathalos__waist': [
    { id: 'windproof', thresholds: [[6, 2]
    ] }
  ],
  'somnacanth__arms': [
    { id: 'evasive_reload', thresholds: [[4, 1], [6, 2]
    ] }
  ],
  'somnacanth__cb': [
    { id: 'evade_extender', thresholds: [[8, 1]
    ] }
  ],
  'somnacanth__chest': [
    { id: 'airborne', thresholds: [[4, 1], [6, 2]
    ] }
  ],
  'somnacanth__db': [
    { id: 'evade_extender', thresholds: [[8, 1]
    ] }
  ],
  'somnacanth__gs': [
    { id: 'evade_extender', thresholds: [[8, 1]
    ] }
  ],
  'somnacanth__head': [
    { id: 'evade_extender', thresholds: [[6, 1]
    ] },
    { id: 'evasive_reload', thresholds: [[4, 1]
    ] }
  ],
  'somnacanth__hh': [
    { id: 'evade_extender', thresholds: [[8, 1]
    ] }
  ],
  'somnacanth__hmr': [
    { id: 'evade_extender', thresholds: [[8, 1]
    ] }
  ],
  'somnacanth__ig': [
    { id: 'evade_extender', thresholds: [[8, 1]
    ] }
  ],
  'somnacanth__legs': [
    { id: 'abnormal_status_enhancement', thresholds: [[4, 1], [6, 2]
    ] }
  ],
  'somnacanth__ls': [
    { id: 'evade_extender', thresholds: [[8, 1]
    ] }
  ],
  'somnacanth__waist': [
    { id: 'sleep_attack', thresholds: [[4, 1]
    ] },
    { id: 'sleep_enhancement', thresholds: [[6, 1]
    ] }
  ],
  'stygian_zinogre__arms': [
    { id: 'dragon_attack', thresholds: [[8, 1]
    ] },
    { id: 'dragon_attack_boost_secret', thresholds: [[5, 1]
    ] },
    { id: 'lock_on', thresholds: [[5, 1]
    ] }
  ],
  'stygian_zinogre__bow': [
    { id: 'dragon_attack', thresholds: [[5, 1]
    ] },
    { id: 'dragon_attack_boost_secret', thresholds: [[8, 1]
    ] }
  ],
  'stygian_zinogre__cb': [
    { id: 'dragon_attack', thresholds: [[5, 1]
    ] },
    { id: 'dragon_attack_boost_secret', thresholds: [[8, 1]
    ] }
  ],
  'stygian_zinogre__chest': [
    { id: 'dragon_attack_boost_secret', thresholds: [[5, 1]
    ] },
    { id: 'sp_overdrive', thresholds: [[5, 1], [8, 2]
    ] }
  ],
  'stygian_zinogre__db': [
    { id: 'dragon_attack', thresholds: [[5, 1]
    ] },
    { id: 'dragon_attack_boost_secret', thresholds: [[8, 1]
    ] }
  ],
  'stygian_zinogre__gl': [
    { id: 'dragon_attack', thresholds: [[5, 1]
    ] },
    { id: 'dragon_attack_boost_secret', thresholds: [[8, 1]
    ] }
  ],
  'stygian_zinogre__gs': [
    { id: 'dragon_attack', thresholds: [[5, 1]
    ] },
    { id: 'dragon_attack_boost_secret', thresholds: [[8, 1]
    ] }
  ],
  'stygian_zinogre__hbg': [
    { id: 'dragon_attack', thresholds: [[5, 1]
    ] },
    { id: 'dragon_attack_boost_secret', thresholds: [[8, 1]
    ] }
  ],
  'stygian_zinogre__head': [
    { id: 'dragon_attack', thresholds: [[5, 1], [8, 2]
    ] },
    { id: 'dragon_attack_boost_secret', thresholds: [[5, 1]
    ] }
  ],
  'stygian_zinogre__hh': [
    { id: 'dragon_attack', thresholds: [[5, 1]
    ] },
    { id: 'dragon_attack_boost_secret', thresholds: [[8, 1]
    ] }
  ],
  'stygian_zinogre__hmr': [
    { id: 'dragon_attack', thresholds: [[5, 1]
    ] },
    { id: 'dragon_attack_boost_secret', thresholds: [[8, 1]
    ] }
  ],
  'stygian_zinogre__ig': [
    { id: 'dragon_attack', thresholds: [[5, 1]
    ] },
    { id: 'dragon_attack_boost_secret', thresholds: [[8, 1]
    ] }
  ],
  'stygian_zinogre__lbg': [
    { id: 'dragon_attack', thresholds: [[5, 1]
    ] },
    { id: 'dragon_attack_boost_secret', thresholds: [[8, 1]
    ] }
  ],
  'stygian_zinogre__legs': [
    { id: 'sp_overdrive', thresholds: [[5, 1], [6, 2], [8, 3]
    ] }
  ],
  'stygian_zinogre__lnc': [
    { id: 'dragon_attack', thresholds: [[5, 1]
    ] },
    { id: 'dragon_attack_boost_secret', thresholds: [[8, 1]
    ] }
  ],
  'stygian_zinogre__ls': [
    { id: 'dragon_attack', thresholds: [[5, 1]
    ] },
    { id: 'dragon_attack_boost_secret', thresholds: [[8, 1]
    ] }
  ],
  'stygian_zinogre__sa': [
    { id: 'dragon_attack', thresholds: [[5, 1]
    ] },
    { id: 'dragon_attack_boost_secret', thresholds: [[8, 1]
    ] }
  ],
  'stygian_zinogre__sns': [
    { id: 'dragon_attack', thresholds: [[5, 1]
    ] },
    { id: 'dragon_attack_boost_secret', thresholds: [[8, 1]
    ] }
  ],
  'stygian_zinogre__waist': [
    { id: 'fighting_spirit', thresholds: [[8, 1]
    ] },
    { id: 'high_performance_dragon', thresholds: [[5, 1]
    ] }
  ],
  'teostra__arms': [
    { id: 'artillery', thresholds: [[6, 1]
    ] },
    { id: 'guard', thresholds: [[8, 1]
    ] },
    { id: 'teostra_bless', thresholds: [[6, 1]
    ] }
  ],
  'teostra__bow': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'heroics', thresholds: [[8, 2]
    ] }
  ],
  'teostra__cb': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'heroics', thresholds: [[8, 2]
    ] }
  ],
  'teostra__chest': [
    { id: 'artful_dodger', thresholds: [[8, 1]
    ] },
    { id: 'critical_eye', thresholds: [[6, 1]
    ] },
    { id: 'teostra_bless', thresholds: [[6, 1]
    ] }
  ],
  'teostra__gs': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'heroics', thresholds: [[8, 2]
    ] }
  ],
  'teostra__hbg': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'heroics', thresholds: [[8, 2]
    ] }
  ],
  'teostra__head': [
    { id: 'guts', thresholds: [[8, 1]
    ] },
    { id: 'latent_power', thresholds: [[6, 1]
    ] },
    { id: 'teostra_bless', thresholds: [[6, 1]
    ] }
  ],
  'teostra__hh': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'heroics', thresholds: [[8, 2]
    ] }
  ],
  'teostra__hmr': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'heroics', thresholds: [[8, 2]
    ] }
  ],
  'teostra__lbg': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'heroics', thresholds: [[8, 2]
    ] }
  ],
  'teostra__legs': [
    { id: 'critical_boost', thresholds: [[6, 1]
    ] },
    { id: 'evade_extender', thresholds: [[8, 1]
    ] },
    { id: 'teostra_bless', thresholds: [[6, 1]
    ] }
  ],
  'teostra__lnc': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'heroics', thresholds: [[8, 2]
    ] }
  ],
  'teostra__ls': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'heroics', thresholds: [[8, 2]
    ] }
  ],
  'teostra__sa': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'heroics', thresholds: [[8, 2]
    ] }
  ],
  'teostra__sns': [
    { id: 'elder_dragon_resonance', thresholds: [[6, 1]
    ] },
    { id: 'heroics', thresholds: [[8, 2]
    ] }
  ],
  'teostra__waist': [
    { id: 'burst', thresholds: [[8, 1]
    ] },
    { id: 'power_prolonger', thresholds: [[6, 1]
    ] },
    { id: 'teostra_bless', thresholds: [[6, 1]
    ] }
  ],
  'tigrex__arms': [
    { id: 'earplugs', thresholds: [[5, 1], [6, 2]
    ] }
  ],
  'tigrex__bow': [
    { id: 'brutal_strike', thresholds: [[8, 1]
    ] }
  ],
  'tigrex__cb': [
    { id: 'brutal_strike', thresholds: [[8, 1]
    ] }
  ],
  'tigrex__chest': [
    { id: 'guts', thresholds: [[5, 1]
    ] },
    { id: 'heroics', thresholds: [[5, 1], [8, 2]
    ] }
  ],
  'tigrex__db': [
    { id: 'brutal_strike', thresholds: [[8, 1]
    ] }
  ],
  'tigrex__gl': [
    { id: 'brutal_strike', thresholds: [[8, 1]
    ] }
  ],
  'tigrex__gs': [
    { id: 'brutal_strike', thresholds: [[8, 1]
    ] }
  ],
  'tigrex__hbg': [
    { id: 'brutal_strike', thresholds: [[8, 1]
    ] }
  ],
  'tigrex__head': [
    { id: 'brutal_strike', thresholds: [[5, 1]
    ] },
    { id: 'concentration', thresholds: [[6, 1]
    ] }
  ],
  'tigrex__hh': [
    { id: 'brutal_strike', thresholds: [[8, 1]
    ] }
  ],
  'tigrex__hmr': [
    { id: 'brutal_strike', thresholds: [[8, 1]
    ] }
  ],
  'tigrex__ig': [
    { id: 'brutal_strike', thresholds: [[8, 1]
    ] }
  ],
  'tigrex__lbg': [
    { id: 'brutal_strike', thresholds: [[8, 1]
    ] }
  ],
  'tigrex__legs': [
    { id: 'lock_on', thresholds: [[5, 1]
    ] },
    { id: 'partbreaker', thresholds: [[5, 1], [8, 2]
    ] }
  ],
  'tigrex__lnc': [
    { id: 'brutal_strike', thresholds: [[8, 1]
    ] }
  ],
  'tigrex__ls': [
    { id: 'brutal_strike', thresholds: [[8, 1]
    ] }
  ],
  'tigrex__sa': [
    { id: 'brutal_strike', thresholds: [[8, 1]
    ] }
  ],
  'tigrex__sns': [
    { id: 'brutal_strike', thresholds: [[8, 1]
    ] }
  ],
  'tigrex__waist': [
    { id: 'brutal_strike', thresholds: [[5, 1], [6, 2]
    ] }
  ],
  'tobi_kadachi__arms': [
    { id: 'artful_dodger', thresholds: [[4, 1]
    ] },
    { id: 'evade_extender', thresholds: [[2, 1], [6, 2]
    ] }
  ],
  'tobi_kadachi__bow': [
    { id: 'evade_extender', thresholds: [[8, 1]
    ] }
  ],
  'tobi_kadachi__cb': [
    { id: 'evade_extender', thresholds: [[8, 1]
    ] }
  ],
  'tobi_kadachi__chest': [
    { id: 'evade_extender', thresholds: [[2, 1]
    ] },
    { id: 'thunder_attack', thresholds: [[4, 1]
    ] }
  ],
  'tobi_kadachi__db': [
    { id: 'evade_extender', thresholds: [[8, 1]
    ] }
  ],
  'tobi_kadachi__gl': [
    { id: 'evade_extender', thresholds: [[8, 1]
    ] }
  ],
  'tobi_kadachi__gs': [
    { id: 'evade_extender', thresholds: [[8, 1]
    ] }
  ],
  'tobi_kadachi__hbg': [
    { id: 'evade_extender', thresholds: [[8, 1]
    ] }
  ],
  'tobi_kadachi__head': [
    { id: 'artful_dodger', thresholds: [[6, 1]
    ] },
    { id: 'reload_speed', thresholds: [[2, 1]
    ] }
  ],
  'tobi_kadachi__hh': [
    { id: 'evade_extender', thresholds: [[8, 1]
    ] }
  ],
  'tobi_kadachi__hmr': [
    { id: 'evade_extender', thresholds: [[8, 1]
    ] }
  ],
  'tobi_kadachi__ig': [
    { id: 'evade_extender', thresholds: [[8, 1]
    ] }
  ],
  'tobi_kadachi__lbg': [
    { id: 'evade_extender', thresholds: [[8, 1]
    ] }
  ],
  'tobi_kadachi__legs': [
    { id: 'artful_dodger', thresholds: [[2, 1]
    ] },
    { id: 'thunder_resistance', thresholds: [[4, 1]
    ] }
  ],
  'tobi_kadachi__lnc': [
    { id: 'evade_extender', thresholds: [[8, 1]
    ] }
  ],
  'tobi_kadachi__ls': [
    { id: 'evade_extender', thresholds: [[8, 1]
    ] }
  ],
  'tobi_kadachi__sa': [
    { id: 'evade_extender', thresholds: [[8, 1]
    ] }
  ],
  'tobi_kadachi__sns': [
    { id: 'evade_extender', thresholds: [[8, 1]
    ] }
  ],
  'tobi_kadachi__waist': [
    { id: 'thunder_attack', thresholds: [[2, 1], [6, 2]
    ] }
  ],
  'tzitzi_ya_ku__arms': [
    { id: 'abnormal_status_enhancement', thresholds: [[2, 1], [4, 2]
    ] }
  ],
  'tzitzi_ya_ku__chest': [
    { id: 'abnormal_status_enhancement', thresholds: [[2, 1]
    ] },
    { id: 'artful_dodger', thresholds: [[4, 1]
    ] }
  ],
  'tzitzi_ya_ku__db': [
    { id: 'lock_on', thresholds: [[8, 1]
    ] }
  ],
  'tzitzi_ya_ku__hbg': [
    { id: 'guard', thresholds: [[8, 1]
    ] }
  ],
  'tzitzi_ya_ku__head': [
    { id: 'evade_extender', thresholds: [[4, 1]
    ] },
    { id: 'thunder_attack', thresholds: [[2, 1], [6, 2]
    ] }
  ],
  'tzitzi_ya_ku__ig': [
    { id: 'lock_on', thresholds: [[8, 1]
    ] }
  ],
  'tzitzi_ya_ku__legs': [
    { id: 'fortify', thresholds: [[2, 1], [4, 2]
    ] }
  ],
  'tzitzi_ya_ku__ls': [
    { id: 'lock_on', thresholds: [[8, 1]
    ] }
  ],
  'tzitzi_ya_ku__waist': [
    { id: 'abnormal_status_enhancement', thresholds: [[4, 1]
    ] },
    { id: 'evade_extender', thresholds: [[2, 1]
    ] }
  ],
  'vipertobikadachi__arms': [
    { id: 'burst_secret', thresholds: [[5, 1]
    ] },
    { id: 'paralysis_attack', thresholds: [[8, 1]
    ] },
    { id: 'pursuit_paralysis', thresholds: [[5, 1]
    ] }
  ],
  'vipertobikadachi__bow': [
    { id: 'burst', thresholds: [[5, 1]
    ] },
    { id: 'burst_secret', thresholds: [[8, 1]
    ] }
  ],
  'vipertobikadachi__cb': [
    { id: 'burst', thresholds: [[5, 1]
    ] },
    { id: 'burst_secret', thresholds: [[8, 1]
    ] }
  ],
  'vipertobikadachi__chest': [
    { id: 'power_burst', thresholds: [[5, 1], [8, 2]
    ] }
  ],
  'vipertobikadachi__db': [
    { id: 'burst', thresholds: [[5, 1]
    ] },
    { id: 'burst_secret', thresholds: [[8, 1]
    ] }
  ],
  'vipertobikadachi__gl': [
    { id: 'burst', thresholds: [[5, 1]
    ] },
    { id: 'burst_secret', thresholds: [[8, 1]
    ] }
  ],
  'vipertobikadachi__hbg': [
    { id: 'burst', thresholds: [[5, 1]
    ] },
    { id: 'burst_secret', thresholds: [[8, 1]
    ] }
  ],
  'vipertobikadachi__head': [
    { id: 'artful_dodger', thresholds: [[5, 1]
    ] },
    { id: 'burst_secret', thresholds: [[5, 1]
    ] },
    { id: 'power_burst', thresholds: [[8, 1]
    ] }
  ],
  'vipertobikadachi__ig': [
    { id: 'burst', thresholds: [[5, 1]
    ] },
    { id: 'burst_secret', thresholds: [[8, 1]
    ] }
  ],
  'vipertobikadachi__legs': [
    { id: 'burst_secret', thresholds: [[5, 1]
    ] },
    { id: 'pursuit_poison', thresholds: [[5, 1], [8, 2]
    ] }
  ],
  'vipertobikadachi__ls': [
    { id: 'burst', thresholds: [[5, 1]
    ] },
    { id: 'burst_secret', thresholds: [[8, 1]
    ] }
  ],
  'vipertobikadachi__waist': [
    { id: 'burst', thresholds: [[5, 1], [8, 2]
    ] },
    { id: 'burst_secret', thresholds: [[5, 1]
    ] }
  ],
  'volvidon__arms': [
    { id: 'morph_boost', thresholds: [[3, 1], [6, 2]
    ] }
  ],
  'volvidon__cb': [
    { id: 'evade_extender', thresholds: [[8, 1]
    ] }
  ],
  'volvidon__chest': [
    { id: 'paralysis_attack', thresholds: [[3, 1], [4, 2]
    ] }
  ],
  'volvidon__gl': [
    { id: 'evade_extender', thresholds: [[8, 1]
    ] }
  ],
  'volvidon__hbg': [
    { id: 'evade_extender', thresholds: [[8, 1]
    ] }
  ],
  'volvidon__head': [
    { id: 'morph_boost', thresholds: [[3, 1]
    ] },
    { id: 'power_prolonger', thresholds: [[4, 1]
    ] }
  ],
  'volvidon__hmr': [
    { id: 'evade_extender', thresholds: [[8, 1]
    ] }
  ],
  'volvidon__legs': [
    { id: 'paralysis_resistance', thresholds: [[3, 1], [4, 2], [6, 3]
    ] }
  ],
  'volvidon__lnc': [
    { id: 'evade_extender', thresholds: [[8, 1]
    ] }
  ],
  'volvidon__sa': [
    { id: 'evade_extender', thresholds: [[8, 1]
    ] }
  ],
  'volvidon__waist': [
    { id: 'fighting_spirit', thresholds: [[4, 1]
    ] },
    { id: 'sp_insurance', thresholds: [[3, 1], [6, 2]
    ] }
  ],
  'zinogre__arms': [
    { id: 'thunder_attack', thresholds: [[5, 1], [6, 2]
    ] }
  ],
  'zinogre__bow': [
    { id: 'artful_dodger', thresholds: [[8, 1]
    ] }
  ],
  'zinogre__cb': [
    { id: 'artful_dodger', thresholds: [[8, 1]
    ] }
  ],
  'zinogre__chest': [
    { id: 'perfect_evade_sp_charge', thresholds: [[5, 1], [6, 2]
    ] },
    { id: 'thunder_resistance', thresholds: [[5, 1]
    ] }
  ],
  'zinogre__db': [
    { id: 'artful_dodger', thresholds: [[8, 1]
    ] }
  ],
  'zinogre__gl': [
    { id: 'artful_dodger', thresholds: [[8, 1]
    ] }
  ],
  'zinogre__gs': [
    { id: 'artful_dodger', thresholds: [[8, 1]
    ] }
  ],
  'zinogre__hbg': [
    { id: 'artful_dodger', thresholds: [[8, 1]
    ] }
  ],
  'zinogre__head': [
    { id: 'burst', thresholds: [[6, 1]
    ] },
    { id: 'perfect_evade_sp_charge', thresholds: [[5, 1]
    ] }
  ],
  'zinogre__hh': [
    { id: 'artful_dodger', thresholds: [[8, 1]
    ] }
  ],
  'zinogre__hmr': [
    { id: 'artful_dodger', thresholds: [[8, 1]
    ] }
  ],
  'zinogre__ig': [
    { id: 'artful_dodger', thresholds: [[8, 1]
    ] }
  ],
  'zinogre__lbg': [
    { id: 'artful_dodger', thresholds: [[8, 1]
    ] }
  ],
  'zinogre__legs': [
    { id: 'burst', thresholds: [[5, 1]
    ] },
    { id: 'thunder_attack', thresholds: [[6, 1]
    ] }
  ],
  'zinogre__lnc': [
    { id: 'artful_dodger', thresholds: [[8, 1]
    ] }
  ],
  'zinogre__ls': [
    { id: 'artful_dodger', thresholds: [[8, 1]
    ] }
  ],
  'zinogre__sa': [
    { id: 'artful_dodger', thresholds: [[8, 1]
    ] }
  ],
  'zinogre__sns': [
    { id: 'artful_dodger', thresholds: [[8, 1]
    ] }
  ],
  'zinogre__waist': [
    { id: 'artful_dodger', thresholds: [[5, 1]
    ] },
    { id: 'reload_speed', thresholds: [[6, 1]
    ] }
  ],
};
