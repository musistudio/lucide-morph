import {
  getPresetById,
  morphPresets,
} from "@musistudio/lucide-morph/morph/presets"
import {
  hasLoadingMorph,
  progressToPosition,
  renderMorphIconSvg,
  resolveMorphIconAsset,
  resolveMorphIconState,
  targetPositionForState,
  type MorphIconPreset,
  type MorphIconState,
} from "@musistudio/lucide-morph/runtime/morph"
import type { MorphAsset } from "@musistudio/lucide-morph/morph/types"

export {
  cloneAsset,
  getPresetById,
  morphPresets,
} from "@musistudio/lucide-morph/morph/presets"
export type {
  MorphAsset,
  MorphLayer,
  MorphLayerMode,
  MorphLoadingDesign,
} from "@musistudio/lucide-morph/morph/types"
export type {
  MorphIconPreset,
  MorphIconState,
} from "@musistudio/lucide-morph/runtime/morph"

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3)
}

function numberAttribute(element: HTMLElement, name: string, fallback: number) {
  const value = Number(element.getAttribute(name))
  return Number.isFinite(value) ? value : fallback
}

function canAnimate() {
  return (
    typeof requestAnimationFrame !== "undefined" &&
    typeof cancelAnimationFrame !== "undefined"
  )
}

const BaseHTMLElement =
  typeof HTMLElement === "undefined"
    ? (class {} as typeof HTMLElement)
    : HTMLElement

export class MorphIconElement extends BaseHTMLElement {
  static observedAttributes = [
    "active",
    "color",
    "duration",
    "preset",
    "progress",
    "size",
    "state",
    "stroke-width",
    "title",
  ]

  private animationFrame = 0
  private position = 0

  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" })
    }

    this.position = this.targetPosition()
    this.render()
  }

  attributeChangedCallback() {
    this.animateToTarget()
  }

  disconnectedCallback() {
    if (this.animationFrame) cancelAnimationFrame(this.animationFrame)
  }

  get preset() {
    return this.getAttribute("preset") ?? morphPresets[0].id
  }

  set preset(value: string) {
    this.setAttribute("preset", value)
  }

  get active() {
    return this.hasAttribute("active")
  }

  set active(value: boolean) {
    if (value) {
      this.setAttribute("active", "")
    } else {
      this.removeAttribute("active")
    }
  }

  private asset() {
    return resolveMorphIconAsset(this.preset)
  }

  private resolvedState(asset: MorphAsset) {
    const state = this.getAttribute("state") as MorphIconState | null
    return resolveMorphIconState(asset, state ?? undefined, this.active)
  }

  private targetPosition() {
    const asset = this.asset()
    const progress = this.getAttribute("progress")

    if (progress !== null) {
      return progressToPosition(asset, Number(progress))
    }

    return targetPositionForState(asset, this.resolvedState(asset))
  }

  private animateToTarget() {
    if (!this.isConnected) return
    if (this.animationFrame) cancelAnimationFrame(this.animationFrame)

    const target = this.targetPosition()

    if (this.hasAttribute("progress") || !canAnimate()) {
      this.position = target
      this.render()
      return
    }

    const from = this.position
    const start = typeof performance === "undefined" ? Date.now() : performance.now()
    const duration = Math.max(1, numberAttribute(this, "duration", 420))

    const tick = (time: number) => {
      const elapsed = Math.min(1, (time - start) / duration)
      this.position = from + (target - from) * easeOutCubic(elapsed)
      this.render()

      if (elapsed < 1) {
        this.animationFrame = requestAnimationFrame(tick)
      }
    }

    this.animationFrame = requestAnimationFrame(tick)
  }

  private render() {
    const root = this.shadowRoot
    if (!root) return

    const asset = this.asset()
    const state = this.resolvedState(asset)
    const loading = state === "loading" && hasLoadingMorph(asset)
    const color = this.getAttribute("color") ?? "currentColor"
    const size = numberAttribute(this, "size", 24)
    const strokeWidth = numberAttribute(this, "stroke-width", 2)
    const title = this.getAttribute("title") ?? undefined

    if (title) {
      this.setAttribute("role", "img")
      this.setAttribute("aria-label", title)
      this.removeAttribute("aria-hidden")
    } else {
      this.setAttribute("aria-hidden", "true")
      this.removeAttribute("aria-label")
      this.removeAttribute("role")
    }

    if (loading) {
      this.setAttribute("aria-busy", "true")
    } else {
      this.removeAttribute("aria-busy")
    }

    root.innerHTML = `<style>:host{display:inline-grid;height:${size}px;line-height:0;place-items:center;width:${size}px}</style>${renderMorphIconSvg(
      asset,
      this.position,
      {
        color,
        loading,
        size,
        strokeWidth,
        title,
      },
    )}`
  }
}

export function defineMorphIconElement(tagName = "lucide-morph") {
  if (typeof customElements === "undefined") {
    throw new Error("MorphIconElement can only be registered in a browser.")
  }

  if (!customElements.get(tagName)) {
    customElements.define(tagName, MorphIconElement)
  }

  return tagName
}

export function getMorphIconPreset(id: string) {
  return getPresetById(id)
}
