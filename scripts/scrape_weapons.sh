#!/bin/bash
# scrape_weapons.sh — fetch skill data for all weapons from monsterhunternow.com
# Outputs TSV: equip_id TAB grade TAB skill_id TAB level
# Usage: bash scripts/scrape_weapons.sh > scripts/weapon_skills.tsv

BASE="https://monsterhunternow.com/en/weapons"

# Maps our internal monster ID → site weapon slug prefix
get_weapon_prefix() {
  case "$1" in
    "coral_pukei_pukei")  echo "coral_pukeipukei" ;;
    "great_girros")       echo "greatgirros" ;;
    "great_jagras")       echo "greatjagras" ;;
    "great_wroggi")       echo "greatwroggi" ;;
    "kulu_ya_ku")         echo "kuluyaku" ;;
    "kushala_daora")      echo "kushaladaora" ;;
    "pukei_pukei")        echo "pukeipukei" ;;
    "shogun_ceanataur")   echo "shogunceanataur" ;;
    "tobi_kadachi")       echo "tobikadachi" ;;
    "tzitzi_ya_ku")       echo "tzitziyaku" ;;
    "vipertobikadachi")   echo "viper_tobikadachi" ;;
    *)                    echo "$1" ;;
  esac
}

# Maps our internal weapon type ID → site URL slug
get_weapon_slug() {
  case "$1" in
    "sns") echo "swordshield" ;;
    "gs")  echo "greatsword" ;;
    "ls")  echo "longsword" ;;
    "hmr") echo "hammer" ;;
    "hh")  echo "huntinghorn" ;;
    "db")  echo "dualblades" ;;
    "lnc") echo "lance" ;;
    "gl")  echo "gunlance" ;;
    "sa")  echo "switchaxe" ;;
    "cb")  echo "chargeblade" ;;
    "ig")  echo "insectglaive" ;;
    "lbg") echo "lightbowgun" ;;
    "bow") echo "bow" ;;
    "hbg") echo "heavybowgun" ;;
  esac
}

