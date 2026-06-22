import type { EditorSettings, MorphAsset } from "./types"

export type ExportTarget = "react" | "vue" | "web-component"

export const exportTargets: Array<{
  value: ExportTarget
  label: string
  extension: string
}> = [
  { value: "react", label: "React", extension: "tsx" },
  { value: "vue", label: "Vue", extension: "vue" },
  { value: "web-component", label: "Web Component", extension: "ts" },
]

function pascalCase(value: string) {
  const name = value
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("")

  return /^[A-Z]/.test(name) ? name : `Morph${name || "Icon"}`
}

function kebabCase(value: string) {
  const name = value
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase()

  return name.includes("-") ? name : `morph-${name || "icon"}`
}

export function componentNameForAsset(asset: MorphAsset) {
  return `${pascalCase(asset.name)}Icon`
}

export function normalizeComponentName(value: string, asset: MorphAsset) {
  return pascalCase(value || componentNameForAsset(asset))
}

export function extensionForExportTarget(target: ExportTarget) {
  return (
    exportTargets.find((option) => option.value === target)?.extension ?? "tsx"
  )
}

export function generateComponentCode(
  asset: MorphAsset,
  settings: EditorSettings,
  target: ExportTarget,
) {
  switch (target) {
    case "vue":
      return generateVueComponentCode(asset, settings)
    case "web-component":
      return generateWebComponentCode(asset, settings)
    case "react":
    default:
      return generateReactComponentCode(asset, settings)
  }
}

function generateReactComponentCode(asset: MorphAsset, settings: EditorSettings) {
  const componentName = normalizeComponentName(settings.componentName, asset)
  const assetCode = JSON.stringify(asset, null, 2)

  return `import { useEffect, useState } from "react"

type MorphLayer = {
  id: string
  name: string
  from: string
  to: string
  fromOpacity: number
  toOpacity: number
  mode: "stroke" | "fill"
  strokeWidth?: number
}

type MorphAsset = {
  id: string
  name: string
  fromLabel: string
  toLabel: string
  fromIcon?: string
  toIcon?: string
  viewBox: string
  layers: MorphLayer[]
}

const asset: MorphAsset = ${assetCode}

const numberRE = /-?\\d*\\.?\\d+(?:e[-+]?\\d+)?/gi

function extractNumbers(path: string) {
  return path.match(numberRE)?.map(Number) ?? []
}

function createPathInterpolator(from: string, to: string) {
  const fromNumbers = extractNumbers(from)
  const toNumbers = extractNumbers(to)
  const fromTemplate = from.replace(numberRE, "{}")
  const toTemplate = to.replace(numberRE, "{}")

  if (fromTemplate.replace(/\\s+/g, " ").trim() !== toTemplate.replace(/\\s+/g, " ").trim()) {
    throw new Error("Path templates do not match.")
  }

  if (fromNumbers.length !== toNumbers.length) {
    throw new Error("Path number counts do not match.")
  }

  let index = 0

  return (progress: number) => {
    index = 0

    return fromTemplate.replace(/\\{\\}/g, () => {
      const value = fromNumbers[index] + (toNumbers[index] - fromNumbers[index]) * progress
      index += 1
      const rounded = Number(value.toFixed(3))
      return Object.is(rounded, -0) ? "0" : rounded.toString()
    })
  }
}

function easeOutCubic(progress: number) {
  return 1 - Math.pow(1 - progress, 3)
}

function useAnimatedProgress(active: boolean, duration: number) {
  const [progress, setProgress] = useState(active ? 1 : 0)

  useEffect(() => {
    const from = progress
    const to = active ? 1 : 0
    const start = performance.now()
    let frame = 0

    const tick = (now: number) => {
      const elapsed = Math.min(1, (now - start) / duration)
      const next = from + (to - from) * easeOutCubic(elapsed)
      setProgress(next)

      if (elapsed < 1) {
        frame = requestAnimationFrame(tick)
      }
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [active, duration])

  return progress
}

export function ${componentName}({
  active,
  size = 24,
  color = "currentColor",
  strokeWidth = ${settings.strokeWidth},
  duration = ${settings.duration},
  title,
}: {
  active: boolean
  size?: number
  color?: string
  strokeWidth?: number
  duration?: number
  title?: string
}) {
  const progress = useAnimatedProgress(active, duration)

  return (
    <svg
      viewBox={asset.viewBox}
      width={size}
      height={size}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      style={{ color, overflow: "visible" }}
    >
      {asset.layers.map((layer) => {
        const d = createPathInterpolator(layer.from, layer.to)(progress)
        const opacity = layer.fromOpacity + (layer.toOpacity - layer.fromOpacity) * progress
        const width = layer.strokeWidth ?? strokeWidth

        if (layer.mode === "fill") {
          return <path key={layer.id} d={d} opacity={opacity} fill="currentColor" />
        }

        return (
          <path
            key={layer.id}
            d={d}
            opacity={opacity}
            fill="none"
            stroke="currentColor"
            strokeWidth={width}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )
      })}
    </svg>
  )
}
`
}

