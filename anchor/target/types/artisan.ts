/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/artsn_core.json`.
 */
export type ArtsnCore = {
    "address": "S1GvFEzpWUM5EwYZMFLcEdMEXEjhUZzhhQeN5AvG6mw",
    "metadata": {
      "name": "artsnCore",
      "version": "0.1.0",
      "spec": "0.1.0",
      "description": "Created with Anchor"
    },
    "instructions": [
      {
        "name": "buyFractionalizedListing",
        "discriminator": [
          101,
          217,
          165,
          147,
          244,
          220,
          82,
          9
        ],
        "accounts": [
          {
            "name": "buyer",
            "signer": true
          },
          {
            "name": "payer",
            "writable": true,
            "signer": true
          },
          {
            "name": "mint"
          },
          {
            "name": "buyerAta",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "path": "buyer"
                },
                {
                  "kind": "const",
                  "value": [
                    6,
                    221,
                    246,
                    225,
                    215,
                    101,
                    161,
                    147,
                    217,
                    203,
                    225,
                    70,
                    206,
                    235,
                    121,
                    172,
                    28,
                    180,
                    133,
                    237,
                    95,
                    91,
                    55,
                    145,
                    58,
                    140,
                    245,
                    133,
                    126,
                    255,
                    0,
                    169
                  ]
                },
                {
                  "kind": "account",
                  "path": "mint"
                }
              ],
              "program": {
                "kind": "const",
                "value": [
                  140,
                  151,
                  37,
                  143,
                  78,
                  36,
                  137,
                  241,
                  187,
                  61,
                  16,
                  41,
                  20,
                  142,
                  13,
                  131,
                  11,
                  90,
                  19,
                  153,
                  218,
                  255,
                  16,
                  132,
                  4,
                  142,
                  123,
                  216,
                  219,
                  233,
                  248,
                  89
                ]
              }
            }
          },
          {
            "name": "listingAta",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "path": "listing"
                },
                {
                  "kind": "const",
                  "value": [
                    6,
                    221,
                    246,
                    225,
                    215,
                    101,
                    161,
                    147,
                    217,
                    203,
                    225,
                    70,
                    206,
                    235,
                    121,
                    172,
                    28,
                    180,
                    133,
                    237,
                    95,
                    91,
                    55,
                    145,
                    58,
                    140,
                    245,
                    133,
                    126,
                    255,
                    0,
                    169
                  ]
                },
                {
                  "kind": "account",
                  "path": "mint"
                }
              ],
              "program": {
                "kind": "const",
                "value": [
                  140,
                  151,
                  37,
                  143,
                  78,
                  36,
                  137,
                  241,
                  187,
                  61,
                  16,
                  41,
                  20,
                  142,
                  13,
                  131,
                  11,
                  90,
                  19,
                  153,
                  218,
                  255,
                  16,
                  132,
                  4,
                  142,
                  123,
                  216,
                  219,
                  233,
                  248,
                  89
                ]
              }
            }
          },
          {
            "name": "manager",
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    109,
                    97,
                    110,
                    97,
                    103,
                    101,
                    114
                  ]
                }
              ]
            }
          },
          {
            "name": "buyerProfile",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    112,
                    114,
                    111,
                    102,
                    105,
                    108,
                    101
                  ]
                },
                {
                  "kind": "account",
                  "path": "buyer"
                }
              ]
            }
          },
          {
            "name": "listing",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    108,
                    105,
                    115,
                    116,
                    105,
                    110,
                    103
                  ]
                },
                {
                  "kind": "account",
                  "path": "listing.id",
                  "account": "fractionalizedListing"
                }
              ]
            }
          },
          {
            "name": "object",
            "writable": true
          },
          {
            "name": "fraction",
            "writable": true,
            "signer": true
          },
          {
            "name": "protocol",
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    112,
                    114,
                    111,
                    116,
                    111,
                    99,
                    111,
                    108
                  ]
                }
              ]
            }
          },
          {
            "name": "instructions",
            "address": "Sysvar1nstructions1111111111111111111111111"
          },
          {
            "name": "associatedTokenProgram",
            "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
          },
          {
            "name": "tokenProgram",
            "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
          },
          {
            "name": "mplCoreProgram",
            "address": "CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d"
          },
          {
            "name": "systemProgram",
            "address": "11111111111111111111111111111111"
          }
        ],
        "args": [
          {
            "name": "uri",
            "type": "string"
          }
        ]
      },
      {
        "name": "buyMarketplaceListing",
        "discriminator": [
          67,
          203,
          113,
          132,
          38,
          72,
          175,
          157
        ],
        "accounts": [
          {
            "name": "buyer",
            "signer": true
          },
          {
            "name": "owner"
          },
          {
            "name": "payer",
            "writable": true,
            "signer": true
          },
          {
            "name": "mint",
            "address": "5yRcNyhKR7BpAx8DUrqfuhjcpMEVKxdQT1KAS8o72ZAW"
          },
          {
            "name": "buyerAta",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "path": "buyer"
                },
                {
                  "kind": "const",
                  "value": [
                    6,
                    221,
                    246,
                    225,
                    215,
                    101,
                    161,
                    147,
                    217,
                    203,
                    225,
                    70,
                    206,
                    235,
                    121,
                    172,
                    28,
                    180,
                    133,
                    237,
                    95,
                    91,
                    55,
                    145,
                    58,
                    140,
                    245,
                    133,
                    126,
                    255,
                    0,
                    169
                  ]
                },
                {
                  "kind": "account",
                  "path": "mint"
                }
              ],
              "program": {
                "kind": "const",
                "value": [
                  140,
                  151,
                  37,
                  143,
                  78,
                  36,
                  137,
                  241,
                  187,
                  61,
                  16,
                  41,
                  20,
                  142,
                  13,
                  131,
                  11,
                  90,
                  19,
                  153,
                  218,
                  255,
                  16,
                  132,
                  4,
                  142,
                  123,
                  216,
                  219,
                  233,
                  248,
                  89
                ]
              }
            }
          },
          {
            "name": "ownerAta",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "path": "owner"
                },
                {
                  "kind": "const",
                  "value": [
                    6,
                    221,
                    246,
                    225,
                    215,
                    101,
                    161,
                    147,
                    217,
                    203,
                    225,
                    70,
                    206,
                    235,
                    121,
                    172,
                    28,
                    180,
                    133,
                    237,
                    95,
                    91,
                    55,
                    145,
                    58,
                    140,
                    245,
                    133,
                    126,
                    255,
                    0,
                    169
                  ]
                },
                {
                  "kind": "account",
                  "path": "mint"
                }
              ],
              "program": {
                "kind": "const",
                "value": [
                  140,
                  151,
                  37,
                  143,
                  78,
                  36,
                  137,
                  241,
                  187,
                  61,
                  16,
                  41,
                  20,
                  142,
                  13,
                  131,
                  11,
                  90,
                  19,
                  153,
                  218,
                  255,
                  16,
                  132,
                  4,
                  142,
                  123,
                  216,
                  219,
                  233,
                  248,
                  89
                ]
              }
            }
          },
          {
            "name": "manager",
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    109,
                    97,
                    110,
                    97,
                    103,
                    101,
                    114
                  ]
                }
              ]
            }
          },
          {
            "name": "managerAta",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "path": "manager"
                },
                {
                  "kind": "const",
                  "value": [
                    6,
                    221,
                    246,
                    225,
                    215,
                    101,
                    161,
                    147,
                    217,
                    203,
                    225,
                    70,
                    206,
                    235,
                    121,
                    172,
                    28,
                    180,
                    133,
                    237,
                    95,
                    91,
                    55,
                    145,
                    58,
                    140,
                    245,
                    133,
                    126,
                    255,
                    0,
                    169
                  ]
                },
                {
                  "kind": "account",
                  "path": "mint"
                }
              ],
              "program": {
                "kind": "const",
                "value": [
                  140,
                  151,
                  37,
                  143,
                  78,
                  36,
                  137,
                  241,
                  187,
                  61,
                  16,
                  41,
                  20,
                  142,
                  13,
                  131,
                  11,
                  90,
                  19,
                  153,
                  218,
                  255,
                  16,
                  132,
                  4,
                  142,
                  123,
                  216,
                  219,
                  233,
                  248,
                  89
                ]
              }
            }
          },
          {
            "name": "listing",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    108,
                    105,
                    115,
                    116,
                    105,
                    110,
                    103
                  ]
                },
                {
                  "kind": "account",
                  "path": "fraction"
                }
              ]
            }
          },
          {
            "name": "object",
            "writable": true
          },
          {
            "name": "fraction",
            "writable": true
          },
          {
            "name": "associatedTokenProgram",
            "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
          },
          {
            "name": "tokenProgram",
            "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
          },
          {
            "name": "systemProgram",
            "address": "11111111111111111111111111111111"
          },
          {
            "name": "mplCoreProgram",
            "address": "CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d"
          }
        ],
        "args": []
      },
      {
        "name": "claimFractionalizedListingRevenue",
        "discriminator": [
          217,
          177,
          179,
          128,
          4,
          254,
          139,
          166
        ],
        "accounts": [
          {
            "name": "owner",
            "writable": true,
            "signer": true
          },
          {
            "name": "mint"
          },
          {
            "name": "ownerAta",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "path": "owner"
                },
                {
                  "kind": "const",
                  "value": [
                    6,
                    221,
                    246,
                    225,
                    215,
                    101,
                    161,
                    147,
                    217,
                    203,
                    225,
                    70,
                    206,
                    235,
                    121,
                    172,
                    28,
                    180,
                    133,
                    237,
                    95,
                    91,
                    55,
                    145,
                    58,
                    140,
                    245,
                    133,
                    126,
                    255,
                    0,
                    169
                  ]
                },
                {
                  "kind": "account",
                  "path": "mint"
                }
              ],
              "program": {
                "kind": "const",
                "value": [
                  140,
                  151,
                  37,
                  143,
                  78,
                  36,
                  137,
                  241,
                  187,
                  61,
                  16,
                  41,
                  20,
                  142,
                  13,
                  131,
                  11,
                  90,
                  19,
                  153,
                  218,
                  255,
                  16,
                  132,
                  4,
                  142,
                  123,
                  216,
                  219,
                  233,
                  248,
                  89
                ]
              }
            }
          },
          {
            "name": "listingAta",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "path": "listing"
                },
                {
                  "kind": "const",
                  "value": [
                    6,
                    221,
                    246,
                    225,
                    215,
                    101,
                    161,
                    147,
                    217,
                    203,
                    225,
                    70,
                    206,
                    235,
                    121,
                    172,
                    28,
                    180,
                    133,
                    237,
                    95,
                    91,
                    55,
                    145,
                    58,
                    140,
                    245,
                    133,
                    126,
                    255,
                    0,
                    169
                  ]
                },
                {
                  "kind": "account",
                  "path": "mint"
                }
              ],
              "program": {
                "kind": "const",
                "value": [
                  140,
                  151,
                  37,
                  143,
                  78,
                  36,
                  137,
                  241,
                  187,
                  61,
                  16,
                  41,
                  20,
                  142,
                  13,
                  131,
                  11,
                  90,
                  19,
                  153,
                  218,
                  255,
                  16,
                  132,
                  4,
                  142,
                  123,
                  216,
                  219,
                  233,
                  248,
                  89
                ]
              }
            }
          },
          {
            "name": "listing",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    108,
                    105,
                    115,
                    116,
                    105,
                    110,
                    103
                  ]
                },
                {
                  "kind": "account",
                  "path": "listing.id",
                  "account": "fractionalizedCompletedListing"
                }
              ]
            }
          },
          {
            "name": "associatedTokenProgram",
            "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
          },
          {
            "name": "tokenProgram",
            "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
          },
          {
            "name": "systemProgram",
            "address": "11111111111111111111111111111111"
          }
        ],
        "args": []
      },
      {
        "name": "createFractionalizedListing",
        "discriminator": [
          201,
          186,
          63,
          41,
          251,
          68,
          179,
          139
        ],
        "accounts": [
          {
            "name": "admin",
            "writable": true,
            "signer": true
          },
          {
            "name": "adminProfile",
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    97,
                    100,
                    109,
                    105,
                    110
                  ]
                },
                {
                  "kind": "account",
                  "path": "admin"
                }
              ]
            }
          },
          {
            "name": "manager",
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    109,
                    97,
                    110,
                    97,
                    103,
                    101,
                    114
                  ]
                }
              ]
            }
          },
          {
            "name": "object"
          },
          {
            "name": "listing",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    108,
                    105,
                    115,
                    116,
                    105,
                    110,
                    103
                  ]
                },
                {
                  "kind": "arg",
                  "path": "args.id"
                }
              ]
            }
          },
          {
            "name": "systemProgram",
            "address": "11111111111111111111111111111111"
          }
        ],
        "args": [
          {
            "name": "args",
            "type": {
              "defined": {
                "name": "createFractionalizedListingArgs"
              }
            }
          }
        ]
      },
      {
        "name": "createMarketplaceListing",
        "discriminator": [
          107,
          166,
          106,
          238,
          18,
          166,
          166,
          203
        ],
        "accounts": [
          {
            "name": "owner",
            "signer": true
          },
          {
            "name": "payer",
            "writable": true,
            "signer": true
          },
          {
            "name": "manager",
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    109,
                    97,
                    110,
                    97,
                    103,
                    101,
                    114
                  ]
                }
              ]
            }
          },
          {
            "name": "listing",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    108,
                    105,
                    115,
                    116,
                    105,
                    110,
                    103
                  ]
                },
                {
                  "kind": "account",
                  "path": "fraction"
                }
              ]
            }
          },
          {
            "name": "object",
            "writable": true
          },
          {
            "name": "fraction",
            "writable": true
          },
          {
            "name": "systemProgram",
            "address": "11111111111111111111111111111111"
          },
          {
            "name": "mplCoreProgram",
            "address": "CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d"
          }
        ],
        "args": [
          {
            "name": "price",
            "type": "u64"
          }
        ]
      },
      {
        "name": "createWatch",
        "discriminator": [
          43,
          228,
          230,
          104,
          104,
          205,
          118,
          208
        ],
        "accounts": [
          {
            "name": "admin",
            "writable": true,
            "signer": true
          },
          {
            "name": "adminProfile",
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    97,
                    100,
                    109,
                    105,
                    110
                  ]
                },
                {
                  "kind": "account",
                  "path": "admin"
                }
              ]
            }
          },
          {
            "name": "manager",
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    109,
                    97,
                    110,
                    97,
                    103,
                    101,
                    114
                  ]
                }
              ]
            }
          },
          {
            "name": "protocol",
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    112,
                    114,
                    111,
                    116,
                    111,
                    99,
                    111,
                    108
                  ]
                }
              ]
            }
          },
          {
            "name": "watch",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    119,
                    97,
                    116,
                    99,
                    104
                  ]
                },
                {
                  "kind": "arg",
                  "path": "args.reference"
                }
              ]
            }
          },
          {
            "name": "mplCoreProgram",
            "address": "CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d"
          },
          {
            "name": "systemProgram",
            "address": "11111111111111111111111111111111"
          }
        ],
        "args": [
          {
            "name": "args",
            "type": {
              "defined": {
                "name": "createWatchArgs"
              }
            }
          }
        ]
      },
      {
        "name": "deleteMarketplaceListing",
        "discriminator": [
          171,
          252,
          245,
          43,
          141,
          133,
          242,
          38
        ],
        "accounts": [
          {
            "name": "owner",
            "signer": true
          },
          {
            "name": "payer",
            "writable": true,
            "signer": true
          },
          {
            "name": "manager",
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    109,
                    97,
                    110,
                    97,
                    103,
                    101,
                    114
                  ]
                }
              ]
            }
          },
          {
            "name": "listing",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    108,
                    105,
                    115,
                    116,
                    105,
                    110,
                    103
                  ]
                },
                {
                  "kind": "account",
                  "path": "fraction"
                }
              ]
            }
          },
          {
            "name": "object",
            "writable": true
          },
          {
            "name": "fraction",
            "writable": true
          },
          {
            "name": "systemProgram",
            "address": "11111111111111111111111111111111"
          },
          {
            "name": "mplCoreProgram",
            "address": "CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d"
          }
        ],
        "args": []
      },
      {
        "name": "initializeAdmin",
        "discriminator": [
          35,
          176,
          8,
          143,
          42,
          160,
          61,
          158
        ],
        "accounts": [
          {
            "name": "owner",
            "writable": true,
            "signer": true
          },
          {
            "name": "newAdmin"
          },
          {
            "name": "adminProfile",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    97,
                    100,
                    109,
                    105,
                    110
                  ]
                },
                {
                  "kind": "account",
                  "path": "newAdmin"
                }
              ]
            }
          },
          {
            "name": "systemProgram",
            "address": "11111111111111111111111111111111"
          }
        ],
        "args": [
          {
            "name": "username",
            "type": "string"
          }
        ]
      },
      {
        "name": "initializeProfile",
        "discriminator": [
          32,
          145,
          77,
          213,
          58,
          39,
          251,
          234
        ],
        "accounts": [
          {
            "name": "user"
          },
          {
            "name": "payer",
            "writable": true,
            "signer": true
          },
          {
            "name": "profile",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    112,
                    114,
                    111,
                    102,
                    105,
                    108,
                    101
                  ]
                },
                {
                  "kind": "account",
                  "path": "user"
                }
              ]
            }
          },
          {
            "name": "systemProgram",
            "address": "11111111111111111111111111111111"
          }
        ],
        "args": [
          {
            "name": "username",
            "type": "string"
          }
        ]
      },
      {
        "name": "initializeProtocol",
        "discriminator": [
          188,
          233,
          252,
          106,
          134,
          146,
          202,
          91
        ],
        "accounts": [
          {
            "name": "owner",
            "writable": true,
            "signer": true
          },
          {
            "name": "protocol",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    112,
                    114,
                    111,
                    116,
                    111,
                    99,
                    111,
                    108
                  ]
                }
              ]
            }
          },
          {
            "name": "manager",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    109,
                    97,
                    110,
                    97,
                    103,
                    101,
                    114
                  ]
                }
              ]
            }
          },
          {
            "name": "systemProgram",
            "address": "11111111111111111111111111111111"
          }
        ],
        "args": []
      },
      {
        "name": "updateProtocol",
        "discriminator": [
          206,
          25,
          218,
          114,
          109,
          41,
          74,
          173
        ],
        "accounts": [
          {
            "name": "owner",
            "writable": true,
            "signer": true
          },
          {
            "name": "protocol",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    112,
                    114,
                    111,
                    116,
                    111,
                    99,
                    111,
                    108
                  ]
                }
              ]
            }
          },
          {
            "name": "systemProgram",
            "address": "11111111111111111111111111111111"
          }
        ],
        "args": []
      },
      {
        "name": "upgradeMembership",
        "discriminator": [
          221,
          207,
          31,
          43,
          229,
          158,
          89,
          247
        ],
        "accounts": [
          {
            "name": "user",
            "signer": true
          },
          {
            "name": "payer",
            "writable": true,
            "signer": true
          },
          {
            "name": "mint"
          },
          {
            "name": "userAta",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "path": "user"
                },
                {
                  "kind": "const",
                  "value": [
                    6,
                    221,
                    246,
                    225,
                    215,
                    101,
                    161,
                    147,
                    217,
                    203,
                    225,
                    70,
                    206,
                    235,
                    121,
                    172,
                    28,
                    180,
                    133,
                    237,
                    95,
                    91,
                    55,
                    145,
                    58,
                    140,
                    245,
                    133,
                    126,
                    255,
                    0,
                    169
                  ]
                },
                {
                  "kind": "account",
                  "path": "mint"
                }
              ],
              "program": {
                "kind": "const",
                "value": [
                  140,
                  151,
                  37,
                  143,
                  78,
                  36,
                  137,
                  241,
                  187,
                  61,
                  16,
                  41,
                  20,
                  142,
                  13,
                  131,
                  11,
                  90,
                  19,
                  153,
                  218,
                  255,
                  16,
                  132,
                  4,
                  142,
                  123,
                  216,
                  219,
                  233,
                  248,
                  89
                ]
              }
            }
          },
          {
            "name": "membershipWallet",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "path": "protocol"
                },
                {
                  "kind": "const",
                  "value": [
                    6,
                    221,
                    246,
                    225,
                    215,
                    101,
                    161,
                    147,
                    217,
                    203,
                    225,
                    70,
                    206,
                    235,
                    121,
                    172,
                    28,
                    180,
                    133,
                    237,
                    95,
                    91,
                    55,
                    145,
                    58,
                    140,
                    245,
                    133,
                    126,
                    255,
                    0,
                    169
                  ]
                },
                {
                  "kind": "account",
                  "path": "mint"
                }
              ],
              "program": {
                "kind": "const",
                "value": [
                  140,
                  151,
                  37,
                  143,
                  78,
                  36,
                  137,
                  241,
                  187,
                  61,
                  16,
                  41,
                  20,
                  142,
                  13,
                  131,
                  11,
                  90,
                  19,
                  153,
                  218,
                  255,
                  16,
                  132,
                  4,
                  142,
                  123,
                  216,
                  219,
                  233,
                  248,
                  89
                ]
              }
            }
          },
          {
            "name": "profile",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    112,
                    114,
                    111,
                    102,
                    105,
                    108,
                    101
                  ]
                },
                {
                  "kind": "account",
                  "path": "user"
                }
              ]
            }
          },
          {
            "name": "protocol",
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    112,
                    114,
                    111,
                    116,
                    111,
                    99,
                    111,
                    108
                  ]
                }
              ]
            }
          },
          {
            "name": "associatedTokenProgram",
            "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
          },
          {
            "name": "tokenProgram",
            "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
          },
          {
            "name": "systemProgram",
            "address": "11111111111111111111111111111111"
          }
        ],
        "args": []
      },
      {
        "name": "verifyProfile",
        "discriminator": [
          101,
          137,
          36,
          242,
          139,
          119,
          156,
          251
        ],
        "accounts": [
          {
            "name": "user",
            "writable": true,
            "signer": true
          },
          {
            "name": "systemProgram",
            "address": "11111111111111111111111111111111"
          }
        ],
        "args": []
      }
    ],
    "accounts": [
      {
        "name": "adminProfile",
        "discriminator": [
          193,
          215,
          185,
          255,
          212,
          215,
          3,
          27
        ]
      },
      {
        "name": "baseAssetV1",
        "discriminator": [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ]
      },
      {
        "name": "baseCollectionV1",
        "discriminator": [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ]
      },
      {
        "name": "fractionalizedCompletedListing",
        "discriminator": [
          178,
          49,
          18,
          12,
          26,
          42,
          27,
          5
        ]
      },
      {
        "name": "fractionalizedListing",
        "discriminator": [
          37,
          195,
          55,
          240,
          140,
          26,
          95,
          19
        ]
      },
      {
        "name": "manager",
        "discriminator": [
          221,
          78,
          171,
          233,
          213,
          142,
          113,
          56
        ]
      },
      {
        "name": "marketplaceListing",
        "discriminator": [
          211,
          106,
          229,
          109,
          73,
          75,
          97,
          122
        ]
      },
      {
        "name": "profile",
        "discriminator": [
          184,
          101,
          165,
          188,
          95,
          63,
          127,
          188
        ]
      },
      {
        "name": "protocol",
        "discriminator": [
          45,
          39,
          101,
          43,
          115,
          72,
          131,
          40
        ]
      }
    ],
    "errors": [
      {
        "code": 6000,
        "name": "notVerified",
        "msg": "You already bought more than 500$ worth of fraction, to buy more you need to do KYC"
      },
      {
        "code": 6001,
        "name": "notTimeYet",
        "msg": "Listing is not Live yet, come back later!"
      },
      {
        "code": 6002,
        "name": "overflow",
        "msg": "overflow"
      },
      {
        "code": 6003,
        "name": "underflow",
        "msg": "underflow"
      },
      {
        "code": 6004,
        "name": "priceMismatch",
        "msg": "The amount offered does not match the initial token price"
      },
      {
        "code": 6005,
        "name": "signatureAuthorityMismatch",
        "msg": "Signature authority mismatch"
      },
      {
        "code": 6006,
        "name": "invalidInstruction",
        "msg": "Invalid instruction"
      }
    ],
    "types": [
      {
        "name": "adminProfile",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "address",
              "type": "pubkey"
            },
            {
              "name": "username",
              "type": "string"
            },
            {
              "name": "creationTime",
              "type": "i64"
            },
            {
              "name": "bump",
              "type": "u8"
            }
          ]
        }
      },
      {
        "name": "baseAssetV1",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "key",
              "type": {
                "defined": {
                  "name": "key"
                }
              }
            },
            {
              "name": "owner",
              "type": "pubkey"
            },
            {
              "name": "updateAuthority",
              "type": {
                "defined": {
                  "name": "updateAuthority"
                }
              }
            },
            {
              "name": "name",
              "type": "string"
            },
            {
              "name": "uri",
              "type": "string"
            },
            {
              "name": "seq",
              "type": {
                "option": "u64"
              }
            }
          ]
        }
      },
      {
        "name": "baseCollectionV1",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "key",
              "type": {
                "defined": {
                  "name": "key"
                }
              }
            },
            {
              "name": "updateAuthority",
              "type": "pubkey"
            },
            {
              "name": "name",
              "type": "string"
            },
            {
              "name": "uri",
              "type": "string"
            },
            {
              "name": "numMinted",
              "type": "u32"
            },
            {
              "name": "currentSize",
              "type": "u32"
            }
          ]
        }
      },
      {
        "name": "createFractionalizedListingArgs",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "id",
              "type": "u64"
            },
            {
              "name": "objectType",
              "type": "u8"
            },
            {
              "name": "share",
              "type": "u16"
            },
            {
              "name": "price",
              "type": "u64"
            },
            {
              "name": "startingTime",
              "type": "i64"
            }
          ]
        }
      },
      {
        "name": "createWatchArgs",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "name",
              "type": "string"
            },
            {
              "name": "uri",
              "type": "string"
            },
            {
              "name": "brand",
              "type": "string"
            },
            {
              "name": "model",
              "type": "string"
            },
            {
              "name": "reference",
              "type": "string"
            },
            {
              "name": "diameter",
              "type": "u8"
            },
            {
              "name": "movement",
              "type": "string"
            },
            {
              "name": "dialColor",
              "type": "string"
            },
            {
              "name": "caseMaterial",
              "type": "string"
            },
            {
              "name": "braceletMaterial",
              "type": "string"
            },
            {
              "name": "yearOfProduction",
              "type": "u16"
            }
          ]
        }
      },
      {
        "name": "externalValidationResult",
        "type": {
          "kind": "enum",
          "variants": [
            {
              "name": "approved"
            },
            {
              "name": "rejected"
            },
            {
              "name": "pass"
            }
          ]
        }
      },
      {
        "name": "fractionalizedCompletedListing",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "id",
              "type": "u64"
            },
            {
              "name": "objectType",
              "type": {
                "defined": {
                  "name": "objectType"
                }
              }
            },
            {
              "name": "object",
              "type": "pubkey"
            },
            {
              "name": "share",
              "type": "u16"
            },
            {
              "name": "price",
              "type": "u64"
            },
            {
              "name": "bump",
              "type": "u8"
            }
          ]
        }
      },
      {
        "name": "fractionalizedListing",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "id",
              "type": "u64"
            },
            {
              "name": "objectType",
              "type": {
                "defined": {
                  "name": "objectType"
                }
              }
            },
            {
              "name": "object",
              "type": "pubkey"
            },
            {
              "name": "share",
              "type": "u16"
            },
            {
              "name": "shareSold",
              "type": "u16"
            },
            {
              "name": "price",
              "type": "u64"
            },
            {
              "name": "startingTime",
              "type": "i64"
            },
            {
              "name": "bump",
              "type": "u8"
            }
          ]
        }
      },
      {
        "name": "key",
        "type": {
          "kind": "enum",
          "variants": [
            {
              "name": "uninitialized"
            },
            {
              "name": "assetV1"
            },
            {
              "name": "hashedAssetV1"
            },
            {
              "name": "pluginHeaderV1"
            },
            {
              "name": "pluginRegistryV1"
            },
            {
              "name": "collectionV1"
            }
          ]
        }
      },
      {
        "name": "manager",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "bump",
              "type": "u8"
            }
          ]
        }
      },
      {
        "name": "marketplaceListing",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "owner",
              "type": "pubkey"
            },
            {
              "name": "asset",
              "type": "pubkey"
            },
            {
              "name": "collection",
              "type": "pubkey"
            },
            {
              "name": "price",
              "type": "u64"
            },
            {
              "name": "bump",
              "type": "u8"
            }
          ]
        }
      },
      {
        "name": "membership",
        "type": {
          "kind": "enum",
          "variants": [
            {
              "name": "platinum"
            },
            {
              "name": "gold"
            },
            {
              "name": "basic"
            }
          ]
        }
      },
      {
        "name": "objectType",
        "type": {
          "kind": "enum",
          "variants": [
            {
              "name": "watch"
            },
            {
              "name": "diamonds"
            }
          ]
        }
      },
      {
        "name": "oracleValidation",
        "type": {
          "kind": "enum",
          "variants": [
            {
              "name": "uninitialized"
            },
            {
              "name": "v1",
              "fields": [
                {
                  "name": "create",
                  "type": {
                    "defined": {
                      "name": "externalValidationResult"
                    }
                  }
                },
                {
                  "name": "transfer",
                  "type": {
                    "defined": {
                      "name": "externalValidationResult"
                    }
                  }
                },
                {
                  "name": "burn",
                  "type": {
                    "defined": {
                      "name": "externalValidationResult"
                    }
                  }
                },
                {
                  "name": "update",
                  "type": {
                    "defined": {
                      "name": "externalValidationResult"
                    }
                  }
                }
              ]
            }
          ]
        }
      },
      {
        "name": "profile",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "username",
              "type": "string"
            },
            {
              "name": "spending",
              "type": "u64"
            },
            {
              "name": "membership",
              "type": {
                "defined": {
                  "name": "membership"
                }
              }
            },
            {
              "name": "isVerified",
              "type": "bool"
            },
            {
              "name": "bump",
              "type": "u8"
            }
          ]
        }
      },
      {
        "name": "protocol",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "validation",
              "type": {
                "defined": {
                  "name": "oracleValidation"
                }
              }
            },
            {
              "name": "bump",
              "type": "u8"
            }
          ]
        }
      },
      {
        "name": "updateAuthority",
        "type": {
          "kind": "enum",
          "variants": [
            {
              "name": "none"
            },
            {
              "name": "address",
              "fields": [
                "pubkey"
              ]
            },
            {
              "name": "collection",
              "fields": [
                "pubkey"
              ]
            }
          ]
        }
      }
    ]
  };
  