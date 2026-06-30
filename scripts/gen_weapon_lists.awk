#!/usr/bin/awk -f
# Reads weapon_list_raw.txt (monster_slug_weapontype lines)
# Outputs a JS const MONSTER_WEAPONS = { ... } mapping monster_id → [typeId, ...]
# Feed it weapon_list_raw.txt
BEGIN {
  # site weapon slug → our internal type ID
  type_map["swordshield"]  = "sns"
  type_map["greatsword"]   = "gs"
  type_map["longsword"]    = "ls"
  type_map["hammer"]       = "hmr"
  type_map["huntinghorn"]  = "hh"
  type_map["dualblades"]   = "db"
  type_map["lance"]        = "lnc"
  type_map["gunlance"]     = "gl"
  type_map["switchaxe"]    = "sa"
  type_map["chargeblade"]  = "cb"
  type_map["insectglaive"] = "ig"
  type_map["lightbowgun"]  = "lbg"
  type_map["bow"]          = "bow"
  type_map["heavybowgun"]  = "hbg"

  # site monster slug → our internal monster ID
  id_map["coral_pukeipukei"]  = "coral_pukei_pukei"
  id_map["greatgirros"]       = "great_girros"
  id_map["greatjagras"]       = "great_jagras"
  id_map["greatwroggi"]       = "great_wroggi"
  id_map["kuluyaku"]          = "kulu_ya_ku"
  id_map["kushaladaora"]      = "kushala_daora"
  id_map["pukeipukei"]        = "pukei_pukei"
  id_map["shogunceanataur"]   = "shogun_ceanataur"
  id_map["tobikadachi"]       = "tobi_kadachi"
  id_map["tzitziyaku"]        = "tzitzi_ya_ku"
  id_map["viper_tobikadachi"] = "vipertobikadachi"
  id_map["nightshade_paolumu"] = "nightshade_paolumu"
  id_map["azure_rathalos"]    = "azure_rathalos"
  id_map["black_diablos"]     = "black_diablos"
  id_map["brute_tigrex"]      = "brute_tigrex"
  id_map["ebony_odogaron"]    = "ebony_odogaron"
  id_map["fulgur_anjanath"]   = "fulgur_anjanath"
  id_map["gold_rathian"]      = "gold_rathian"
  id_map["pink_rathian"]      = "pink_rathian"
  id_map["silver_rathalos"]   = "silver_rathalos"
  id_map["stygian_zinogre"]   = "stygian_zinogre"

  # type ordering for consistent output
  split("sns gs ls hmr hh db lnc gl sa cb ig lbg bow hbg", type_order, " ")

  print "const MONSTER_WEAPONS = {"
  prev_monster = ""
}
{
  line = $0
  # find last underscore — everything after is the weapon type slug
  n = split(line, parts, "_")
  weapon_slug = parts[n]
  # monster slug is everything before the last underscore
  monster_slug = substr(line, 1, length(line) - length(weapon_slug) - 1)

  # map to internal IDs
  mid = (monster_slug in id_map) ? id_map[monster_slug] : monster_slug
  tid = (weapon_slug in type_map) ? type_map[weapon_slug] : "?"

  if (tid == "?") {
    print "  // WARNING: unknown weapon type: " weapon_slug > "/dev/stderr"
    next
  }

  if (mid != prev_monster) {
    if (prev_monster != "") flush_monster()
    prev_monster = mid
    delete cur_types
    cur_type_count = 0
  }
  cur_types[tid] = 1
}
END {
  if (prev_monster != "") flush_monster()
  print "};"
}
function flush_monster(    i, tid, first, line) {
  first = 1
  printf "  '%s': [", prev_monster
  for (i = 1; i <= length(type_order); i++) {
    tid = type_order[i]
    if (tid in cur_types) {
      if (!first) printf ", "
      printf "'%s'", tid
      first = 0
    }
  }
  printf "],\n"
}
