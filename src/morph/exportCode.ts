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
  loading?: string
  to: string
  fromOpacity: number
  loadingOpacity?: number
  toOpacity: number
  mode: "stroke" | "fill"
}

type MorphLoadingDesign = {
  enabled: boolean
  label: string
  rotationCenter?: { x: number; y: number }
  rotationDirection: "clockwise" | "counterclockwise"
  rotationDuration: number
}

type MorphAsset = {
  id: string
  name: string
  fromLabel: string
  toLabel: string
  fromIcon?: string
  toIcon?: string
  viewBox: string
  strokeLocked?: boolean
  loading?: MorphLoadingDesign
  layers: MorphLayer[]
}

type MorphState = "from" | "loading" | "to"

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

function useAnimatedProgress(state: MorphState, duration: number) {
  const [progress, setProgress] = useState(state === "to" ? 1 : 0)

  useEffect(() => {
    if (state === "loading") return

    const from = progress
    const to = state === "to" ? 1 : 0
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
  }, [state, duration])

  return progress
}

function useAnimatedStatePosition(state: MorphState, duration: number) {
  const statePosition = state === "from" ? 0 : state === "loading" ? 1 : 2
  const [position, setPosition] = useState(statePosition)

  useEffect(() => {
    const from = position
    const to = state === "from" ? 0 : state === "loading" ? 1 : 2
    const start = performance.now()
    let frame = 0

    const tick = (now: number) => {
      const elapsed = Math.min(1, (now - start) / duration)
      setPosition(from + (to - from) * easeOutCubic(elapsed))

      if (elapsed < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [state, duration])

  return position
}

function layerFrame(layer: MorphLayer, position: number) {
  if (!layer.loading || layer.loadingOpacity === undefined) {
    const progress = Math.min(1, Math.max(0, position / 2))
    return {
      d: createPathInterpolator(layer.from, layer.to)(progress),
      opacity:
        layer.fromOpacity + (layer.toOpacity - layer.fromOpacity) * progress,
    }
  }

  const entering = position <= 1
  const progress = entering ? Math.max(0, position) : Math.min(1, position - 1)
  const from = entering ? layer.from : layer.loading
  const to = entering ? layer.loading : layer.to
  const fromOpacity = entering ? layer.fromOpacity : layer.loadingOpacity
  const toOpacity = entering ? layer.loadingOpacity : layer.toOpacity

  return {
    d: createPathInterpolator(from, to)(progress),
    opacity: fromOpacity + (toOpacity - fromOpacity) * progress,
  }
}

export function ${componentName}({
  active = false,
  state,
  size = 24,
  color = "currentColor",
  strokeWidth = ${settings.strokeWidth},
  duration = ${settings.duration},
  title,
}: {
  active?: boolean
  state?: MorphState
  size?: number
  color?: string
  strokeWidth?: number
  duration?: number
  title?: string
}) {
  const hasLoadingMorph = Boolean(
    asset.loading &&
      asset.layers.every(
        (layer) => layer.loading && layer.loadingOpacity !== undefined,
      ),
  )
  const requestedState = state ?? (active ? "to" : "from")
  const resolvedState =
    requestedState === "loading" && !hasLoadingMorph ? "from" : requestedState
  const progress = useAnimatedProgress(resolvedState, duration)
  const position = useAnimatedStatePosition(resolvedState, duration)
  const loading = resolvedState === "loading"
  const loadingCenter = asset.loading?.rotationCenter ?? { x: 12, y: 12 }

  return (
    <span
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      aria-busy={loading}
      style={{
        color,
        display: "inline-grid",
        height: size,
        lineHeight: 0,
        placeItems: "center",
        position: "relative",
        width: size,
      }}
    >
      <svg
        aria-hidden="true"
        viewBox={asset.viewBox}
        width={size}
        height={size}
        style={{
          gridArea: "1 / 1",
          overflow: "visible",
        }}
      >
        <g>
          {loading && hasLoadingMorph && asset.loading && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              from={"0 " + loadingCenter.x + " " + loadingCenter.y}
              to={
                (asset.loading.rotationDirection === "counterclockwise"
                  ? "-360 "
                  : "360 ") +
                loadingCenter.x +
                " " +
                loadingCenter.y
              }
              dur={asset.loading.rotationDuration + "ms"}
              repeatCount="indefinite"
            />
          )}
          {asset.layers.map((layer) => {
            const frame = hasLoadingMorph
              ? layerFrame(layer, position)
              : {
                  d: createPathInterpolator(layer.from, layer.to)(progress),
                  opacity:
                    layer.fromOpacity +
                    (layer.toOpacity - layer.fromOpacity) * progress,
                }
            if (layer.mode === "fill" && !asset.strokeLocked) {
              return (
                <path
                  key={layer.id}
                  d={frame.d}
                  opacity={frame.opacity}
                  fill="currentColor"
                />
              )
            }

            return (
              <path
                key={layer.id}
                d={frame.d}
                opacity={frame.opacity}
                fill="none"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )
          })}
        </g>
      </svg>
    </span>
  )
}
`
}

function generateVueComponentCode(asset: MorphAsset, settings: EditorSettings) {
  const assetCode = JSON.stringify(asset, null, 2)

  return `<template>
  <span
    :role="props.title ? 'img' : 'presentation'"
    :aria-hidden="props.title ? undefined : 'true'"
    :aria-label="props.title"
    :aria-busy="loading"
    :style="{
      color: props.color,
      display: 'inline-grid',
      height: props.size + 'px',
      lineHeight: 0,
      placeItems: 'center',
      position: 'relative',
      width: props.size + 'px',
    }"
  >
    <svg
      aria-hidden="true"
      :viewBox="asset.viewBox"
      :width="props.size"
      :height="props.size"
      :style="{
        gridArea: '1 / 1',
        overflow: 'visible',
      }"
    >
      <g>
        <animateTransform
          v-if="loading && hasLoadingMorph && asset.loading"
          attributeName="transform"
          type="rotate"
          :from="'0 ' + loadingCenter.x + ' ' + loadingCenter.y"
          :to="(asset.loading.rotationDirection === 'counterclockwise' ? '-360 ' : '360 ') + loadingCenter.x + ' ' + loadingCenter.y"
          :dur="asset.loading.rotationDuration + 'ms'"
          repeatCount="indefinite"
        />
        <path
          v-for="layer in asset.layers"
          :key="layer.id"
          :d="layerPath(layer)"
          :opacity="layerOpacity(layer)"
          :fill="layer.mode === 'fill' && !asset.strokeLocked ? 'currentColor' : 'none'"
          :stroke="layer.mode === 'stroke' || asset.strokeLocked ? 'currentColor' : undefined"
          :stroke-width="layer.mode === 'stroke' || asset.strokeLocked ? props.strokeWidth : undefined"
          :stroke-linecap="layer.mode === 'stroke' || asset.strokeLocked ? 'round' : undefined"
          :stroke-linejoin="layer.mode === 'stroke' || asset.strokeLocked ? 'round' : undefined"
        />
      </g>
    </svg>
  </span>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from "vue"

