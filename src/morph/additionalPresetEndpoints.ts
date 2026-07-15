import { additionalPresetDefinitions } from "./additionalPresetDefinitions"
import { additionalPresetDesigns } from "./additionalPresetDesigns"
import {
  additionalPresetIconNodes,
  type LucideIconNode,
} from "./additionalPresetIconNodes"
import {
  collapsedLucidePath,
  lucideCircle,
  lucideLine,
  lucidePath,
  lucideRoundedRect,
} from "./lucideGeometry"
import type { MorphAsset, MorphLayer } from "./types"

const additionalPresetDefinitionById = new Map(
  additionalPresetDefinitions.map((definition) => [definition.id, definition]),
)

function numberAttribute(
  attributes: Record<string, string>,
  name: string,
  fallback = 0,
) {
  const value = Number(attributes[name])
  return Number.isFinite(value) ? value : fallback
}

function polylinePath(points: string) {
  const values = points.trim().split(/[\s,]+/).map(Number)
  if (values.length < 4 || values.length % 2 !== 0) {
    throw new Error(`Invalid Lucide polyline: ${points}`)
  }

  const commands = [`M${values[0]} ${values[1]}`]
  for (let index = 2; index < values.length; index += 2) {
    commands.push(`L${values[index]} ${values[index + 1]}`)
  }
  return lucidePath(commands.join(" "))
}

function polygonPath(points: string) {
  const values = points.trim().split(/[\s,]+/).map(Number)
  if (values.length < 6 || values.length % 2 !== 0) {
    throw new Error(`Invalid Lucide polygon: ${points}`)
  }

  const commands = [`M${values[0]} ${values[1]}`]
  for (let index = 2; index < values.length; index += 2) {
    commands.push(`L${values[index]} ${values[index + 1]}`)
  }
  commands.push("Z")
  return lucidePath(commands.join(" "))
}

function nodePath([tag, attributes]: LucideIconNode) {
  if (tag === "path") return lucidePath(attributes.d)
  if (tag === "line") {
    return lucideLine(
      numberAttribute(attributes, "x1"),
      numberAttribute(attributes, "y1"),
      numberAttribute(attributes, "x2"),
      numberAttribute(attributes, "y2"),
    )
  }
  if (tag === "circle") {
    return lucideCircle(
      numberAttribute(attributes, "cx"),
      numberAttribute(attributes, "cy"),
      numberAttribute(attributes, "r"),
    )
  }
  if (tag === "rect") {
    return lucideRoundedRect(
      numberAttribute(attributes, "x"),
      numberAttribute(attributes, "y"),
      numberAttribute(attributes, "width"),
      numberAttribute(attributes, "height"),
      numberAttribute(attributes, "rx"),
      numberAttribute(attributes, "ry", numberAttribute(attributes, "rx")),
    )
  }
  if (tag === "polyline") return polylinePath(attributes.points)
  if (tag === "polygon") return polygonPath(attributes.points)

  throw new Error(`Unsupported Lucide node for preset endpoints: ${tag}`)
}

// A single Lucide path node can contain more than one M command. Splitting the
// serialized result keeps every morph layer to one subpath, so unrelated icon
// details can safely appear or retreat without breaking path normalization.
function iconPaths(iconName: string) {
  const nodes = additionalPresetIconNodes[iconName]
  if (!nodes) throw new Error(`Missing Lucide source geometry for ${iconName}.`)

  return nodes.flatMap((node) => {
    const path = nodePath(node)
    return path.match(/M[^M]+/g) ?? []
  })
}

function startPoint(path: string | undefined) {
  const match = path?.match(/^M(-?\d*\.?\d+(?:e[-+]?\d+)?)\s+(-?\d*\.?\d+(?:e[-+]?\d+)?)/i)
  if (!match) return { x: 12, y: 12 }
  return { x: Number(match[1]), y: Number(match[2]) }
}

function validatePathCoverage(
  presetId: string,
  side: "from" | "to",
  pathCount: number,
  indexes: Array<number | null>,
) {
  const used = indexes.filter((index): index is number => index !== null)
  const unique = new Set(used)
  if (unique.size !== used.length) {
    throw new Error(`${presetId} reuses a ${side} path in its manual design.`)
  }

  const expected = Array.from({ length: pathCount }, (_, index) => index)
  const missing = expected.filter((index) => !unique.has(index))
  const outOfRange = used.filter((index) => index < 0 || index >= pathCount)
  if (missing.length > 0 || outOfRange.length > 0) {
    throw new Error(
      `${presetId} has incomplete ${side} path coverage ` +
        `(missing: ${missing.join(",") || "none"}; invalid: ${
          outOfRange.join(",") || "none"
        }).`,
    )
  }
}

function layerName(id: string) {
  return id
    .split("-")
    .map((part) => part[0]?.toUpperCase() + part.slice(1))
    .join(" ")
}

export function buildAdditionalPresetEndpointLayers(
  asset: MorphAsset,
): MorphLayer[] | undefined {
  const definition = additionalPresetDefinitionById.get(asset.id)
  if (!definition) return undefined
  if (!asset.fromIcon || !asset.toIcon) {
    throw new Error(`Additional preset ${asset.id} requires two Lucide icons.`)
  }

  const design = additionalPresetDesigns[asset.id]
  if (!design) {
    throw new Error(`Missing manual endpoint design for ${asset.id}.`)
  }
  if (
    asset.fromIcon !== definition.fromIcon ||
    asset.toIcon !== definition.toIcon
  ) {
    throw new Error(`Manual endpoint icons do not match ${asset.id}.`)
  }

  const fromPaths = iconPaths(asset.fromIcon)
  const toPaths = iconPaths(asset.toIcon)
  const layerIds = new Set(design.layers.map((manualLayer) => manualLayer.id))
  if (layerIds.size !== design.layers.length) {
    throw new Error(`Manual endpoint design for ${asset.id} has duplicate layers.`)
  }

  validatePathCoverage(
    asset.id,
    "from",
    fromPaths.length,
    design.layers.map((manualLayer) => manualLayer.from),
  )
  validatePathCoverage(
    asset.id,
    "to",
    toPaths.length,
    design.layers.map((manualLayer) => manualLayer.to),
  )

  return design.layers.map((manualLayer) => {
    const from =
      manualLayer.from === null ? undefined : fromPaths[manualLayer.from]
    const to = manualLayer.to === null ? undefined : toPaths[manualLayer.to]
    const fromPoint = startPoint(from ?? to)
    const toPoint = startPoint(to ?? from)

    return {
      id: manualLayer.id,
      name: layerName(manualLayer.id),
      from: from ?? collapsedLucidePath(fromPoint.x, fromPoint.y),
      to: to ?? collapsedLucidePath(toPoint.x, toPoint.y),
      fromOpacity: from ? 1 : 0,
      toOpacity: to ? 1 : 0,
      mode: "stroke",
    }
  })
}
