export type LucideIconNode = [
  tag: string,
  attributes: Record<string, string>,
]

// Static Lucide v0.468 source nodes for the additional presets. Keeping these
// framework-neutral lets the core package ship exact endpoint geometry without
// taking a React dependency.
export const additionalPresetIconNodes: Record<
  string,
  LucideIconNode[]
> = {
  "BadgeAlert": [
    [
      "path",
      {
        "d": "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
        "key": "3c2336"
      }
    ],
    [
      "line",
      {
        "x1": "12",
        "x2": "12",
        "y1": "8",
        "y2": "12",
        "key": "1pkeuh"
      }
    ],
    [
      "line",
      {
        "x1": "12",
        "x2": "12.01",
        "y1": "16",
        "y2": "16",
        "key": "4dfq90"
      }
    ]
  ],
  "BadgeCheck": [
    [
      "path",
      {
        "d": "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
        "key": "3c2336"
      }
    ],
    [
      "path",
      {
        "d": "m9 12 2 2 4-4",
        "key": "dzmm74"
      }
    ]
  ],
  "BadgeHelp": [
    [
      "path",
      {
        "d": "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
        "key": "3c2336"
      }
    ],
    [
      "path",
      {
        "d": "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",
        "key": "1u773s"
      }
    ],
    [
      "line",
      {
        "x1": "12",
        "x2": "12.01",
        "y1": "17",
        "y2": "17",
        "key": "io3f8k"
      }
    ]
  ],
  "BadgePercent": [
    [
      "path",
      {
        "d": "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
        "key": "3c2336"
      }
    ],
    [
      "path",
      {
        "d": "m15 9-6 6",
        "key": "1uzhvr"
      }
    ],
    [
      "path",
      {
        "d": "M9 9h.01",
        "key": "1q5me6"
      }
    ],
    [
      "path",
      {
        "d": "M15 15h.01",
        "key": "lqbp3k"
      }
    ]
  ],
  "BadgeX": [
    [
      "path",
      {
        "d": "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
        "key": "3c2336"
      }
    ],
    [
      "line",
      {
        "x1": "15",
        "x2": "9",
        "y1": "9",
        "y2": "15",
        "key": "f7djnv"
      }
    ],
    [
      "line",
      {
        "x1": "9",
        "x2": "15",
        "y1": "9",
        "y2": "15",
        "key": "1shsy8"
      }
    ]
  ],
  "Banknote": [
    [
      "rect",
      {
        "width": "20",
        "height": "12",
        "x": "2",
        "y": "6",
        "rx": "2",
        "key": "9lu3g6"
      }
    ],
    [
      "circle",
      {
        "cx": "12",
        "cy": "12",
        "r": "2",
        "key": "1c9p78"
      }
    ],
    [
      "path",
      {
        "d": "M6 12h.01M18 12h.01",
        "key": "113zkx"
      }
    ]
  ],
  "BluetoothConnected": [
    [
      "path",
      {
        "d": "m7 7 10 10-5 5V2l5 5L7 17",
        "key": "1q5490"
      }
    ],
    [
      "line",
      {
        "x1": "18",
        "x2": "21",
        "y1": "12",
        "y2": "12",
        "key": "1rsjjs"
      }
    ],
    [
      "line",
      {
        "x1": "3",
        "x2": "6",
        "y1": "12",
        "y2": "12",
        "key": "11yl8c"
      }
    ]
  ],
  "BluetoothSearching": [
    [
      "path",
      {
        "d": "m7 7 10 10-5 5V2l5 5L7 17",
        "key": "1q5490"
      }
    ],
    [
      "path",
      {
        "d": "M20.83 14.83a4 4 0 0 0 0-5.66",
        "key": "k8tn1j"
      }
    ],
    [
      "path",
      {
        "d": "M18 12h.01",
        "key": "yjnet6"
      }
    ]
  ],
  "BugOff": [
    [
      "path",
      {
        "d": "M15 7.13V6a3 3 0 0 0-5.14-2.1L8 2",
        "key": "vl8zik"
      }
    ],
    [
      "path",
      {
        "d": "M14.12 3.88 16 2",
        "key": "qol33r"
      }
    ],
    [
      "path",
      {
        "d": "M22 13h-4v-2a4 4 0 0 0-4-4h-1.3",
        "key": "1ou0bd"
      }
    ],
    [
      "path",
      {
        "d": "M20.97 5c0 2.1-1.6 3.8-3.5 4",
        "key": "18gb23"
      }
    ],
    [
      "path",
      {
        "d": "m2 2 20 20",
        "key": "1ooewy"
      }
    ],
    [
      "path",
      {
        "d": "M7.7 7.7A4 4 0 0 0 6 11v3a6 6 0 0 0 11.13 3.13",
        "key": "1njkjs"
      }
    ],
    [
      "path",
      {
        "d": "M12 20v-8",
        "key": "i3yub9"
      }
    ],
    [
      "path",
      {
        "d": "M6 13H2",
        "key": "82j7cp"
      }
    ],
    [
      "path",
      {
        "d": "M3 21c0-2.1 1.7-3.9 3.8-4",
        "key": "4p0ekp"
      }
    ]
  ],
  "Bug": [
    [
      "path",
      {
        "d": "m8 2 1.88 1.88",
        "key": "fmnt4t"
      }
    ],
    [
      "path",
      {
        "d": "M14.12 3.88 16 2",
        "key": "qol33r"
      }
    ],
    [
      "path",
      {
        "d": "M9 7.13v-1a3.003 3.003 0 1 1 6 0v1",
        "key": "d7y7pr"
      }
    ],
    [
      "path",
      {
        "d": "M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6",
        "key": "xs1cw7"
      }
    ],
    [
      "path",
      {
        "d": "M12 20v-9",
        "key": "1qisl0"
      }
    ],
    [
      "path",
      {
        "d": "M6.53 9C4.6 8.8 3 7.1 3 5",
        "key": "32zzws"
      }
    ],
    [
      "path",
      {
        "d": "M6 13H2",
        "key": "82j7cp"
      }
    ],
    [
      "path",
      {
        "d": "M3 21c0-2.1 1.7-3.9 3.8-4",
        "key": "4p0ekp"
      }
    ],
    [
      "path",
      {
        "d": "M20.97 5c0 2.1-1.6 3.8-3.5 4",
        "key": "18gb23"
      }
    ],
    [
      "path",
      {
        "d": "M22 13h-4",
        "key": "1jl80f"
      }
    ],
    [
      "path",
      {
        "d": "M17.2 17c2.1.1 3.8 1.9 3.8 4",
        "key": "k3fwyw"
      }
    ]
  ],
  "CalendarCheck": [
    [
      "path",
      {
        "d": "M8 2v4",
        "key": "1cmpym"
      }
    ],
    [
      "path",
      {
        "d": "M16 2v4",
        "key": "4m81vk"
      }
    ],
    [
      "rect",
      {
        "width": "18",
        "height": "18",
        "x": "3",
        "y": "4",
        "rx": "2",
        "key": "1hopcy"
      }
    ],
    [
      "path",
      {
        "d": "M3 10h18",
        "key": "8toen8"
      }
    ],
    [
      "path",
      {
        "d": "m9 16 2 2 4-4",
        "key": "19s6y9"
      }
    ]
  ],
  "CalendarClock": [
    [
      "path",
      {
        "d": "M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5",
        "key": "1osxxc"
      }
    ],
    [
      "path",
      {
        "d": "M16 2v4",
        "key": "4m81vk"
      }
    ],
    [
      "path",
      {
        "d": "M8 2v4",
        "key": "1cmpym"
      }
    ],
    [
      "path",
      {
        "d": "M3 10h5",
        "key": "r794hk"
      }
    ],
    [
      "path",
      {
        "d": "M17.5 17.5 16 16.3V14",
        "key": "akvzfd"
      }
    ],
    [
      "circle",
      {
        "cx": "16",
        "cy": "16",
        "r": "6",
        "key": "qoo3c4"
      }
    ]
  ],
  "CalendarCog": [
    [
      "path",
      {
        "d": "m15.2 16.9-.9-.4",
        "key": "1r0w5f"
      }
    ],
    [
      "path",
      {
        "d": "m15.2 19.1-.9.4",
        "key": "j188fs"
      }
    ],
    [
      "path",
      {
        "d": "M16 2v4",
        "key": "4m81vk"
      }
    ],
    [
      "path",
      {
        "d": "m16.9 15.2-.4-.9",
        "key": "699xu"
      }
    ],
    [
      "path",
      {
        "d": "m16.9 20.8-.4.9",
        "key": "dfjc4z"
      }
    ],
    [
      "path",
      {
        "d": "m19.5 14.3-.4.9",
        "key": "1eb35c"
      }
    ],
    [
      "path",
      {
        "d": "m19.5 21.7-.4-.9",
        "key": "1tonu5"
      }
    ],
    [
      "path",
      {
        "d": "M21 10.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6",
        "key": "11kmuh"
      }
    ],
    [
      "path",
      {
        "d": "m21.7 16.5-.9.4",
        "key": "1knoei"
      }
    ],
    [
      "path",
      {
        "d": "m21.7 19.5-.9-.4",
        "key": "q4dx6b"
      }
    ],
    [
      "path",
      {
        "d": "M3 10h18",
        "key": "8toen8"
      }
    ],
    [
      "path",
      {
        "d": "M8 2v4",
        "key": "1cmpym"
      }
    ],
    [
      "circle",
      {
        "cx": "18",
        "cy": "18",
        "r": "3",
        "key": "1xkwt0"
      }
    ]
  ],
  "CalendarDays": [
    [
      "path",
      {
        "d": "M8 2v4",
        "key": "1cmpym"
      }
    ],
    [
      "path",
      {
        "d": "M16 2v4",
        "key": "4m81vk"
      }
    ],
    [
      "rect",
      {
        "width": "18",
        "height": "18",
        "x": "3",
        "y": "4",
        "rx": "2",
        "key": "1hopcy"
      }
    ],
    [
      "path",
      {
        "d": "M3 10h18",
        "key": "8toen8"
      }
    ],
    [
      "path",
      {
        "d": "M8 14h.01",
        "key": "6423bh"
      }
    ],
    [
      "path",
      {
        "d": "M12 14h.01",
        "key": "1etili"
      }
    ],
    [
      "path",
      {
        "d": "M16 14h.01",
        "key": "1gbofw"
      }
    ],
    [
      "path",
      {
        "d": "M8 18h.01",
        "key": "lrp35t"
      }
    ],
    [
      "path",
      {
        "d": "M12 18h.01",
        "key": "mhygvu"
      }
    ],
    [
      "path",
      {
        "d": "M16 18h.01",
        "key": "kzsmim"
      }
    ]
  ],
  "CalendarRange": [
    [
      "rect",
      {
        "width": "18",
        "height": "18",
        "x": "3",
        "y": "4",
        "rx": "2",
        "key": "1hopcy"
      }
    ],
    [
      "path",
      {
        "d": "M16 2v4",
        "key": "4m81vk"
      }
    ],
    [
      "path",
      {
        "d": "M3 10h18",
        "key": "8toen8"
      }
    ],
    [
      "path",
      {
        "d": "M8 2v4",
        "key": "1cmpym"
      }
    ],
    [
      "path",
      {
        "d": "M17 14h-6",
        "key": "bkmgh3"
      }
    ],
    [
      "path",
      {
        "d": "M13 18H7",
        "key": "bb0bb7"
      }
    ],
    [
      "path",
      {
        "d": "M7 14h.01",
        "key": "1qa3f1"
      }
    ],
    [
      "path",
      {
        "d": "M17 18h.01",
        "key": "1bdyru"
      }
    ]
  ],
  "CalendarSearch": [
    [
      "path",
      {
        "d": "M16 2v4",
        "key": "4m81vk"
      }
    ],
    [
      "path",
      {
        "d": "M21 11.75V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7.25",
        "key": "1jrsq6"
      }
    ],
    [
      "path",
      {
        "d": "m22 22-1.875-1.875",
        "key": "13zax7"
      }
    ],
    [
      "path",
      {
        "d": "M3 10h18",
        "key": "8toen8"
      }
    ],
    [
      "path",
      {
        "d": "M8 2v4",
        "key": "1cmpym"
      }
    ],
    [
      "circle",
      {
        "cx": "18",
        "cy": "18",
        "r": "3",
        "key": "1xkwt0"
      }
    ]
  ],
  "CalendarSync": [
    [
      "path",
      {
        "d": "M11 10v4h4",
        "key": "172dkj"
      }
    ],
    [
      "path",
      {
        "d": "m11 14 1.535-1.605a5 5 0 0 1 8 1.5",
        "key": "vu0qm5"
      }
    ],
    [
      "path",
      {
        "d": "M16 2v4",
        "key": "4m81vk"
      }
    ],
    [
      "path",
      {
        "d": "m21 18-1.535 1.605a5 5 0 0 1-8-1.5",
        "key": "1qgeyt"
      }
    ],
    [
      "path",
      {
        "d": "M21 22v-4h-4",
        "key": "hrummi"
      }
    ],
    [
      "path",
      {
        "d": "M21 8.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4.3",
        "key": "mctw84"
      }
    ],
    [
      "path",
      {
        "d": "M3 10h4",
        "key": "1el30a"
      }
    ],
    [
      "path",
      {
        "d": "M8 2v4",
        "key": "1cmpym"
      }
    ]
  ],
  "CalendarX": [
    [
      "path",
      {
        "d": "M8 2v4",
        "key": "1cmpym"
      }
    ],
    [
      "path",
      {
        "d": "M16 2v4",
        "key": "4m81vk"
      }
    ],
    [
      "rect",
      {
        "width": "18",
        "height": "18",
        "x": "3",
        "y": "4",
        "rx": "2",
        "key": "1hopcy"
      }
    ],
    [
      "path",
      {
        "d": "M3 10h18",
        "key": "8toen8"
      }
    ],
    [
      "path",
      {
        "d": "m14 14-4 4",
        "key": "rymu2i"
      }
    ],
    [
      "path",
      {
        "d": "m10 14 4 4",
        "key": "3sz06r"
      }
    ]
  ],
  "CircleCheck": [
    [
      "circle",
      {
        "cx": "12",
        "cy": "12",
        "r": "10",
        "key": "1mglay"
      }
    ],
    [
      "path",
      {
        "d": "m9 12 2 2 4-4",
        "key": "dzmm74"
      }
    ]
  ],
  "CircleDashed": [
    [
      "path",
      {
        "d": "M10.1 2.182a10 10 0 0 1 3.8 0",
        "key": "5ilxe3"
      }
    ],
    [
      "path",
      {
        "d": "M13.9 21.818a10 10 0 0 1-3.8 0",
        "key": "11zvb9"
      }
    ],
    [
      "path",
      {
        "d": "M17.609 3.721a10 10 0 0 1 2.69 2.7",
        "key": "1iw5b2"
      }
    ],
    [
      "path",
      {
        "d": "M2.182 13.9a10 10 0 0 1 0-3.8",
        "key": "c0bmvh"
      }
    ],
    [
      "path",
      {
        "d": "M20.279 17.609a10 10 0 0 1-2.7 2.69",
        "key": "1ruxm7"
      }
    ],
    [
      "path",
      {
        "d": "M21.818 10.1a10 10 0 0 1 0 3.8",
        "key": "qkgqxc"
      }
    ],
    [
      "path",
      {
        "d": "M3.721 6.391a10 10 0 0 1 2.7-2.69",
        "key": "1mcia2"
      }
    ],
    [
      "path",
      {
        "d": "M6.391 20.279a10 10 0 0 1-2.69-2.7",
        "key": "1fvljs"
      }
    ]
  ],
  "CircleDollarSign": [
    [
      "circle",
      {
        "cx": "12",
        "cy": "12",
        "r": "10",
        "key": "1mglay"
      }
    ],
    [
      "path",
      {
        "d": "M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8",
        "key": "1h4pet"
      }
    ],
    [
      "path",
      {
        "d": "M12 18V6",
        "key": "zqpxq5"
      }
    ]
  ],
  "CircleDotDashed": [
    [
      "path",
      {
        "d": "M10.1 2.18a9.93 9.93 0 0 1 3.8 0",
        "key": "1qdqn0"
      }
    ],
    [
      "path",
      {
        "d": "M17.6 3.71a9.95 9.95 0 0 1 2.69 2.7",
        "key": "1bq7p6"
      }
    ],
    [
      "path",
      {
        "d": "M21.82 10.1a9.93 9.93 0 0 1 0 3.8",
        "key": "1rlaqf"
      }
    ],
    [
      "path",
      {
        "d": "M20.29 17.6a9.95 9.95 0 0 1-2.7 2.69",
        "key": "1xk03u"
      }
    ],
    [
      "path",
      {
        "d": "M13.9 21.82a9.94 9.94 0 0 1-3.8 0",
        "key": "l7re25"
      }
    ],
    [
      "path",
      {
        "d": "M6.4 20.29a9.95 9.95 0 0 1-2.69-2.7",
        "key": "1v18p6"
      }
    ],
    [
      "path",
      {
        "d": "M2.18 13.9a9.93 9.93 0 0 1 0-3.8",
        "key": "xdo6bj"
      }
    ],
    [
      "path",
      {
        "d": "M3.71 6.4a9.95 9.95 0 0 1 2.7-2.69",
        "key": "1jjmaz"
      }
    ],
    [
      "circle",
      {
        "cx": "12",
        "cy": "12",
        "r": "1",
        "key": "41hilf"
      }
    ]
  ],
  "CircleEllipsis": [
    [
      "circle",
      {
        "cx": "12",
        "cy": "12",
        "r": "10",
        "key": "1mglay"
      }
    ],
    [
      "path",
      {
        "d": "M17 12h.01",
        "key": "1m0b6t"
      }
    ],
    [
      "path",
      {
        "d": "M12 12h.01",
        "key": "1mp3jc"
      }
    ],
    [
      "path",
      {
        "d": "M7 12h.01",
        "key": "eqddd0"
      }
    ]
  ],
  "CircleHelp": [
    [
      "circle",
      {
        "cx": "12",
        "cy": "12",
        "r": "10",
        "key": "1mglay"
      }
    ],
    [
      "path",
      {
        "d": "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",
        "key": "1u773s"
      }
    ],
    [
      "path",
      {
        "d": "M12 17h.01",
        "key": "p32p05"
      }
    ]
  ],
  "CircleX": [
    [
      "circle",
      {
        "cx": "12",
        "cy": "12",
        "r": "10",
        "key": "1mglay"
      }
    ],
    [
      "path",
      {
        "d": "m15 9-6 6",
        "key": "1uzhvr"
      }
    ],
    [
      "path",
      {
        "d": "m9 9 6 6",
        "key": "z0biqf"
      }
    ]
  ],
  "ClipboardCheck": [
    [
      "rect",
      {
        "width": "8",
        "height": "4",
        "x": "8",
        "y": "2",
        "rx": "1",
        "ry": "1",
        "key": "tgr4d6"
      }
    ],
    [
      "path",
      {
        "d": "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
        "key": "116196"
      }
    ],
    [
      "path",
      {
        "d": "m9 14 2 2 4-4",
        "key": "df797q"
      }
    ]
  ],
  "ClipboardList": [
    [
      "rect",
      {
        "width": "8",
        "height": "4",
        "x": "8",
        "y": "2",
        "rx": "1",
        "ry": "1",
        "key": "tgr4d6"
      }
    ],
    [
      "path",
      {
        "d": "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
        "key": "116196"
      }
    ],
    [
      "path",
      {
        "d": "M12 11h4",
        "key": "1jrz19"
      }
    ],
    [
      "path",
      {
        "d": "M12 16h4",
        "key": "n85exb"
      }
    ],
    [
      "path",
      {
        "d": "M8 11h.01",
        "key": "1dfujw"
      }
    ],
    [
      "path",
      {
        "d": "M8 16h.01",
        "key": "18s6g9"
      }
    ]
  ],
  "CloudAlert": [
    [
      "path",
      {
        "d": "M12 12v4",
        "key": "tww15h"
      }
    ],
    [
      "path",
      {
        "d": "M12 20h.01",
        "key": "zekei9"
      }
    ],
    [
      "path",
      {
        "d": "M17 18h.5a1 1 0 0 0 0-9h-1.79A7 7 0 1 0 7 17.708",
        "key": "xsb5ju"
      }
    ]
  ],
  "CloudCog": [
    [
      "circle",
      {
        "cx": "12",
        "cy": "17",
        "r": "3",
        "key": "1spfwm"
      }
    ],
    [
      "path",
      {
        "d": "M4.2 15.1A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.2",
        "key": "zaobp"
      }
    ],
    [
      "path",
      {
        "d": "m15.7 18.4-.9-.3",
        "key": "4qxpbn"
      }
    ],
    [
      "path",
      {
        "d": "m9.2 15.9-.9-.3",
        "key": "17q7o2"
      }
    ],
    [
      "path",
      {
        "d": "m10.6 20.7.3-.9",
        "key": "1pf4s2"
      }
    ],
    [
      "path",
      {
        "d": "m13.1 14.2.3-.9",
        "key": "1mnuqm"
      }
    ],
    [
      "path",
      {
        "d": "m13.6 20.7-.4-1",
        "key": "1jpd1m"
      }
    ],
    [
      "path",
      {
        "d": "m10.8 14.3-.4-1",
        "key": "17ugyy"
      }
    ],
    [
      "path",
      {
        "d": "m8.3 18.6 1-.4",
        "key": "s42vdx"
      }
    ],
    [
      "path",
      {
        "d": "m14.7 15.8 1-.4",
        "key": "2wizun"
      }
    ]
  ],
  "CloudDownload": [
    [
      "path",
      {
        "d": "M12 13v8l-4-4",
        "key": "1f5nwf"
      }
    ],
    [
      "path",
      {
        "d": "m12 21 4-4",
        "key": "1lfcce"
      }
    ],
    [
      "path",
      {
        "d": "M4.393 15.269A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.436 8.284",
        "key": "ui1hmy"
      }
    ]
  ],
  "CloudUpload": [
    [
      "path",
      {
        "d": "M12 13v8",
        "key": "1l5pq0"
      }
    ],
    [
      "path",
      {
        "d": "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242",
        "key": "1pljnt"
      }
    ],
    [
      "path",
      {
        "d": "m8 17 4-4 4 4",
        "key": "1quai1"
      }
    ]
  ],
  "Cloud": [
    [
      "path",
      {
        "d": "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z",
        "key": "p7xjir"
      }
    ]
  ],
  "CreditCard": [
    [
      "rect",
      {
        "width": "20",
        "height": "14",
        "x": "2",
        "y": "5",
        "rx": "2",
        "key": "ynyp8z"
      }
    ],
    [
      "line",
      {
        "x1": "2",
        "x2": "22",
        "y1": "10",
        "y2": "10",
        "key": "1b3vmo"
      }
    ]
  ],
  "FileCheck": [
    [
      "path",
      {
        "d": "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
        "key": "1rqfz7"
      }
    ],
    [
      "path",
      {
        "d": "M14 2v4a2 2 0 0 0 2 2h4",
        "key": "tnqrlb"
      }
    ],
    [
      "path",
      {
        "d": "m9 15 2 2 4-4",
        "key": "1grp1n"
      }
    ]
  ],
  "FileClock": [
    [
      "path",
      {
        "d": "M16 22h2a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3",
        "key": "37hlfg"
      }
    ],
    [
      "path",
      {
        "d": "M14 2v4a2 2 0 0 0 2 2h4",
        "key": "tnqrlb"
      }
    ],
    [
      "circle",
      {
        "cx": "8",
        "cy": "16",
        "r": "6",
        "key": "10v15b"
      }
    ],
    [
      "path",
      {
        "d": "M9.5 17.5 8 16.25V14",
        "key": "1o80t2"
      }
    ]
  ],
  "FileDown": [
    [
      "path",
      {
        "d": "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
        "key": "1rqfz7"
      }
    ],
    [
      "path",
      {
        "d": "M14 2v4a2 2 0 0 0 2 2h4",
        "key": "tnqrlb"
      }
    ],
    [
      "path",
      {
        "d": "M12 18v-6",
        "key": "17g6i2"
      }
    ],
    [
      "path",
      {
        "d": "m9 15 3 3 3-3",
        "key": "1npd3o"
      }
    ]
  ],
  "FileInput": [
    [
      "path",
      {
        "d": "M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4",
        "key": "1pf5j1"
      }
    ],
    [
      "path",
      {
        "d": "M14 2v4a2 2 0 0 0 2 2h4",
        "key": "tnqrlb"
      }
    ],
    [
      "path",
      {
        "d": "M2 15h10",
        "key": "jfw4w8"
      }
    ],
    [
      "path",
      {
        "d": "m9 18 3-3-3-3",
        "key": "112psh"
      }
    ]
  ],
  "FileLock2": [
    [
      "path",
      {
        "d": "M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v1",
        "key": "jmtmu2"
      }
    ],
    [
      "path",
      {
        "d": "M14 2v4a2 2 0 0 0 2 2h4",
        "key": "tnqrlb"
      }
    ],
    [
      "rect",
      {
        "width": "8",
        "height": "5",
        "x": "2",
        "y": "13",
        "rx": "1",
        "key": "10y5wo"
      }
    ],
    [
      "path",
      {
        "d": "M8 13v-2a2 2 0 1 0-4 0v2",
        "key": "1pdxzg"
      }
    ]
  ],
  "FileOutput": [
    [
      "path",
      {
        "d": "M14 2v4a2 2 0 0 0 2 2h4",
        "key": "tnqrlb"
      }
    ],
    [
      "path",
      {
        "d": "M4 7V4a2 2 0 0 1 2-2 2 2 0 0 0-2 2",
        "key": "1vk7w2"
      }
    ],
    [
      "path",
      {
        "d": "M4.063 20.999a2 2 0 0 0 2 1L18 22a2 2 0 0 0 2-2V7l-5-5H6",
        "key": "1jink5"
      }
    ],
    [
      "path",
      {
        "d": "m5 11-3 3",
        "key": "1dgrs4"
      }
    ],
    [
      "path",
      {
        "d": "m5 17-3-3h10",
        "key": "1mvvaf"
      }
    ]
  ],
  "FilePenLine": [
    [
      "path",
      {
        "d": "m18 5-2.414-2.414A2 2 0 0 0 14.172 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2",
        "key": "142zxg"
      }
    ],
    [
      "path",
      {
        "d": "M21.378 12.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z",
        "key": "2t3380"
      }
    ],
    [
      "path",
      {
        "d": "M8 18h1",
        "key": "13wk12"
      }
    ]
  ],
  "FileQuestion": [
    [
      "path",
      {
        "d": "M12 17h.01",
        "key": "p32p05"
      }
    ],
    [
      "path",
      {
        "d": "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z",
        "key": "1mlx9k"
      }
    ],
    [
      "path",
      {
        "d": "M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3",
        "key": "mhlwft"
      }
    ]
  ],
  "FileSearch": [
    [
      "path",
      {
        "d": "M14 2v4a2 2 0 0 0 2 2h4",
        "key": "tnqrlb"
      }
    ],
    [
      "path",
      {
        "d": "M4.268 21a2 2 0 0 0 1.727 1H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3",
        "key": "ms7g94"
      }
    ],
    [
      "path",
      {
        "d": "m9 18-1.5-1.5",
        "key": "1j6qii"
      }
    ],
    [
      "circle",
      {
        "cx": "5",
        "cy": "14",
        "r": "3",
        "key": "ufru5t"
      }
    ]
  ],
  "FileUp": [
    [
      "path",
      {
        "d": "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
        "key": "1rqfz7"
      }
    ],
    [
      "path",
      {
        "d": "M14 2v4a2 2 0 0 0 2 2h4",
        "key": "tnqrlb"
      }
    ],
    [
      "path",
      {
        "d": "M12 12v6",
        "key": "3ahymv"
      }
    ],
    [
      "path",
      {
        "d": "m15 15-3-3-3 3",
        "key": "15xj92"
      }
    ]
  ],
  "FileWarning": [
    [
      "path",
      {
        "d": "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
        "key": "1rqfz7"
      }
    ],
    [
      "path",
      {
        "d": "M12 9v4",
        "key": "juzpu7"
      }
    ],
    [
      "path",
      {
        "d": "M12 17h.01",
        "key": "p32p05"
      }
    ]
  ],
  "FileX": [
    [
      "path",
      {
        "d": "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
        "key": "1rqfz7"
      }
    ],
    [
      "path",
      {
        "d": "M14 2v4a2 2 0 0 0 2 2h4",
        "key": "tnqrlb"
      }
    ],
    [
      "path",
      {
        "d": "m14.5 12.5-5 5",
        "key": "b62r18"
      }
    ],
    [
      "path",
      {
        "d": "m9.5 12.5 5 5",
        "key": "1rk7el"
      }
    ]
  ],
  "Fingerprint": [
    [
      "path",
      {
        "d": "M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4",
        "key": "1nerag"
      }
    ],
    [
      "path",
      {
        "d": "M14 13.12c0 2.38 0 6.38-1 8.88",
        "key": "o46ks0"
      }
    ],
    [
      "path",
      {
        "d": "M17.29 21.02c.12-.6.43-2.3.5-3.02",
        "key": "ptglia"
      }
    ],
    [
      "path",
      {
        "d": "M2 12a10 10 0 0 1 18-6",
        "key": "ydlgp0"
      }
    ],
    [
      "path",
      {
        "d": "M2 16h.01",
        "key": "1gqxmh"
      }
    ],
    [
      "path",
      {
        "d": "M21.8 16c.2-2 .131-5.354 0-6",
        "key": "drycrb"
      }
    ],
    [
      "path",
      {
        "d": "M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2",
        "key": "1tidbn"
      }
    ],
    [
      "path",
      {
        "d": "M8.65 22c.21-.66.45-1.32.57-2",
        "key": "13wd9y"
      }
    ],
    [
      "path",
      {
        "d": "M9 6.8a6 6 0 0 1 9 5.2v2",
        "key": "1fr1j5"
      }
    ]
  ],
  "FolderCheck": [
    [
      "path",
      {
        "d": "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
        "key": "1kt360"
      }
    ],
    [
      "path",
      {
        "d": "m9 13 2 2 4-4",
        "key": "6343dt"
      }
    ]
  ],
  "FolderClock": [
    [
      "circle",
      {
        "cx": "16",
        "cy": "16",
        "r": "6",
        "key": "qoo3c4"
      }
    ],
    [
      "path",
      {
        "d": "M7 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2",
        "key": "1urifu"
      }
    ],
    [
      "path",
      {
        "d": "M16 14v2l1 1",
        "key": "xth2jh"
      }
    ]
  ],
  "FolderCog": [
    [
      "circle",
      {
        "cx": "18",
        "cy": "18",
        "r": "3",
        "key": "1xkwt0"
      }
    ],
    [
      "path",
      {
        "d": "M10.3 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v3.3",
        "key": "1k8050"
      }
    ],
    [
      "path",
      {
        "d": "m21.7 19.4-.9-.3",
        "key": "1qgwi9"
      }
    ],
    [
      "path",
      {
        "d": "m15.2 16.9-.9-.3",
        "key": "1t7mvx"
      }
    ],
    [
      "path",
      {
        "d": "m16.6 21.7.3-.9",
        "key": "1j67ps"
      }
    ],
    [
      "path",
      {
        "d": "m19.1 15.2.3-.9",
        "key": "18r7jp"
      }
    ],
    [
      "path",
      {
        "d": "m19.6 21.7-.4-1",
        "key": "z2vh2"
      }
    ],
    [
      "path",
      {
        "d": "m16.8 15.3-.4-1",
        "key": "1ei7r6"
      }
    ],
    [
      "path",
      {
        "d": "m14.3 19.6 1-.4",
        "key": "11sv9r"
      }
    ],
    [
      "path",
      {
        "d": "m20.7 16.8 1-.4",
        "key": "19m87a"
      }
    ]
  ],
  "FolderDown": [
    [
      "path",
      {
        "d": "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
        "key": "1kt360"
      }
    ],
    [
      "path",
      {
        "d": "M12 10v6",
        "key": "1bos4e"
      }
    ],
    [
      "path",
      {
        "d": "m15 13-3 3-3-3",
        "key": "6j2sf0"
      }
    ]
  ],
  "FolderInput": [
    [
      "path",
      {
        "d": "M2 9V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1",
        "key": "fm4g5t"
      }
    ],
    [
      "path",
      {
        "d": "M2 13h10",
        "key": "pgb2dq"
      }
    ],
    [
      "path",
      {
        "d": "m9 16 3-3-3-3",
        "key": "6m91ic"
      }
    ]
  ],
  "FolderLock": [
    [
      "rect",
      {
        "width": "8",
        "height": "5",
        "x": "14",
        "y": "17",
        "rx": "1",
        "key": "19aais"
      }
    ],
    [
      "path",
      {
        "d": "M10 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v2.5",
        "key": "1w6v7t"
      }
    ],
    [
      "path",
      {
        "d": "M20 17v-2a2 2 0 1 0-4 0v2",
        "key": "pwaxnr"
      }
    ]
  ],
  "FolderOutput": [
    [
      "path",
      {
        "d": "M2 7.5V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-1.5",
        "key": "1yk7aj"
      }
    ],
    [
      "path",
      {
        "d": "M2 13h10",
        "key": "pgb2dq"
      }
    ],
    [
      "path",
      {
        "d": "m5 10-3 3 3 3",
        "key": "1r8ie0"
      }
    ]
  ],
  "FolderPen": [
    [
      "path",
      {
        "d": "M2 11.5V5a2 2 0 0 1 2-2h3.9c.7 0 1.3.3 1.7.9l.8 1.2c.4.6 1 .9 1.7.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-9.5",
        "key": "a8xqs0"
      }
    ],
    [
      "path",
      {
        "d": "M11.378 13.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z",
        "key": "1saktj"
      }
    ]
  ],
  "FolderSearch": [
    [
      "path",
      {
        "d": "M10.7 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v4.1",
        "key": "1bw5m7"
      }
    ],
    [
      "path",
      {
        "d": "m21 21-1.9-1.9",
        "key": "1g2n9r"
      }
    ],
    [
      "circle",
      {
        "cx": "17",
        "cy": "17",
        "r": "3",
        "key": "18b49y"
      }
    ]
  ],
  "FolderSync": [
    [
      "path",
      {
        "d": "M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v.5",
        "key": "1dkoa9"
      }
    ],
    [
      "path",
      {
        "d": "M12 10v4h4",
        "key": "1czhmt"
      }
    ],
    [
      "path",
      {
        "d": "m12 14 1.535-1.605a5 5 0 0 1 8 1.5",
        "key": "lvuxfi"
      }
    ],
    [
      "path",
      {
        "d": "M22 22v-4h-4",
        "key": "1ewp4q"
      }
    ],
    [
      "path",
      {
        "d": "m22 18-1.535 1.605a5 5 0 0 1-8-1.5",
        "key": "14ync0"
      }
    ]
  ],
  "FolderUp": [
    [
      "path",
      {
        "d": "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
        "key": "1kt360"
      }
    ],
    [
      "path",
      {
        "d": "M12 10v6",
        "key": "1bos4e"
      }
    ],
    [
      "path",
      {
        "d": "m9 13 3-3 3 3",
        "key": "1pxg3c"
      }
    ]
  ],
  "FolderX": [
    [
      "path",
      {
        "d": "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
        "key": "1kt360"
      }
    ],
    [
      "path",
      {
        "d": "m9.5 10.5 5 5",
        "key": "ra9qjz"
      }
    ],
    [
      "path",
      {
        "d": "m14.5 10.5-5 5",
        "key": "l2rkpq"
      }
    ]
  ],
  "HardDriveDownload": [
    [
      "path",
      {
        "d": "M12 2v8",
        "key": "1q4o3n"
      }
    ],
    [
      "path",
      {
        "d": "m16 6-4 4-4-4",
        "key": "6wukr"
      }
    ],
    [
      "rect",
      {
        "width": "20",
        "height": "8",
        "x": "2",
        "y": "14",
        "rx": "2",
        "key": "w68u3i"
      }
    ],
    [
      "path",
      {
        "d": "M6 18h.01",
        "key": "uhywen"
      }
    ],
    [
      "path",
      {
        "d": "M10 18h.01",
        "key": "h775k"
      }
    ]
  ],
  "HardDriveUpload": [
    [
      "path",
      {
        "d": "m16 6-4-4-4 4",
        "key": "13yo43"
      }
    ],
    [
      "path",
      {
        "d": "M12 2v8",
        "key": "1q4o3n"
      }
    ],
    [
      "rect",
      {
        "width": "20",
        "height": "8",
        "x": "2",
        "y": "14",
        "rx": "2",
        "key": "w68u3i"
      }
    ],
    [
      "path",
      {
        "d": "M6 18h.01",
        "key": "uhywen"
      }
    ],
    [
      "path",
      {
        "d": "M10 18h.01",
        "key": "h775k"
      }
    ]
  ],
  "HardDrive": [
    [
      "line",
      {
        "x1": "22",
        "x2": "2",
        "y1": "12",
        "y2": "12",
        "key": "1y58io"
      }
    ],
    [
      "path",
      {
        "d": "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
        "key": "oot6mr"
      }
    ],
    [
      "line",
      {
        "x1": "6",
        "x2": "6.01",
        "y1": "16",
        "y2": "16",
        "key": "sgf278"
      }
    ],
    [
      "line",
      {
        "x1": "10",
        "x2": "10.01",
        "y1": "16",
        "y2": "16",
        "key": "1l4acy"
      }
    ]
  ],
  "KeyRound": [
    [
      "path",
      {
        "d": "M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z",
        "key": "1s6t7t"
      }
    ],
    [
      "circle",
      {
        "cx": "16.5",
        "cy": "7.5",
        "r": ".5",
        "fill": "currentColor",
        "key": "w0ekpg"
      }
    ]
  ],
  "ListChecks": [
    [
      "path",
      {
        "d": "m3 17 2 2 4-4",
        "key": "1jhpwq"
      }
    ],
    [
      "path",
      {
        "d": "m3 7 2 2 4-4",
        "key": "1obspn"
      }
    ],
    [
      "path",
      {
        "d": "M13 6h8",
        "key": "15sg57"
      }
    ],
    [
      "path",
      {
        "d": "M13 12h8",
        "key": "h98zly"
      }
    ],
    [
      "path",
      {
        "d": "M13 18h8",
        "key": "oe0vm4"
      }
    ]
  ],
  "ListTodo": [
    [
      "rect",
      {
        "x": "3",
        "y": "5",
        "width": "6",
        "height": "6",
        "rx": "1",
        "key": "1defrl"
      }
    ],
    [
      "path",
      {
        "d": "m3 17 2 2 4-4",
        "key": "1jhpwq"
      }
    ],
    [
      "path",
      {
        "d": "M13 6h8",
        "key": "15sg57"
      }
    ],
    [
      "path",
      {
        "d": "M13 12h8",
        "key": "h98zly"
      }
    ],
    [
      "path",
      {
        "d": "M13 18h8",
        "key": "oe0vm4"
      }
    ]
  ],
  "LocateFixed": [
    [
      "line",
      {
        "x1": "2",
        "x2": "5",
        "y1": "12",
        "y2": "12",
        "key": "bvdh0s"
      }
    ],
    [
      "line",
      {
        "x1": "19",
        "x2": "22",
        "y1": "12",
        "y2": "12",
        "key": "1tbv5k"
      }
    ],
    [
      "line",
      {
        "x1": "12",
        "x2": "12",
        "y1": "2",
        "y2": "5",
        "key": "11lu5j"
      }
    ],
    [
      "line",
      {
        "x1": "12",
        "x2": "12",
        "y1": "19",
        "y2": "22",
        "key": "x3vr5v"
      }
    ],
    [
      "circle",
      {
        "cx": "12",
        "cy": "12",
        "r": "7",
        "key": "fim9np"
      }
    ],
    [
      "circle",
      {
        "cx": "12",
        "cy": "12",
        "r": "3",
        "key": "1v7zrd"
      }
    ]
  ],
  "LocateOff": [
    [
      "line",
      {
        "x1": "2",
        "x2": "5",
        "y1": "12",
        "y2": "12",
        "key": "bvdh0s"
      }
    ],
    [
      "line",
      {
        "x1": "19",
        "x2": "22",
        "y1": "12",
        "y2": "12",
        "key": "1tbv5k"
      }
    ],
    [
      "line",
      {
        "x1": "12",
        "x2": "12",
        "y1": "2",
        "y2": "5",
        "key": "11lu5j"
      }
    ],
    [
      "line",
      {
        "x1": "12",
        "x2": "12",
        "y1": "19",
        "y2": "22",
        "key": "x3vr5v"
      }
    ],
    [
      "path",
      {
        "d": "M7.11 7.11C5.83 8.39 5 10.1 5 12c0 3.87 3.13 7 7 7 1.9 0 3.61-.83 4.89-2.11",
        "key": "1oh7ia"
      }
    ],
    [
      "path",
      {
        "d": "M18.71 13.96c.19-.63.29-1.29.29-1.96 0-3.87-3.13-7-7-7-.67 0-1.33.1-1.96.29",
        "key": "3qdecy"
      }
    ],
    [
      "line",
      {
        "x1": "2",
        "x2": "22",
        "y1": "2",
        "y2": "22",
        "key": "a6p6uj"
      }
    ]
  ],
  "LockKeyholeOpen": [
    [
      "circle",
      {
        "cx": "12",
        "cy": "16",
        "r": "1",
        "key": "1au0dj"
      }
    ],
    [
      "rect",
      {
        "width": "18",
        "height": "12",
        "x": "3",
        "y": "10",
        "rx": "2",
        "key": "l0tzu3"
      }
    ],
    [
      "path",
      {
        "d": "M7 10V7a5 5 0 0 1 9.33-2.5",
        "key": "car5b7"
      }
    ]
  ],
  "LockKeyhole": [
    [
      "circle",
      {
        "cx": "12",
        "cy": "16",
        "r": "1",
        "key": "1au0dj"
      }
    ],
    [
      "rect",
      {
        "x": "3",
        "y": "10",
        "width": "18",
        "height": "12",
        "rx": "2",
        "key": "6s8ecr"
      }
    ],
    [
      "path",
      {
        "d": "M7 10V7a5 5 0 0 1 10 0v3",
        "key": "1pqi11"
      }
    ]
  ],
  "MailCheck": [
    [
      "path",
      {
        "d": "M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8",
        "key": "12jkf8"
      }
    ],
    [
      "path",
      {
        "d": "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",
        "key": "1ocrg3"
      }
    ],
    [
      "path",
      {
        "d": "m16 19 2 2 4-4",
        "key": "1b14m6"
      }
    ]
  ],
  "MailOpen": [
    [
      "path",
      {
        "d": "M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z",
        "key": "1jhwl8"
      }
    ],
    [
      "path",
      {
        "d": "m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10",
        "key": "1qfld7"
      }
    ]
  ],
  "MailQuestion": [
    [
      "path",
      {
        "d": "M22 10.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12.5",
        "key": "e61zoh"
      }
    ],
    [
      "path",
      {
        "d": "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",
        "key": "1ocrg3"
      }
    ],
    [
      "path",
      {
        "d": "M18 15.28c.2-.4.5-.8.9-1a2.1 2.1 0 0 1 2.6.4c.3.4.5.8.5 1.3 0 1.3-2 2-2 2",
        "key": "7z9rxb"
      }
    ],
    [
      "path",
      {
        "d": "M20 22v.01",
        "key": "12bgn6"
      }
    ]
  ],
  "MailSearch": [
    [
      "path",
      {
        "d": "M22 12.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h7.5",
        "key": "w80f2v"
      }
    ],
    [
      "path",
      {
        "d": "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",
        "key": "1ocrg3"
      }
    ],
    [
      "path",
      {
        "d": "M18 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
        "key": "8lzu5m"
      }
    ],
    [
      "circle",
      {
        "cx": "18",
        "cy": "18",
        "r": "3",
        "key": "1xkwt0"
      }
    ],
    [
      "path",
      {
        "d": "m22 22-1.5-1.5",
        "key": "1x83k4"
      }
    ]
  ],
  "MailWarning": [
    [
      "path",
      {
        "d": "M22 10.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12.5",
        "key": "e61zoh"
      }
    ],
    [
      "path",
      {
        "d": "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",
        "key": "1ocrg3"
      }
    ],
    [
      "path",
      {
        "d": "M20 14v4",
        "key": "1hm744"
      }
    ],
    [
      "path",
      {
        "d": "M20 22v.01",
        "key": "12bgn6"
      }
    ]
  ],
  "MailX": [
    [
      "path",
      {
        "d": "M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h9",
        "key": "1j9vog"
      }
    ],
    [
      "path",
      {
        "d": "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",
        "key": "1ocrg3"
      }
    ],
    [
      "path",
      {
        "d": "m17 17 4 4",
        "key": "1b3523"
      }
    ],
    [
      "path",
      {
        "d": "m21 17-4 4",
        "key": "uinynz"
      }
    ]
  ],
  "MessageCircleOff": [
    [
      "path",
      {
        "d": "M20.5 14.9A9 9 0 0 0 9.1 3.5",
        "key": "1iebmn"
      }
    ],
    [
      "path",
      {
        "d": "m2 2 20 20",
        "key": "1ooewy"
      }
    ],
    [
      "path",
      {
        "d": "M5.6 5.6C3 8.3 2.2 12.5 4 16l-2 6 6-2c3.4 1.8 7.6 1.1 10.3-1.7",
        "key": "1ov8ce"
      }
    ]
  ],
  "MessageCircleQuestion": [
    [
      "path",
      {
        "d": "M7.9 20A9 9 0 1 0 4 16.1L2 22Z",
        "key": "vv11sd"
      }
    ],
    [
      "path",
      {
        "d": "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",
        "key": "1u773s"
      }
    ],
    [
      "path",
      {
        "d": "M12 17h.01",
        "key": "p32p05"
      }
    ]
  ],
  "MessageCircleWarning": [
    [
      "path",
      {
        "d": "M7.9 20A9 9 0 1 0 4 16.1L2 22Z",
        "key": "vv11sd"
      }
    ],
    [
      "path",
      {
        "d": "M12 8v4",
        "key": "1got3b"
      }
    ],
    [
      "path",
      {
        "d": "M12 16h.01",
        "key": "1drbdi"
      }
    ]
  ],
  "MessageCircle": [
    [
      "path",
      {
        "d": "M7.9 20A9 9 0 1 0 4 16.1L2 22Z",
        "key": "vv11sd"
      }
    ]
  ],
  "MessageSquareDot": [
    [
      "path",
      {
        "d": "M11.7 3H5a2 2 0 0 0-2 2v16l4-4h12a2 2 0 0 0 2-2v-2.7",
        "key": "uodpkb"
      }
    ],
    [
      "circle",
      {
        "cx": "18",
        "cy": "6",
        "r": "3",
        "key": "1h7g24"
      }
    ]
  ],
  "MessageSquareWarning": [
    [
      "path",
      {
        "d": "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
        "key": "1lielz"
      }
    ],
    [
      "path",
      {
        "d": "M12 7v2",
        "key": "stiyo7"
      }
    ],
    [
      "path",
      {
        "d": "M12 13h.01",
        "key": "y0uutt"
      }
    ]
  ],
  "MessageSquare": [
    [
      "path",
      {
        "d": "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
        "key": "1lielz"
      }
    ]
  ],
  "MessagesSquare": [
    [
      "path",
      {
        "d": "M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z",
        "key": "p1xzt8"
      }
    ],
    [
      "path",
      {
        "d": "M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1",
        "key": "1cx29u"
      }
    ]
  ],
  "MonitorCheck": [
    [
      "path",
      {
        "d": "m9 10 2 2 4-4",
        "key": "1gnqz4"
      }
    ],
    [
      "rect",
      {
        "width": "20",
        "height": "14",
        "x": "2",
        "y": "3",
        "rx": "2",
        "key": "48i651"
      }
    ],
    [
      "path",
      {
        "d": "M12 17v4",
        "key": "1riwvh"
      }
    ],
    [
      "path",
      {
        "d": "M8 21h8",
        "key": "1ev6f3"
      }
    ]
  ],
  "MonitorOff": [
    [
      "path",
      {
        "d": "M17 17H4a2 2 0 0 1-2-2V5c0-1.5 1-2 1-2",
        "key": "k0q8oc"
      }
    ],
    [
      "path",
      {
        "d": "M22 15V5a2 2 0 0 0-2-2H9",
        "key": "cp1ac0"
      }
    ],
    [
      "path",
      {
        "d": "M8 21h8",
        "key": "1ev6f3"
      }
    ],
    [
      "path",
      {
        "d": "M12 17v4",
        "key": "1riwvh"
      }
    ],
    [
      "path",
      {
        "d": "m2 2 20 20",
        "key": "1ooewy"
      }
    ]
  ],
  "OctagonAlert": [
    [
      "path",
      {
        "d": "M12 16h.01",
        "key": "1drbdi"
      }
    ],
    [
      "path",
      {
        "d": "M12 8v4",
        "key": "1got3b"
      }
    ],
    [
      "path",
      {
        "d": "M15.312 2a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586l-4.688-4.688A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2z",
        "key": "1fd625"
      }
    ]
  ],
  "OctagonX": [
    [
      "path",
      {
        "d": "m15 9-6 6",
        "key": "1uzhvr"
      }
    ],
    [
      "path",
      {
        "d": "M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z",
        "key": "2d38gg"
      }
    ],
    [
      "path",
      {
        "d": "m9 9 6 6",
        "key": "z0biqf"
      }
    ]
  ],
  "PackageCheck": [
    [
      "path",
      {
        "d": "m16 16 2 2 4-4",
        "key": "gfu2re"
      }
    ],
    [
      "path",
      {
        "d": "M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14",
        "key": "e7tb2h"
      }
    ],
    [
      "path",
      {
        "d": "m7.5 4.27 9 5.15",
        "key": "1c824w"
      }
    ],
    [
      "polyline",
      {
        "points": "3.29 7 12 12 20.71 7",
        "key": "ousv84"
      }
    ],
    [
      "line",
      {
        "x1": "12",
        "x2": "12",
        "y1": "22",
        "y2": "12",
        "key": "a4e8g8"
      }
    ]
  ],
  "PackageOpen": [
    [
      "path",
      {
        "d": "M12 22v-9",
        "key": "x3hkom"
      }
    ],
    [
      "path",
      {
        "d": "M15.17 2.21a1.67 1.67 0 0 1 1.63 0L21 4.57a1.93 1.93 0 0 1 0 3.36L8.82 14.79a1.655 1.655 0 0 1-1.64 0L3 12.43a1.93 1.93 0 0 1 0-3.36z",
        "key": "2ntwy6"
      }
    ],
    [
      "path",
      {
        "d": "M20 13v3.87a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13",
        "key": "1pmm1c"
      }
    ],
    [
      "path",
      {
        "d": "M21 12.43a1.93 1.93 0 0 0 0-3.36L8.83 2.2a1.64 1.64 0 0 0-1.63 0L3 4.57a1.93 1.93 0 0 0 0 3.36l12.18 6.86a1.636 1.636 0 0 0 1.63 0z",
        "key": "12ttoo"
      }
    ]
  ],
  "PackagePlus": [
    [
      "path",
      {
        "d": "M16 16h6",
        "key": "100bgy"
      }
    ],
    [
      "path",
      {
        "d": "M19 13v6",
        "key": "85cyf1"
      }
    ],
    [
      "path",
      {
        "d": "M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14",
        "key": "e7tb2h"
      }
    ],
    [
      "path",
      {
        "d": "m7.5 4.27 9 5.15",
        "key": "1c824w"
      }
    ],
    [
      "polyline",
      {
        "points": "3.29 7 12 12 20.71 7",
        "key": "ousv84"
      }
    ],
    [
      "line",
      {
        "x1": "12",
        "x2": "12",
        "y1": "22",
        "y2": "12",
        "key": "a4e8g8"
      }
    ]
  ],
  "PackageSearch": [
    [
      "path",
      {
        "d": "M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14",
        "key": "e7tb2h"
      }
    ],
    [
      "path",
      {
        "d": "m7.5 4.27 9 5.15",
        "key": "1c824w"
      }
    ],
    [
      "polyline",
      {
        "points": "3.29 7 12 12 20.71 7",
        "key": "ousv84"
      }
    ],
    [
      "line",
      {
        "x1": "12",
        "x2": "12",
        "y1": "22",
        "y2": "12",
        "key": "a4e8g8"
      }
    ],
    [
      "circle",
      {
        "cx": "18.5",
        "cy": "15.5",
        "r": "2.5",
        "key": "b5zd12"
      }
    ],
    [
      "path",
      {
        "d": "M20.27 17.27 22 19",
        "key": "1l4muz"
      }
    ]
  ],
  "PackageX": [
    [
      "path",
      {
        "d": "M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14",
        "key": "e7tb2h"
      }
    ],
    [
      "path",
      {
        "d": "m7.5 4.27 9 5.15",
        "key": "1c824w"
      }
    ],
    [
      "polyline",
      {
        "points": "3.29 7 12 12 20.71 7",
        "key": "ousv84"
      }
    ],
    [
      "line",
      {
        "x1": "12",
        "x2": "12",
        "y1": "22",
        "y2": "12",
        "key": "a4e8g8"
      }
    ],
    [
      "path",
      {
        "d": "m17 13 5 5m-5 0 5-5",
        "key": "im3w4b"
      }
    ]
  ],
  "PlugZap": [
    [
      "path",
      {
        "d": "M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z",
        "key": "goz73y"
      }
    ],
    [
      "path",
      {
        "d": "m2 22 3-3",
        "key": "19mgm9"
      }
    ],
    [
      "path",
      {
        "d": "M7.5 13.5 10 11",
        "key": "7xgeeb"
      }
    ],
    [
      "path",
      {
        "d": "M10.5 16.5 13 14",
        "key": "10btkg"
      }
    ],
    [
      "path",
      {
        "d": "m18 3-4 4h6l-4 4",
        "key": "16psg9"
      }
    ]
  ],
  "RouteOff": [
    [
      "circle",
      {
        "cx": "6",
        "cy": "19",
        "r": "3",
        "key": "1kj8tv"
      }
    ],
    [
      "path",
      {
        "d": "M9 19h8.5c.4 0 .9-.1 1.3-.2",
        "key": "1effex"
      }
    ],
    [
      "path",
      {
        "d": "M5.2 5.2A3.5 3.53 0 0 0 6.5 12H12",
        "key": "k9y2ds"
      }
    ],
    [
      "path",
      {
        "d": "m2 2 20 20",
        "key": "1ooewy"
      }
    ],
    [
      "path",
      {
        "d": "M21 15.3a3.5 3.5 0 0 0-3.3-3.3",
        "key": "11nlu2"
      }
    ],
    [
      "path",
      {
        "d": "M15 5h-4.3",
        "key": "6537je"
      }
    ],
    [
      "circle",
      {
        "cx": "18",
        "cy": "5",
        "r": "3",
        "key": "gq8acd"
      }
    ]
  ],
  "Route": [
    [
      "circle",
      {
        "cx": "6",
        "cy": "19",
        "r": "3",
        "key": "1kj8tv"
      }
    ],
    [
      "path",
      {
        "d": "M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15",
        "key": "1d8sl"
      }
    ],
    [
      "circle",
      {
        "cx": "18",
        "cy": "5",
        "r": "3",
        "key": "gq8acd"
      }
    ]
  ],
  "ScanFace": [
    [
      "path",
      {
        "d": "M3 7V5a2 2 0 0 1 2-2h2",
        "key": "aa7l1z"
      }
    ],
    [
      "path",
      {
        "d": "M17 3h2a2 2 0 0 1 2 2v2",
        "key": "4qcy5o"
      }
    ],
    [
      "path",
      {
        "d": "M21 17v2a2 2 0 0 1-2 2h-2",
        "key": "6vwrx8"
      }
    ],
    [
      "path",
      {
        "d": "M7 21H5a2 2 0 0 1-2-2v-2",
        "key": "ioqczr"
      }
    ],
    [
      "path",
      {
        "d": "M8 14s1.5 2 4 2 4-2 4-2",
        "key": "1y1vjs"
      }
    ],
    [
      "path",
      {
        "d": "M9 9h.01",
        "key": "1q5me6"
      }
    ],
    [
      "path",
      {
        "d": "M15 9h.01",
        "key": "x1ddxp"
      }
    ]
  ],
  "ScreenShareOff": [
    [
      "path",
      {
        "d": "M13 3H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3",
        "key": "i8wdob"
      }
    ],
    [
      "path",
      {
        "d": "M8 21h8",
        "key": "1ev6f3"
      }
    ],
    [
      "path",
      {
        "d": "M12 17v4",
        "key": "1riwvh"
      }
    ],
    [
      "path",
      {
        "d": "m22 3-5 5",
        "key": "12jva0"
      }
    ],
    [
      "path",
      {
        "d": "m17 3 5 5",
        "key": "k36vhe"
      }
    ]
  ],
  "ScreenShare": [
    [
      "path",
      {
        "d": "M13 3H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3",
        "key": "i8wdob"
      }
    ],
    [
      "path",
      {
        "d": "M8 21h8",
        "key": "1ev6f3"
      }
    ],
    [
      "path",
      {
        "d": "M12 17v4",
        "key": "1riwvh"
      }
    ],
    [
      "path",
      {
        "d": "m17 8 5-5",
        "key": "fqif7o"
      }
    ],
    [
      "path",
      {
        "d": "M17 3h5v5",
        "key": "1o3tu8"
      }
    ]
  ],
  "ShieldAlert": [
    [
      "path",
      {
        "d": "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
        "key": "oel41y"
      }
    ],
    [
      "path",
      {
        "d": "M12 8v4",
        "key": "1got3b"
      }
    ],
    [
      "path",
      {
        "d": "M12 16h.01",
        "key": "1drbdi"
      }
    ]
  ],
  "ShieldBan": [
    [
      "path",
      {
        "d": "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
        "key": "oel41y"
      }
    ],
    [
      "path",
      {
        "d": "m4.243 5.21 14.39 12.472",
        "key": "1c9a7c"
      }
    ]
  ],
  "ShieldCheck": [
    [
      "path",
      {
        "d": "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
        "key": "oel41y"
      }
    ],
    [
      "path",
      {
        "d": "m9 12 2 2 4-4",
        "key": "dzmm74"
      }
    ]
  ],
  "ShieldEllipsis": [
    [
      "path",
      {
        "d": "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
        "key": "oel41y"
      }
    ],
    [
      "path",
      {
        "d": "M8 12h.01",
        "key": "czm47f"
      }
    ],
    [
      "path",
      {
        "d": "M12 12h.01",
        "key": "1mp3jc"
      }
    ],
    [
      "path",
      {
        "d": "M16 12h.01",
        "key": "1l6xoz"
      }
    ]
  ],
  "ShieldHalf": [
    [
      "path",
      {
        "d": "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
        "key": "oel41y"
      }
    ],
    [
      "path",
      {
        "d": "M12 22V2",
        "key": "zs6s6o"
      }
    ]
  ],
  "ShieldOff": [
    [
      "path",
      {
        "d": "m2 2 20 20",
        "key": "1ooewy"
      }
    ],
    [
      "path",
      {
        "d": "M5 5a1 1 0 0 0-1 1v7c0 5 3.5 7.5 7.67 8.94a1 1 0 0 0 .67.01c2.35-.82 4.48-1.97 5.9-3.71",
        "key": "1jlk70"
      }
    ],
    [
      "path",
      {
        "d": "M9.309 3.652A12.252 12.252 0 0 0 11.24 2.28a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1v7a9.784 9.784 0 0 1-.08 1.264",
        "key": "18rp1v"
      }
    ]
  ],
  "ShieldQuestion": [
    [
      "path",
      {
        "d": "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
        "key": "oel41y"
      }
    ],
    [
      "path",
      {
        "d": "M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3",
        "key": "mhlwft"
      }
    ],
    [
      "path",
      {
        "d": "M12 17h.01",
        "key": "p32p05"
      }
    ]
  ],
  "ShieldX": [
    [
      "path",
      {
        "d": "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
        "key": "oel41y"
      }
    ],
    [
      "path",
      {
        "d": "m14.5 9.5-5 5",
        "key": "17q4r4"
      }
    ],
    [
      "path",
      {
        "d": "m9.5 9.5 5 5",
        "key": "18nt4w"
      }
    ]
  ],
  "ShoppingBasket": [
    [
      "path",
      {
        "d": "m15 11-1 9",
        "key": "5wnq3a"
      }
    ],
    [
      "path",
      {
        "d": "m19 11-4-7",
        "key": "cnml18"
      }
    ],
    [
      "path",
      {
        "d": "M2 11h20",
        "key": "3eubbj"
      }
    ],
    [
      "path",
      {
        "d": "m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4",
        "key": "yiazzp"
      }
    ],
    [
      "path",
      {
        "d": "M4.5 15.5h15",
        "key": "13mye1"
      }
    ],
    [
      "path",
      {
        "d": "m5 11 4-7",
        "key": "116ra9"
      }
    ],
    [
      "path",
      {
        "d": "m9 11 1 9",
        "key": "1ojof7"
      }
    ]
  ],
  "ShoppingCart": [
    [
      "circle",
      {
        "cx": "8",
        "cy": "21",
        "r": "1",
        "key": "jimo8o"
      }
    ],
    [
      "circle",
      {
        "cx": "19",
        "cy": "21",
        "r": "1",
        "key": "13723u"
      }
    ],
    [
      "path",
      {
        "d": "M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",
        "key": "9zh506"
      }
    ]
  ],
  "SignalHigh": [
    [
      "path",
      {
        "d": "M2 20h.01",
        "key": "4haj6o"
      }
    ],
    [
      "path",
      {
        "d": "M7 20v-4",
        "key": "j294jx"
      }
    ],
    [
      "path",
      {
        "d": "M12 20v-8",
        "key": "i3yub9"
      }
    ],
    [
      "path",
      {
        "d": "M17 20V8",
        "key": "1tkaf5"
      }
    ]
  ],
  "SignalZero": [
    [
      "path",
      {
        "d": "M2 20h.01",
        "key": "4haj6o"
      }
    ]
  ],
  "SquareAsterisk": [
    [
      "rect",
      {
        "width": "18",
        "height": "18",
        "x": "3",
        "y": "3",
        "rx": "2",
        "key": "afitv7"
      }
    ],
    [
      "path",
      {
        "d": "M12 8v8",
        "key": "napkw2"
      }
    ],
    [
      "path",
      {
        "d": "m8.5 14 7-4",
        "key": "12hpby"
      }
    ],
    [
      "path",
      {
        "d": "m8.5 10 7 4",
        "key": "wwy2dy"
      }
    ]
  ],
  "SquareCheck": [
    [
      "rect",
      {
        "width": "18",
        "height": "18",
        "x": "3",
        "y": "3",
        "rx": "2",
        "key": "afitv7"
      }
    ],
    [
      "path",
      {
        "d": "m9 12 2 2 4-4",
        "key": "dzmm74"
      }
    ]
  ],
  "SquareDashed": [
    [
      "path",
      {
        "d": "M5 3a2 2 0 0 0-2 2",
        "key": "y57alp"
      }
    ],
    [
      "path",
      {
        "d": "M19 3a2 2 0 0 1 2 2",
        "key": "18rm91"
      }
    ],
    [
      "path",
      {
        "d": "M21 19a2 2 0 0 1-2 2",
        "key": "1j7049"
      }
    ],
    [
      "path",
      {
        "d": "M5 21a2 2 0 0 1-2-2",
        "key": "sbafld"
      }
    ],
    [
      "path",
      {
        "d": "M9 3h1",
        "key": "1yesri"
      }
    ],
    [
      "path",
      {
        "d": "M9 21h1",
        "key": "15o7lz"
      }
    ],
    [
      "path",
      {
        "d": "M14 3h1",
        "key": "1ec4yj"
      }
    ],
    [
      "path",
      {
        "d": "M14 21h1",
        "key": "v9vybs"
      }
    ],
    [
      "path",
      {
        "d": "M3 9v1",
        "key": "1r0deq"
      }
    ],
    [
      "path",
      {
        "d": "M21 9v1",
        "key": "mxsmne"
      }
    ],
    [
      "path",
      {
        "d": "M3 14v1",
        "key": "vnatye"
      }
    ],
    [
      "path",
      {
        "d": "M21 14v1",
        "key": "169vum"
      }
    ]
  ],
  "SquareDot": [
    [
      "rect",
      {
        "width": "18",
        "height": "18",
        "x": "3",
        "y": "3",
        "rx": "2",
        "key": "afitv7"
      }
    ],
    [
      "circle",
      {
        "cx": "12",
        "cy": "12",
        "r": "1",
        "key": "41hilf"
      }
    ]
  ],
  "SquareMenu": [
    [
      "rect",
      {
        "width": "18",
        "height": "18",
        "x": "3",
        "y": "3",
        "rx": "2",
        "key": "afitv7"
      }
    ],
    [
      "path",
      {
        "d": "M7 8h10",
        "key": "1jw688"
      }
    ],
    [
      "path",
      {
        "d": "M7 12h10",
        "key": "b7w52i"
      }
    ],
    [
      "path",
      {
        "d": "M7 16h10",
        "key": "wp8him"
      }
    ]
  ],
  "SquarePen": [
    [
      "path",
      {
        "d": "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",
        "key": "1m0v6g"
      }
    ],
    [
      "path",
      {
        "d": "M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",
        "key": "ohrbg2"
      }
    ]
  ],
  "SquareX": [
    [
      "rect",
      {
        "width": "18",
        "height": "18",
        "x": "3",
        "y": "3",
        "rx": "2",
        "ry": "2",
        "key": "1m3agn"
      }
    ],
    [
      "path",
      {
        "d": "m15 9-6 6",
        "key": "1uzhvr"
      }
    ],
    [
      "path",
      {
        "d": "m9 9 6 6",
        "key": "z0biqf"
      }
    ]
  ],
  "Unplug": [
    [
      "path",
      {
        "d": "m19 5 3-3",
        "key": "yk6iyv"
      }
    ],
    [
      "path",
      {
        "d": "m2 22 3-3",
        "key": "19mgm9"
      }
    ],
    [
      "path",
      {
        "d": "M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z",
        "key": "goz73y"
      }
    ],
    [
      "path",
      {
        "d": "M7.5 13.5 10 11",
        "key": "7xgeeb"
      }
    ],
    [
      "path",
      {
        "d": "M10.5 16.5 13 14",
        "key": "10btkg"
      }
    ],
    [
      "path",
      {
        "d": "m12 6 6 6 2.3-2.3a2.4 2.4 0 0 0 0-3.4l-2.6-2.6a2.4 2.4 0 0 0-3.4 0Z",
        "key": "1snsnr"
      }
    ]
  ],
  "UserCheck": [
    [
      "path",
      {
        "d": "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
        "key": "1yyitq"
      }
    ],
    [
      "circle",
      {
        "cx": "9",
        "cy": "7",
        "r": "4",
        "key": "nufk8"
      }
    ],
    [
      "polyline",
      {
        "points": "16 11 18 13 22 9",
        "key": "1pwet4"
      }
    ]
  ],
  "UserCog": [
    [
      "circle",
      {
        "cx": "18",
        "cy": "15",
        "r": "3",
        "key": "gjjjvw"
      }
    ],
    [
      "circle",
      {
        "cx": "9",
        "cy": "7",
        "r": "4",
        "key": "nufk8"
      }
    ],
    [
      "path",
      {
        "d": "M10 15H6a4 4 0 0 0-4 4v2",
        "key": "1nfge6"
      }
    ],
    [
      "path",
      {
        "d": "m21.7 16.4-.9-.3",
        "key": "12j9ji"
      }
    ],
    [
      "path",
      {
        "d": "m15.2 13.9-.9-.3",
        "key": "1fdjdi"
      }
    ],
    [
      "path",
      {
        "d": "m16.6 18.7.3-.9",
        "key": "heedtr"
      }
    ],
    [
      "path",
      {
        "d": "m19.1 12.2.3-.9",
        "key": "1af3ki"
      }
    ],
    [
      "path",
      {
        "d": "m19.6 18.7-.4-1",
        "key": "1x9vze"
      }
    ],
    [
      "path",
      {
        "d": "m16.8 12.3-.4-1",
        "key": "vqeiwj"
      }
    ],
    [
      "path",
      {
        "d": "m14.3 16.6 1-.4",
        "key": "1qlj63"
      }
    ],
    [
      "path",
      {
        "d": "m20.7 13.8 1-.4",
        "key": "1v5t8k"
      }
    ]
  ],
  "UserPen": [
    [
      "path",
      {
        "d": "M11.5 15H7a4 4 0 0 0-4 4v2",
        "key": "15lzij"
      }
    ],
    [
      "path",
      {
        "d": "M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z",
        "key": "1817ys"
      }
    ],
    [
      "circle",
      {
        "cx": "10",
        "cy": "7",
        "r": "4",
        "key": "e45bow"
      }
    ]
  ],
  "UserRoundCheck": [
    [
      "path",
      {
        "d": "M2 21a8 8 0 0 1 13.292-6",
        "key": "bjp14o"
      }
    ],
    [
      "circle",
      {
        "cx": "10",
        "cy": "8",
        "r": "5",
        "key": "o932ke"
      }
    ],
    [
      "path",
      {
        "d": "m16 19 2 2 4-4",
        "key": "1b14m6"
      }
    ]
  ],
  "UserRoundCog": [
    [
      "path",
      {
        "d": "M2 21a8 8 0 0 1 10.434-7.62",
        "key": "1yezr2"
      }
    ],
    [
      "circle",
      {
        "cx": "10",
        "cy": "8",
        "r": "5",
        "key": "o932ke"
      }
    ],
    [
      "circle",
      {
        "cx": "18",
        "cy": "18",
        "r": "3",
        "key": "1xkwt0"
      }
    ],
    [
      "path",
      {
        "d": "m19.5 14.3-.4.9",
        "key": "1eb35c"
      }
    ],
    [
      "path",
      {
        "d": "m16.9 20.8-.4.9",
        "key": "dfjc4z"
      }
    ],
    [
      "path",
      {
        "d": "m21.7 19.5-.9-.4",
        "key": "q4dx6b"
      }
    ],
    [
      "path",
      {
        "d": "m15.2 16.9-.9-.4",
        "key": "1r0w5f"
      }
    ],
    [
      "path",
      {
        "d": "m21.7 16.5-.9.4",
        "key": "1knoei"
      }
    ],
    [
      "path",
      {
        "d": "m15.2 19.1-.9.4",
        "key": "j188fs"
      }
    ],
    [
      "path",
      {
        "d": "m19.5 21.7-.4-.9",
        "key": "1tonu5"
      }
    ],
    [
      "path",
      {
        "d": "m16.9 15.2-.4-.9",
        "key": "699xu"
      }
    ]
  ],
  "UserRoundPlus": [
    [
      "path",
      {
        "d": "M2 21a8 8 0 0 1 13.292-6",
        "key": "bjp14o"
      }
    ],
    [
      "circle",
      {
        "cx": "10",
        "cy": "8",
        "r": "5",
        "key": "o932ke"
      }
    ],
    [
      "path",
      {
        "d": "M19 16v6",
        "key": "tddt3s"
      }
    ],
    [
      "path",
      {
        "d": "M22 19h-6",
        "key": "vcuq98"
      }
    ]
  ],
  "UserRoundSearch": [
    [
      "circle",
      {
        "cx": "10",
        "cy": "8",
        "r": "5",
        "key": "o932ke"
      }
    ],
    [
      "path",
      {
        "d": "M2 21a8 8 0 0 1 10.434-7.62",
        "key": "1yezr2"
      }
    ],
    [
      "circle",
      {
        "cx": "18",
        "cy": "18",
        "r": "3",
        "key": "1xkwt0"
      }
    ],
    [
      "path",
      {
        "d": "m22 22-1.9-1.9",
        "key": "1e5ubv"
      }
    ]
  ],
  "UserRoundX": [
    [
      "path",
      {
        "d": "M2 21a8 8 0 0 1 11.873-7",
        "key": "74fkxq"
      }
    ],
    [
      "circle",
      {
        "cx": "10",
        "cy": "8",
        "r": "5",
        "key": "o932ke"
      }
    ],
    [
      "path",
      {
        "d": "m17 17 5 5",
        "key": "p7ous7"
      }
    ],
    [
      "path",
      {
        "d": "m22 17-5 5",
        "key": "gqnmv0"
      }
    ]
  ],
  "UserSearch": [
    [
      "circle",
      {
        "cx": "10",
        "cy": "7",
        "r": "4",
        "key": "e45bow"
      }
    ],
    [
      "path",
      {
        "d": "M10.3 15H7a4 4 0 0 0-4 4v2",
        "key": "3bnktk"
      }
    ],
    [
      "circle",
      {
        "cx": "17",
        "cy": "17",
        "r": "3",
        "key": "18b49y"
      }
    ],
    [
      "path",
      {
        "d": "m21 21-1.9-1.9",
        "key": "1g2n9r"
      }
    ]
  ],
  "UserX": [
    [
      "path",
      {
        "d": "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
        "key": "1yyitq"
      }
    ],
    [
      "circle",
      {
        "cx": "9",
        "cy": "7",
        "r": "4",
        "key": "nufk8"
      }
    ],
    [
      "line",
      {
        "x1": "17",
        "x2": "22",
        "y1": "8",
        "y2": "13",
        "key": "3nzzx3"
      }
    ],
    [
      "line",
      {
        "x1": "22",
        "x2": "17",
        "y1": "8",
        "y2": "13",
        "key": "1swrse"
      }
    ]
  ],
  "WalletCards": [
    [
      "rect",
      {
        "width": "18",
        "height": "18",
        "x": "3",
        "y": "3",
        "rx": "2",
        "key": "afitv7"
      }
    ],
    [
      "path",
      {
        "d": "M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2",
        "key": "4125el"
      }
    ],
    [
      "path",
      {
        "d": "M3 11h3c.8 0 1.6.3 2.1.9l1.1.9c1.6 1.6 4.1 1.6 5.7 0l1.1-.9c.5-.5 1.3-.9 2.1-.9H21",
        "key": "1dpki6"
      }
    ]
  ],
  "WifiLow": [
    [
      "path",
      {
        "d": "M12 20h.01",
        "key": "zekei9"
      }
    ],
    [
      "path",
      {
        "d": "M8.5 16.429a5 5 0 0 1 7 0",
        "key": "1bycff"
      }
    ]
  ],
  "WifiZero": [
    [
      "path",
      {
        "d": "M12 20h.01",
        "key": "zekei9"
      }
    ]
  ],
  "Wifi": [
    [
      "path",
      {
        "d": "M12 20h.01",
        "key": "zekei9"
      }
    ],
    [
      "path",
      {
        "d": "M2 8.82a15 15 0 0 1 20 0",
        "key": "dnpr2z"
      }
    ],
    [
      "path",
      {
        "d": "M5 12.859a10 10 0 0 1 14 0",
        "key": "1x1e6c"
      }
    ],
    [
      "path",
      {
        "d": "M8.5 16.429a5 5 0 0 1 7 0",
        "key": "1bycff"
      }
    ]
  ],
  "CircleAlert": [
    ["circle", { "cx": "12", "cy": "12", "r": "10" }],
    ["line", { "x1": "12", "x2": "12", "y1": "8", "y2": "12" }],
    ["line", { "x1": "12", "x2": "12.01", "y1": "16", "y2": "16" }]
  ],
  "CircleDot": [
    ["circle", { "cx": "12", "cy": "12", "r": "10" }],
    ["circle", { "cx": "12", "cy": "12", "r": "1" }]
  ],
  "CirclePlay": [
    ["circle", { "cx": "12", "cy": "12", "r": "10" }],
    ["polygon", { "points": "10 8 16 12 10 16 10 8" }]
  ],
  "CircleStop": [
    ["circle", { "cx": "12", "cy": "12", "r": "10" }],
    ["rect", { "x": "9", "y": "9", "width": "6", "height": "6", "rx": "1" }]
  ],
  "Clock": [
    ["circle", { "cx": "12", "cy": "12", "r": "10" }],
    ["polyline", { "points": "12 6 12 12 16 14" }]
  ],
  "Landmark": [
    ["line", { "x1": "3", "x2": "21", "y1": "22", "y2": "22" }],
    ["line", { "x1": "6", "x2": "6", "y1": "18", "y2": "11" }],
    ["line", { "x1": "10", "x2": "10", "y1": "18", "y2": "11" }],
    ["line", { "x1": "14", "x2": "14", "y1": "18", "y2": "11" }],
    ["line", { "x1": "18", "x2": "18", "y1": "18", "y2": "11" }],
    ["polygon", { "points": "12 2 20 7 4 7" }]
  ],
  "MapPinned": [
    ["path", { "d": "M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 0 1-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0 1 12 0" }],
    ["circle", { "cx": "12", "cy": "8", "r": "2" }],
    ["path", { "d": "M8.714 14h-3.71a1 1 0 0 0-.948.683l-2.004 6A1 1 0 0 0 3 22h18a1 1 0 0 0 .948-1.316l-2-6a1 1 0 0 0-.949-.684h-3.712" }]
  ],
  "Package": [
    ["path", { "d": "M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z" }],
    ["path", { "d": "M12 22V12" }],
    ["path", { "d": "m3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7" }],
    ["path", { "d": "m7.5 4.27 9 5.15" }]
  ],
  "Receipt": [
    ["path", { "d": "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" }],
    ["path", { "d": "M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" }],
    ["path", { "d": "M12 17.5v-11" }]
  ],
  "ShoppingBag": [
    ["path", { "d": "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" }],
    ["path", { "d": "M3 6h18" }],
    ["path", { "d": "M16 10a4 4 0 0 1-8 0" }]
  ],
  "Truck": [
    ["path", { "d": "M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" }],
    ["path", { "d": "M15 18H9" }],
    ["path", { "d": "M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" }],
    ["circle", { "cx": "17", "cy": "18", "r": "2" }],
    ["circle", { "cx": "7", "cy": "18", "r": "2" }]
  ],
  "Wallet": [
    ["path", { "d": "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" }],
    ["path", { "d": "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" }]
  ],
  "Warehouse": [
    ["path", { "d": "M22 8.35V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.35A2 2 0 0 1 3.26 6.5l8-3.2a2 2 0 0 1 1.48 0l8 3.2A2 2 0 0 1 22 8.35Z" }],
    ["path", { "d": "M6 18h12" }],
    ["path", { "d": "M6 14h12" }],
    ["rect", { "width": "12", "height": "12", "x": "6", "y": "10" }]
  ]
}
