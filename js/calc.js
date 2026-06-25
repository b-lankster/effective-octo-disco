'use strict';

// Actual upgrade recipe costs extracted from mhnow.me.
// Structure: UPGRADE_RECIPES[type].level[grade][step]
// type = 'weapon' | 'armor'
// grade = 1-10 (the current grade tier of the upgrade step)
// step = 1-5 (the upgrade level within that grade)
// Each step has: zenny, common {slot: qty}, exclusive [qty per exclusive slot]
// Variant sub-objects ('rare', 'elder', 'sub', named monster IDs) override the base.
const UPGRADE_RECIPES = {
  "weapon": {
    "level": {
      "1": {
        "1": {
          "zenny": 100,
          "common": {
            "r1_1": 1
          },
          "exclusive": [
            1
          ]
        },
        "2": {
          "zenny": 0,
          "common": {
            "r1": 1
          },
          "exclusive": [
            1
          ]
        },
        "3": {
          "zenny": 0,
          "common": {},
          "exclusive": [
            1,
            1
          ]
        },
        "4": {
          "zenny": 0,
          "common": {
            "r1": 1
          },
          "exclusive": [
            1
          ]
        },
        "5": {
          "zenny": 0,
          "common": {
            "r1_1": 1
          },
          "exclusive": [
            1
          ]
        }
      },
      "2": {
        "1": {
          "zenny": 200,
          "common": {
            "r2_1": 1
          },
          "exclusive": [
            2,
            0,
            1
          ]
        },
        "2": {
          "zenny": 0,
          "common": {
            "r1_1": 1,
            "r1": 1
          },
          "exclusive": [
            2
          ]
        },
        "3": {
          "zenny": 0,
          "common": {
            "r1_2": 1
          },
          "exclusive": [
            2,
            1
          ]
        },
        "4": {
          "zenny": 0,
          "common": {
            "r1_1": 1,
            "r1": 1
          },
          "exclusive": [
            2
          ]
        },
        "5": {
          "zenny": 0,
          "common": {
            "r3_1": 1,
            "r3_2": 1
          },
          "exclusive": [
            2
          ]
        }
      },
      "3": {
        "1": {
          "zenny": 300,
          "common": {
            "r2_1": 1
          },
          "exclusive": [
            2,
            0,
            1
          ]
        },
        "2": {
          "zenny": 0,
          "common": {
            "r1_1": 1,
            "r1": 1
          },
          "exclusive": [
            2
          ]
        },
        "3": {
          "zenny": 0,
          "common": {
            "r1_2": 1
          },
          "exclusive": [
            2,
            1
          ]
        },
        "4": {
          "zenny": 0,
          "common": {
            "r1_1": 1,
            "r1": 1
          },
          "exclusive": [
            2
          ]
        },
        "5": {
          "zenny": 0,
          "common": {
            "r3_1": 1,
            "r3_2": 1
          },
          "exclusive": [
            2
          ]
        }
      },
      "4": {
        "1": {
          "zenny": 400,
          "common": {
            "r2_1": 1
          },
          "exclusive": [
            2,
            0,
            1,
            1
          ],
          "craft": {
            "common": {
              "r2_1": 2
            }
          }
        },
        "2": {
          "zenny": 0,
          "common": {
            "r1_1": 2,
            "r1": 2
          },
          "exclusive": [
            2
          ]
        },
        "3": {
          "zenny": 0,
          "common": {
            "r1_2": 1
          },
          "exclusive": [
            2,
            2
          ]
        },
        "4": {
          "zenny": 0,
          "common": {
            "r1_1": 2,
            "r1": 2
          },
          "exclusive": [
            2
          ],
          "khezu": {
            "common": {
              "r1_3": 2,
              "r1": 2
            }
          }
        },
        "5": {
          "zenny": 0,
          "common": {
            "r3_1": 1,
            "r3_2": 1
          },
          "exclusive": [
            2
          ],
          "khezu": {
            "common": {
              "r3_3": 1,
              "r3_4": 1
            }
          }
        }
      },
      "5": {
        "1": {
          "zenny": 500,
          "common": {
            "r2_1": 3
          },
          "exclusive": [
            5,
            0,
            2,
            2
          ],
          "rare": {
            "zenny": 1500,
            "common": {
              "r2_1": 8
            },
            "exclusive": [
              4,
              0,
              2,
              2
            ]
          },
          "mizutsune": {
            "common": {
              "r2_1": 10
            }
          }
        },
        "2": {
          "zenny": 0,
          "common": {
            "r1_1": 4,
            "r1": 4
          },
          "exclusive": [
            5
          ],
          "rare": {
            "zenny": 500,
            "common": {
              "r1_1": 16,
              "r1": 22
            },
            "exclusive": [
              6
            ]
          },
          "zinogre, deviljho, mizutsune": {
            "common": {
              "r1_1": 24,
              "r1": 32
            }
          }
        },
        "3": {
          "zenny": 0,
          "common": {
            "r1_2": 2
          },
          "exclusive": [
            5,
            3
          ],
          "rare": {
            "zenny": 750,
            "common": {
              "r1_2": 10
            },
            "exclusive": [
              6,
              6
            ]
          },
          "zinogre, deviljho, mizutsune": {
            "common": {
              "r1_2": 15
            }
          }
        },
        "4": {
          "zenny": 0,
          "common": {
            "r1_1": 4,
            "r1": 4
          },
          "exclusive": [
            5
          ],
          "rare": {
            "zenny": 1000,
            "common": {
              "r1_1": 16,
              "r1": 22
            },
            "exclusive": [
              6
            ]
          },
          "mizutsune": {
            "common": {
              "r1_3": 24,
              "r1": 32
            }
          },
          "zinogre, deviljho": {
            "common": {
              "r1_1": 24,
              "r1": 32
            }
          },
          "nightshade_paolumu, khezu": {
            "common": {
              "r1_3": 4,
              "r1": 4
            }
          }
        },
        "5": {
          "zenny": 0,
          "common": {
            "r3_1": 1,
            "r3_2": 1
          },
          "exclusive": [
            5
          ],
          "rare": {
            "zenny": 1250,
            "common": {
              "r3_1": 4,
              "r3_2": 12
            },
            "exclusive": [
              6
            ]
          },
          "zinogre, deviljho": {
            "common": {
              "r3_1": 4,
              "r3_2": 16
            }
          },
          "khezu": {
            "common": {
              "r3_3": 1,
              "r3_2": 1
            }
          }
        }
      },
      "6": {
        "1": {
          "zenny": 600,
          "common": {
            "r3": 1
          },
          "exclusive": [
            9,
            0,
            0,
            4,
            2
          ],
          "rare": {
            "zenny": 3000
          },
          "elder": {
            "zenny": 3000,
            "common": {
              "r4": 4,
              "r3": 1
            },
            "exclusive": [
              0,
              0,
              8,
              0,
              2
            ]
          }
        },
        "2": {
          "zenny": 0,
          "common": {
            "r1_1": 5,
            "r1": 8
          },
          "exclusive": [
            9
          ],
          "rare": {
            "zenny": 1000,
            "common": {
              "r1_1": 32,
              "r1": 44
            },
            "exclusive": [
              9
            ]
          },
          "mizutsune": {
            "exclusive": [
              9,
              4
            ]
          },
          "elder": {
            "zenny": 1000,
            "common": {},
            "exclusive": [
              0,
              0,
              6
            ]
          }
        },
        "3": {
          "zenny": 0,
          "common": {
            "r1_2": 4
          },
          "exclusive": [
            9,
            10,
            10
          ],
          "rare": {
            "zenny": 1500,
            "common": {
              "r1_2": 20
            },
            "exclusive": [
              9,
              12,
              10
            ]
          },
          "elder": {
            "zenny": 1500,
            "common": {
              "r4": 2
            },
            "exclusive": [
              0,
              0,
              4
            ]
          }
        },
        "4": {
          "zenny": 0,
          "common": {
            "r1_1": 5,
            "r1": 8
          },
          "exclusive": [
            9
          ],
          "rare": {
            "zenny": 2000,
            "common": {
              "r1_1": 32,
              "r1": 44
            },
            "exclusive": [
              9
            ]
          },
          "mizutsune": {
            "common": {
              "r1_3": 32,
              "r1": 44
            },
            "exclusive": [
              9,
              0,
              4
            ]
          },
          "elder": {
            "zenny": 2000,
            "common": {},
            "exclusive": [
              0,
              0,
              6,
              0,
              2
            ]
          },
          "nightshade_paolumu, khezu": {
            "common": {
              "r1_3": 5,
              "r1": 8
            }
          }
        },
        "5": {
          "zenny": 0,
          "common": {
            "r2_1": 4,
            "r3_1": 1,
            "r3_2": 4
          },
          "exclusive": [
            9
          ],
          "rare": {
            "zenny": 2500,
            "common": {
              "r2_1": 20,
              "r3_1": 7,
              "r3_2": 20
            },
            "exclusive": [
              9
            ]
          },
          "mizutsune": {
            "common": {
              "r2_1": 20,
              "r3_1": 10,
              "r3_4": 20
            }
          },
          "elder": {
            "zenny": 2500,
            "common": {
              "r4": 4
            },
            "exclusive": [
              0,
              0,
              8
            ]
          },
          "nightshade_paolumu": {
            "common": {
              "r2_2": 4,
              "r3_1": 1,
              "r3_3": 4
            }
          },
          "khezu": {
            "common": {
              "r2_2": 4,
              "r3_4": 4,
              "r3_3": 1
            }
          }
        }
      },
      "7": {
        "1": {
          "zenny": 700,
          "common": {
            "r3": 1
          },
          "exclusive": [
            15,
            0,
            0,
            8,
            3
          ],
          "rare": {
            "zenny": 6000,
            "common": {
              "r3": 3
            },
            "exclusive": [
              12,
              0,
              0,
              8,
              3
            ]
          },
          "elder": {
            "zenny": 6000,
            "common": {
              "r4": 8,
              "r3": 3
            },
            "exclusive": [
              0,
              0,
              0,
              0,
              4
            ]
          }
        },
        "2": {
          "zenny": 0,
          "common": {
            "r1_1": 6,
            "r1": 10
          },
          "exclusive": [
            15
          ],
          "rare": {
            "zenny": 2000,
            "common": {
              "r1_1": 42,
              "r1": 51
            },
            "exclusive": [
              12
            ]
          },
          "mizutsune": {
            "exclusive": [
              12,
              6
            ]
          },
          "elder": {
            "zenny": 2000,
            "common": {},
            "exclusive": [
              0,
              0,
              12
            ]
          }
        },
        "3": {
          "zenny": 0,
          "common": {
            "r1_2": 5
          },
          "exclusive": [
            15,
            20,
            12
          ],
          "rare": {
            "zenny": 3000,
            "common": {
              "r1_2": 31
            },
            "exclusive": [
              12,
              20,
              15
            ]
          },
          "elder": {
            "zenny": 3000,
            "common": {
              "r4": 4
            },
            "exclusive": [
              0,
              0,
              10
            ]
          }
        },
        "4": {
          "zenny": 0,
          "common": {
            "r1_1": 6,
            "r1": 10
          },
          "exclusive": [
            15
          ],
          "rare": {
            "zenny": 4000,
            "common": {
              "r1_1": 42,
              "r1": 51
            },
            "exclusive": [
              12
            ]
          },
          "mizutsune": {
            "common": {
              "r1_3": 42,
              "r1": 51
            },
            "exclusive": [
              12,
              0,
              6
            ]
          },
          "elder": {
            "zenny": 4000,
            "common": {},
            "exclusive": [
              0,
              0,
              8,
              0,
              4
            ]
          },
          "nightshade_paolumu, khezu": {
            "common": {
              "r1_3": 6,
              "r1": 10
            }
          }
        },
        "5": {
          "zenny": 0,
          "common": {
            "r2_1": 6,
            "r3_1": 2,
            "r3_2": 6
          },
          "exclusive": [
            15
          ],
          "rare": {
            "zenny": 5000,
            "common": {
              "r2_1": 30,
              "r3_1": 11,
              "r3_2": 31
            },
            "exclusive": [
              12
            ]
          },
          "mizutsune": {
            "common": {
              "r2_1": 30,
              "r3_3": 11,
              "r3_2": 31
            }
          },
          "elder": {
            "zenny": 5000,
            "common": {
              "r4": 6
            },
            "exclusive": [
              0,
              0,
              12
            ]
          },
          "nightshade_paolumu": {
            "common": {
              "r2_1": 6,
              "r3_4": 2,
              "r3_2": 6
            }
          }
        }
      },
      "8": {
        "1": {
          "zenny": 800,
          "common": {
            "r3": 1,
            "r6": 2
          },
          "exclusive": [
            0,
            0,
            0,
            0,
            5
          ],
          "rare": {
            "zenny": 12000,
            "common": {
              "r3": 5
            },
            "exclusive": [
              0,
              0,
              0,
              0,
              8,
              2
            ]
          },
          "mizutsune": {
            "exclusive": [
              0,
              0,
              0,
              0,
              4,
              2
            ]
          },
          "elder": {
            "zenny": 12000,
            "common": {
              "r4": 16,
              "r3": 5
            },
            "exclusive": [
              0,
              0,
              0,
              0,
              8,
              6
            ]
          }
        },
        "2": {
          "zenny": 0,
          "common": {
            "r1_1": 10,
            "r1": 12
          },
          "exclusive": [
            0,
            30
          ],
          "rare": {
            "zenny": 4000,
            "common": {
              "r1_1": 53,
              "r1": 64
            },
            "exclusive": [
              0,
              30
            ]
          },
          "mizutsune": {
            "exclusive": [
              0,
              30,
              0,
              4
            ]
          },
          "elder": {
            "zenny": 4000,
            "common": {},
            "exclusive": [
              0,
              0,
              24
            ]
          }
        },
        "3": {
          "zenny": 0,
          "common": {
            "r1_2": 6,
            "r2_1": 8,
            "r6": 2
          },
          "exclusive": [
            0,
            0,
            20
          ],
          "rare": {
            "zenny": 6000,
            "common": {
              "r1_2": 41,
              "r2_1": 40
            },
            "exclusive": [
              0,
              0,
              20,
              0,
              0,
              2
            ]
          },
          "mizutsune": {
            "common": {
              "r1_2": 41,
              "r2_2": 40
            }
          },
          "elder": {
            "zenny": 6000,
            "common": {
              "r4": 10
            },
            "exclusive": [
              0,
              0,
              20,
              0,
              0,
              4
            ]
          },
          "nightshade_paolumu, khezu": {
            "common": {
              "r1_2": 6,
              "r2_2": 8,
              "r6": 2
            }
          }
        },
        "4": {
          "zenny": 0,
          "common": {
            "r1_1": 10,
            "r1": 12
          },
          "exclusive": [
            0,
            0,
            0,
            14
          ],
          "rare": {
            "zenny": 8000,
            "common": {
              "r1_1": 53,
              "r1": 64
            },
            "exclusive": [
              0,
              0,
              0,
              15
            ]
          },
          "mizutsune": {
            "common": {
              "r1_3": 53,
              "r1": 64
            },
            "exclusive": [
              0,
              0,
              0,
              15,
              6
            ]
          },
          "elder": {
            "zenny": 8000,
            "common": {},
            "exclusive": [
              0,
              0,
              16,
              0,
              8
            ]
          },
          "nightshade_paolumu, khezu": {
            "common": {
              "r1_3": 10,
              "r1": 12
            }
          }
        },
        "5": {
          "zenny": 0,
          "common": {
            "r3_1": 2,
            "r3_2": 8,
            "r6": 2
          },
          "exclusive": [
            50
          ],
          "rare": {
            "zenny": 10000,
            "common": {
              "r3_1": 17,
              "r3_2": 41
            },
            "exclusive": [
              50,
              0,
              0,
              0,
              0,
              2
            ]
          },
          "mizutsune": {
            "common": {
              "r3_3": 17,
              "r3_4": 41
            }
          },
          "elder": {
            "zenny": 10000,
            "common": {
              "r4": 16
            },
            "exclusive": [
              0,
              0,
              24,
              0,
              0,
              4
            ]
          },
          "nightshade_paolumu": {
            "common": {
              "r3_4": 2,
              "r3_3": 8,
              "r6": 2
            }
          },
          "khezu": {
            "common": {
              "r3_1": 2,
              "r3_4": 8,
              "r6": 2
            }
          }
        }
      },
      "9": {
        "1": {
          "zenny": 900,
          "common": {
            "r3": 1,
            "r6": 3
          },
          "exclusive": [
            0,
            0,
            0,
            0,
            10
          ],
          "rare": {
            "zenny": 30000,
            "common": {
              "r3": 7
            },
            "exclusive": [
              0,
              0,
              0,
              0,
              12,
              3
            ]
          },
          "mizutsune": {
            "exclusive": [
              0,
              0,
              0,
              0,
              8,
              3
            ]
          },
          "elder": {
            "zenny": 30000,
            "common": {
              "r4": 40,
              "r3": 7
            },
            "exclusive": [
              0,
              0,
              0,
              0,
              16,
              6
            ]
          }
        },
        "2": {
          "zenny": 0,
          "common": {
            "r1_1": 12,
            "r1": 14
          },
          "exclusive": [
            0,
            40
          ],
          "rare": {
            "zenny": 10000,
            "common": {
              "r1_1": 61,
              "r1": 73
            },
            "exclusive": [
              0,
              40
            ]
          },
          "mizutsune": {
            "exclusive": [
              0,
              40,
              0,
              6
            ]
          },
          "elder": {
            "zenny": 10000,
            "common": {},
            "exclusive": [
              0,
              0,
              50
            ]
          }
        },
        "3": {
          "zenny": 0,
          "common": {
            "r1_2": 10,
            "r2_1": 8,
            "r6": 3
          },
          "exclusive": [
            0,
            0,
            30
          ],
          "rare": {
            "zenny": 15000,
            "common": {
              "r1_2": 52,
              "r2_1": 49
            },
            "exclusive": [
              0,
              0,
              30,
              0,
              0,
              3
            ]
          },
          "elder": {
            "zenny": 15000,
            "common": {
              "r4": 50
            },
            "exclusive": [
              0,
              0,
              40,
              0,
              0,
              4
            ]
          }
        },
        "4": {
          "zenny": 0,
          "common": {
            "r1_1": 12,
            "r1": 14
          },
          "exclusive": [
            0,
            0,
            0,
            20
          ],
          "rare": {
            "zenny": 20000,
            "common": {
              "r1_1": 61,
              "r1": 73
            },
            "exclusive": [
              0,
              0,
              0,
              20
            ]
          },
          "mizutsune": {
            "common": {
              "r1_3": 61,
              "r1": 73
            },
            "exclusive": [
              0,
              0,
              0,
              20,
              8
            ]
          },
          "elder": {
            "zenny": 20000,
            "common": {},
            "exclusive": [
              0,
              0,
              40,
              0,
              16
            ]
          },
          "nightshade_paolumu, khezu": {
            "common": {
              "r1_3": 12,
              "r1": 14
            }
          }
        },
        "5": {
          "zenny": 0,
          "common": {
            "r3_1": 4,
            "r3_2": 10,
            "r6": 3
          },
          "exclusive": [
            80
          ],
          "rare": {
            "zenny": 25000,
            "common": {
              "r3_1": 21,
              "r3_2": 52
            },
            "exclusive": [
              100,
              0,
              0,
              0,
              0,
              3
            ]
          },
          "mizutsune": {
            "common": {
              "r3_3": 21,
              "r3_4": 52
            }
          },
          "elder": {
            "zenny": 25000,
            "common": {
              "r4": 40
            },
            "exclusive": [
              0,
              0,
              50,
              0,
              0,
              4
            ]
          },
          "nightshade_paolumu": {
            "common": {
              "r3_4": 4,
              "r3_3": 10,
              "r6": 3
            }
          },
          "khezu": {
            "common": {
              "r3_1": 4,
              "r3_4": 10,
              "r6": 3
            }
          }
        }
      },
      "10": {
        "1": {
          "zenny": 1000,
          "common": {
            "r3": 1,
            "r6": 4
          },
          "exclusive": [
            0,
            0,
            0,
            0,
            20
          ],
          "rare": {
            "zenny": 75000,
            "common": {
              "r3": 9
            },
            "exclusive": [
              0,
              0,
              0,
              0,
              20,
              4
            ]
          },
          "mizutsune": {
            "exclusive": [
              0,
              0,
              0,
              0,
              12,
              4
            ]
          },
          "elder": {
            "zenny": 75000,
            "common": {
              "r4": 80,
              "r3": 9
            },
            "exclusive": [
              0,
              0,
              0,
              0,
              30,
              6
            ]
          }
        },
        "2": {
          "zenny": 0,
          "common": {
            "r1_1": 16,
            "r1": 20
          },
          "exclusive": [
            0,
            50
          ],
          "rare": {
            "zenny": 25000,
            "common": {
              "r1_1": 73,
              "r1": 85
            },
            "exclusive": [
              0,
              50
            ]
          },
          "mizutsune": {
            "exclusive": [
              0,
              50,
              0,
              8
            ]
          },
          "elder": {
            "zenny": 25000,
            "common": {},
            "exclusive": [
              0,
              0,
              100
            ]
          }
        },
        "3": {
          "zenny": 0,
          "common": {
            "r1_2": 15,
            "r2_1": 10,
            "r6": 4
          },
          "exclusive": [
            0,
            0,
            40
          ],
          "rare": {
            "zenny": 37500,
            "common": {
              "r1_2": 63,
              "r2_1": 59
            },
            "exclusive": [
              0,
              0,
              40,
              0,
              0,
              4
            ]
          },
          "mizutsune": {
            "common": {
              "r1_2": 63,
              "r2_2": 59
            }
          },
          "elder": {
            "zenny": 37500,
            "common": {
              "r4": 60
            },
            "exclusive": [
              0,
              0,
              80,
              0,
              0,
              4
            ]
          },
          "nightshade_paolumu, khezu": {
            "common": {
              "r1_2": 15,
              "r2_2": 10,
              "r6": 4
            }
          }
        },
        "4": {
          "zenny": 0,
          "common": {
            "r1_1": 16,
            "r1": 20
          },
          "exclusive": [
            0,
            0,
            0,
            30
          ],
          "rare": {
            "zenny": 50000,
            "common": {
              "r1_1": 73,
              "r1": 85
            },
            "exclusive": [
              0,
              0,
              0,
              30
            ]
          },
          "mizutsune": {
            "common": {
              "r1_3": 73,
              "r1": 85
            },
            "exclusive": [
              0,
              0,
              0,
              30,
              20
            ]
          },
          "elder": {
            "zenny": 50000,
            "common": {},
            "exclusive": [
              0,
              0,
              80,
              0,
              30
            ]
          },
          "nightshade_paolumu, khezu": {
            "common": {
              "r1_3": 16,
              "r1": 20
            }
          }
        },
        "5": {
          "zenny": 0,
          "common": {
            "r3_1": 6,
            "r3_2": 15,
            "r6": 4
          },
          "exclusive": [
            120
          ],
          "rare": {
            "zenny": 62500,
            "common": {
              "r3_1": 31,
              "r3_2": 63
            },
            "exclusive": [
              150,
              0,
              0,
              0,
              0,
              4
            ]
          },
          "elder": {
            "zenny": 62500,
            "common": {
              "r4": 100
            },
            "exclusive": [
              0,
              0,
              200,
              0,
              50,
              10
            ]
          },
          "khezu": {
            "common": {
              "r3_3": 6,
              "r3_2": 15,
              "r6": 4
            }
          }
        }
      }
    }
  },
  "armor": {
    "level": {
      "1": {
        "1": {
          "zenny": 10,
          "common": {
            "r1_1": 1
          },
          "exclusive": [
            2
          ]
        },
        "2": {
          "zenny": 20,
          "common": {
            "r1": 1
          },
          "exclusive": [
            2
          ]
        },
        "3": {
          "zenny": 30,
          "common": {},
          "exclusive": [
            2,
            1
          ]
        },
        "4": {
          "zenny": 40,
          "common": {
            "r1": 1
          },
          "exclusive": [
            2
          ]
        },
        "5": {
          "zenny": 50,
          "common": {
            "r1_1": 1
          },
          "exclusive": [
            2
          ]
        }
      },
      "2": {
        "1": {
          "zenny": 300,
          "common": {
            "r2_1": 1
          },
          "exclusive": [
            2,
            0,
            1
          ]
        },
        "2": {
          "zenny": 100,
          "common": {
            "r1_1": 2,
            "r1": 2
          },
          "exclusive": [
            2
          ]
        },
        "3": {
          "zenny": 150,
          "common": {
            "r1_2": 1
          },
          "exclusive": [
            2,
            2
          ]
        },
        "4": {
          "zenny": 200,
          "common": {
            "r1_1": 2,
            "r1": 2
          },
          "exclusive": [
            2
          ]
        },
        "5": {
          "zenny": 250,
          "common": {
            "r3_1": 1,
            "r3_2": 1
          },
          "exclusive": [
            2
          ]
        }
      },
      "3": {
        "1": {
          "zenny": 600,
          "common": {
            "r2_1": 2
          },
          "exclusive": [
            3,
            0,
            2
          ],
          "craft": {
            "exclusive": [
              4,
              0,
              2
            ]
          }
        },
        "2": {
          "zenny": 200,
          "common": {
            "r1_1": 3,
            "r1": 6
          },
          "exclusive": [
            3
          ]
        },
        "3": {
          "zenny": 300,
          "common": {
            "r1_2": 2
          },
          "exclusive": [
            3,
            3
          ]
        },
        "4": {
          "zenny": 400,
          "common": {
            "r1_1": 3,
            "r1": 6
          },
          "exclusive": [
            3
          ]
        },
        "5": {
          "zenny": 500,
          "common": {
            "r3_1": 1,
            "r3_2": 3
          },
          "exclusive": [
            3
          ]
        }
      },
      "4": {
        "1": {
          "zenny": 900,
          "common": {
            "r2_1": 4
          },
          "exclusive": [
            4,
            0,
            2,
            2
          ],
          "craft": {
            "exclusive": [
              2,
              0,
              1,
              2
            ]
          }
        },
        "2": {
          "zenny": 300,
          "common": {
            "r1_1": 6,
            "r1": 12
          },
          "exclusive": [
            4
          ]
        },
        "3": {
          "zenny": 450,
          "common": {
            "r1_2": 3
          },
          "exclusive": [
            4,
            4
          ]
        },
        "4": {
          "zenny": 600,
          "common": {
            "r1_1": 6,
            "r1": 12
          },
          "exclusive": [
            4
          ],
          "khezu": {
            "common": {
              "r1_3": 6,
              "r1": 12
            }
          }
        },
        "5": {
          "zenny": 750,
          "common": {
            "r3_1": 2,
            "r3_2": 6
          },
          "exclusive": [
            4
          ],
          "khezu": {
            "common": {
              "r3_3": 2,
              "r3_4": 6
            }
          }
        }
      },
      "5": {
        "1": {
          "zenny": 1500,
          "common": {
            "r2_1": 6
          },
          "exclusive": [
            6,
            0,
            3,
            3
          ],
          "sub": {
            "common": {
              "r2_1": 7
            },
            "exclusive": [
              4,
              0,
              2,
              2
            ]
          },
          "rare": {
            "exclusive": [
              3,
              0,
              2,
              2
            ]
          },
          "zinogre, mizutsune": {
            "common": {
              "r2_1": 7
            }
          },
          "black_diablos, coral_pukei_pukei": {
            "exclusive": [
              3,
              0,
              2,
              2
            ]
          },
          "nightshade_paolumu, diablos, legiana, rathalos": {
            "common": {
              "r2_1": 7
            },
            "exclusive": [
              4,
              0,
              2,
              2
            ]
          }
        },
        "2": {
          "zenny": 500,
          "common": {
            "r1_1": 11,
            "r1": 15
          },
          "exclusive": [
            6
          ],
          "rare": {
            "exclusive": [
              4
            ]
          },
          "zinogre, mizutsune": {
            "common": {
              "r1_1": 17,
              "r1": 22
            }
          },
          "deviljho": {
            "common": {
              "r1_1": 17,
              "r1": 22
            },
            "exclusive": [
              4
            ]
          }
        },
        "3": {
          "zenny": 750,
          "common": {
            "r1_2": 9
          },
          "exclusive": [
            6,
            5
          ],
          "rare": {
            "exclusive": [
              4,
              3
            ]
          },
          "zinogre, deviljho, mizutsune": {
            "common": {
              "r1_2": 11
            }
          }
        },
        "4": {
          "zenny": 1000,
          "common": {
            "r1_1": 11,
            "r1": 15
          },
          "exclusive": [
            6
          ],
          "rare": {
            "exclusive": [
              4
            ]
          },
          "zinogre, deviljho": {
            "common": {
              "r1_1": 17,
              "r1": 22
            }
          },
          "mizutsune": {
            "common": {
              "r1_3": 17,
              "r1": 22
            }
          },
          "nightshade_paolumu, khezu": {
            "common": {
              "r1_3": 11,
              "r1": 15
            }
          }
        },
        "5": {
          "zenny": 1250,
          "common": {
            "r3_1": 3,
            "r3_2": 9
          },
          "exclusive": [
            6
          ],
          "rare": {
            "exclusive": [
              4
            ]
          },
          "zinogre, deviljho, mizutsune": {
            "common": {
              "r3_1": 3,
              "r3_2": 11
            }
          },
          "khezu": {
            "common": {
              "r3_3": 3,
              "r3_2": 9
            }
          }
        }
      },
      "6": {
        "1": {
          "zenny": 3000,
          "common": {
            "r3": 1
          },
          "exclusive": [
            13,
            0,
            0,
            3,
            2
          ],
          "rare": {
            "exclusive": [
              6,
              0,
              0,
              2,
              2
            ]
          },
          "elder": {
            "common": {
              "r4": 2,
              "r3": 1
            },
            "exclusive": [
              0,
              0,
              4,
              0,
              2
            ]
          }
        },
        "2": {
          "zenny": 1000,
          "common": {
            "r1_1": 22,
            "r1": 31
          },
          "exclusive": [
            13
          ],
          "rare": {
            "exclusive": [
              6
            ]
          },
          "mizutsune": {
            "exclusive": [
              6,
              2
            ]
          },
          "elder": {
            "common": {
              "r4": 0
            },
            "exclusive": [
              0,
              0,
              3
            ]
          }
        },
        "3": {
          "zenny": 1500,
          "common": {
            "r1_2": 14
          },
          "exclusive": [
            13,
            10,
            8
          ],
          "rare": {
            "exclusive": [
              6,
              6,
              5
            ]
          },
          "elder": {
            "common": {
              "r4": 1
            },
            "exclusive": [
              0,
              0,
              2
            ]
          }
        },
        "4": {
          "zenny": 2000,
          "common": {
            "r1_1": 22,
            "r1": 31
          },
          "exclusive": [
            13
          ],
          "rare": {
            "exclusive": [
              6
            ]
          },
          "mizutsune": {
            "common": {
              "r1_3": 22,
              "r1": 31
            },
            "exclusive": [
              6,
              0,
              2
            ]
          },
          "elder": {
            "common": {},
            "exclusive": [
              0,
              0,
              3,
              0,
              1
            ]
          },
          "nightshade_paolumu, khezu": {
            "common": {
              "r1_3": 22,
              "r1": 31
            }
          }
        },
        "5": {
          "zenny": 2500,
          "common": {
            "r2_1": 14,
            "r3_1": 5,
            "r3_2": 14
          },
          "exclusive": [
            13
          ],
          "rare": {
            "exclusive": [
              6
            ]
          },
          "mizutsune": {
            "common": {
              "r2_1": 14,
              "r3_1": 5,
              "r3_4": 14
            }
          },
          "elder": {
            "common": {
              "r4": 2
            },
            "exclusive": [
              0,
              0,
              4
            ]
          },
          "nightshade_paolumu": {
            "common": {
              "r2_1": 14,
              "r3_1": 5,
              "r3_3": 14
            }
          },
          "khezu": {
            "common": {
              "r2_2": 14,
              "r3_3": 5,
              "r3_4": 14
            }
          }
        }
      },
      "7": {
        "1": {
          "zenny": 6000,
          "common": {
            "r3": 3
          },
          "exclusive": [
            17,
            0,
            0,
            6,
            2
          ],
          "rare": {
            "exclusive": [
              8,
              0,
              0,
              4,
              2
            ]
          },
          "elder": {
            "common": {
              "r4": 4,
              "r3": 3
            },
            "exclusive": [
              0,
              0,
              0,
              0,
              2
            ]
          }
        },
        "2": {
          "zenny": 2000,
          "common": {
            "r1_1": 29,
            "r1": 36
          },
          "exclusive": [
            17
          ],
          "rare": {
            "exclusive": [
              8
            ]
          },
          "mizutsune": {
            "exclusive": [
              8,
              3
            ]
          },
          "elder": {
            "common": {},
            "exclusive": [
              0,
              0,
              6
            ]
          }
        },
        "3": {
          "zenny": 3000,
          "common": {
            "r1_2": 22
          },
          "exclusive": [
            17,
            15,
            10
          ],
          "rare": {
            "exclusive": [
              8,
              10,
              7
            ]
          },
          "elder": {
            "common": {
              "r4": 2
            },
            "exclusive": [
              0,
              0,
              5
            ]
          }
        },
        "4": {
          "zenny": 4000,
          "common": {
            "r1_1": 29,
            "r1": 36
          },
          "exclusive": [
            17
          ],
          "rare": {
            "exclusive": [
              8
            ]
          },
          "mizutsune": {
            "common": {
              "r1_3": 29,
              "r1": 36
            },
            "exclusive": [
              8,
              0,
              3
            ]
          },
          "elder": {
            "common": {},
            "exclusive": [
              0,
              0,
              4,
              0,
              2
            ]
          },
          "nightshade_paolumu, khezu": {
            "common": {
              "r1_3": 29,
              "r1": 36
            }
          }
        },
        "5": {
          "zenny": 5000,
          "common": {
            "r2_1": 21,
            "r3_1": 8,
            "r3_2": 22
          },
          "exclusive": [
            17
          ],
          "rare": {
            "exclusive": [
              8
            ]
          },
          "mizutsune": {
            "common": {
              "r2_1": 21,
              "r3_3": 8,
              "r3_2": 22
            }
          },
          "nightshade_paolumu": {
            "common": {
              "r2_1": 21,
              "r3_4": 8,
              "r3_2": 22
            }
          },
          "elder": {
            "common": {
              "r4": 3
            },
            "exclusive": [
              0,
              0,
              6
            ]
          }
        }
      },
      "8": {
        "1": {
          "zenny": 12000,
          "common": {
            "r3": 5,
            "r6": 2
          },
          "exclusive": [
            0,
            0,
            0,
            0,
            3
          ],
          "rare": {
            "common": {
              "r3": 5
            },
            "exclusive": [
              0,
              0,
              0,
              0,
              4,
              2
            ]
          },
          "mizutsune": {
            "exclusive": [
              0,
              0,
              0,
              0,
              2,
              2
            ]
          },
          "elder": {
            "common": {
              "r4": 8,
              "r3": 5
            },
            "exclusive": [
              0,
              0,
              0,
              0,
              4,
              3
            ]
          }
        },
        "2": {
          "zenny": 4000,
          "common": {
            "r1_1": 37,
            "r1": 45
          },
          "exclusive": [
            0,
            20
          ],
          "rare": {
            "exclusive": [
              0,
              15
            ]
          },
          "mizutsune": {
            "exclusive": [
              0,
              15,
              0,
              2
            ]
          },
          "elder": {
            "common": {},
            "exclusive": [
              0,
              0,
              12
            ]
          }
        },
        "3": {
          "zenny": 6000,
          "common": {
            "r1_2": 29,
            "r2_1": 28,
            "r6": 2
          },
          "exclusive": [
            0,
            0,
            15
          ],
          "rare": {
            "common": {
              "r1_2": 29,
              "r2_1": 28
            },
            "exclusive": [
              0,
              0,
              10,
              0,
              0,
              2
            ]
          },
          "mizutsune": {
            "common": {
              "r1_2": 29,
              "r2_2": 28
            }
          },
          "elder": {
            "common": {
              "r4": 5
            },
            "exclusive": [
              0,
              0,
              10,
              0,
              0,
              2
            ]
          },
          "khezu": {
            "common": {
              "r1_2": 29,
              "r2_2": 28,
              "r6": 2
            }
          }
        },
        "4": {
          "zenny": 8000,
          "common": {
            "r1_1": 37,
            "r1": 45
          },
          "exclusive": [
            0,
            0,
            0,
            10
          ],
          "rare": {
            "exclusive": [
              0,
              0,
              0,
              7
            ]
          },
          "mizutsune": {
            "common": {
              "r1_3": 37,
              "r1": 45
            },
            "exclusive": [
              0,
              0,
              0,
              4,
              4
            ]
          },
          "elder": {
            "common": {},
            "exclusive": [
              0,
              0,
              8,
              0,
              4
            ]
          },
          "nightshade_paolumu, khezu": {
            "common": {
              "r1_3": 37,
              "r1": 45
            }
          }
        },
        "5": {
          "zenny": 10000,
          "common": {
            "r3_1": 12,
            "r3_2": 29,
            "r6": 2
          },
          "exclusive": [
            70
          ],
          "rare": {
            "common": {
              "r3_1": 12,
              "r3_2": 29
            },
            "exclusive": [
              35,
              0,
              0,
              0,
              0,
              2
            ]
          },
          "mizutsune": {
            "common": {
              "r3_3": 12,
              "r3_4": 29
            }
          },
          "elder": {
            "common": {
              "r4": 8
            },
            "exclusive": [
              0,
              0,
              12,
              0,
              0,
              2
            ]
          },
          "nightshade_paolumu": {
            "common": {
              "r3_4": 12,
              "r3_3": 29,
              "r6": 2
            }
          },
          "khezu": {
            "common": {
              "r3_1": 12,
              "r3_4": 29,
              "r6": 2
            }
          }
        }
      },
      "9": {
        "1": {
          "zenny": 30000,
          "common": {
            "r3": 7,
            "r6": 3
          },
          "exclusive": [
            0,
            0,
            0,
            0,
            5
          ],
          "rare": {
            "common": {
              "r3": 7
            },
            "exclusive": [
              0,
              0,
              0,
              0,
              6,
              2
            ]
          },
          "mizutsune": {
            "exclusive": [
              0,
              0,
              0,
              0,
              4,
              2
            ]
          },
          "elder": {
            "common": {
              "r4": 20,
              "r3": 7
            },
            "exclusive": [
              0,
              0,
              0,
              0,
              8,
              3
            ]
          }
        },
        "2": {
          "zenny": 10000,
          "common": {
            "r1_1": 43,
            "r1": 51
          },
          "exclusive": [
            0,
            25
          ],
          "rare": {
            "common": {
              "r1_1": 43,
              "r1": 51
            },
            "exclusive": [
              0,
              20
            ]
          },
          "mizutsune": {
            "exclusive": [
              0,
              20,
              0,
              6
            ]
          },
          "elder": {
            "common": {},
            "exclusive": [
              0,
              0,
              25
            ]
          }
        },
        "3": {
          "zenny": 15000,
          "common": {
            "r1_2": 36,
            "r2_1": 34,
            "r6": 3
          },
          "exclusive": [
            0,
            0,
            20
          ],
          "rare": {
            "common": {
              "r1_2": 36,
              "r2_1": 34
            },
            "exclusive": [
              0,
              0,
              15,
              0,
              0,
              2
            ]
          },
          "elder": {
            "common": {
              "r4": 25
            },
            "exclusive": [
              0,
              0,
              20,
              0,
              0,
              2
            ]
          },
          "nightshade_paolumu": {
            "common": {
              "r1_2": 36,
              "r2_2": 34,
              "r6": 3
            }
          }
        },
        "4": {
          "zenny": 20000,
          "common": {
            "r1_1": 43,
            "r1": 51
          },
          "exclusive": [
            0,
            0,
            0,
            15
          ],
          "rare": {
            "exclusive": [
              0,
              0,
              0,
              10
            ]
          },
          "mizutsune": {
            "common": {
              "r1_3": 43,
              "r1": 51
            },
            "exclusive": [
              0,
              0,
              0,
              8,
              4
            ]
          },
          "elder": {
            "common": {},
            "exclusive": [
              0,
              0,
              20,
              0,
              8
            ]
          },
          "nightshade_paolumu, khezu": {
            "common": {
              "r1_3": 43,
              "r1": 51
            }
          }
        },
        "5": {
          "zenny": 25000,
          "common": {
            "r3_1": 15,
            "r3_2": 36,
            "r6": 3
          },
          "exclusive": [
            140
          ],
          "rare": {
            "common": {
              "r3_1": 15,
              "r3_2": 36
            },
            "exclusive": [
              70,
              0,
              0,
              0,
              0,
              2
            ]
          },
          "mizutsune": {
            "common": {
              "r3_3": 15,
              "r3_4": 36
            }
          },
          "elder": {
            "common": {
              "r4": 20
            },
            "exclusive": [
              0,
              0,
              25,
              0,
              0,
              2
            ]
          },
          "nightshade_paolumu": {
            "common": {
              "r3_4": 15,
              "r3_3": 36,
              "r6": 3
            }
          },
          "khezu": {
            "common": {
              "r3_1": 15,
              "r3_4": 36,
              "r6": 3
            }
          }
        }
      },
      "10": {
        "1": {
          "zenny": 75000,
          "common": {
            "r3": 9,
            "r6": 5
          },
          "exclusive": [
            0,
            0,
            0,
            0,
            10
          ],
          "rare": {
            "common": {
              "r3": 9
            },
            "exclusive": [
              0,
              0,
              0,
              0,
              10,
              2
            ]
          },
          "mizutsune": {
            "exclusive": [
              0,
              0,
              0,
              0,
              8,
              2
            ]
          },
          "elder": {
            "common": {
              "r4": 40,
              "r3": 9
            },
            "exclusive": [
              0,
              0,
              0,
              0,
              15,
              3
            ]
          }
        },
        "2": {
          "zenny": 25000,
          "common": {
            "r1_1": 51,
            "r1": 60
          },
          "exclusive": [
            0,
            30
          ],
          "rare": {
            "exclusive": [
              0,
              25
            ]
          },
          "mizutsune": {
            "exclusive": [
              0,
              25,
              0,
              10
            ]
          },
          "elder": {
            "common": {},
            "exclusive": [
              0,
              0,
              50
            ]
          }
        },
        "3": {
          "zenny": 37500,
          "common": {
            "r1_2": 44,
            "r2_1": 41,
            "r6": 10
          },
          "exclusive": [
            0,
            0,
            25
          ],
          "rare": {
            "common": {
              "r1_2": 44,
              "r2_1": 41
            },
            "exclusive": [
              0,
              0,
              20,
              0,
              0,
              2
            ]
          },
          "mizutsune": {
            "common": {
              "r1_2": 44,
              "r2_2": 41
            }
          },
          "elder": {
            "common": {
              "r4": 30
            },
            "exclusive": [
              0,
              0,
              40,
              0,
              0,
              2
            ]
          },
          "khezu": {
            "common": {
              "r1_2": 44,
              "r2_2": 41,
              "r6": 10
            }
          }
        },
        "4": {
          "zenny": 50000,
          "common": {
            "r1_1": 51,
            "r1": 60
          },
          "exclusive": [
            0,
            0,
            0,
            20
          ],
          "rare": {
            "exclusive": [
              0,
              0,
              0,
              15
            ]
          },
          "mizutsune": {
            "common": {
              "r1_3": 51,
              "r1": 60
            },
            "exclusive": [
              0,
              0,
              0,
              12,
              8
            ]
          },
          "elder": {
            "common": {},
            "exclusive": [
              0,
              0,
              40,
              0,
              15
            ]
          },
          "nightshade_paolumu, khezu": {
            "common": {
              "r1_3": 51,
              "r1": 60
            }
          }
        },
        "5": {
          "zenny": 62500,
          "common": {
            "r3_1": 22,
            "r3_2": 44,
            "r6": 15
          },
          "exclusive": [
            210
          ],
          "rare": {
            "common": {
              "r3_1": 22,
              "r3_2": 44
            },
            "exclusive": [
              100,
              0,
              0,
              0,
              0,
              2
            ]
          },
          "elder": {
            "common": {
              "r4": 50
            },
            "exclusive": [
              0,
              0,
              100,
              0,
              25,
              5
            ]
          },
          "khezu": {
            "common": {
              "r3_3": 22,
              "r3_2": 44,
              "r6": 15
            }
          }
        }
      }
    }
  }
};