type MorphLayer = {
  id: string
  name: string
  from: string
  loading?: string
  to: string
  fromOpacity: number
  loadingOpacity?: number
  toOpacity: number
  mode: "stroke" | "fill"
}

type MorphLoadingDesign = {
  enabled: boolean
  label: string
  rotationCenter?: { x: number; y: number }
  rotationDirection: "clockwise" | "counterclockwise"
  rotationDuration: number
}

type MorphAsset = {
  id: string
  name: string
  fromLabel: string
  toLabel: string
  fromIcon?: string
  toIcon?: string
  viewBox: string
  strokeLocked?: boolean
  loading?: MorphLoadingDesign
  layers: MorphLayer[]
}

type MorphState = "from" | "loading" | "to"

const asset: MorphAsset = ${assetCode}
const loadingCenter = asset.loading?.rotationCenter ?? { x: 12, y: 12 }

const props = withDefaults(
  defineProps<{
    active?: boolean
    state?: MorphState
    size?: number
    color?: string
    strokeWidth?: number
    duration?: number
    title?: string
  }>(),
  {
    active: false,
    size: 24,
    color: "currentColor",
    strokeWidth: ${settings.strokeWidth},
    duration: ${settings.duration},
  },
)

const numberRE = /-?\\d*\\.?\\d+(?:e[-+]?\\d+)?/gi
const hasLoadingMorph = Boolean(
  asset.loading &&
    asset.layers.every(
      (layer) => layer.loading && layer.loadingOpacity !== undefined,
    ),
)
const resolvedState = computed<MorphState>(
  () => {
    const requested = props.state ?? (props.active ? "to" : "from")
    return requested === "loading" && !hasLoadingMorph ? "from" : requested
  },
)
const loading = computed(() => resolvedState.value === "loading")
const progress = ref(resolvedState.value === "to" ? 1 : 0)
const position = ref(
  resolvedState.value === "from" ? 0 : resolvedState.value === "loading" ? 1 : 2,
)
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

