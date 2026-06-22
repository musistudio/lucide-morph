import type { MorphAsset } from "./types"

export const morphPresets: MorphAsset[] = [
  {
    id: "menu-x",
    name: "Menu to X",
    fromLabel: "Menu",
    toLabel: "Close",
    fromIcon: "Menu",
    toIcon: "X",
    viewBox: "0 0 24 24",
    layers: [
      {
        id: "menu-top",
        name: "Top rail",
        from: "M4 6 L20 6",
        to: "M6 6 L18 18",
        fromOpacity: 1,
        toOpacity: 1,
        mode: "stroke",
      },
      {
        id: "menu-middle",
        name: "Middle rail",
        from: "M4 12 L20 12",
        to: "M12 12 L12 12",
        fromOpacity: 1,
        toOpacity: 0,
        mode: "stroke",
      },
      {
        id: "menu-bottom",
        name: "Bottom rail",
        from: "M4 18 L20 18",
        to: "M18 6 L6 18",
        fromOpacity: 1,
        toOpacity: 1,
        mode: "stroke",
      },
    ],
  },
  {
    id: "play-pause",
    name: "Play to Pause",
    fromLabel: "Play",
    toLabel: "Pause",
    fromIcon: "Play",
    toIcon: "Pause",
    viewBox: "0 0 24 24",
    layers: [
      {
        id: "play-left",
        name: "Left shape",
        from: "M6 4 L12 8 L12 16 L6 20 Z",
        to: "M6 4 L10 4 L10 20 L6 20 Z",
        fromOpacity: 1,
        toOpacity: 1,
        mode: "fill",
      },
      {
        id: "play-right",
        name: "Right shape",
        from: "M12 8 L20 12 L12 16 L12 8 Z",
        to: "M14 4 L18 4 L18 20 L14 20 Z",
        fromOpacity: 1,
        toOpacity: 1,
        mode: "fill",
      },
    ],
  },
  {
    id: "plus-check",
    name: "Plus to Check",
    fromLabel: "Add",
    toLabel: "Done",
    fromIcon: "Plus",
    toIcon: "Check",
    viewBox: "0 0 24 24",
    layers: [
      {
        id: "plus-horizontal",
        name: "Short arm",
        from: "M5 12 L19 12",
        to: "M4 13 L9 18",
        fromOpacity: 1,
        toOpacity: 1,
        mode: "stroke",
      },
      {
        id: "plus-vertical",
        name: "Long arm",
        from: "M12 5 L12 19",
        to: "M9 18 L20 7",
        fromOpacity: 1,
        toOpacity: 1,
        mode: "stroke",
      },
    ],
  },
  {
    id: "arrow-down-up",
    name: "Arrow Down to Up",
    fromLabel: "Download",
    toLabel: "Upload",
    fromIcon: "ArrowDown",
    toIcon: "ArrowUp",
    viewBox: "0 0 24 24",
    layers: [
      {
        id: "arrow-shaft",
        name: "Shaft",
        from: "M12 5 L12 19",
        to: "M12 19 L12 5",
        fromOpacity: 1,
        toOpacity: 1,
        mode: "stroke",
      },
      {
        id: "arrow-left",
        name: "Left wing",
        from: "M5 12 L12 19",
        to: "M5 12 L12 5",
        fromOpacity: 1,
        toOpacity: 1,
        mode: "stroke",
      },
      {
        id: "arrow-right",
        name: "Right wing",
        from: "M19 12 L12 19",
        to: "M19 12 L12 5",
        fromOpacity: 1,
        toOpacity: 1,
        mode: "stroke",
      },
    ],
  },
]

export function cloneAsset(asset: MorphAsset): MorphAsset {
  return JSON.parse(JSON.stringify(asset)) as MorphAsset
}

export function getPresetById(id: string) {
  return morphPresets.find((preset) => preset.id === id) ?? morphPresets[0]
}