// Common material slot key → rarity tier (used for display sorting)
function slotRarity(slot) {
  if (slot === 'r4') return 4;
  if (slot === 'r6') return 6;
  const m = slot.match(/^r(\d+)/);
  return m ? parseInt(m[1]) : 1;
}

// Max upgrade steps for a monster (steps 1-N go from starting grade to G10-L5)
function maxStep(monster) {
  return (11 - monster.stars) * 5;
}

// Display label for a step number (0 = not crafted, 1-N = G_-L_)
function stepLabel(monster, step) {
  if (step <= 0) return '—';
  const grade = monster.stars + Math.floor((step - 1) / 5);
  const level = ((step - 1) % 5) + 1;
  return `G${grade}-L${level}`;
}

// Get the resolved recipe for a specific upgrade step.
// Returns { zenny, common, exclusive } or null.
function getStepRecipe(monster, gradeLevel, stepWithin, isWeapon) {
  const levelMap = UPGRADE_RECIPES[isWeapon ? 'weapon' : 'armor'].level;
  const stepData = levelMap[String(gradeLevel)]?.[String(stepWithin)];
  if (!stepData) return null;

  // Resolve base: recipeGroup variants take precedence over the plain base
  let resolved = {
    zenny:     stepData.zenny     ?? 0,
    common:    { ...(stepData.common    ?? {}) },
    exclusive: [ ...(stepData.exclusive ?? []) ],
  };

  const rg = monster.recipeGroup;
  if (rg && stepData[rg]) {
    const ov = stepData[rg];
    if ('zenny'     in ov) resolved.zenny     = ov.zenny;
    if ('common'    in ov) resolved.common    = { ...ov.common };
    if ('exclusive' in ov) resolved.exclusive = [ ...ov.exclusive ];
  }

  // Named monster override (single key like 'mizutsune')
  if (stepData[monster.id]) {
    const ov = stepData[monster.id];
    if ('zenny'     in ov) resolved.zenny     = ov.zenny;
    if ('common'    in ov) resolved.common    = { ...resolved.common, ...ov.common };
    if ('exclusive' in ov) resolved.exclusive = [ ...ov.exclusive ];
  }

  return resolved;
}

