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
  'aknosom__head': [
    { id: 'guarding_reload', thresholds: [[3, 1], [6, 2]
    ] }
  ],
  'aknosom__legs': [
    { id: 'fire_attack', thresholds: [[3, 1], [6, 2]
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
  'almudron__chest': [
    { id: 'water_attack', thresholds: [[4, 1], [6, 2]
    ] },
    { id: 'water_attack_boost_secret', thresholds: [[4, 1]
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
  'almudron__legs': [
    { id: 'feat_of_agility', thresholds: [[4, 1], [8, 2]
    ] },
    { id: 'lock_on', thresholds: [[6, 1]
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
  'anjanath__chest': [
    { id: 'special_boost', thresholds: [[4, 1], [6, 2]
    ] }
  ],
  'anjanath__head': [
    { id: 'fire_attack', thresholds: [[4, 2]
    ] },
    { id: 'fire_resistance', thresholds: [[6, 1]
    ] }
  ],
  'anjanath__legs': [
    { id: 'peak_performance', thresholds: [[4, 1], [6, 2]
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
  'arzuros__chest': [
    { id: 'multi_attack_boost', thresholds: [[2, 1], [4, 2], [6, 3]
    ] }
  ],
  'arzuros__head': [
    { id: 'multi_attack_boost', thresholds: [[2, 1]
    ] },
    { id: 'multiplayer_boost', thresholds: [[4, 1]
    ] }
  ],
  'arzuros__legs': [
    { id: 'brutal_strike', thresholds: [[2, 1]
    ] },
    { id: 'special_boost', thresholds: [[6, 1]
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
  'astalos__chest': [
    { id: 'auto_just_dodge', thresholds: [[6, 1], [8, 2]
    ] },
    { id: 'thunder_attack_boost_secret', thresholds: [[5, 1]
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
  'astalos__legs': [
    { id: 'thunder_attack', thresholds: [[6, 1], [8, 2]
    ] },
    { id: 'thunder_attack_boost_secret', thresholds: [[5, 1]
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
  'azure_rathalos__chest': [
    { id: 'earplugs', thresholds: [[5, 1], [6, 2]
    ] },
    { id: 'fire_attack', thresholds: [[5, 1]
    ] }
  ],
  'azure_rathalos__head': [
    { id: 'focus', thresholds: [[5, 1], [6, 2]
    ] }
  ],
  'azure_rathalos__legs': [
    { id: 'fire_attack', thresholds: [[6, 1]
    ] },
    { id: 'reload_speed', thresholds: [[5, 2]
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
  'banbaro__chest': [
    { id: 'concentration', thresholds: [[3, 1]
    ] },
    { id: 'partbreaker', thresholds: [[6, 1]
    ] }
  ],
  'banbaro__head': [
    { id: 'recoil_down', thresholds: [[4, 1]
    ] },
    { id: 'tremor_resistance', thresholds: [[3, 1]
    ] }
  ],
  'banbaro__legs': [
    { id: 'concentration', thresholds: [[6, 1]
    ] },
    { id: 'divine_blessing', thresholds: [[3, 1]
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
  'barioth__chest': [
    { id: 'ice_attack', thresholds: [[6, 1]
    ] },
    { id: 'ice_resistance', thresholds: [[4, 1]
    ] }
  ],
  'barioth__head': [
    { id: 'airborne', thresholds: [[4, 1], [6, 2]
    ] },
    { id: 'evade_extender', thresholds: [[4, 1]
    ] }
  ],
  'barioth__legs': [
    { id: 'evade_extender', thresholds: [[6, 1]
    ] },
    { id: 'sneak_attack', thresholds: [[4, 1]
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
  'barroth__head': [
    { id: 'defense_boost', thresholds: [[2, 1]
    ] },
    { id: 'offensive_guard', thresholds: [[4, 1]
    ] }
  ],
  'barroth__legs': [
    { id: 'defense_boost', thresholds: [[4, 1], [6, 2]
    ] },
    { id: 'recoil_down', thresholds: [[2, 1]
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
  'basarios__chest': [
    { id: 'artillery', thresholds: [[2, 1], [6, 2]
    ] }
  ],
  'basarios__head': [
    { id: 'sleep_resistance', thresholds: [[2, 1], [4, 2]
    ] }
  ],
  'basarios__legs': [
    { id: 'artillery', thresholds: [[2, 1]
    ] },
    { id: 'guard', thresholds: [[4, 1]
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
  'bazelgeuse__head': [
    { id: 'artillery', thresholds: [[8, 1]
    ] },
    { id: 'reload_speed', thresholds: [[5, 1], [6, 2]
    ] }
  ],
  'bazelgeuse__legs': [
    { id: 'blast_attack', thresholds: [[6, 1]
    ] },
    { id: 'bravery', thresholds: [[5, 1], [8, 2]
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
  'beotodus__chest': [
    { id: 'charge_up', thresholds: [[4, 1]
    ] },
    { id: 'slugger', thresholds: [[6, 2]
    ] }
  ],
  'beotodus__head': [
    { id: 'peak_performance', thresholds: [[4, 2], [6, 3]
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
  'bishaten__chest': [
    { id: 'burst', thresholds: [[4, 1], [6, 2]
    ] },
    { id: 'reload_speed', thresholds: [[3, 1]
    ] }
  ],
  'bishaten__head': [
    { id: 'pursuit_paralysis', thresholds: [[3, 1], [6, 2]
    ] }
  ],
  'bishaten__legs': [
    { id: 'feat_of_agility', thresholds: [[3, 1]
    ] },
    { id: 'focus', thresholds: [[6, 2]
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
  'black_diablos__chest': [
    { id: 'firm_foothold', thresholds: [[6, 1]
    ] },
    { id: 'resentment', thresholds: [[5, 2]
    ] }
  ],
  'black_diablos__head': [
    { id: 'partbreaker', thresholds: [[5, 2]
    ] },
    { id: 'resentment', thresholds: [[6, 1]
    ] }
  ],
  'black_diablos__legs': [
    { id: 'heroics', thresholds: [[5, 1]
    ] },
    { id: 'offensive_guard', thresholds: [[6, 1]
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
  'brute_tigrex__chest': [
    { id: 'attack_boost', thresholds: [[8, 1]
    ] },
    { id: 'attack_boost_secret', thresholds: [[5, 1]
    ] },
    { id: 'lock_on', thresholds: [[6, 1]
    ] }
  ],
  'brute_tigrex__head': [
    { id: 'attack_boost_secret', thresholds: [[5, 1]
    ] },
    { id: 'disable_perfect_evade', thresholds: [[6, 1], [8, 2]
    ] }
  ],
  'brute_tigrex__legs': [
    { id: 'attack_boost_secret', thresholds: [[5, 1]
    ] },
    { id: 'burst_dodger', thresholds: [[6, 1], [8, 2]
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
  'chameleos__chest': [
    { id: 'chameleos_poison', thresholds: [[6, 1]
    ] },
    { id: 'focus', thresholds: [[6, 1], [8, 2]
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
  'chameleos__legs': [
    { id: 'chameleos_poison', thresholds: [[6, 1]
    ] },
    { id: 'guard', thresholds: [[8, 1]
    ] },
    { id: 'offensive_guard', thresholds: [[6, 1]
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
  'chatacabra__chest': [
    { id: 'armor_up', thresholds: [[2, 1]
    ] },
    { id: 'firm_foothold', thresholds: [[4, 1], [6, 2]
    ] }
  ],
  'chatacabra__head': [
    { id: 'armor_up', thresholds: [[2, 1]
    ] },
    { id: 'sneak_attack', thresholds: [[4, 1], [6, 2]
    ] }
  ],
  'chatacabra__legs': [
    { id: 'armor_up', thresholds: [[2, 1]
    ] },
    { id: 'evasive_reload', thresholds: [[4, 1], [6, 2]
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
  'coral_pukei_pukei__chest': [
    { id: 'power_prolonger', thresholds: [[5, 1], [6, 2]
    ] },
    { id: 'rising_tide', thresholds: [[8, 1]
    ] }
  ],
  'coral_pukei_pukei__head': [
    { id: 'lock_on', thresholds: [[6, 1]
    ] },
    { id: 'weakness_exploit', thresholds: [[5, 1], [8, 2]
    ] }
  ],
  'coral_pukei_pukei__legs': [
    { id: 'power_prolonger', thresholds: [[5, 1]
    ] },
    { id: 'weakness_exploit', thresholds: [[6, 1]
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
  'deviljho__chest': [
    { id: 'latent_power', thresholds: [[5, 1], [6, 2]
    ] }
  ],
  'deviljho__head': [
    { id: 'dragon_attack', thresholds: [[5, 1]
    ] },
    { id: 'slugger', thresholds: [[5, 1], [6, 2]
    ] }
  ],
  'deviljho__legs': [
    { id: 'guts', thresholds: [[5, 1], [6, 2]
    ] },
    { id: 'latent_power', thresholds: [[5, 1]
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
  'diablos__chest': [
    { id: 'heroics', thresholds: [[6, 1]
    ] },
    { id: 'slugger', thresholds: [[5, 1]
    ] }
  ],
  'diablos__head': [
    { id: 'heroics', thresholds: [[5, 1], [6, 2]
    ] }
  ],
  'diablos__legs': [
    { id: 'partbreaker', thresholds: [[6, 1]
    ] },
    { id: 'slugger', thresholds: [[5, 2]
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
  'ebony_odogaron__chest': [
    { id: 'critical_element', thresholds: [[8, 1]
    ] },
    { id: 'latent_power', thresholds: [[5, 1]
    ] }
  ],
  'ebony_odogaron__head': [
    { id: 'deathgaron', thresholds: [[5, 1]
    ] },
    { id: 'resuscitate', thresholds: [[8, 1]
    ] }
  ],
  'ebony_odogaron__legs': [
    { id: 'dragon_attack', thresholds: [[5, 1], [6, 2]
    ] },
    { id: 'evade_extender', thresholds: [[8, 1]
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
  'espinas__chest': [
    { id: 'break_attack_boost', thresholds: [[5, 1], [6, 2], [8, 3]
    ] }
  ],
  'espinas__head': [
    { id: 'health_boost', thresholds: [[6, 1]
    ] },
    { id: 'high_performance_fire', thresholds: [[5, 1]
    ] }
  ],
  'espinas__legs': [
    { id: 'high_performance_fire', thresholds: [[5, 1], [6, 2]
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
  'fulgur_anjanath__chest': [
    { id: 'health_boost', thresholds: [[6, 1]
    ] },
    { id: 'high_performance_thunder', thresholds: [[5, 1]
    ] }
  ],
  'fulgur_anjanath__head': [
    { id: 'part_break_special_boost', thresholds: [[5, 1], [8, 2]
    ] },
    { id: 'special_boost', thresholds: [[6, 1]
    ] }
  ],
  'fulgur_anjanath__legs': [
    { id: 'attack_up_critical_down', thresholds: [[6, 1]
    ] },
    { id: 'concentration', thresholds: [[5, 1], [8, 2]
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
  'garangolm__chest': [
    { id: 'guard', thresholds: [[6, 1]
    ] },
    { id: 'guard_up', thresholds: [[4, 1]
    ] }
  ],
  'garangolm__head': [
    { id: 'brutal_strike', thresholds: [[4, 1], [6, 2]
    ] }
  ],
  'garangolm__legs': [
    { id: 'disable_perfect_evade', thresholds: [[4, 1]
    ] },
    { id: 'lock_on', thresholds: [[6, 1]
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
  'glavenus__chest': [
    { id: 'attack_up_critical_down', thresholds: [[6, 1], [8, 2]
    ] },
    { id: 'lock_on', thresholds: [[5, 1]
    ] }
  ],
  'glavenus__head': [
    { id: 'attack_up_critical_down', thresholds: [[5, 1], [6, 2]
    ] }
  ],
  'glavenus__legs': [
    { id: 'artful_dodger', thresholds: [[6, 1]
    ] },
    { id: 'burst', thresholds: [[5, 1], [8, 2]
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
  'gold_rathian__chest': [
    { id: 'partbreaker', thresholds: [[6, 2]
    ] }
  ],
  'gold_rathian__head': [
    { id: 'divine_blessing', thresholds: [[8, 2]
    ] },
    { id: 'resentment', thresholds: [[6, 1]
    ] }
  ],
  'gold_rathian__legs': [
    { id: 'poison_attack', thresholds: [[8, 1]
    ] },
    { id: 'pursuit_poison', thresholds: [[6, 1]
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
  'gossharag__chest': [
    { id: 'ice_attack', thresholds: [[6, 1], [8, 2]
    ] },
    { id: 'ice_attack_boost_secret', thresholds: [[4, 1]
    ] }
  ],
  'gossharag__head': [
    { id: 'morph_attack_boost', thresholds: [[4, 1]
    ] },
    { id: 'morph_boost', thresholds: [[6, 1]
    ] }
  ],
  'gossharag__legs': [
    { id: 'lock_on', thresholds: [[6, 1]
    ] },
    { id: 'morph_boost', thresholds: [[4, 1], [8, 2]
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
  'great_girros__chest': [
    { id: 'paralysis_resistance', thresholds: [[2, 1]
    ] },
    { id: 'sneak_attack', thresholds: [[6, 1]
    ] }
  ],
  'great_girros__head': [
    { id: 'paralysis_resistance', thresholds: [[2, 1], [4, 2]
    ] }
  ],
  'great_girros__legs': [
    { id: 'paralysis_attack', thresholds: [[2, 1], [6, 2]
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
  'great_jagras__chest': [
    { id: 'rising_tide', thresholds: [[2, 1], [6, 2]
    ] }
  ],
  'great_jagras__head': [
    { id: 'firm_foothold', thresholds: [[2, 1], [6, 2]
    ] }
  ],
  'great_jagras__legs': [
    { id: 'water_attack', thresholds: [[2, 1], [6, 2]
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
  'great_wroggi__chest': [
    { id: 'ending_shot', thresholds: [[2, 1]
    ] },
    { id: 'recoil_down', thresholds: [[6, 1]
    ] }
  ],
  'great_wroggi__head': [
    { id: 'power_prolonger', thresholds: [[2, 1], [6, 2]
    ] }
  ],
  'great_wroggi__legs': [
    { id: 'ending_shot', thresholds: [[2, 1], [6, 2]
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
  'jyuratodus__chest': [
    { id: 'last_stand', thresholds: [[4, 1]
    ] },
    { id: 'water_attack', thresholds: [[3, 1]
    ] }
  ],
  'jyuratodus__head': [
    { id: 'last_stand', thresholds: [[4, 1]
    ] },
    { id: 'water_resistance', thresholds: [[3, 1]
    ] }
  ],
  'jyuratodus__legs': [
    { id: 'focus', thresholds: [[3, 1], [6, 2]
    ] },
    { id: 'last_stand', thresholds: [[4, 1]
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
  'khezu__chest': [
    { id: 'thunder_attack', thresholds: [[4, 1], [6, 2]
    ] }
  ],
  'khezu__head': [
    { id: 'paralysis_attack', thresholds: [[4, 1]
    ] },
    { id: 'sp_insurance', thresholds: [[6, 1]
    ] }
  ],
  'khezu__legs': [
    { id: 'focus', thresholds: [[4, 1]
    ] },
    { id: 'slugger', thresholds: [[6, 1]
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
  'kirin__head': [
    { id: 'fighting_spirit', thresholds: [[8, 1]
    ] },
    { id: 'kirin_robe', thresholds: [[6, 1]
    ] },
    { id: 'lock_on', thresholds: [[6, 1]
    ] }
  ],
  'kirin__legs': [
    { id: 'kirin_robe', thresholds: [[6, 1]
    ] },
    { id: 'recoil_down', thresholds: [[6, 1], [8, 2]
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
  'kulu_ya_ku__chest': [
    { id: 'guts', thresholds: [[2, 1], [6, 2]
    ] }
  ],
  'kulu_ya_ku__head': [
    { id: 'critical_eye', thresholds: [[4, 1]
    ] },
    { id: 'lock_on', thresholds: [[2, 1]
    ] }
  ],
  'kulu_ya_ku__legs': [
    { id: 'critical_eye', thresholds: [[2, 1], [6, 2]
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
  'kushala_daora__chest': [
    { id: 'health_boost', thresholds: [[8, 1]
    ] },
    { id: 'kushala_bless', thresholds: [[6, 1]
    ] },
    { id: 'partbreaker', thresholds: [[6, 1]
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
  'kushala_daora__legs': [
    { id: 'airborne', thresholds: [[6, 1]
    ] },
    { id: 'artful_dodger', thresholds: [[8, 1]
    ] },
    { id: 'kushala_bless', thresholds: [[6, 1]
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
  'lagombi__head': [
    { id: 'evade_extender', thresholds: [[4, 1]
    ] },
    { id: 'special_boost', thresholds: [[2, 1], [6, 2]
    ] }
  ],
  'lagombi__legs': [
    { id: 'ice_attack', thresholds: [[2, 1], [6, 2]
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
  'legiana__chest': [
    { id: 'divine_blessing', thresholds: [[5, 2]
    ] },
    { id: 'windproof', thresholds: [[6, 1]
    ] }
  ],
  'legiana__head': [
    { id: 'divine_blessing', thresholds: [[5, 1]
    ] },
    { id: 'ice_attack', thresholds: [[6, 1]
    ] }
  ],
  'legiana__legs': [
    { id: 'ice_resistance', thresholds: [[6, 1]
    ] },
    { id: 'reload_speed', thresholds: [[5, 1]
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
  'lunagaron__chest': [
    { id: 'high_performance_ice', thresholds: [[4, 1], [6, 2]
    ] }
  ],
  'lunagaron__head': [
    { id: 'ballistic', thresholds: [[6, 1]
    ] },
    { id: 'recoil_down', thresholds: [[4, 1], [8, 2]
    ] }
  ],
  'lunagaron__legs': [
    { id: 'ballistic', thresholds: [[4, 1], [8, 2]
    ] },
    { id: 'burst', thresholds: [[6, 1]
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
  'magnamalo__chest': [
    { id: 'blast_resistance', thresholds: [[6, 1]
    ] },
    { id: 'reload_speed', thresholds: [[4, 2]
    ] }
  ],
  'magnamalo__head': [
    { id: 'hellfire_cloak', thresholds: [[4, 1], [6, 2]
    ] }
  ],
  'magnamalo__legs': [
    { id: 'blast_attack', thresholds: [[4, 1]
    ] },
    { id: 'sneak_attack', thresholds: [[6, 1]
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
  'malzeno__chest': [
    { id: 'bloodblight_cloak', thresholds: [[6, 1], [8, 2]
    ] },
    { id: 'malzeno_blood', thresholds: [[6, 1]
    ] }
  ],
  'malzeno__head': [
    { id: 'high_performance_dragon', thresholds: [[6, 1], [8, 2]
    ] },
    { id: 'malzeno_blood', thresholds: [[6, 1]
    ] }
  ],
  'malzeno__legs': [
    { id: 'break_attack_boost', thresholds: [[6, 1], [8, 2]
    ] },
    { id: 'malzeno_blood', thresholds: [[6, 1]
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
  'mizutsune__chest': [
    { id: 'bubbly_dance', thresholds: [[5, 1], [6, 2]
    ] }
  ],
  'mizutsune__head': [
    { id: 'water_attack', thresholds: [[5, 1], [6, 2]
    ] }
  ],
  'mizutsune__legs': [
    { id: 'resuscitate', thresholds: [[5, 1], [6, 2]
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
  'namielle__chest': [
    { id: 'critical_boost', thresholds: [[8, 1]
    ] },
    { id: 'latent_power', thresholds: [[6, 1]
    ] },
    { id: 'namielle_wave', thresholds: [[6, 1]
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
  'namielle__legs': [
    { id: 'namielle_wave', thresholds: [[6, 1]
    ] },
    { id: 'perfect_evade_attack_boost', thresholds: [[6, 1], [8, 2]
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
  'nargacuga__chest': [
    { id: 'critical_boost', thresholds: [[5, 1], [8, 2]
    ] },
    { id: 'lock_on', thresholds: [[6, 1]
    ] }
  ],
  'nargacuga__head': [
    { id: 'fighting_spirit', thresholds: [[5, 1]
    ] },
    { id: 'focus', thresholds: [[6, 1]
    ] }
  ],
  'nargacuga__legs': [
    { id: 'artful_dodger', thresholds: [[6, 1]
    ] },
    { id: 'buildup_boost', thresholds: [[5, 1], [8, 2]
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
  'nergigante__chest': [
    { id: 'evade_extender', thresholds: [[8, 1]
    ] },
    { id: 'nergigante_greed', thresholds: [[6, 1]
    ] },
    { id: 'sneak_attack', thresholds: [[6, 1]
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
  'nergigante__legs': [
    { id: 'nergigante_greed', thresholds: [[6, 1]
    ] },
    { id: 'recoil_down', thresholds: [[8, 1]
    ] },
    { id: 'reload_speed', thresholds: [[6, 1]
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
  'nightshade_paolumu__chest': [
    { id: 'focus', thresholds: [[5, 1], [8, 2]
    ] },
    { id: 'sleep_resistance', thresholds: [[6, 1]
    ] }
  ],
  'nightshade_paolumu__head': [
    { id: 'sleep_enhancement', thresholds: [[5, 1], [8, 2]
    ] }
  ],
  'nightshade_paolumu__legs': [
    { id: 'abnormal_status_enhancement', thresholds: [[6, 1]
    ] },
    { id: 'sleep_enhancement', thresholds: [[5, 1]
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
  'odogaron__chest': [
    { id: 'bleeding_resistance', thresholds: [[4, 1]
    ] },
    { id: 'critical_eye', thresholds: [[4, 1], [6, 2]
    ] }
  ],
  'odogaron__head': [
    { id: 'feat_of_agility', thresholds: [[4, 1], [6, 2]
    ] }
  ],
  'odogaron__legs': [
    { id: 'perfect_evade_sp_charge', thresholds: [[4, 1], [6, 2]
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
  'paolumu__legs': [
    { id: 'windproof', thresholds: [[3, 1], [6, 2]
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
  'pink_rathian__chest': [
    { id: 'dragon_attack', thresholds: [[5, 1]
    ] },
    { id: 'focus', thresholds: [[6, 1]
    ] }
  ],
  'pink_rathian__head': [
    { id: 'special_boost', thresholds: [[5, 1]
    ] },
    { id: 'windproof', thresholds: [[6, 1]
    ] }
  ],
  'pink_rathian__legs': [
    { id: 'dragon_attack', thresholds: [[6, 1]
    ] },
    { id: 'special_boost', thresholds: [[5, 2]
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
  'pukei_pukei__chest': [
    { id: 'focus', thresholds: [[4, 1]
    ] },
    { id: 'poison_resistance', thresholds: [[2, 1]
    ] }
  ],
  'pukei_pukei__head': [
    { id: 'focus', thresholds: [[2, 1]
    ] },
    { id: 'health_boost', thresholds: [[4, 1], [6, 2]
    ] }
  ],
  'pukei_pukei__legs': [
    { id: 'health_boost', thresholds: [[2, 1]
    ] },
    { id: 'poison_resistance', thresholds: [[4, 1]
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
  'quematrice__chest': [
    { id: 'enhancement_normal_ammo', thresholds: [[2, 1], [6, 2]
    ] },
    { id: 'spare_shot', thresholds: [[4, 1]
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
  'radobaan__head': [
    { id: 'guard', thresholds: [[2, 1], [6, 2]
    ] }
  ],
  'radobaan__legs': [
    { id: 'guard', thresholds: [[4, 1]
    ] },
    { id: 'sleep_resistance', thresholds: [[2, 1]
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
  'rajang__chest': [
    { id: 'concentration', thresholds: [[6, 1]
    ] },
    { id: 'fighting_spirit', thresholds: [[5, 1]
    ] }
  ],
  'rajang__head': [
    { id: 'thunder_resistance', thresholds: [[5, 1], [6, 2], [8, 3]
    ] }
  ],
  'rajang__legs': [
    { id: 'resentment', thresholds: [[5, 1], [6, 2]
    ] },
    { id: 'tremor_resistance', thresholds: [[8, 1]
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
  'rathalos__chest': [
    { id: 'weakness_exploit', thresholds: [[5, 1], [6, 2]
    ] }
  ],
  'rathalos__head': [
    { id: 'attack_boost', thresholds: [[5, 2]
    ] },
    { id: 'fire_attack', thresholds: [[6, 1]
    ] }
  ],
  'rathalos__legs': [
    { id: 'fire_resistance', thresholds: [[5, 1]
    ] },
    { id: 'weakness_exploit', thresholds: [[6, 1]
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
  'rathian__chest': [
    { id: 'poison_attack', thresholds: [[4, 1], [6, 2]
    ] }
  ],
  'rathian__head': [
    { id: 'health_boost', thresholds: [[4, 2]
    ] },
    { id: 'poison_attack', thresholds: [[6, 1]
    ] }
  ],
  'rathian__legs': [
    { id: 'health_boost', thresholds: [[4, 1], [6, 2]
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
  'seregios__chest': [
    { id: 'burst', thresholds: [[8, 1]
    ] },
    { id: 'powerhouse', thresholds: [[5, 1]
    ] }
  ],
  'seregios__head': [
    { id: 'powerhouse', thresholds: [[5, 1]
    ] },
    { id: 'powerhouse_critical', thresholds: [[8, 1]
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
  'shogun_ceanataur__chest': [
    { id: 'enhancement_slicing_ammo', thresholds: [[4, 1]
    ] },
    { id: 'recoil_down', thresholds: [[6, 1], [8, 2]
    ] }
  ],
  'shogun_ceanataur__head': [
    { id: 'break_attack_boost', thresholds: [[6, 1]
    ] },
    { id: 'high_performance_water', thresholds: [[4, 1]
    ] }
  ],
  'shogun_ceanataur__legs': [
    { id: 'enhancement_slicing_ammo', thresholds: [[4, 1], [6, 2]
    ] },
    { id: 'water_attack_boost_secret', thresholds: [[4, 1]
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
  'silver_rathalos__chest': [
    { id: 'critical_boost', thresholds: [[8, 1]
    ] },
    { id: 'fire_attack', thresholds: [[6, 1]
    ] }
  ],
  'silver_rathalos__head': [
    { id: 'critical_element', thresholds: [[6, 1], [8, 2]
    ] }
  ],
  'silver_rathalos__legs': [
    { id: 'critical_element', thresholds: [[6, 1]
    ] },
    { id: 'weakness_exploit', thresholds: [[8, 1]
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
  'somnacanth__chest': [
    { id: 'airborne', thresholds: [[4, 1], [6, 2]
    ] }
  ],
  'somnacanth__head': [
    { id: 'evade_extender', thresholds: [[6, 1]
    ] },
    { id: 'evasive_reload', thresholds: [[4, 1]
    ] }
  ],
  'somnacanth__legs': [
    { id: 'abnormal_status_enhancement', thresholds: [[4, 1], [6, 2]
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
  'stygian_zinogre__chest': [
    { id: 'dragon_attack_boost_secret', thresholds: [[5, 1]
    ] },
    { id: 'sp_overdrive', thresholds: [[5, 1], [8, 2]
    ] }
  ],
  'stygian_zinogre__head': [
    { id: 'dragon_attack', thresholds: [[5, 1], [8, 2]
    ] },
    { id: 'dragon_attack_boost_secret', thresholds: [[5, 1]
    ] }
  ],
  'stygian_zinogre__legs': [
    { id: 'sp_overdrive', thresholds: [[5, 1], [6, 2], [8, 3]
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
  'teostra__chest': [
    { id: 'artful_dodger', thresholds: [[8, 1]
    ] },
    { id: 'critical_eye', thresholds: [[6, 1]
    ] },
    { id: 'teostra_bless', thresholds: [[6, 1]
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
  'teostra__legs': [
    { id: 'critical_boost', thresholds: [[6, 1]
    ] },
    { id: 'evade_extender', thresholds: [[8, 1]
    ] },
    { id: 'teostra_bless', thresholds: [[6, 1]
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
  'tigrex__chest': [
    { id: 'guts', thresholds: [[5, 1]
    ] },
    { id: 'heroics', thresholds: [[5, 1], [8, 2]
    ] }
  ],
  'tigrex__head': [
    { id: 'brutal_strike', thresholds: [[5, 1]
    ] },
    { id: 'concentration', thresholds: [[6, 1]
    ] }
  ],
  'tigrex__legs': [
    { id: 'lock_on', thresholds: [[5, 1]
    ] },
    { id: 'partbreaker', thresholds: [[5, 1], [8, 2]
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
  'tobi_kadachi__chest': [
    { id: 'evade_extender', thresholds: [[2, 1]
    ] },
    { id: 'thunder_attack', thresholds: [[4, 1]
    ] }
  ],
  'tobi_kadachi__head': [
    { id: 'artful_dodger', thresholds: [[6, 1]
    ] },
    { id: 'reload_speed', thresholds: [[2, 1]
    ] }
  ],
  'tobi_kadachi__legs': [
    { id: 'artful_dodger', thresholds: [[2, 1]
    ] },
    { id: 'thunder_resistance', thresholds: [[4, 1]
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
  'tzitzi_ya_ku__head': [
    { id: 'evade_extender', thresholds: [[4, 1]
    ] },
    { id: 'thunder_attack', thresholds: [[2, 1], [6, 2]
    ] }
  ],
  'tzitzi_ya_ku__legs': [
    { id: 'fortify', thresholds: [[2, 1], [4, 2]
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
  'vipertobikadachi__chest': [
    { id: 'power_burst', thresholds: [[5, 1], [8, 2]
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
  'vipertobikadachi__legs': [
    { id: 'burst_secret', thresholds: [[5, 1]
    ] },
    { id: 'pursuit_poison', thresholds: [[5, 1], [8, 2]
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
  'volvidon__chest': [
    { id: 'paralysis_attack', thresholds: [[3, 1], [4, 2]
    ] }
  ],
  'volvidon__head': [
    { id: 'morph_boost', thresholds: [[3, 1]
    ] },
    { id: 'power_prolonger', thresholds: [[4, 1]
    ] }
  ],
  'volvidon__legs': [
    { id: 'paralysis_resistance', thresholds: [[3, 1], [4, 2], [6, 3]
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
  'zinogre__chest': [
    { id: 'perfect_evade_sp_charge', thresholds: [[5, 1], [6, 2]
    ] },
    { id: 'thunder_resistance', thresholds: [[5, 1]
    ] }
  ],
  'zinogre__head': [
    { id: 'burst', thresholds: [[6, 1]
    ] },
    { id: 'perfect_evade_sp_charge', thresholds: [[5, 1]
    ] }
  ],
  'zinogre__legs': [
    { id: 'burst', thresholds: [[5, 1]
    ] },
    { id: 'thunder_attack', thresholds: [[6, 1]
    ] }
  ],
  'zinogre__waist': [
    { id: 'artful_dodger', thresholds: [[5, 1]
    ] },
    { id: 'reload_speed', thresholds: [[6, 1]
    ] }
  ],
};
