import type { MorphAsset, MorphLayer } from "./types"
import { interpolateOpacity, interpolatePath } from "./path"

type MorphSvgProps = {
  asset: MorphAsset
  progress: number
  size: number
  color: string
  strokeWidth: number
  showOnion: boolean
}

function LayerPath({
  layer,
  progress,
  strokeWidth,
}: {
  layer: MorphLayer
  progress: number
  strokeWidth: number
}) {
  const d = interpolatePath(layer, progress)
  const opacity = interpolateOpacity(layer, progress)
  const width = layer.strokeWidth ?? strokeWidth

  if (layer.mode === "fill") {
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
      strokeWidth={width}
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
}: MorphSvgProps) {
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
      <g>
        {asset.layers.map((layer) => (
          <LayerPath
            key={layer.id}
            layer={layer}
            progress={progress}
            strokeWidth={strokeWidth}
          />
        ))}
      </g>
    </svg>
  )
}