// Returns the material ID for a given exclusive slot index.
// isWeapon distinguishes index-0 when it's {weapon, armor}.
function getExclusiveMatId(monster, index, isWeapon) {
  const excl = monster.exclusive[index];
  if (!excl || excl === 'none') return null;
  if (typeof excl === 'object') return isWeapon ? excl.weapon : excl.armor;
  return excl;
}

// Display name for a monster exclusive material ID
function getExclusiveName(monster, matId) {
  if (!matId) return '?';
  const partType = matId.split('_')[0];
  const suffix = EXCLUSIVE_PART_NAMES[partType] || (partType.charAt(0).toUpperCase() + partType.slice(1));
  return `${monster.name} ${suffix}`;
}

// Resolve a common material slot to its material ID.
// 'r1' / 'r2' / 'r3' (no subscript) fall back to the first matching slot.
function getCommonMatId(monster, slot) {
  if (slot === 'r6') return 'wyvern_gem_shard';
  if (monster.commons[slot]) return monster.commons[slot];
  // Fallback: strip the subscript and try _1
  const fallback = slot + '_1';
  if (monster.commons[fallback]) return monster.commons[fallback];
  // Try any slot matching the rarity prefix
  const prefix = slot.replace(/_\d+$/, '');
  for (const k of Object.keys(monster.commons)) {
    if (k.startsWith(prefix)) return monster.commons[k];
  }
  return null;
}

