#!/bin/bash
# build_gear_skills.sh — combines armor_skills.tsv + weapon_skills.tsv into
# the GEAR_SKILLS + SKILL_NAMES blocks and patches them into js/data.js
# Usage: bash scripts/build_gear_skills.sh

set -e
cd ~/mhnow_companion

ARMOR_TSV="scripts/armor_skills.tsv"
WEAPON_TSV="scripts/weapon_skills.tsv"

if [ ! -f "$ARMOR_TSV" ]; then
  echo "ERROR: $ARMOR_TSV not found. Run scrape_armor.sh first."
  exit 1
fi

# Combine armor + weapon TSVs (weapon TSV optional — skip if missing)
COMBINED_TSV="scripts/combined_skills.tsv"
if [ -f "$WEAPON_TSV" ]; then
  cat "$ARMOR_TSV" "$WEAPON_TSV" > "$COMBINED_TSV"
  echo "Rows: $(wc -l < "$ARMOR_TSV") armor + $(wc -l < "$WEAPON_TSV") weapon = $(wc -l < "$COMBINED_TSV") total"
else
  cp "$ARMOR_TSV" "$COMBINED_TSV"
  echo "Rows: $(wc -l < "$ARMOR_TSV") armor (no weapon TSV found)"
fi

# ── 1. Fetch skill display names ──────────────────────────────────────────────
echo "Fetching skill display names..."

# TSV columns: equip_id(1) grade(2) skill_id(3) level(4)
mapfile -t SKILL_IDS < <(awk -F'\t' '{print $3}' "$COMBINED_TSV" | sort -u)
echo "  Found ${#SKILL_IDS[@]} unique skills"

{
  echo "const SKILL_NAMES = {"
  first=1
  for skill_id in "${SKILL_IDS[@]}"; do
    name=$(curl -s "https://monsterhunternow.com/en/skills/$skill_id" \
      | grep -o '<title>[^<]*</title>' \
      | sed 's/<title>//' | sed 's/ – Monster Hunter Now<\/title>//')
    if [ -n "$name" ]; then
      [ $first -eq 0 ] && echo ","
      printf "  '%s': \"%s\"" "$skill_id" "$name"
      first=0
    else
      echo "  // WARNING: no name found for $skill_id" >&2
    fi
    sleep 0.1
  done
  echo ""
  echo "};"
} > scripts/skill_names_generated.js
echo "  Skill names written"

# ── 2. Build GEAR_SKILLS from combined TSV ────────────────────────────────────
echo "Building GEAR_SKILLS..."
# Sort: equip_id(k1), skill_id(k3), grade numerically(k2)
sort -t$'\t' -k1,1 -k3,3 -k2,2n "$COMBINED_TSV" | \
  awk -f scripts/tsv_to_gear_skills.awk > scripts/gear_skills_generated.js
echo "  GEAR_SKILLS written: $(grep -c "id:" scripts/gear_skills_generated.js) skill entries"

# ── 3. Patch data.js ──────────────────────────────────────────────────────────
echo "Patching js/data.js..."

START=$(grep -n "^const SKILL_NAMES" js/data.js | head -1 | cut -d: -f1)
if [ -z "$START" ]; then
  echo "ERROR: could not find 'const SKILL_NAMES' in data.js"
  exit 1
fi

echo "  Truncating data.js at line $START, appending new blocks"

head -n $((START - 1)) js/data.js > js/data.js.tmp
echo "" >> js/data.js.tmp
cat scripts/skill_names_generated.js >> js/data.js.tmp
echo "" >> js/data.js.tmp
cat scripts/gear_skills_generated.js >> js/data.js.tmp

mv js/data.js.tmp js/data.js
echo "Done. data.js updated."