function animateToState(state: MorphState) {
  cancelAnimationFrame(frame)

  const fromProgress = progress.value
  const toProgress = state === "to" ? 1 : state === "from" ? 0 : fromProgress
  const fromPosition = position.value
  const toPosition = state === "from" ? 0 : state === "loading" ? 1 : 2
  const start = performance.now()
  const duration = Math.max(1, props.duration)

  const tick = (now: number) => {
    const elapsed = Math.min(1, (now - start) / duration)
    const eased = easeOutCubic(elapsed)
    progress.value = fromProgress + (toProgress - fromProgress) * eased
    position.value = fromPosition + (toPosition - fromPosition) * eased

    if (elapsed < 1) {
      frame = requestAnimationFrame(tick)
    }
  }

  frame = requestAnimationFrame(tick)
}

function layerFrame(layer: MorphLayer) {
  if (!hasLoadingMorph || !layer.loading || layer.loadingOpacity === undefined) {
    return {
      d: createPathInterpolator(layer.from, layer.to)(progress.value),
      opacity:
        layer.fromOpacity +
        (layer.toOpacity - layer.fromOpacity) * progress.value,
    }
  }

  const entering = position.value <= 1
  const segmentProgress = entering
    ? Math.max(0, position.value)
    : Math.min(1, position.value - 1)
  const from = entering ? layer.from : layer.loading
  const to = entering ? layer.loading : layer.to
  const fromOpacity = entering ? layer.fromOpacity : layer.loadingOpacity
  const toOpacity = entering ? layer.loadingOpacity : layer.toOpacity

  return {
    d: createPathInterpolator(from, to)(segmentProgress),
    opacity: fromOpacity + (toOpacity - fromOpacity) * segmentProgress,
  }
}

function layerPath(layer: MorphLayer) {
  return layerFrame(layer).d
}

function layerOpacity(layer: MorphLayer) {
  return layerFrame(layer).opacity
}

watch(
  () => [resolvedState.value, props.duration] as const,
  ([state]) => animateToState(state),
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
  loading?: string
  to: string
  fromOpacity: number
  loadingOpacity?: number
  toOpacity: number
  mode: "stroke" | "fill"
}

type MorphLoadingDesign = {
  enabled: boolean
  label: string
  rotationCenter?: { x: number; y: number }
  rotationDirection: "clockwise" | "counterclockwise"
  rotationDuration: number
}

type MorphAsset = {
  id: string
  name: string
  fromLabel: string
  toLabel: string
  fromIcon?: string
  toIcon?: string
  viewBox: string
  strokeLocked?: boolean
  loading?: MorphLoadingDesign
  layers: MorphLayer[]
}

