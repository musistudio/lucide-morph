export type MorphLayerMode = "stroke" | "fill"

export type MorphLayer = {
  id: string
  name: string
  from: string
  to: string
  fromOpacity: number
  toOpacity: number
  mode: MorphLayerMode
  strokeWidth?: number
}

export type MorphAsset = {
  id: string
  name: string
  fromLabel: string
  toLabel: string
  fromIcon?: string
  toIcon?: string
  viewBox: string
  layers: MorphLayer[]
}

export type EditorSettings = {
  componentName: string
  color: string
  duration: number
  size: number
  strokeWidth: number
  showOnion: boolean
}
