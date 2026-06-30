#!/bin/bash
# scrape_armor.sh — fetch skill data for all armor from monsterhunternow.com
# Outputs TSV: equip_id TAB grade TAB skill_id TAB level
# Usage: bash scrape_armor.sh > armor_skills.tsv

BASE="https://monsterhunternow.com/en/armor"

get_monster_id() {
  case "$1" in
    "coral_pukeipukei")  echo "coral_pukei_pukei" ;;
    "greatgirros")       echo "great_girros" ;;
    "greatjagras")       echo "great_jagras" ;;
    "greatwroggi")       echo "great_wroggi" ;;
    "kuluyaku")          echo "kulu_ya_ku" ;;
    "kushaladaora")      echo "kushala_daora" ;;
    "pukeipukei")        echo "pukei_pukei" ;;
    "shogunceanataur")   echo "shogun_ceanataur" ;;
    "tobikadachi")       echo "tobi_kadachi" ;;
    "tzitziyaku")        echo "tzitzi_ya_ku" ;;
    "viper_tobikadachi") echo "vipertobikadachi" ;;
    *)                   echo "$1" ;;
  esac
}

MONSTERS="aknosom almudron anjanath arzuros astalos azure_rathalos banbaro barioth barroth basarios bazelgeuse beotodus bishaten black_diablos brute_tigrex chameleos chatacabra coral_pukeipukei deviljho diablos ebony_odogaron espinas fulgur_anjanath garangolm glavenus gold_rathian gossharag greatgirros greatjagras greatwroggi jyuratodus khezu kirin kuluyaku kushaladaora lagombi legiana lunagaron magnamalo malzeno mizutsune namielle nargacuga nergigante nightshade_paolumu odogaron paolumu pink_rathian pukeipukei quematrice radobaan rajang rathalos rathian seregios shogunceanataur silver_rathalos somnacanth stygian_zinogre teostra tigrex tobikadachi tzitziyaku viper_tobikadachi volvidon zinogre"

for monster_slug in $MONSTERS; do
  monster_id=$(get_monster_id "$monster_slug")

  for slot in head chest arms waist legs; do
    equip_id="${monster_id}__${slot}"

    curl -s "$BASE/${monster_slug}_${slot}" | tr '\n' ' ' | grep -o '<tbody>.*</tbody>' | \
      sed 's/<tr>/\n<tr>/g' | \
      grep -o '<b>[^<]*</b>\|href="/en/skills/[^"]*"\|Lv\.[0-9][^<]*</p>' | \
      sed 's|</p>||' | \
      sed 's|href="/en/skills/||' | \
      sed 's|"||' | \
      awk -v equip="$equip_id" '
        /^<b>/ {
          s=$0; gsub(/<[^>]*>/, "", s); split(s, a, " "); grade=int(a[1]); skill=""
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