type MorphState = "from" | "loading" | "to"

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
    "state",
    "size",
    "color",
    "stroke-width",
    "duration",
    "title",
  ]

  private frame = 0
  private progress = 0
  private position = 0
  private root: ShadowRoot | null = null

  connectedCallback() {
    if (!this.root) {
      this.root = this.attachShadow({ mode: "open" })
    }

    this.progress = this.state === "to" ? 1 : 0
    this.position = this.state === "from" ? 0 : this.state === "loading" ? 1 : 2
    this.render()
  }

  disconnectedCallback() {
    cancelAnimationFrame(this.frame)
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue === newValue || !this.root) return

    if (name === "active" || name === "state" || name === "duration") {
      this.renderVisualState()
      this.animateTo(this.state)
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

  get state(): MorphState {
    const value = this.getAttribute("state")
    if (value === "loading" && !this.hasLoadingMorph) return "from"
    if (value === "from" || value === "loading" || value === "to") return value
    return this.active ? "to" : "from"
  }

  set state(value: MorphState) {
    this.setAttribute("state", value)
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

  get hasLoadingMorph() {
    return Boolean(
      asset.loading &&
        asset.layers.every(
          (layer) => layer.loading && layer.loadingOpacity !== undefined,
        ),
    )
  }

  private animateTo(state: MorphState) {
    cancelAnimationFrame(this.frame)

    const fromProgress = this.progress
    const toProgress =
      state === "to" ? 1 : state === "from" ? 0 : fromProgress
    const fromPosition = this.position
    const toPosition = state === "from" ? 0 : state === "loading" ? 1 : 2
    const start = performance.now()
    const duration = Math.max(1, this.duration)

    const tick = (now: number) => {
      const elapsed = Math.min(1, (now - start) / duration)
      const eased = easeOutCubic(elapsed)
      this.progress = fromProgress + (toProgress - fromProgress) * eased
      this.position = fromPosition + (toPosition - fromPosition) * eased
      this.renderPaths()

      if (elapsed < 1) {
        this.frame = requestAnimationFrame(tick)
      }
    }

    this.frame = requestAnimationFrame(tick)
  }

  private render() {
    if (!this.root) return

    this.root.innerHTML = "<style>:host{display:inline-block;line-height:0}.frame{display:inline-grid;place-items:center;position:relative;line-height:0}.morph{grid-area:1/1}.morph-layers.morph-loading{animation:morph-loading-spin var(--loading-duration) linear infinite;transform-box:view-box;transform-origin:var(--loading-origin)}@keyframes morph-loading-spin{to{transform:rotate(360deg)}}svg{display:block;overflow:visible}</style>"

    const frame = document.createElement("span")
    frame.className = "frame"
    frame.style.color = this.color
    frame.style.width = this.size + "px"
    frame.style.height = this.size + "px"
    frame.setAttribute("role", this.titleText ? "img" : "presentation")

    if (this.titleText) {
      frame.setAttribute("aria-label", this.titleText)
    } else {
      frame.setAttribute("aria-hidden", "true")
    }

    const svg = document.createElementNS(svgNS, "svg")
    svg.classList.add("morph")
    svg.setAttribute("viewBox", asset.viewBox)
    svg.setAttribute("width", String(this.size))
    svg.setAttribute("height", String(this.size))
    svg.setAttribute("aria-hidden", "true")

    const morphLayers = document.createElementNS(svgNS, "g")
    morphLayers.classList.add("morph-layers")
    svg.append(morphLayers)

    frame.append(svg)
    this.root.append(frame)
    this.renderVisualState()
    this.renderPaths()
  }

  private renderVisualState() {
    const frame = this.root?.querySelector<HTMLElement>(".frame")
    const morphLayers = this.root?.querySelector<SVGGElement>(".morph-layers")
    if (!frame || !morphLayers) return

    const loading = this.state === "loading"
    frame.style.setProperty(
      "--loading-duration",
      (asset.loading?.rotationDuration ?? 900) + "ms",
    )
    const loadingCenter = asset.loading?.rotationCenter ?? { x: 12, y: 12 }
    frame.style.setProperty(
      "--loading-origin",
      loadingCenter.x + "px " + loadingCenter.y + "px",
    )
    frame.setAttribute("aria-busy", String(loading))
    morphLayers.classList.toggle("morph-loading", loading && this.hasLoadingMorph)
    morphLayers.style.animationDirection =
      asset.loading?.rotationDirection === "counterclockwise"
        ? "reverse"
        : "normal"
  }

  private renderPaths() {
    const morphLayers = this.root?.querySelector(".morph-layers")
    if (!morphLayers) return

    while (morphLayers.firstChild) {
      morphLayers.removeChild(morphLayers.firstChild)
    }

    for (const layer of asset.layers) {
      const path = document.createElementNS(svgNS, "path")
      const hasLayerLoading =
        this.hasLoadingMorph &&
        layer.loading !== undefined &&
        layer.loadingOpacity !== undefined
      const entering = this.position <= 1
      const segmentProgress = entering
        ? Math.max(0, this.position)
        : Math.min(1, this.position - 1)
      const from = hasLayerLoading
        ? entering
          ? layer.from
          : layer.loading!
        : layer.from
      const to = hasLayerLoading
        ? entering
          ? layer.loading!
          : layer.to
        : layer.to
      const progress = hasLayerLoading ? segmentProgress : this.progress
      const fromOpacity = hasLayerLoading
        ? entering
          ? layer.fromOpacity
          : layer.loadingOpacity!
        : layer.fromOpacity
      const toOpacity = hasLayerLoading
        ? entering
          ? layer.loadingOpacity!
          : layer.toOpacity
        : layer.toOpacity
      const d = createPathInterpolator(from, to)(progress)
      const opacity = fromOpacity + (toOpacity - fromOpacity) * progress

      path.setAttribute("d", d)
      path.setAttribute("opacity", String(opacity))

      if (layer.mode === "fill" && !asset.strokeLocked) {
        path.setAttribute("fill", "currentColor")
      } else {
        path.setAttribute("fill", "none")
        path.setAttribute("stroke", "currentColor")
        path.setAttribute("stroke-width", String(this.strokeWidth))
        path.setAttribute("stroke-linecap", "round")
        path.setAttribute("stroke-linejoin", "round")
      }

      morphLayers.append(path)
    }
  }
}

if (!customElements.get("${tagName}")) {
  customElements.define("${tagName}", ${className})
}
`
}