# weapon type arrays per monster (mirrors MONSTER_WEAPONS in data.js)
declare -A MONSTER_WEAPONS
MONSTER_WEAPONS["aknosom"]="gs ls db lnc gl sa ig"
MONSTER_WEAPONS["almudron"]="ls hmr db gl sa lbg bow"
MONSTER_WEAPONS["anjanath"]="sns gs ls hmr hh db gl sa ig lbg bow hbg"
MONSTER_WEAPONS["arzuros"]="ls hmr hh db sa bow hbg"
MONSTER_WEAPONS["astalos"]="sns gs ls hmr hh db lnc gl sa cb ig lbg bow hbg"
MONSTER_WEAPONS["azure_rathalos"]="sns gs ls lnc gl sa cb ig lbg bow"
MONSTER_WEAPONS["banbaro"]="gs ls hmr db gl sa lbg bow"
MONSTER_WEAPONS["barioth"]="sns gs ls hmr hh db lnc gl sa cb ig lbg bow hbg"
MONSTER_WEAPONS["barroth"]="sns gs hmr hh lnc gl sa lbg"
MONSTER_WEAPONS["basarios"]="ls hmr hh lnc cb lbg hbg"
MONSTER_WEAPONS["bazelgeuse"]="ls hh db lnc gl sa lbg"
MONSTER_WEAPONS["beotodus"]="gs db cb ig lbg"
MONSTER_WEAPONS["bishaten"]="sns hmr sa lbg bow hbg"
MONSTER_WEAPONS["black_diablos"]="hmr db sa cb ig bow hbg"
MONSTER_WEAPONS["brute_tigrex"]="sns gs ls hh db lnc gl sa cb ig lbg bow hbg"
MONSTER_WEAPONS["chameleos"]="gs ls hmr hh db gl sa cb ig lbg bow hbg"
MONSTER_WEAPONS["chatacabra"]="sns hmr cb ig hbg"
MONSTER_WEAPONS["coral_pukei_pukei"]="sns gs hmr hh lnc sa ig lbg bow hbg"
MONSTER_WEAPONS["deviljho"]="sns gs ls hmr hh db lnc gl sa cb ig lbg bow hbg"
MONSTER_WEAPONS["diablos"]="sns gs hmr hh db lnc gl sa cb ig bow hbg"
MONSTER_WEAPONS["ebony_odogaron"]="db lnc cb ig lbg"
MONSTER_WEAPONS["espinas"]="sns gs ls hmr hh db lnc gl sa cb ig lbg bow hbg"
MONSTER_WEAPONS["fulgur_anjanath"]="sns gs ls hmr hh db gl sa ig lbg bow hbg"
MONSTER_WEAPONS["garangolm"]="sns gs ls hmr hh db lnc gl sa cb ig lbg bow hbg"
MONSTER_WEAPONS["glavenus"]="sns gs ls hmr hh db lnc gl sa cb ig lbg bow hbg"
MONSTER_WEAPONS["gold_rathian"]="sns ls hh gl sa cb lbg bow hbg"
MONSTER_WEAPONS["gossharag"]="sns gs hmr lnc cb ig lbg"
MONSTER_WEAPONS["great_girros"]="sns gs hmr gl cb"
MONSTER_WEAPONS["great_jagras"]="sns gs gl sa cb lbg hbg"
MONSTER_WEAPONS["great_wroggi"]="sns ls hmr db bow"
MONSTER_WEAPONS["jyuratodus"]="sns gs ls hmr hh db lnc gl sa cb ig lbg bow hbg"
MONSTER_WEAPONS["khezu"]="sns gs hmr hh db gl sa ig lbg bow"
MONSTER_WEAPONS["kirin"]="sns gs hh db lnc sa ig lbg hbg"
MONSTER_WEAPONS["kulu_ya_ku"]="ls hmr hh db lnc ig bow"
MONSTER_WEAPONS["kushala_daora"]="sns gs ls hmr hh db lnc gl sa cb ig lbg bow hbg"
MONSTER_WEAPONS["lagombi"]="gs ls db gl sa ig hbg"
MONSTER_WEAPONS["legiana"]="sns gs ls hh db lnc gl sa cb ig lbg bow hbg"
MONSTER_WEAPONS["lunagaron"]="sns gs ls hmr hh db lnc gl sa cb ig lbg bow hbg"
MONSTER_WEAPONS["magnamalo"]="sns gs ls hmr hh db lnc gl sa cb ig lbg bow hbg"
MONSTER_WEAPONS["malzeno"]="sns gs ls hmr hh db lnc gl sa cb ig lbg bow hbg"
MONSTER_WEAPONS["mizutsune"]="sns gs ls hmr hh db lnc gl sa cb ig lbg bow hbg"
MONSTER_WEAPONS["namielle"]="sns ls hh lnc gl sa cb ig lbg bow hbg"
MONSTER_WEAPONS["nargacuga"]="sns gs ls hmr hh db lnc gl sa cb ig lbg bow hbg"
MONSTER_WEAPONS["nergigante"]="sns gs ls hmr hh db lnc gl sa cb ig lbg bow hbg"
MONSTER_WEAPONS["nightshade_paolumu"]="sns gs hmr hh lnc sa ig lbg bow hbg"
MONSTER_WEAPONS["odogaron"]="db lnc cb ig lbg"
MONSTER_WEAPONS["paolumu"]="sns hh sa lbg"
MONSTER_WEAPONS["pink_rathian"]="sns ls hh gl cb bow"
MONSTER_WEAPONS["pukei_pukei"]="sns gs hmr hh lnc sa ig bow hbg"
MONSTER_WEAPONS["quematrice"]="sns gs ls db lnc gl bow"
MONSTER_WEAPONS["radobaan"]="sns gs hmr hh hbg"
MONSTER_WEAPONS["rajang"]="sns gs ls hmr hh db lnc gl sa cb ig lbg bow hbg"
MONSTER_WEAPONS["rathalos"]="sns gs ls hmr hh db lnc gl sa cb ig lbg bow"
MONSTER_WEAPONS["rathian"]="sns ls hh gl sa cb ig bow hbg"
MONSTER_WEAPONS["seregios"]="sns gs ls hmr hh db lnc gl sa cb ig lbg bow hbg"
MONSTER_WEAPONS["shogun_ceanataur"]="gs ls hmr db lnc cb bow hbg"
MONSTER_WEAPONS["silver_rathalos"]="sns gs ls hmr db lnc gl sa cb ig lbg bow"
MONSTER_WEAPONS["somnacanth"]="gs ls hmr hh db cb ig"
MONSTER_WEAPONS["stygian_zinogre"]="sns gs ls hmr hh db lnc gl sa cb ig lbg bow hbg"
MONSTER_WEAPONS["teostra"]="sns gs ls hmr hh lnc sa cb lbg bow hbg"
MONSTER_WEAPONS["tigrex"]="sns gs ls hmr hh db lnc gl sa cb ig lbg bow hbg"
MONSTER_WEAPONS["tobi_kadachi"]="sns gs ls hmr hh db lnc gl sa cb ig lbg bow hbg"
MONSTER_WEAPONS["tzitzi_ya_ku"]="ls db ig hbg"
MONSTER_WEAPONS["vipertobikadachi"]="ls db gl cb ig bow hbg"
MONSTER_WEAPONS["volvidon"]="hmr lnc gl sa cb hbg"
MONSTER_WEAPONS["zinogre"]="sns gs ls hmr hh db lnc gl sa cb ig lbg bow hbg"

for monster_id in "${!MONSTER_WEAPONS[@]}"; do
  prefix=$(get_weapon_prefix "$monster_id")
  for type_id in ${MONSTER_WEAPONS[$monster_id]}; do
    weapon_slug=$(get_weapon_slug "$type_id")
    equip_id="${monster_id}__${type_id}"

    curl -s "$BASE/${prefix}_${weapon_slug}" | tr '\n' ' ' | grep -o '<tbody>.*</tbody>' | \
      sed 's/<tr>/\n<tr>/g' | \
      grep -o '<b>[^<]*</b>\|href="/en/skills/[^"]*"\|Lv\.[0-9][^<]*</p>' | \
      sed 's|</p>||' | \
      sed 's|href="/en/skills/||' | \
      sed 's|"||' | \
      awk -v equip="$equip_id" '
        done { next }
        /^<b>/ {
          s=$0; gsub(/<[^>]*>/, "", s)
          if (s ~ /Lv\./) { done=1; next }
          if (s ~ /^[0-9]+$/) { grade=int(s) }
          skill=""
        }
        /^[a-z_]+$/ { skill=$0 }
        /^Lv\./ {
          if (skill != "" && grade > 0) {
            lv=$0; gsub(/Lv\./, "", lv)
            printf "%s\t%d\t%s\t%d\n", equip, grade, skill, int(lv)
            skill=""
          }
        }
      '

    sleep 0.15
  done
done
