import {
  computed,
  defineComponent,
  h,
  onBeforeUnmount,
  ref,
  watch,
} from "vue"
import type { Component } from "vue"
import { getPresetById, morphPresets } from "@musistudio/lucide-morph/morph/presets"
import type { MorphAsset } from "@musistudio/lucide-morph/morph/types"
import {
  getMorphIconFrames,
  getViewBoxCenter,
  hasLoadingMorph,
  progressToPosition,
  resolveMorphIconAsset,
  resolveMorphIconState,
  targetPositionForState,
  type MorphIconPreset,
  type MorphIconState,
} from "@musistudio/lucide-morph/runtime/morph"

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

type MorphIconVueProps = {
  active?: boolean
  asset?: MorphAsset
  color?: string
  duration?: number
  preset?: MorphIconPreset
  progress?: number
  size?: number
  state?: MorphIconState
  strokeWidth?: number
  title?: string
}

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3)
}

function now() {
  return typeof performance === "undefined" ? Date.now() : performance.now()
}

function canAnimate() {
  return (
    typeof requestAnimationFrame !== "undefined" &&
    typeof cancelAnimationFrame !== "undefined"
  )
}

export const MorphIcon = defineComponent({
  name: "MorphIcon",
  props: {
    active: { type: Boolean, default: false },
    asset: { type: Object, default: undefined },
    color: { type: String, default: "currentColor" },
    duration: { type: Number, default: 420 },
    preset: { type: [String, Object], default: undefined },
    progress: { type: Number, default: undefined },
    size: { type: Number, default: 24 },
    state: { type: String, default: undefined },
    strokeWidth: { type: Number, default: 2 },
    title: { type: String, default: undefined },
  },
  setup(props: MorphIconVueProps) {
    const resolvedAsset = computed(() =>
      resolveMorphIconAsset(props.preset, props.asset),
    )
    const resolvedState = computed(() =>
      resolveMorphIconState(resolvedAsset.value, props.state, props.active),
    )
    const targetPosition = computed(() =>
      props.progress === undefined
        ? targetPositionForState(resolvedAsset.value, resolvedState.value)
        : progressToPosition(resolvedAsset.value, props.progress),
    )
    const position = ref(targetPosition.value)
    let frame = 0

    function animateToTarget() {
      if (frame) cancelAnimationFrame(frame)

      if (props.progress !== undefined || !canAnimate()) {
        position.value = targetPosition.value
        return
      }

      const from = position.value
      const to = targetPosition.value
      const start = now()
      const duration = Math.max(1, props.duration ?? 420)

      const tick = (time: number) => {
        const elapsed = Math.min(1, (time - start) / duration)
        position.value = from + (to - from) * easeOutCubic(elapsed)

        if (elapsed < 1) {
          frame = requestAnimationFrame(tick)
        }
      }

      frame = requestAnimationFrame(tick)
    }

    watch(
      () => [
        resolvedAsset.value.id,
        resolvedState.value,
        props.progress,
        props.duration,
      ],
      animateToTarget,
      { immediate: true },
    )

    onBeforeUnmount(() => {
      if (frame) cancelAnimationFrame(frame)
    })

    return () => {
      const asset = resolvedAsset.value
      const loading = resolvedState.value === "loading" && hasLoadingMorph(asset)
      const center = asset.loading?.rotationCenter ?? getViewBoxCenter(asset.viewBox)
      const frames = getMorphIconFrames(asset, position.value)
      const paths = frames.map((frameItem) => {
        if (frameItem.mode === "fill" && !asset.strokeLocked) {
          return h("path", {
            d: frameItem.d,
            fill: "currentColor",
            key: frameItem.id,
            opacity: frameItem.opacity,
          })
        }

        return h("path", {
          d: frameItem.d,
          fill: "none",
          key: frameItem.id,
          opacity: frameItem.opacity,
          stroke: "currentColor",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: props.strokeWidth ?? 2,
        })
      })

      return h(
        "span",
        {
          "aria-busy": loading || undefined,
          "aria-hidden": props.title ? undefined : true,
          "aria-label": props.title,
          role: props.title ? "img" : "presentation",
          style: {
            color: props.color ?? "currentColor",
            display: "inline-grid",
            height: `${props.size ?? 24}px`,
            lineHeight: 0,
            placeItems: "center",
            width: `${props.size ?? 24}px`,
          },
        },
        [
          h(
            "svg",
            {
              "aria-hidden": "true",
              height: props.size ?? 24,
              style: {
                display: "block",
                gridArea: "1 / 1",
                overflow: "visible",
              },
              viewBox: asset.viewBox,
              width: props.size ?? 24,
            },
            [
              h(
                "g",
                null,
                [
                  loading && asset.loading
                    ? h("animateTransform", {
                        attributeName: "transform",
                        dur: `${asset.loading.rotationDuration}ms`,
                        from: `0 ${center.x} ${center.y}`,
                        repeatCount: "indefinite",
                        to: `${
                          asset.loading.rotationDirection ===
                          "counterclockwise"
                            ? -360
                            : 360
                        } ${center.x} ${center.y}`,
                        type: "rotate",
                      })
                    : undefined,
                  ...paths,
                ].filter(Boolean),
              ),
            ],
          ),
        ],
      )
    }
  },
}) as Component

export function getMorphIconPreset(id: string) {
  return getPresetById(id)
}

export default MorphIcon