// ─── Core upgrade cost calculation ───────────────────────────────────────────
// fromStep and toStep are 0-based step counts from the monster's starting grade.
// Step 0 = not crafted. Step N = maxStep(monster) = fully upgraded to G10-L5.
// isWeapon determines which recipe table and exclusive[0] variant to use.

function calcUpgradeCost(monster, fromStep, toStep, isWeapon) {
  if (toStep <= fromStep) return { materials: [], zenny: 0 };
  const cap = maxStep(monster);
  const to  = Math.min(toStep, cap);

  const totals = {}; // matId → { name, rarity, qty, isExclusive }
  let zenny = 0;

  for (let s = fromStep + 1; s <= to; s++) {
    const gradeLevel  = monster.stars + Math.floor((s - 1) / 5);
    const stepWithin  = ((s - 1) % 5) + 1;
    const recipe = getStepRecipe(monster, gradeLevel, stepWithin, isWeapon);
    if (!recipe) continue;

    zenny += recipe.zenny ?? 0;

    // Common (generic) materials
    for (const [slot, qty] of Object.entries(recipe.common ?? {})) {
      if (!qty) continue;
      const matId = getCommonMatId(monster, slot);
      if (!matId) continue;
      const name = COMMON_MATERIAL_NAMES[matId] ?? matId.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      const rarity = slotRarity(slot);
      if (!totals[matId]) totals[matId] = { name, rarity, qty: 0, isExclusive: false };
      totals[matId].qty += qty;
    }

    // Exclusive (monster-specific) materials
    for (let i = 0; i < (recipe.exclusive?.length ?? 0); i++) {
      const qty = recipe.exclusive[i];
      if (!qty) continue;
      const matId = getExclusiveMatId(monster, i, isWeapon);
      if (!matId) continue;
      const name   = getExclusiveName(monster, matId);
      const rarity = monster.stars + Math.min(i, 3);
      if (!totals[matId]) totals[matId] = { name, rarity, qty: 0, isExclusive: true };
      totals[matId].qty += qty;
    }
  }

  return {
    materials: Object.entries(totals).map(([matId, d]) => ({ matId, ...d })),
    zenny,
  };
}

