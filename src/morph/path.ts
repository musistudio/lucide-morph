import type { MorphAsset, MorphLayer } from "./types"

const numberRE = /-?\d*\.?\d+(?:e[-+]?\d+)?/gi

export type PathValidation =
  | {
      ok: true
      template: string
      numberCount: number
    }
  | {
      ok: false
      reason: string
      fromTemplate?: string
      toTemplate?: string
      fromCount?: number
      toCount?: number
    }

function normalizeTemplate(template: string) {
  return template.replace(/\s+/g, " ").trim()
}

export function getPathTemplate(path: string) {
  return path.replace(numberRE, "{}")
}

export function extractPathNumbers(path: string) {
  return path.match(numberRE)?.map(Number) ?? []
}

export function validatePathPair(from: string, to: string): PathValidation {
  if (!from.trim() || !to.trim()) {
    return { ok: false, reason: "Both path fields are required." }
  }

  const fromNumbers = extractPathNumbers(from)
  const toNumbers = extractPathNumbers(to)
  const fromTemplate = normalizeTemplate(getPathTemplate(from))
  const toTemplate = normalizeTemplate(getPathTemplate(to))

  if (fromTemplate !== toTemplate) {
    return {
      ok: false,
      reason: "Command templates do not match.",
      fromTemplate,
      toTemplate,
      fromCount: fromNumbers.length,
      toCount: toNumbers.length,
    }
  }

  if (fromNumbers.length !== toNumbers.length) {
    return {
      ok: false,
      reason: "Number counts do not match.",
      fromTemplate,
      toTemplate,
      fromCount: fromNumbers.length,
      toCount: toNumbers.length,
    }
  }

  return {
    ok: true,
    template: fromTemplate,
    numberCount: fromNumbers.length,
  }
}

function formatNumber(value: number) {
  const rounded = Number(value.toFixed(3))
  return Object.is(rounded, -0) ? "0" : rounded.toString()
}

export function createPathInterpolator(from: string, to: string) {
  const validation = validatePathPair(from, to)

  if (!validation.ok) {
    throw new Error(validation.reason)
  }

  const fromNumbers = extractPathNumbers(from)
  const toNumbers = extractPathNumbers(to)
  const template = getPathTemplate(from)
  let index = 0

  return (progress: number) => {
    index = 0

    return template.replace(/\{\}/g, () => {
      const value =
        fromNumbers[index] + (toNumbers[index] - fromNumbers[index]) * progress
      index += 1
      return formatNumber(value)
    })
  }
}

export function interpolatePath(layer: MorphLayer, progress: number) {
  try {
    return createPathInterpolator(layer.from, layer.to)(progress)
  } catch {
    return progress < 0.5 ? layer.from : layer.to
  }
}

export function interpolateOpacity(layer: MorphLayer, progress: number) {
  return layer.fromOpacity + (layer.toOpacity - layer.fromOpacity) * progress
}

export function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value))
}

export function getAssetDiagnostics(asset: MorphAsset) {
  const layers = asset.layers.map((layer) => ({
    id: layer.id,
    result: validatePathPair(layer.from, layer.to),
  }))
  const errors = layers.filter((layer) => !layer.result.ok).length

  return {
    layers,
    errors,
    valid: errors === 0,
  }
}