function generateVueComponentCode(asset: MorphAsset, settings: EditorSettings) {
  const assetCode = JSON.stringify(asset, null, 2)

  return `<template>
  <svg
    :viewBox="asset.viewBox"
    :width="props.size"
    :height="props.size"
    :role="props.title ? 'img' : 'presentation'"
    :aria-hidden="props.title ? undefined : 'true'"
    :aria-label="props.title"
    :style="{ color: props.color, overflow: 'visible' }"
  >
    <path
      v-for="layer in asset.layers"
      :key="layer.id"
      :d="layerPath(layer)"
      :opacity="layerOpacity(layer)"
      :fill="layer.mode === 'fill' ? 'currentColor' : 'none'"
      :stroke="layer.mode === 'stroke' ? 'currentColor' : undefined"
      :stroke-width="layer.mode === 'stroke' ? layerStrokeWidth(layer) : undefined"
      :stroke-linecap="layer.mode === 'stroke' ? 'round' : undefined"
      :stroke-linejoin="layer.mode === 'stroke' ? 'round' : undefined"
    />
  </svg>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from "vue"

type MorphLayer = {
  id: string
  name: string
  from: string
  to: string
  fromOpacity: number
  toOpacity: number
  mode: "stroke" | "fill"
  strokeWidth?: number
}

type MorphAsset = {
  id: string
  name: string
  fromLabel: string
  toLabel: string
  fromIcon?: string
  toIcon?: string
  viewBox: string
  layers: MorphLayer[]
}

const asset: MorphAsset = ${assetCode}

const props = withDefaults(
  defineProps<{
    active: boolean
    size?: number
    color?: string
    strokeWidth?: number
    duration?: number
    title?: string
  }>(),
  {
    size: 24,
    color: "currentColor",
    strokeWidth: ${settings.strokeWidth},
    duration: ${settings.duration},
  },
)

const numberRE = /-?\\d*\\.?\\d+(?:e[-+]?\\d+)?/gi
const progress = ref(props.active ? 1 : 0)
let frame = 0

function extractNumbers(path: string) {
  return path.match(numberRE)?.map(Number) ?? []
}

function createPathInterpolator(from: string, to: string) {
  const fromNumbers = extractNumbers(from)
  const toNumbers = extractNumbers(to)
  const fromTemplate = from.replace(numberRE, "{}")
  const toTemplate = to.replace(numberRE, "{}")

  if (fromTemplate.replace(/\\s+/g, " ").trim() !== toTemplate.replace(/\\s+/g, " ").trim()) {
    throw new Error("Path templates do not match.")
  }

  if (fromNumbers.length !== toNumbers.length) {
    throw new Error("Path number counts do not match.")
  }

  let index = 0

  return (value: number) => {
    index = 0

    return fromTemplate.replace(/\\{\\}/g, () => {
      const next = fromNumbers[index] + (toNumbers[index] - fromNumbers[index]) * value
      index += 1
      const rounded = Number(next.toFixed(3))
      return Object.is(rounded, -0) ? "0" : rounded.toString()
    })
  }
}

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3)
}

function animateTo(to: number) {
  cancelAnimationFrame(frame)

  const from = progress.value
  const start = performance.now()
  const duration = Math.max(1, props.duration)

  const tick = (now: number) => {
    const elapsed = Math.min(1, (now - start) / duration)
    progress.value = from + (to - from) * easeOutCubic(elapsed)

    if (elapsed < 1) {
      frame = requestAnimationFrame(tick)
    }
  }

  frame = requestAnimationFrame(tick)
}

function layerPath(layer: MorphLayer) {
  return createPathInterpolator(layer.from, layer.to)(progress.value)
}

function layerOpacity(layer: MorphLayer) {
  return layer.fromOpacity + (layer.toOpacity - layer.fromOpacity) * progress.value
}

function layerStrokeWidth(layer: MorphLayer) {
  return layer.strokeWidth ?? props.strokeWidth
}

watch(
  () => [props.active, props.duration] as const,
  ([active]) => animateTo(active ? 1 : 0),
  { immediate: true },
)

onBeforeUnmount(() => cancelAnimationFrame(frame))
</script>
`
}

