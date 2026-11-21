/**
 * ADP WEB EXPERIENCE — Manifeste Officiel de la Médiathèque
 * Généré lors de l'Étape 06
 */

export interface MediaItem {
  filename: string;
  url: string;
  sizeBytes: number;
  isCover?: boolean;
}

export interface ProjectMediaFolder {
  folder: string;
  totalLegacyAssets: number;
  cover: MediaItem | null;
  gallery: MediaItem[];
}

export const PROJECTS_MEDIA: Record<string, ProjectMediaFolder> = {
  "018_studio": {
    "folder": "018_studio",
    "totalLegacyAssets": 8,
    "cover": {
      "filename": "hero.jpg",
      "url": "/assets/projects/018_studio/hero.jpg",
      "isCover": true,
      "sizeBytes": 240087
    },
    "gallery": [
      {
        "filename": "gallery1.jpg",
        "url": "/assets/projects/018_studio/gallery1.jpg",
        "isCover": false,
        "sizeBytes": 201773
      },
      {
        "filename": "gallery1.webp",
        "url": "/assets/projects/018_studio/gallery1.webp",
        "isCover": false,
        "sizeBytes": 113484
      }
    ]
  },
  "bahemeck_final": {
    "folder": "bahemeck_final",
    "totalLegacyAssets": 36,
    "cover": {
      "filename": "gallery1_v3.webp",
      "url": "/assets/projects/bahemeck_final/gallery1_v3.webp",
      "isCover": true,
      "sizeBytes": 169206
    },
    "gallery": [
      {
        "filename": "gallery1_v3.png",
        "url": "/assets/projects/bahemeck_final/gallery1_v3.png",
        "isCover": false,
        "sizeBytes": 2796844
      },
      {
        "filename": "gallery5_v3.png",
        "url": "/assets/projects/bahemeck_final/gallery5_v3.png",
        "isCover": false,
        "sizeBytes": 2653212
      }
    ]
  },
  "bicec_bafoussam": {
    "folder": "bicec_bafoussam",
    "totalLegacyAssets": 20,
    "cover": {
      "filename": "bicec_1.jpg",
      "url": "/assets/projects/bicec_bafoussam/bicec_1.jpg",
      "isCover": true,
      "sizeBytes": 231469
    },
    "gallery": [
      {
        "filename": "bicec_1.webp",
        "url": "/assets/projects/bicec_bafoussam/bicec_1.webp",
        "isCover": false,
        "sizeBytes": 153646
      },
      {
        "filename": "bicec_10.jpg",
        "url": "/assets/projects/bicec_bafoussam/bicec_10.jpg",
        "isCover": false,
        "sizeBytes": 130622
      }
    ]
  },
  "bicec_usca": {
    "folder": "bicec_usca",
    "totalLegacyAssets": 16,
    "cover": {
      "filename": "img_1.jpg",
      "url": "/assets/projects/bicec_usca/img_1.jpg",
      "isCover": true,
      "sizeBytes": 198977
    },
    "gallery": [
      {
        "filename": "img_1.webp",
        "url": "/assets/projects/bicec_usca/img_1.webp",
        "isCover": false,
        "sizeBytes": 122174
      },
      {
        "filename": "img_2.jpg",
        "url": "/assets/projects/bicec_usca/img_2.jpg",
        "isCover": false,
        "sizeBytes": 246805
      }
    ]
  },
  "boj": {
    "folder": "boj",
    "totalLegacyAssets": 18,
    "cover": {
      "filename": "boj_1.jpg",
      "url": "/assets/projects/boj/boj_1.jpg",
      "isCover": true,
      "sizeBytes": 170854
    },
    "gallery": [
      {
        "filename": "boj_1.webp",
        "url": "/assets/projects/boj/boj_1.webp",
        "isCover": false,
        "sizeBytes": 141186
      },
      {
        "filename": "boj_10.jpg",
        "url": "/assets/projects/boj/boj_10.jpg",
        "isCover": false,
        "sizeBytes": 195940
      }
    ]
  },
  "boutique_biyem_assi": {
    "folder": "boutique_biyem_assi",
    "totalLegacyAssets": 20,
    "cover": {
      "filename": "hero.jpg",
      "url": "/assets/projects/boutique_biyem_assi/hero.jpg",
      "isCover": true,
      "sizeBytes": 452153
    },
    "gallery": [
      {
        "filename": "gallery1.jpg",
        "url": "/assets/projects/boutique_biyem_assi/gallery1.jpg",
        "isCover": false,
        "sizeBytes": 427279
      },
      {
        "filename": "gallery1.webp",
        "url": "/assets/projects/boutique_biyem_assi/gallery1.webp",
        "isCover": false,
        "sizeBytes": 360344
      }
    ]
  },
  "bureau_dsi": {
    "folder": "bureau_dsi",
    "totalLegacyAssets": 8,
    "cover": {
      "filename": "main.png",
      "url": "/assets/projects/bureau_dsi/main.png",
      "isCover": true,
      "sizeBytes": 2278518
    },
    "gallery": [
      {
        "filename": "gallery1.png",
        "url": "/assets/projects/bureau_dsi/gallery1.png",
        "isCover": false,
        "sizeBytes": 2280931
      },
      {
        "filename": "gallery1.webp",
        "url": "/assets/projects/bureau_dsi/gallery1.webp",
        "isCover": false,
        "sizeBytes": 137820
      }
    ]
  },
  "cabinet_elena": {
    "folder": "cabinet_elena",
    "totalLegacyAssets": 14,
    "cover": {
      "filename": "img_1.png",
      "url": "/assets/projects/cabinet_elena/img_1.png",
      "isCover": true,
      "sizeBytes": 1859144
    },
    "gallery": [
      {
        "filename": "img_1.webp",
        "url": "/assets/projects/cabinet_elena/img_1.webp",
        "isCover": false,
        "sizeBytes": 83324
      },
      {
        "filename": "img_2.jpg",
        "url": "/assets/projects/cabinet_elena/img_2.jpg",
        "isCover": false,
        "sizeBytes": 286968
      }
    ]
  },
  "croissanterie": {
    "folder": "croissanterie",
    "totalLegacyAssets": 8,
    "cover": {
      "filename": "croissanterie_1.png",
      "url": "/assets/projects/croissanterie/croissanterie_1.png",
      "isCover": true,
      "sizeBytes": 1840264
    },
    "gallery": [
      {
        "filename": "croissanterie_1.webp",
        "url": "/assets/projects/croissanterie/croissanterie_1.webp",
        "isCover": false,
        "sizeBytes": 90588
      },
      {
        "filename": "croissanterie_2.png",
        "url": "/assets/projects/croissanterie/croissanterie_2.png",
        "isCover": false,
        "sizeBytes": 2253148
      }
    ]
  },
  "duplex_domegne": {
    "folder": "duplex_domegne",
    "totalLegacyAssets": 16,
    "cover": {
      "filename": "img_10.webp",
      "url": "/assets/projects/duplex_domegne/img_10.webp",
      "isCover": true,
      "sizeBytes": 129776
    },
    "gallery": [
      {
        "filename": "img_3.webp",
        "url": "/assets/projects/duplex_domegne/img_3.webp",
        "isCover": false,
        "sizeBytes": 136048
      },
      {
        "filename": "img_4.webp",
        "url": "/assets/projects/duplex_domegne/img_4.webp",
        "isCover": false,
        "sizeBytes": 159266
      }
    ]
  },
  "emeraude": {
    "folder": "emeraude",
    "totalLegacyAssets": 26,
    "cover": {
      "filename": "IMG-20211010-WA0013.webp",
      "url": "/assets/projects/emeraude/IMG-20211010-WA0013.webp",
      "isCover": true,
      "sizeBytes": 67010
    },
    "gallery": [
      {
        "filename": "IMG-20211010-WA0013.jpg",
        "url": "/assets/projects/emeraude/IMG-20211010-WA0013.jpg",
        "isCover": false,
        "sizeBytes": 83975
      },
      {
        "filename": "IMG-20211010-WA0014.jpg",
        "url": "/assets/projects/emeraude/IMG-20211010-WA0014.jpg",
        "isCover": false,
        "sizeBytes": 104649
      }
    ]
  },
  "enem": {
    "folder": "enem",
    "totalLegacyAssets": 16,
    "cover": {
      "filename": "enem_1.jpg",
      "url": "/assets/projects/enem/enem_1.jpg",
      "isCover": true,
      "sizeBytes": 203998
    },
    "gallery": [
      {
        "filename": "enem_1.webp",
        "url": "/assets/projects/enem/enem_1.webp",
        "isCover": false,
        "sizeBytes": 143986
      },
      {
        "filename": "enem_2.jpg",
        "url": "/assets/projects/enem/enem_2.jpg",
        "isCover": false,
        "sizeBytes": 119973
      }
    ]
  },
  "entrepot": {
    "folder": "entrepot",
    "totalLegacyAssets": 10,
    "cover": {
      "filename": "hero.png",
      "url": "/assets/projects/entrepot/hero.png",
      "isCover": true,
      "sizeBytes": 2892067
    },
    "gallery": [
      {
        "filename": "hero.webp",
        "url": "/assets/projects/entrepot/hero.webp",
        "isCover": false,
        "sizeBytes": 203790
      },
      {
        "filename": "img_2.png",
        "url": "/assets/projects/entrepot/img_2.png",
        "isCover": false,
        "sizeBytes": 2799120
      }
    ]
  },
  "grill_way": {
    "folder": "grill_way",
    "totalLegacyAssets": 10,
    "cover": {
      "filename": "hero.png",
      "url": "/assets/projects/grill_way/hero.png",
      "isCover": true,
      "sizeBytes": 4829379
    },
    "gallery": [
      {
        "filename": "hero.webp",
        "url": "/assets/projects/grill_way/hero.webp",
        "isCover": false,
        "sizeBytes": 554048
      },
      {
        "filename": "img_4.jpg",
        "url": "/assets/projects/grill_way/img_4.jpg",
        "isCover": false,
        "sizeBytes": 605484
      }
    ]
  },
  "harmony": {
    "folder": "harmony",
    "totalLegacyAssets": 22,
    "cover": {
      "filename": "harmony_1.jpg",
      "url": "/assets/projects/harmony/harmony_1.jpg",
      "isCover": true,
      "sizeBytes": 250915
    },
    "gallery": [
      {
        "filename": "harmony_1.webp",
        "url": "/assets/projects/harmony/harmony_1.webp",
        "isCover": false,
        "sizeBytes": 206254
      },
      {
        "filename": "harmony_11.jpg",
        "url": "/assets/projects/harmony/harmony_11.jpg",
        "isCover": false,
        "sizeBytes": 77266
      }
    ]
  },
  "horizon": {
    "folder": "horizon",
    "totalLegacyAssets": 30,
    "cover": {
      "filename": "1.webp",
      "url": "/assets/projects/horizon/1.webp",
      "isCover": true,
      "sizeBytes": 354664
    },
    "gallery": [
      {
        "filename": "1.jpg",
        "url": "/assets/projects/horizon/1.jpg",
        "isCover": false,
        "sizeBytes": 384291
      },
      {
        "filename": "10.jpg",
        "url": "/assets/projects/horizon/10.jpg",
        "isCover": false,
        "sizeBytes": 403689
      }
    ]
  },
  "hotel_bertoua": {
    "folder": "hotel_bertoua",
    "totalLegacyAssets": 8,
    "cover": {
      "filename": "main.jpg",
      "url": "/assets/projects/hotel_bertoua/main.jpg",
      "isCover": true,
      "sizeBytes": 353663
    },
    "gallery": [
      {
        "filename": "gallery1.jpg",
        "url": "/assets/projects/hotel_bertoua/gallery1.jpg",
        "isCover": false,
        "sizeBytes": 391990
      },
      {
        "filename": "gallery1.webp",
        "url": "/assets/projects/hotel_bertoua/gallery1.webp",
        "isCover": false,
        "sizeBytes": 322342
      }
    ]
  },
  "hunter": {
    "folder": "hunter",
    "totalLegacyAssets": 14,
    "cover": {
      "filename": "hunter_1.jpg",
      "url": "/assets/projects/hunter/hunter_1.jpg",
      "isCover": true,
      "sizeBytes": 346355
    },
    "gallery": [
      {
        "filename": "hunter_1.webp",
        "url": "/assets/projects/hunter/hunter_1.webp",
        "isCover": false,
        "sizeBytes": 265864
      },
      {
        "filename": "hunter_10.jpg",
        "url": "/assets/projects/hunter/hunter_10.jpg",
        "isCover": false,
        "sizeBytes": 56133
      }
    ]
  },
  "lipem": {
    "folder": "lipem",
    "totalLegacyAssets": 16,
    "cover": {
      "filename": "hero.jpg",
      "url": "/assets/projects/lipem/hero.jpg",
      "isCover": true,
      "sizeBytes": 569193
    },
    "gallery": [
      {
        "filename": "hero.webp",
        "url": "/assets/projects/lipem/hero.webp",
        "isCover": false,
        "sizeBytes": 546198
      },
      {
        "filename": "img_2.jpg",
        "url": "/assets/projects/lipem/img_2.jpg",
        "isCover": false,
        "sizeBytes": 524204
      }
    ]
  },
  "mandeng": {
    "folder": "mandeng",
    "totalLegacyAssets": 6,
    "cover": {
      "filename": "main.jpg",
      "url": "/assets/projects/mandeng/main.jpg",
      "isCover": true,
      "sizeBytes": 86120
    },
    "gallery": [
      {
        "filename": "gallery1.jpg",
        "url": "/assets/projects/mandeng/gallery1.jpg",
        "isCover": false,
        "sizeBytes": 90000
      },
      {
        "filename": "gallery1.webp",
        "url": "/assets/projects/mandeng/gallery1.webp",
        "isCover": false,
        "sizeBytes": 69264
      }
    ]
  },
  "mbella": {
    "folder": "mbella",
    "totalLegacyAssets": 12,
    "cover": {
      "filename": "mbella_2.webp",
      "url": "/assets/projects/mbella/mbella_2.webp",
      "isCover": true,
      "sizeBytes": 24512
    },
    "gallery": [
      {
        "filename": "mbella_2.jpg",
        "url": "/assets/projects/mbella/mbella_2.jpg",
        "isCover": false,
        "sizeBytes": 43450
      },
      {
        "filename": "mbella_5.jpg",
        "url": "/assets/projects/mbella/mbella_5.jpg",
        "isCover": false,
        "sizeBytes": 71025
      }
    ]
  },
  "meeting_room": {
    "folder": "meeting_room",
    "totalLegacyAssets": 12,
    "cover": {
      "filename": "img_3.webp",
      "url": "/assets/projects/meeting_room/img_3.webp",
      "isCover": true,
      "sizeBytes": 252960
    },
    "gallery": [
      {
        "filename": "img_3.jpg",
        "url": "/assets/projects/meeting_room/img_3.jpg",
        "isCover": false,
        "sizeBytes": 348349
      },
      {
        "filename": "img_4.jpg",
        "url": "/assets/projects/meeting_room/img_4.jpg",
        "isCover": false,
        "sizeBytes": 808479
      }
    ]
  },
  "mme_edzigui": {
    "folder": "mme_edzigui",
    "totalLegacyAssets": 12,
    "cover": {
      "filename": "img_0_1.png",
      "url": "/assets/projects/mme_edzigui/img_0_1.png",
      "isCover": true,
      "sizeBytes": 3131646
    },
    "gallery": [
      {
        "filename": "img_0_0.png",
        "url": "/assets/projects/mme_edzigui/img_0_0.png",
        "isCover": false,
        "sizeBytes": 2639484
      },
      {
        "filename": "img_0_0.webp",
        "url": "/assets/projects/mme_edzigui/img_0_0.webp",
        "isCover": false,
        "sizeBytes": 362324
      }
    ]
  },
  "oasis": {
    "folder": "oasis",
    "totalLegacyAssets": 10,
    "cover": {
      "filename": "oasis_1.jpg",
      "url": "/assets/projects/oasis/oasis_1.jpg",
      "isCover": true,
      "sizeBytes": 481374
    },
    "gallery": [
      {
        "filename": "oasis_1.webp",
        "url": "/assets/projects/oasis/oasis_1.webp",
        "isCover": false,
        "sizeBytes": 463832
      },
      {
        "filename": "oasis_2.jpg",
        "url": "/assets/projects/oasis/oasis_2.jpg",
        "isCover": false,
        "sizeBytes": 492438
      }
    ]
  },
  "owona": {
    "folder": "owona",
    "totalLegacyAssets": 6,
    "cover": {
      "filename": "main.jpg",
      "url": "/assets/projects/owona/main.jpg",
      "isCover": true,
      "sizeBytes": 512399
    },
    "gallery": [
      {
        "filename": "gallery1.jpg",
        "url": "/assets/projects/owona/gallery1.jpg",
        "isCover": false,
        "sizeBytes": 484823
      },
      {
        "filename": "gallery1.webp",
        "url": "/assets/projects/owona/gallery1.webp",
        "isCover": false,
        "sizeBytes": 438044
      }
    ]
  },
  "perenco_offices": {
    "folder": "perenco_offices",
    "totalLegacyAssets": 16,
    "cover": {
      "filename": "img_1.jpg",
      "url": "/assets/projects/perenco_offices/img_1.jpg",
      "isCover": true,
      "sizeBytes": 202813
    },
    "gallery": [
      {
        "filename": "img_1.webp",
        "url": "/assets/projects/perenco_offices/img_1.webp",
        "isCover": false,
        "sizeBytes": 122608
      },
      {
        "filename": "img_2.jpg",
        "url": "/assets/projects/perenco_offices/img_2.jpg",
        "isCover": false,
        "sizeBytes": 209735
      }
    ]
  },
  "petrofor_base_tcp": {
    "folder": "petrofor_base_tcp",
    "totalLegacyAssets": 42,
    "cover": {
      "filename": "hero.png",
      "url": "/assets/projects/petrofor_base_tcp/hero.png",
      "isCover": true,
      "sizeBytes": 3086645
    },
    "gallery": [
      {
        "filename": "gallery1.png",
        "url": "/assets/projects/petrofor_base_tcp/gallery1.png",
        "isCover": false,
        "sizeBytes": 3128983
      },
      {
        "filename": "gallery1.webp",
        "url": "/assets/projects/petrofor_base_tcp/gallery1.webp",
        "isCover": false,
        "sizeBytes": 247426
      }
    ]
  },
  "pharmacie_studio": {
    "folder": "pharmacie_studio",
    "totalLegacyAssets": 16,
    "cover": {
      "filename": "hero.jpg",
      "url": "/assets/projects/pharmacie_studio/hero.jpg",
      "isCover": true,
      "sizeBytes": 505494
    },
    "gallery": [
      {
        "filename": "hero.webp",
        "url": "/assets/projects/pharmacie_studio/hero.webp",
        "isCover": false,
        "sizeBytes": 515100
      },
      {
        "filename": "img_2.jpg",
        "url": "/assets/projects/pharmacie_studio/img_2.jpg",
        "isCover": false,
        "sizeBytes": 499660
      }
    ]
  },
  "residence_h": {
    "folder": "residence_h",
    "totalLegacyAssets": 20,
    "cover": {
      "filename": "preview.png",
      "url": "/assets/projects/residence_h/preview.png",
      "isCover": true,
      "sizeBytes": 2617022
    },
    "gallery": [
      {
        "filename": "Enscape_2025-08-17-11-08-58.png",
        "url": "/assets/projects/residence_h/Enscape_2025-08-17-11-08-58.png",
        "isCover": false,
        "sizeBytes": 2295845
      },
      {
        "filename": "Enscape_2025-08-17-11-08-58.webp",
        "url": "/assets/projects/residence_h/Enscape_2025-08-17-11-08-58.webp",
        "isCover": false,
        "sizeBytes": 91062
      }
    ]
  },
  "residence_soa": {
    "folder": "residence_soa",
    "totalLegacyAssets": 8,
    "cover": {
      "filename": "main.jpg",
      "url": "/assets/projects/residence_soa/main.jpg",
      "isCover": true,
      "sizeBytes": 313492
    },
    "gallery": [
      {
        "filename": "gallery1.jpg",
        "url": "/assets/projects/residence_soa/gallery1.jpg",
        "isCover": false,
        "sizeBytes": 320748
      },
      {
        "filename": "gallery1.webp",
        "url": "/assets/projects/residence_soa/gallery1.webp",
        "isCover": false,
        "sizeBytes": 232032
      }
    ]
  },
  "salle_de_fete": {
    "folder": "salle_de_fete",
    "totalLegacyAssets": 40,
    "cover": {
      "filename": "image22.webp",
      "url": "/assets/projects/salle_de_fete/image22.webp",
      "isCover": true,
      "sizeBytes": 140120
    },
    "gallery": [
      {
        "filename": "image22.jpg",
        "url": "/assets/projects/salle_de_fete/image22.jpg",
        "isCover": false,
        "sizeBytes": 224503
      },
      {
        "filename": "image23.jpg",
        "url": "/assets/projects/salle_de_fete/image23.jpg",
        "isCover": false,
        "sizeBytes": 358781
      }
    ]
  },
  "sequoia": {
    "folder": "sequoia",
    "totalLegacyAssets": 12,
    "cover": {
      "filename": "Capture.webp",
      "url": "/assets/projects/sequoia/Capture.webp",
      "isCover": true,
      "sizeBytes": 208436
    },
    "gallery": [
      {
        "filename": "Capture2.webp",
        "url": "/assets/projects/sequoia/Capture2.webp",
        "isCover": false,
        "sizeBytes": 195510
      },
      {
        "filename": "Capture3.webp",
        "url": "/assets/projects/sequoia/Capture3.webp",
        "isCover": false,
        "sizeBytes": 157278
      }
    ]
  },
  "showroom_kotto": {
    "folder": "showroom_kotto",
    "totalLegacyAssets": 16,
    "cover": {
      "filename": "hero.jpg",
      "url": "/assets/projects/showroom_kotto/hero.jpg",
      "isCover": true,
      "sizeBytes": 219807
    },
    "gallery": [
      {
        "filename": "hero.webp",
        "url": "/assets/projects/showroom_kotto/hero.webp",
        "isCover": false,
        "sizeBytes": 157228
      },
      {
        "filename": "img_2.jpg",
        "url": "/assets/projects/showroom_kotto/img_2.jpg",
        "isCover": false,
        "sizeBytes": 368660
      }
    ]
  },
  "suka_cafe": {
    "folder": "suka_cafe",
    "totalLegacyAssets": 20,
    "cover": {
      "filename": "hero_main.jpg",
      "url": "/assets/projects/suka_cafe/hero_main.jpg",
      "isCover": true,
      "sizeBytes": 97074
    },
    "gallery": [
      {
        "filename": "hero_main.webp",
        "url": "/assets/projects/suka_cafe/hero_main.webp",
        "isCover": false,
        "sizeBytes": 67824
      },
      {
        "filename": "suka_12.jpg",
        "url": "/assets/projects/suka_cafe/suka_12.jpg",
        "isCover": false,
        "sizeBytes": 270971
      }
    ]
  },
  "tonye": {
    "folder": "tonye",
    "totalLegacyAssets": 8,
    "cover": {
      "filename": "tonye_1.jpg",
      "url": "/assets/projects/tonye/tonye_1.jpg",
      "isCover": true,
      "sizeBytes": 269142
    },
    "gallery": [
      {
        "filename": "tonye_1.webp",
        "url": "/assets/projects/tonye/tonye_1.webp",
        "isCover": false,
        "sizeBytes": 204092
      },
      {
        "filename": "tonye_11.jpg",
        "url": "/assets/projects/tonye/tonye_11.jpg",
        "isCover": false,
        "sizeBytes": 160100
      }
    ]
  },
  "web_tower": {
    "folder": "web_tower",
    "totalLegacyAssets": 32,
    "cover": {
      "filename": "web_holding_cover.jpg",
      "url": "/assets/projects/web_tower/web_holding_cover.jpg",
      "isCover": true,
      "sizeBytes": 118295
    },
    "gallery": [
      {
        "filename": "Accueil 3e 2_26-05-08.png",
        "url": "/assets/projects/web_tower/Accueil 3e 2_26-05-08.png",
        "isCover": false,
        "sizeBytes": 2248977
      },
      {
        "filename": "Accueil 3e 2_26-05-08.webp",
        "url": "/assets/projects/web_tower/Accueil 3e 2_26-05-08.webp",
        "isCover": false,
        "sizeBytes": 79486
      }
    ]
  },
  "workbox": {
    "folder": "workbox",
    "totalLegacyAssets": 14,
    "cover": {
      "filename": "workbox_1.jpg",
      "url": "/assets/projects/workbox/workbox_1.jpg",
      "isCover": true,
      "sizeBytes": 396824
    },
    "gallery": [
      {
        "filename": "workbox_1.webp",
        "url": "/assets/projects/workbox/workbox_1.webp",
        "isCover": false,
        "sizeBytes": 349632
      },
      {
        "filename": "workbox_2.jpg",
        "url": "/assets/projects/workbox/workbox_2.jpg",
        "isCover": false,
        "sizeBytes": 229467
      }
    ]
  }
};

export const DEFAULT_PLACEHOLDER = "/assets/placeholders/project-placeholder.svg";
