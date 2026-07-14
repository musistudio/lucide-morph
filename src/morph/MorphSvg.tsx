import type { MorphAsset, MorphLayer } from "./types"
import { interpolateOpacity, interpolatePath } from "./path"

type MorphSegment = "direct" | "from-loading" | "loading-to"

type MorphSvgProps = {
  asset: MorphAsset
  progress: number
  size: number
  color: string
  strokeWidth: number
  showOnion: boolean
  segment?: MorphSegment
  loadingActive?: boolean
}

function layerForSegment(layer: MorphLayer, segment: MorphSegment): MorphLayer {
  if (!layer.loading || layer.loadingOpacity === undefined || segment === "direct") {
    return layer
  }

  if (segment === "from-loading") {
    return {
      ...layer,
      to: layer.loading,
      toOpacity: layer.loadingOpacity,
    }
  }

  return {
    ...layer,
    from: layer.loading,
    fromOpacity: layer.loadingOpacity,
  }
}

function LayerPath({
  layer,
  progress,
  strokeWidth,
  segment,
  strokeLocked,
}: {
  layer: MorphLayer
  progress: number
  strokeWidth: number
  segment: MorphSegment
  strokeLocked: boolean
}) {
  const activeLayer = layerForSegment(layer, segment)
  const d = interpolatePath(activeLayer, progress)
  const opacity = interpolateOpacity(activeLayer, progress)
  if (layer.mode === "fill" && !strokeLocked) {
    return <path d={d} opacity={opacity} fill="currentColor" />
  }

  return (
    <path
      d={d}
      opacity={opacity}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
  )
}

function OnionLayer({
  asset,
  progress,
  strokeWidth,
}: {
  asset: MorphAsset
  progress: number
  strokeWidth: number
}) {
  return (
    <g opacity={progress === 0 ? 0.16 : 0.11}>
      {asset.layers.map((layer) => (
        <LayerPath
          key={`${layer.id}-${progress}`}
          layer={layer}
          progress={progress}
          strokeWidth={strokeWidth}
          segment="direct"
          strokeLocked={Boolean(asset.strokeLocked)}
        />
      ))}
    </g>
  )
}

export function MorphSvg({
  asset,
  progress,
  size,
  color,
  strokeWidth,
  showOnion,
  segment = "direct",
  loadingActive = false,
}: MorphSvgProps) {
  const loadingDuration = asset.loading?.rotationDuration ?? 900
  const loadingDirection =
    asset.loading?.rotationDirection === "counterclockwise" ? "reverse" : "normal"

  return (
    <svg
      viewBox={asset.viewBox}
      width={size}
      height={size}
      aria-label={`${asset.fromLabel} to ${asset.toLabel} preview`}
      role="img"
      style={{ color }}
      className="max-h-full max-w-full overflow-visible"
    >
      {showOnion && (
        <>
          <OnionLayer asset={asset} progress={0} strokeWidth={strokeWidth} />
          <OnionLayer asset={asset} progress={1} strokeWidth={strokeWidth} />
        </>
      )}
      <g
        className={loadingActive ? "morph-loading-design" : undefined}
        style={
          loadingActive
            ? {
                animationDirection: loadingDirection,
                animationDuration: `${loadingDuration}ms`,
                transformBox: "view-box",
                transformOrigin: "center",
              }
            : undefined
        }
      >
        {asset.layers.map((layer) => (
          <LayerPath
            key={layer.id}
            layer={layer}
            progress={progress}
            strokeWidth={strokeWidth}
            segment={segment}
            strokeLocked={Boolean(asset.strokeLocked)}
          />
        ))}
      </g>
    </svg>
  )
}