function generateWebComponentCode(asset: MorphAsset, settings: EditorSettings) {
  const componentName = normalizeComponentName(settings.componentName, asset)
  const className = `${componentName}Element`
  const tagName = kebabCase(componentName)
  const assetCode = JSON.stringify(asset, null, 2)

  return `type MorphLayer = {
  id: string
  name: string
  from: string
  to: string
  fromOpacity: number
  toOpacity: number
  mode: "stroke" | "fill"
  strokeWidth?: number
}

type MorphAsset = {
  id: string
  name: string
  fromLabel: string
  toLabel: string
  fromIcon?: string
  toIcon?: string
  viewBox: string
  layers: MorphLayer[]
}

const asset: MorphAsset = ${assetCode}
const svgNS = "http://www.w3.org/2000/svg"
const numberRE = /-?\\d*\\.?\\d+(?:e[-+]?\\d+)?/gi

function extractNumbers(path: string) {
  return path.match(numberRE)?.map(Number) ?? []
}

function createPathInterpolator(from: string, to: string) {
  const fromNumbers = extractNumbers(from)
  const toNumbers = extractNumbers(to)
  const fromTemplate = from.replace(numberRE, "{}")
  const toTemplate = to.replace(numberRE, "{}")

  if (fromTemplate.replace(/\\s+/g, " ").trim() !== toTemplate.replace(/\\s+/g, " ").trim()) {
    throw new Error("Path templates do not match.")
  }

  if (fromNumbers.length !== toNumbers.length) {
    throw new Error("Path number counts do not match.")
  }

  let index = 0

  return (progress: number) => {
    index = 0

    return fromTemplate.replace(/\\{\\}/g, () => {
      const value = fromNumbers[index] + (toNumbers[index] - fromNumbers[index]) * progress
      index += 1
      const rounded = Number(value.toFixed(3))
      return Object.is(rounded, -0) ? "0" : rounded.toString()
    })
  }
}

function easeOutCubic(progress: number) {
  return 1 - Math.pow(1 - progress, 3)
}

export class ${className} extends HTMLElement {
  static observedAttributes = [
    "active",
    "size",
    "color",
    "stroke-width",
    "duration",
    "title",
  ]

  private frame = 0
  private progress = 0
  private root: ShadowRoot | null = null

  connectedCallback() {
    if (!this.root) {
      this.root = this.attachShadow({ mode: "open" })
    }

    this.progress = this.active ? 1 : 0
    this.render()
  }

  disconnectedCallback() {
    cancelAnimationFrame(this.frame)
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue === newValue || !this.root) return

    if (name === "active" || name === "duration") {
      this.animateTo(this.active ? 1 : 0)
      return
    }

    this.render()
  }

  get active() {
    return this.hasAttribute("active") && this.getAttribute("active") !== "false"
  }

  set active(value: boolean) {
    if (value) {
      this.setAttribute("active", "")
    } else {
      this.removeAttribute("active")
    }
  }

  get size() {
    const value = Number(this.getAttribute("size"))
    return Number.isFinite(value) && value > 0 ? value : 24
  }

  get color() {
    return this.getAttribute("color") || "currentColor"
  }

  get strokeWidth() {
    const value = Number(this.getAttribute("stroke-width"))
    return Number.isFinite(value) && value > 0 ? value : ${settings.strokeWidth}
  }

  get duration() {
    const value = Number(this.getAttribute("duration"))
    return Number.isFinite(value) && value > 0 ? value : ${settings.duration}
  }

  get titleText() {
    return this.getAttribute("title") || ""
  }

  private animateTo(to: number) {
    cancelAnimationFrame(this.frame)

    const from = this.progress
    const start = performance.now()
    const duration = Math.max(1, this.duration)

    const tick = (now: number) => {
      const elapsed = Math.min(1, (now - start) / duration)
      this.progress = from + (to - from) * easeOutCubic(elapsed)
      this.renderPaths()

      if (elapsed < 1) {
        this.frame = requestAnimationFrame(tick)
      }
    }

    this.frame = requestAnimationFrame(tick)
  }

  private render() {
    if (!this.root) return

    this.root.innerHTML = "<style>:host{display:inline-block;line-height:0}svg{display:block;overflow:visible}</style>"

    const svg = document.createElementNS(svgNS, "svg")
    svg.setAttribute("viewBox", asset.viewBox)
    svg.setAttribute("width", String(this.size))
    svg.setAttribute("height", String(this.size))
    svg.setAttribute("role", this.titleText ? "img" : "presentation")
    svg.style.color = this.color

    if (this.titleText) {
      svg.setAttribute("aria-label", this.titleText)
    } else {
      svg.setAttribute("aria-hidden", "true")
    }

    this.root.append(svg)
    this.renderPaths()
  }

  private renderPaths() {
    const svg = this.root?.querySelector("svg")
    if (!svg) return

    while (svg.firstChild) {
      svg.removeChild(svg.firstChild)
    }

    for (const layer of asset.layers) {
      const path = document.createElementNS(svgNS, "path")
      const d = createPathInterpolator(layer.from, layer.to)(this.progress)
      const opacity = layer.fromOpacity + (layer.toOpacity - layer.fromOpacity) * this.progress

      path.setAttribute("d", d)
      path.setAttribute("opacity", String(opacity))

      if (layer.mode === "fill") {
        path.setAttribute("fill", "currentColor")
      } else {
        path.setAttribute("fill", "none")
        path.setAttribute("stroke", "currentColor")
        path.setAttribute("stroke-width", String(layer.strokeWidth ?? this.strokeWidth))
        path.setAttribute("stroke-linecap", "round")
        path.setAttribute("stroke-linejoin", "round")
      }

      svg.append(path)
    }
  }
}

if (!customElements.get("${tagName}")) {
  customElements.define("${tagName}", ${className})
}
`
}