// ─── Aggregate needs across all tracked gear ──────────────────────────────────

function calcAllNeeds() {
  const tracked = AppState.trackedIds();
  const byMat = {};

  for (const equipId of tracked) {
    const weapon  = WEAPON_BY_ID[equipId];
    const armor   = ARMOR_BY_ID[equipId];
    const equip   = weapon ?? armor;
    if (!equip) continue;
    const monster = MONSTER_BY_ID[equip.monsterId];
    if (!monster) continue;

    const prog    = AppState.getProgress(equipId);
    const cost    = calcUpgradeCost(monster, prog.currentGrade, prog.targetGrade, !!weapon);

    for (const item of cost.materials) {
      const key = `${monster.id}__${item.matId}`;
      if (!byMat[key]) {
        byMat[key] = { monster, matId: item.matId, name: item.name, rarity: item.rarity, needed: 0 };
      }
      byMat[key].needed += item.qty;
    }
  }

  return Object.values(byMat)
    .map(e => ({ ...e, have: AppState.getInventory(e.matId), shortage: Math.max(0, e.needed - AppState.getInventory(e.matId)) }))
    .sort((a, b) => b.monster.stars - a.monster.stars || b.rarity - a.rarity || a.name.localeCompare(b.name));
}

// ─── Monster priority ranking ─────────────────────────────────────────────────

