#!/usr/bin/awk -f
# Converts sorted TSV to GEAR_SKILLS JS.
# Input columns (tab-separated): equip_id, grade, skill_id, level
# Feed sorted by equip_id, skill_id, grade:
#   sort -t$'\t' -k1,1 -k3,3 -k2,2n armor_skills.tsv | awk -f tsv_to_gear_skills.awk
BEGIN {
  FS = "\t"
  print "const GEAR_SKILLS = {"
  prev_equip = ""; prev_skill = ""; first_thresh = 1
}
{
  equip = $1; grade = int($2); skill = $3; level = int($4)

  if (equip != prev_equip) {
    if (prev_skill != "") printf "\n    ] }"
    if (prev_equip != "") printf "\n  ],\n"
    printf "  '%s': [\n", equip
    prev_equip = equip; prev_skill = ""; first_thresh = 1
  }

  if (skill != prev_skill) {
    if (prev_skill != "") printf "\n    ] },\n"
    printf "    { id: '%s', thresholds: [", skill
    prev_skill = skill; first_thresh = 1
  }

  if (!first_thresh) printf ", "
  printf "[%d, %d]", grade, level
  first_thresh = 0
}
END {
  if (prev_skill != "") printf "\n    ] }"
  if (prev_equip != "") printf "\n  ],\n"
  print "};"
}