function calcMonsterPriority() {
  const tracked = AppState.trackedIds();
  const scores  = {};

  for (const equipId of tracked) {
    const equip   = WEAPON_BY_ID[equipId] ?? ARMOR_BY_ID[equipId];
    if (!equip) continue;
    const monster = MONSTER_BY_ID[equip.monsterId];
    if (!monster) continue;

    const prog       = AppState.getProgress(equipId);
    const stepsLeft  = Math.max(0, prog.targetGrade - prog.currentGrade);
    if (!stepsLeft) continue;

    const cost       = calcUpgradeCost(monster, prog.currentGrade, prog.targetGrade, !!WEAPON_BY_ID[equipId]);
    const totalQty   = cost.materials.reduce((s, m) => s + m.qty, 0) || 1;
    const avgRarity  = cost.materials.reduce((s, m) => s + m.rarity * m.qty, 0) / totalQty;
    const rarityMult = 1 + avgRarity / 10;

    let shortageRatio = 1;
    if (cost.materials.length > 0) {
      const need  = cost.materials.reduce((s, m) => s + m.qty, 0);
      const short = cost.materials.reduce((s, m) => s + Math.max(0, m.qty - AppState.getInventory(m.matId)), 0);
      shortageRatio = need ? short / need : 0;
    }

    let pieceScore = stepsLeft * rarityMult * shortageRatio;
    if (monster.isEvent) pieceScore *= 2;

    if (!scores[monster.id]) scores[monster.id] = { monster, score: 0, pieces: 0, stepsTotal: 0 };
    scores[monster.id].score      += pieceScore;
    scores[monster.id].pieces     += 1;
    scores[monster.id].stepsTotal += stepsLeft;
  }

  return Object.values(scores).sort((a, b) => b.score - a.score);
}
