import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type CSSProperties,
  type ReactNode,
} from "react"
import {
  Check,
  Copy,
  icons as lucideIcons,
  Layers3,
  Pause,
  Play,
  Search,
  Upload,
  X,
  type LucideIcon,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import {
  componentNameForAsset,
  exportTargets,
  generateNpmReactUsageCode,
  generateNpmUsageCode,
  npmPackageNames,
  type ExportTarget,
} from "@/morph/exportCode"
import { MorphSvg } from "@/morph/MorphSvg"
import { cloneAsset, getPresetById, morphPresets } from "@/morph/presets"
import { clamp } from "@/morph/path"
import type { EditorSettings, MorphAsset } from "@/morph/types"

const defaultAnimationDuration = 420
const animationDurationMin = 120
const animationDurationMax = 1600
const animationDurationStep = 20
const defaultLoadingDuration = 3000
const loadingDurationMin = 500
const loadingDurationMax = 10000
const loadingDurationStep = 100

const npmInstallCommands: Record<ExportTarget, string> = {
  react: `npm install ${npmPackageNames.react}`,
  vue: `npm install ${npmPackageNames.vue}`,
  "web-component": `npm install ${npmPackageNames["web-component"]}`,
}

const defaultSettings: EditorSettings = {
  componentName: "MenuToXIcon",
  color: "#232323",
  duration: defaultAnimationDuration,
  loadingDuration: defaultLoadingDuration,
  loadingEnabled: true,
  size: 180,
  strokeWidth: 2,
  showOnion: false,
}

function normalizeDuration(value: number) {
  if (!Number.isFinite(value)) return defaultAnimationDuration

  return (
    Math.round(
      clamp(value, animationDurationMin, animationDurationMax) / animationDurationStep,
    ) * animationDurationStep
  )
}

function normalizeLoadingDuration(value: number) {
  if (!Number.isFinite(value)) return defaultLoadingDuration

  return (
    Math.round(
      clamp(value, loadingDurationMin, loadingDurationMax) / loadingDurationStep,
    ) * loadingDurationStep
  )
}

type IconPickTarget = "from" | "to"
type PreviewMode = "morph" | "lucide"
type AsyncPreviewPhase =
  | "from"
  | "entering-loading"
  | "loading"
  | "exiting-loading"
  | "to"
type UploadedSvg = {
  name: string
  markup: string
}

const allLucideIconNames = Object.keys(lucideIcons)
  .filter((name) => /^[A-Z]/.test(name))
  .sort((first, second) => first.localeCompare(second))

const lucideIconNameSet = new Set(allLucideIconNames)

function splitIconName(name: string) {
  return name
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/(\d+)/g, " $1 ")
    .replace(/\s+/g, " ")
    .trim()
}

function normalizeSearch(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "")
}

function toKebab(value: string) {
  return splitIconName(value).toLowerCase().replace(/\s+/g, "-")
}

function labelFromFileName(name: string) {
  return (
    name
      .replace(/\.[^.]+$/, "")
      .replace(/[-_]+/g, " ")
      .replace(/\s+/g, " ")
      .trim() || "Uploaded SVG"
  )
}

function sanitizeSvgMarkup(markup: string) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(markup, "image/svg+xml")
  const svg = doc.documentElement

  if (doc.querySelector("parsererror") || svg.nodeName.toLowerCase() !== "svg") {
    throw new Error("Upload a valid SVG file.")
  }

  svg
    .querySelectorAll("script, foreignObject, iframe, object, embed")
    .forEach((node) => node.remove())

  svg.querySelectorAll("*").forEach((element) => {
    Array.from(element.attributes).forEach((attribute) => {
      const name = attribute.name.toLowerCase()
      const value = attribute.value.trim().toLowerCase()

      if (
        name.startsWith("on") ||
        name === "style" ||
        ((name === "href" || name.endsWith(":href")) && !value.startsWith("#"))
      ) {
        element.removeAttribute(attribute.name)
      }
    })
  })

  if (!svg.getAttribute("viewBox")) {
    const width = Number.parseFloat(svg.getAttribute("width") || "24")
    const height = Number.parseFloat(svg.getAttribute("height") || "24")
    svg.setAttribute(
      "viewBox",
      `0 0 ${Number.isFinite(width) && width > 0 ? width : 24} ${
        Number.isFinite(height) && height > 0 ? height : 24
      }`,
    )
  }

  svg.removeAttribute("width")
  svg.removeAttribute("height")

  return new XMLSerializer().serializeToString(svg)
}

async function writeClipboardText(text: string) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text)
      return
    } catch {
      // Fall through to the selection-based copy path.
    }
  }

  const textarea = document.createElement("textarea")
  const selection = document.getSelection()
  const selectedRange =
    selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null

  textarea.value = text
  textarea.setAttribute("readonly", "true")
  textarea.style.position = "fixed"
  textarea.style.left = "-9999px"
  textarea.style.top = "0"
  document.body.append(textarea)
  textarea.select()

  const copied = document.execCommand("copy")
  textarea.remove()

  selection?.removeAllRanges()
  if (selectedRange) {
    selection?.addRange(selectedRange)
  }

  if (!copied) {
    throw new Error("Copy failed.")
  }
}

function getLucideIcon(name: string | undefined) {
  if (!name) return undefined
  return lucideIcons[name as keyof typeof lucideIcons] as LucideIcon | undefined
}

function iconNameToLabel(name: string | undefined, fallback: string) {
  return name && lucideIconNameSet.has(name) ? splitIconName(name) : fallback
}

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3)
}

function strokeWidthForScale(strokeWidth: number, scale: number) {
  return strokeWidth / Math.max(scale, 0.001)
}

function Field({
  label,
  children,
  className,
}: {
  label: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label>{label}</Label>
      {children}
    </div>
  )
}

function LucideIconPreview({
  name,
  svgMarkup,
  color,
  size = 24,
  strokeWidth = 2,
  className,
}: {
  name?: string
  svgMarkup?: string
  color: string
  size?: number
  strokeWidth?: number
  className?: string
}) {
  const Icon = getLucideIcon(name)

  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center text-zinc-950",
        className,
      )}
      style={{ color }}
    >
      {svgMarkup ? (
        <span
          className="grid h-full w-full place-items-center [&>svg]:max-h-full [&>svg]:max-w-full"
          dangerouslySetInnerHTML={{ __html: svgMarkup }}
        />
      ) : Icon ? (
        <Icon aria-hidden="true" size={size} strokeWidth={strokeWidth} />
      ) : (
        <span className="h-5 w-5 rounded-md border border-dashed border-zinc-300" />
      )}
    </span>
  )
}

function IconReferenceCard({
  target,
  active,
  name,
  svgMarkup,
  label,
  color,
  onClick,
}: {
  target: IconPickTarget
  active: boolean
  name?: string
  svgMarkup?: string
  label: string
  color: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex min-w-0 items-center gap-3 rounded-md border bg-white p-3 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#FF5B00]/30",
        active
          ? "border-[#FF5B00] bg-[#FF5B00]/5"
          : "border-zinc-200 hover:border-zinc-300",
      )}
    >
      <LucideIconPreview
        name={name}
        svgMarkup={svgMarkup}
        color={color}
        size={28}
        className="h-10 w-10 rounded-md border border-zinc-200 bg-zinc-50"
      />
      <span className="min-w-0">
        <span className="block text-xs font-medium uppercase text-zinc-400">
          {target}
        </span>
        <span className="block truncate text-sm font-medium text-zinc-950">
          {label}
        </span>
      </span>
    </button>
  )
}

function LucideIconGrid({
  iconNames,
  selectedName,
  color,
  onPick,
}: {
  iconNames: string[]
  selectedName?: string
  color: string
  onPick: (name: string) => void
}) {
  if (iconNames.length === 0) {
    return (
      <div className="grid min-h-24 flex-1 place-items-center rounded-md border border-zinc-200 bg-white text-sm text-zinc-500">
        No icons
      </div>
    )
  }

  return (
    <div className="code-scroll grid min-h-0 flex-1 auto-rows-[5rem] grid-cols-3 gap-2 overflow-auto pr-1 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4">
      {iconNames.map((name) => {
        const Icon = getLucideIcon(name)
        const active = name === selectedName
        const label = splitIconName(name)

        return (
          <button
            key={name}
            type="button"
            title={label}
            aria-label={`Select ${label}`}
            onClick={() => onPick(name)}
            className={cn(
              "grid min-h-20 place-items-center gap-1 rounded-md border bg-white px-2 py-2 text-center text-xs outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#FF5B00]/30",
              active
                ? "border-[#FF5B00] bg-[#FF5B00]/5 text-[#9A3412]"
                : "border-zinc-200 text-zinc-500 hover:border-zinc-300 hover:text-zinc-950",
            )}
          >
            {Icon && (
              <Icon
                aria-hidden="true"
                size={22}
                strokeWidth={2}
                style={{ color }}
              />
            )}
            <span className="line-clamp-2 max-w-full break-words leading-4">
              {label}
            </span>
          </button>
        )
      })}
    </div>
  )
}

function LucideTransitionPreview({
  fromIcon,
  toIcon,
  progress,
  size,
  color,
  strokeWidth,
}: {
  fromIcon?: string
  toIcon?: string
  progress: number
  size: number
  color: string
  strokeWidth: number
}) {
  const FromIcon = getLucideIcon(fromIcon)
  const ToIcon = getLucideIcon(toIcon)
  const fromOpacity = clamp(1 - progress * 1.25)
  const toOpacity = clamp((progress - 0.2) / 0.8)
  const fromScale = 1 - progress * 0.14
  const toScale = 0.86 + progress * 0.14

  return (
    <div
      aria-label={`${iconNameToLabel(fromIcon, "From")} to ${iconNameToLabel(
        toIcon,
        "To",
      )} lucide preview`}
      role="img"
      className="grid max-h-full max-w-full place-items-center"
      style={{ color, height: size, width: size }}
    >
      {FromIcon && (
        <FromIcon
          aria-hidden="true"
          size={size}
          strokeWidth={strokeWidthForScale(strokeWidth, fromScale)}
          className="col-start-1 row-start-1 transition-none"
          style={{
            opacity: fromOpacity,
            transform: `scale(${fromScale}) rotate(${progress * 8}deg)`,
            transformOrigin: "center",
          }}
        />
      )}
      {ToIcon && (
        <ToIcon
          aria-hidden="true"
          size={size}
          strokeWidth={strokeWidthForScale(strokeWidth, toScale)}
          className="col-start-1 row-start-1 transition-none"
          style={{
            opacity: toOpacity,
            transform: `scale(${toScale}) rotate(${(1 - progress) * -8}deg)`,
            transformOrigin: "center",
          }}
        />
      )}
    </div>
  )
}

function asyncPhaseLabel(phase: AsyncPreviewPhase) {
  switch (phase) {
    case "entering-loading":
      return "Entering loading"
    case "loading":
      return "Loading"
    case "exiting-loading":
      return "Completing"
    case "to":
      return "Complete"
    case "from":
    default:
      return "Ready"
  }
}

function StageReferenceStrip({
  asset,
  fromSvgMarkup,
  toSvgMarkup,
  color,
  strokeWidth,
}: {
  asset: MorphAsset
  fromSvgMarkup?: string
  toSvgMarkup?: string
  color: string
  strokeWidth: number
}) {
  return (
    <div className="absolute right-16 top-4 hidden gap-2 sm:flex">
      <div className="flex items-center gap-2 rounded-md border border-zinc-200 bg-white/85 px-2 py-1.5 text-xs text-zinc-500 backdrop-blur">
        <LucideIconPreview
          name={asset.fromIcon}
          svgMarkup={fromSvgMarkup}
          color={color}
          size={18}
          strokeWidth={strokeWidth}
        />
        <span className="max-w-24 truncate">{asset.fromLabel}</span>
      </div>
      <div className="flex items-center gap-2 rounded-md border border-zinc-200 bg-white/85 px-2 py-1.5 text-xs text-zinc-500 backdrop-blur">
        <LucideIconPreview
          name={asset.toIcon}
          svgMarkup={toSvgMarkup}
          color={color}
          size={18}
          strokeWidth={strokeWidth}
        />
        <span className="max-w-24 truncate">{asset.toLabel}</span>
      </div>
    </div>
  )
}

function MorphPresetCard({
  active,
  asset,
  color,
  copied,
  onClick,
  onCopyCode,
  strokeWidth,
}: {
  active: boolean
  asset: MorphAsset
  color: string
  copied: boolean
  onClick: () => void
  onCopyCode: () => void
  strokeWidth: number
}) {
  const [hovered, setHovered] = useState(false)
  const [hoverProgress, setHoverProgress] = useState(0)
  const hoverProgressRef = useRef(0)

  useEffect(() => {
    const startProgress = hoverProgressRef.current
    const targetProgress = hovered ? 1 : 0

    if (Math.abs(startProgress - targetProgress) < 0.001) {
      setHoverProgress(targetProgress)
      hoverProgressRef.current = targetProgress
      return
    }

    const start = performance.now()
    let frame = 0

    const tick = (now: number) => {
      const elapsed = clamp((now - start) / defaultAnimationDuration)
      const nextProgress =
        startProgress + (targetProgress - startProgress) * easeOutCubic(elapsed)

      hoverProgressRef.current = nextProgress
      setHoverProgress(nextProgress)

      if (elapsed < 1) {
        frame = requestAnimationFrame(tick)
      }
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [hovered])

  return (
    <article
      className={cn(
        "preview-card group relative aspect-[1/1.08] min-h-44 rounded-lg border bg-white text-center transition-all duration-200",
        active
          ? "border-[#FF5B00] shadow-[0_18px_50px_rgba(255,91,0,0.18)]"
          : "border-zinc-100 hover:-translate-y-0.5 hover:border-zinc-200 hover:shadow-[0_18px_45px_rgba(24,24,27,0.08)]",
      )}
      onBlur={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={() => setHovered(true)}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <Button
        type="button"
        variant="ghost"
        size="iconSm"
        onClick={onCopyCode}
        className="preview-copy-button absolute right-2 top-2 z-10 h-8 w-8 border border-zinc-100 bg-white/85 shadow-sm backdrop-blur hover:bg-white"
        aria-label={`Copy npm usage for ${asset.name}`}
      >
        {copied ? (
          <Check className="h-4 w-4 text-[#FF5B00]" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
      <button
        type="button"
        aria-pressed={active}
        onClick={onClick}
        className="grid h-full w-full place-items-center rounded-lg p-4 outline-none focus-visible:ring-2 focus-visible:ring-[#FF5B00]/30"
      >
        <span className="grid h-20 w-20 place-items-center">
          <MorphSvg
            asset={asset}
            progress={hoverProgress}
            size={58}
            color={color}
            strokeWidth={strokeWidth}
            showOnion={false}
          />
        </span>
        <span className="mt-4 line-clamp-2 block max-w-full break-words font-mono text-xs leading-5 tracking-normal text-zinc-400 transition-colors group-hover:text-zinc-700">
          {toKebab(asset.name)}
        </span>
      </button>
    </article>
  )
}

function usePreviewAnimation(
  progress: number,
  setProgress: (value: number) => void,
  duration: number,
  loop: boolean,
) {
  const [request, setRequest] = useState({ to: 0, key: 0 })

  useEffect(() => {
    if (loop) return

    const from = progress
    const to = request.to
    const start = performance.now()
    let frame = 0

    const tick = (now: number) => {
      const elapsed = clamp((now - start) / duration)
      setProgress(from + (to - from) * easeOutCubic(elapsed))

      if (elapsed < 1) {
        frame = requestAnimationFrame(tick)
      }
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [request, duration, loop])

  useEffect(() => {
    if (!loop) return

    let frame = 0
    let timeout = 0
    let from = progress
    let to = from >= 0.5 ? 0 : 1
    let start = performance.now()
    let stopped = false

    const tick = (now: number) => {
      if (stopped) return

      const elapsed = clamp((now - start) / duration)
      setProgress(from + (to - from) * easeOutCubic(elapsed))

      if (elapsed < 1) {
        frame = requestAnimationFrame(tick)
        return
      }

      timeout = window.setTimeout(() => {
        from = to
        to = to === 1 ? 0 : 1
        start = performance.now()
        frame = requestAnimationFrame(tick)
      }, 420)
    }

    frame = requestAnimationFrame(tick)

    return () => {
      stopped = true
      cancelAnimationFrame(frame)
      window.clearTimeout(timeout)
    }
  }, [loop, duration])

  return (to: number) => setRequest({ to, key: Date.now() })
}

export default function App() {
  const [asset, setAsset] = useState<MorphAsset>(() => cloneAsset(morphPresets[0]))
  const [selectedPreset, setSelectedPreset] = useState(morphPresets[0].id)
  const [settings, setSettings] = useState(defaultSettings)
  const [durationInput, setDurationInput] = useState(String(defaultSettings.duration))
  const [loadingDurationInput, setLoadingDurationInput] = useState(
    String(defaultSettings.loadingDuration),
  )
  const [progress, setProgress] = useState(0)
  const [loop, setLoop] = useState(false)
  const [asyncPhase, setAsyncPhase] = useState<AsyncPreviewPhase>("from")
  const [loadingPresence, setLoadingPresence] = useState(0)
  const [galleryCopyId, setGalleryCopyId] = useState<string | null>(null)
  const [heroExportTarget, setHeroExportTarget] =
    useState<ExportTarget>("react")
  const [heroCopyTarget, setHeroCopyTarget] = useState<ExportTarget | null>(null)
  const [heroInstallCopyTarget, setHeroInstallCopyTarget] =
    useState<ExportTarget | null>(null)
  const [iconSearch, setIconSearch] = useState("")
  const [presetSearch, setPresetSearch] = useState("")
  const [iconPickerTarget, setIconPickerTarget] =
    useState<IconPickTarget | null>(null)
  const [uploadedSvgs, setUploadedSvgs] = useState<
    Partial<Record<IconPickTarget, UploadedSvg>>
  >({})
  const [previewMode, setPreviewMode] = useState<PreviewMode>("morph")
  const fromSvgInputRef = useRef<HTMLInputElement>(null)
  const toSvgInputRef = useRef<HTMLInputElement>(null)
  const asyncFrameRef = useRef(0)
  const asyncTimeoutRef = useRef(0)
  const asyncTokenRef = useRef(0)
  const progressRef = useRef(progress)
  const loadingPresenceRef = useRef(loadingPresence)

  usePreviewAnimation(
    progress,
    setProgress,
    settings.duration,
    loop && !settings.loadingEnabled,
  )

  const filteredIconNames = useMemo(() => {
    const query = normalizeSearch(iconSearch)

    if (!query) {
      return allLucideIconNames
    }

    return allLucideIconNames.filter((name) => {
      const label = splitIconName(name)
      return (
        normalizeSearch(name).includes(query) ||
        normalizeSearch(label).includes(query)
      )
    })
  }, [iconSearch])
  const filteredPresets = useMemo(() => {
    const query = normalizeSearch(presetSearch)

    if (!query) {
      return morphPresets
    }

    return morphPresets.filter((preset) =>
      [
        preset.name,
        preset.fromLabel,
        preset.toLabel,
        preset.fromIcon ?? "",
        preset.toIcon ?? "",
      ].some((value) => normalizeSearch(value).includes(query)),
    )
  }, [presetSearch])
  const iconPickerLabel = iconPickerTarget
    ? iconPickerTarget === "from"
      ? asset.fromLabel
      : asset.toLabel
    : ""
  const selectedPickerIcon = iconPickerTarget
    ? iconPickerTarget === "from"
      ? asset.fromIcon
      : asset.toIcon
    : undefined
  const asyncPreviewRunning =
    asyncPhase === "entering-loading" ||
    asyncPhase === "loading" ||
    asyncPhase === "exiting-loading"
  const hasLoadingDesign = Boolean(
    previewMode === "morph" &&
      asset.loading &&
      asset.layers.length > 0 &&
      asset.layers.every(
        (layer) => layer.loading && layer.loadingOpacity !== undefined,
      ),
  )
  const showingLoadingEntry =
    asyncPhase === "entering-loading" ||
    asyncPhase === "loading" ||
    (asyncPhase === "from" && loadingPresence > 0)
  const loadingSegment =
    asyncPhase === "exiting-loading"
      ? "loading-to"
      : showingLoadingEntry
        ? "from-loading"
        : "direct"
  const loadingProgress =
    loadingSegment === "from-loading" ? loadingPresence : progress
  const heroExportLabel =
    exportTargets.find((option) => option.value === heroExportTarget)?.label ??
    "React"
  const heroExportIndex = Math.max(
    exportTargets.findIndex((option) => option.value === heroExportTarget),
    0,
  )

  function updateDuration(value: number) {
    const duration = normalizeDuration(value)

    setSettings((current) => ({
      ...current,
      duration,
    }))
    setDurationInput(String(duration))
  }

  function updateLoadingDuration(value: number) {
    const loadingDuration = normalizeLoadingDuration(value)

    setSettings((current) => ({
      ...current,
      loadingDuration,
    }))
    setLoadingDurationInput(String(loadingDuration))
  }

  function commitDurationInput() {
    updateDuration(Number(durationInput))
  }

  function commitLoadingDurationInput() {
    updateLoadingDuration(Number(loadingDurationInput))
  }

  useEffect(() => {
    setDurationInput(String(settings.duration))
  }, [settings.duration])

  useEffect(() => {
    setLoadingDurationInput(String(settings.loadingDuration))
  }, [settings.loadingDuration])

  useEffect(() => {
    progressRef.current = progress
  }, [progress])

  useEffect(() => {
    loadingPresenceRef.current = loadingPresence
  }, [loadingPresence])

  useEffect(
    () => () => {
      cancelAnimationFrame(asyncFrameRef.current)
      window.clearTimeout(asyncTimeoutRef.current)
    },
    [],
  )

  function stopAsyncTimeline() {
    cancelAnimationFrame(asyncFrameRef.current)
    window.clearTimeout(asyncTimeoutRef.current)
  }

  function setPreviewProgress(value: number) {
    progressRef.current = value
    setProgress(value)
  }

  function setLoaderPresence(value: number) {
    loadingPresenceRef.current = value
    setLoadingPresence(value)
  }

  function animateAsyncFrame(
    token: number,
    duration: number,
    update: (easedProgress: number) => void,
    onComplete: () => void,
  ) {
    const start = performance.now()

    const tick = (now: number) => {
      if (token !== asyncTokenRef.current) return

      const elapsed = clamp((now - start) / Math.max(1, duration))
      update(easeOutCubic(elapsed))

      if (elapsed < 1) {
        asyncFrameRef.current = requestAnimationFrame(tick)
      } else {
        onComplete()
      }
    }

    asyncFrameRef.current = requestAnimationFrame(tick)
  }

  function resetAsyncPreview(nextProgress = 0) {
    asyncTokenRef.current += 1
    stopAsyncTimeline()
    setLoaderPresence(0)
    setPreviewProgress(nextProgress)
    setAsyncPhase(nextProgress >= 0.5 ? "to" : "from")
  }

  function startAsyncPreview() {
    if (!hasLoadingDesign) {
      return
    }

    const token = asyncTokenRef.current + 1
    asyncTokenRef.current = token
    stopAsyncTimeline()
    setLoop(false)

    const enterLoading = () => {
      if (token !== asyncTokenRef.current) return

      const fromPresence = loadingPresenceRef.current
      setAsyncPhase("entering-loading")
      animateAsyncFrame(
        token,
        settings.duration,
        (value) => setLoaderPresence(fromPresence + (1 - fromPresence) * value),
        () => {
          setLoaderPresence(1)
          setAsyncPhase("loading")
          asyncTimeoutRef.current = window.setTimeout(() => {
            if (token !== asyncTokenRef.current) return

            const fromProgress = progressRef.current
            const fromPresence = loadingPresenceRef.current
            setAsyncPhase("exiting-loading")
            animateAsyncFrame(
              token,
              settings.duration,
              (value) => {
                setPreviewProgress(fromProgress + (1 - fromProgress) * value)
                setLoaderPresence(fromPresence * (1 - value))
              },
              () => {
                setPreviewProgress(1)
                setLoaderPresence(0)
                setAsyncPhase("to")
              },
            )
          }, settings.loadingDuration)
        },
      )
    }

    const fromProgress = progressRef.current
    const fromPresence = loadingPresenceRef.current
    setAsyncPhase("from")

    if (fromProgress <= 0.001 && fromPresence <= 0.001) {
      setPreviewProgress(0)
      enterLoading()
      return
    }

    animateAsyncFrame(
      token,
      settings.duration,
      (value) => {
        setPreviewProgress(fromProgress * (1 - value))
        setLoaderPresence(fromPresence * (1 - value))
      },
      () => {
        setPreviewProgress(0)
        setLoaderPresence(0)
        enterLoading()
      },
    )
  }

  function cancelAsyncPreview() {
    const token = asyncTokenRef.current + 1
    asyncTokenRef.current = token
    stopAsyncTimeline()

    const fromProgress = progressRef.current
    const fromPresence = loadingPresenceRef.current
    setAsyncPhase("from")
    animateAsyncFrame(
      token,
      settings.duration,
      (value) => {
        setPreviewProgress(fromProgress * (1 - value))
        setLoaderPresence(fromPresence * (1 - value))
      },
      () => {
        setPreviewProgress(0)
        setLoaderPresence(0)
      },
    )
  }

  function applyLucideIcon(target: IconPickTarget, iconName: string) {
    const nextFromIcon = target === "from" ? iconName : asset.fromIcon
    const nextToIcon = target === "to" ? iconName : asset.toIcon
    const fromLabel = iconNameToLabel(nextFromIcon, asset.fromLabel)
    const toLabel = iconNameToLabel(nextToIcon, asset.toLabel)
    const nextAsset = {
      ...asset,
      id: `lucide-${toKebab(nextFromIcon || fromLabel)}-${toKebab(
        nextToIcon || toLabel,
      )}`,
      name: `${fromLabel} to ${toLabel}`,
      fromLabel,
      toLabel,
      fromIcon: nextFromIcon,
      toIcon: nextToIcon,
      strokeLocked: undefined,
      loading: undefined,
    }

    setSelectedPreset("custom")
    setAsset(nextAsset)
    resetAsyncPreview(0)
    setUploadedSvgs((current) => ({ ...current, [target]: undefined }))
    setPreviewMode("lucide")
    setSettings((current) => ({
      ...current,
      componentName: componentNameForAsset(nextAsset),
    }))
    setIconPickerTarget(null)
  }

  async function uploadSvgSource(
    target: IconPickTarget,
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.currentTarget.files?.[0]
    event.currentTarget.value = ""

    if (!file) return

    try {
      const markup = sanitizeSvgMarkup(await file.text())
      const label = labelFromFileName(file.name)
      const nextAsset: MorphAsset = {
        ...asset,
        id: `svg-${target}-${toKebab(label)}`,
        name:
          target === "from"
            ? `${label} to ${asset.toLabel}`
            : `${asset.fromLabel} to ${label}`,
        fromLabel: target === "from" ? label : asset.fromLabel,
        toLabel: target === "to" ? label : asset.toLabel,
        fromIcon: target === "from" ? undefined : asset.fromIcon,
        toIcon: target === "to" ? undefined : asset.toIcon,
        strokeLocked: undefined,
        loading: undefined,
      }

      setSelectedPreset("custom")
      setAsset(nextAsset)
      resetAsyncPreview(0)
      setUploadedSvgs((current) => ({
        ...current,
        [target]: { name: label, markup },
      }))
      setPreviewMode("morph")
      setSettings((current) => ({
        ...current,
        componentName: componentNameForAsset(nextAsset),
      }))
      setIconPickerTarget(null)
    } catch (error) {
      console.error(error)
    }
  }

  function loadPreset(id: string) {
    const next = cloneAsset(getPresetById(id))
    setSelectedPreset(id)
    setAsset(next)
    setUploadedSvgs({})
    resetAsyncPreview(0)
    setLoop(false)
    setPreviewMode("morph")
    setSettings((current) => ({
      ...current,
      componentName: componentNameForAsset(next),
    }))
  }

  async function copyPresetCode(preset: MorphAsset) {
    await writeClipboardText(
      generateNpmReactUsageCode(
        preset,
        {
          ...settings,
          componentName: componentNameForAsset(preset),
        },
      ),
    )
    setGalleryCopyId(preset.id)
    window.setTimeout(() => {
      setGalleryCopyId((current) => (current === preset.id ? null : current))
    }, 1200)
  }

  async function copyHeroCode() {
    const target = heroExportTarget

    await writeClipboardText(
      generateNpmUsageCode(
        asset,
        {
          ...settings,
          componentName: componentNameForAsset(asset),
        },
        target,
      ),
    )
    setHeroCopyTarget(target)
    window.setTimeout(() => {
      setHeroCopyTarget((current) => (current === target ? null : current))
    }, 1200)
  }

  async function copyHeroInstallCommand() {
    const target = heroExportTarget

    await writeClipboardText(npmInstallCommands[target])
    setHeroInstallCopyTarget(target)
    window.setTimeout(() => {
      setHeroInstallCopyTarget((current) =>
        current === target ? null : current,
      )
    }, 1200)
  }

  return (
    <div className="min-h-screen bg-[#FFF7ED] text-zinc-950">
      <input
        ref={fromSvgInputRef}
        type="file"
        accept=".svg,image/svg+xml"
        className="sr-only"
        onChange={(event) => uploadSvgSource("from", event)}
      />
      <input
        ref={toSvgInputRef}
        type="file"
        accept=".svg,image/svg+xml"
        className="sr-only"
        onChange={(event) => uploadSvgSource("to", event)}
      />

      <header className="sticky top-0 z-30 border-b border-orange-200/70 bg-[#FFF7ED]/88 backdrop-blur">
        <div className="mx-auto flex min-h-16 max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-gradient-to-br from-[#FF5B00] via-[#FF8A1F] to-[#7A2E00] text-white shadow-[0_10px_24px_rgba(255,91,0,0.26)]">
              <Layers3 className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <h1 className="truncate text-base font-semibold text-zinc-950">
                lucide-morph
              </h1>
              <p className="truncate text-xs text-zinc-500">
                semantic icon state transitions
              </p>
            </div>
          </div>

        </div>
      </header>

      <main>
        <section className="relative isolate overflow-hidden border-b border-slate-200/70">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_16%_18%,rgba(255,91,0,0.16),transparent_32%),radial-gradient(circle_at_82%_12%,rgba(255,184,77,0.18),transparent_30%),linear-gradient(180deg,#ffffff_0%,#FFF7ED_78%)]" />
          <div className="absolute left-[8%] top-24 -z-10 h-40 w-40 rounded-full bg-[#FF5B00]/10 blur-3xl" />
          <div className="absolute right-[14%] top-16 -z-10 h-48 w-48 rounded-full bg-[#FFB84D]/22 blur-3xl" />

          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-14 sm:py-18 lg:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)]">
            <div className="max-w-3xl text-left">
              <h2
                aria-label="Show change. Ship clarity."
                className="text-[clamp(3rem,7.4vw,6.8rem)] font-semibold leading-[0.9] tracking-[-0.045em] text-slate-950"
              >
                <span className="block">Show change.</span>
                <span className="block bg-gradient-to-r from-[#FF5B00] via-[#FF8A1F] to-[#7A2E00] bg-clip-text text-transparent">
                  Ship clarity.
                </span>
              </h2>

              <p className="mt-7 max-w-2xl text-balance text-base leading-7 text-slate-600 sm:text-lg">
                Build, inspect, and export SVG path transitions between two
                product states—complete with meaningful loading states, timing
                controls, and reusable component output.
              </p>

              <div className="mt-7 flex flex-wrap gap-2">
                <Badge tone="accent">Semantic state pairs</Badge>
                <Badge tone="neutral">{morphPresets.length} presets</Badge>
                <Badge tone="neutral">React · Vue · Web Component</Badge>
              </div>
            </div>

            <aside
              aria-label={`${heroExportLabel} package setup`}
              data-testid="hero-code-card"
              className="relative overflow-hidden rounded-2xl border border-slate-800/90 bg-[#111214] p-2 text-white shadow-[0_28px_80px_rgba(15,23,42,0.28)]"
            >
              <div className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full bg-[#FF5B00]/20 blur-3xl" />
              <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#0B0C0E]/95">
                <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
                  <div className="flex gap-1.5" aria-hidden="true">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#FF5B00]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <span className="font-mono text-[11px] text-zinc-500">
                    package setup
                  </span>
                </div>

                <div className="p-4 sm:p-5">
                  <div
                    className="hero-framework-tabs relative grid h-8 grid-cols-3 rounded-lg border border-white/10 bg-white/[0.045] p-0.5"
                    style={
                      {
                        "--hero-tab-index": heroExportIndex,
                      } as CSSProperties
                    }
                    role="group"
                    aria-label="Code framework"
                  >
                    <span
                      className="hero-framework-tab-indicator"
                      aria-hidden="true"
                    />
                    {exportTargets.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        aria-pressed={heroExportTarget === option.value}
                        onClick={() => setHeroExportTarget(option.value)}
                        className={cn(
                          "relative z-10 grid h-full place-items-center whitespace-nowrap rounded-md px-1.5 py-0 text-[10px] font-medium leading-none transition-colors sm:text-[11px]",
                          heroExportTarget === option.value
                            ? "text-slate-950"
                            : "text-zinc-500 hover:text-zinc-200",
                        )}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>

                  <div className="mt-5">
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <span className="text-xs font-medium text-zinc-300">
                        Install for {heroExportLabel}
                      </span>
                      <button
                        type="button"
                        onClick={copyHeroInstallCommand}
                        aria-label={`Copy ${heroExportLabel} install command`}
                        title={`Copy ${heroExportLabel} install command`}
                        className="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-white/10 text-[#FF8A1F] transition-colors hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8A1F]/40"
                      >
                        {heroInstallCopyTarget === heroExportTarget ? (
                          <Check className="h-3.5 w-3.5" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                      </button>
                    </div>
                    <div className="flex h-12 items-center gap-3 overflow-hidden rounded-lg border border-white/10 bg-black/45 px-3 font-mono text-xs leading-none sm:text-sm">
                      <span className="shrink-0 select-none text-[#FF6B16]" aria-hidden="true">
                        $
                      </span>
                      <div className="hero-install-command code-scroll flex min-w-0 flex-1 items-center overflow-x-auto overflow-y-hidden">
                        <code className="min-w-max whitespace-nowrap text-zinc-200">
                          {npmInstallCommands[heroExportTarget]}
                        </code>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-12">
          <div className="overflow-hidden rounded-lg border border-zinc-100 bg-white shadow-[0_18px_45px_rgba(24,24,27,0.08)]">
            <div className="stage-grid relative grid min-h-[360px] place-items-center overflow-hidden p-8 sm:min-h-[430px]">
              <div className="absolute inset-x-4 top-4 z-10 flex flex-wrap items-start gap-2">
                <div className="w-64 max-w-full">
                  <Select value={selectedPreset} onValueChange={loadPreset}>
                    <SelectTrigger aria-label="Preset">
                      <SelectValue placeholder="Select preset" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedPreset === "custom" && (
                        <SelectItem value="custom">Custom</SelectItem>
                      )}
                      {morphPresets.map((preset) => (
                        <SelectItem key={preset.id} value={preset.id}>
                          {preset.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="ml-auto flex items-center justify-end gap-2">
                  <div className="flex items-center gap-2">
                    {settings.loadingEnabled ? (
                      <Button
                        variant={asyncPreviewRunning ? "default" : "secondary"}
                        disabled={!hasLoadingDesign}
                        onClick={
                          asyncPreviewRunning
                            ? cancelAsyncPreview
                            : startAsyncPreview
                        }
                        aria-label={
                          !hasLoadingDesign
                            ? "Loading middle state unavailable"
                            : asyncPreviewRunning
                              ? "Cancel loading flow"
                              : "Run loading flow"
                        }
                      >
                        {asyncPreviewRunning ? (
                          <X className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                        <span className="hidden sm:inline">
                          {asyncPreviewRunning ? "Cancel" : "Run preview"}
                        </span>
                      </Button>
                    ) : (
                      <Button
                        variant={loop ? "default" : "secondary"}
                        onClick={() => setLoop((value) => !value)}
                        aria-label={loop ? "Pause loop" : "Loop preview"}
                      >
                        {loop ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                        <span className="hidden sm:inline">
                          {loop ? "Pause" : "Loop preview"}
                        </span>
                      </Button>
                    )}

                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={copyHeroCode}
                      aria-label={`Copy ${heroExportLabel} npm usage`}
                      title={`Copy ${heroExportLabel} npm usage`}
                    >
                      {heroCopyTarget === heroExportTarget ? (
                        <Check className="h-4 w-4 text-[#FF5B00]" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              {settings.loadingEnabled && hasLoadingDesign ? (
                <MorphSvg
                  asset={asset}
                  progress={loadingProgress}
                  size={settings.size}
                  color={settings.color}
                  strokeWidth={settings.strokeWidth}
                  showOnion={settings.showOnion && !asyncPreviewRunning}
                  segment={loadingSegment}
                  loadingActive={asyncPhase === "loading"}
                />
              ) : (
                previewMode === "morph" ? (
                  <MorphSvg
                    asset={asset}
                    progress={progress}
                    size={settings.size}
                    color={settings.color}
                    strokeWidth={settings.strokeWidth}
                    showOnion={settings.showOnion}
                  />
                ) : (
                  <LucideTransitionPreview
                    fromIcon={asset.fromIcon}
                    toIcon={asset.toIcon}
                    progress={progress}
                    size={settings.size}
                    color={settings.color}
                    strokeWidth={settings.strokeWidth}
                  />
                )
              )}
            </div>

            <div className="grid gap-4 border-t border-zinc-100 bg-white p-4">
              <div className="grid gap-4 rounded-md border border-zinc-100 bg-zinc-50 px-3 py-3 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-1">
                  <div className="flex h-7 items-center justify-between gap-3">
                    <Label>Progress</Label>
                    <span className="font-mono text-xs text-zinc-400">
                      {Math.round(progress * 100)}%
                    </span>
                  </div>
                  <Slider
                    value={progress}
                    onValueChange={(value) => {
                      setLoop(false)
                      resetAsyncPreview(value)
                    }}
                    aria-label="Preview progress"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex h-7 items-center justify-between gap-3">
                    <Label htmlFor="animation-duration" className="shrink-0">
                      Duration
                    </Label>
                    <div className="flex shrink-0 items-center gap-1">
                      <Input
                        id="animation-duration"
                        type="number"
                        min={animationDurationMin}
                        max={animationDurationMax}
                        step={animationDurationStep}
                        value={durationInput}
                        onChange={(event) =>
                          setDurationInput(event.currentTarget.value)
                        }
                        onBlur={commitDurationInput}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            event.currentTarget.blur()
                          }
                        }}
                        className="h-7 w-20 px-2 text-right text-xs"
                        aria-label="Animation duration in milliseconds"
                      />
                      <span className="text-xs text-zinc-500">ms</span>
                    </div>
                  </div>
                  <Slider
                    min={animationDurationMin}
                    max={animationDurationMax}
                    step={animationDurationStep}
                    value={settings.duration}
                    onValueChange={updateDuration}
                    aria-label="Animation duration"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex h-7 items-center justify-between gap-3">
                    <Label>Size</Label>
                    <span className="font-mono text-xs text-zinc-400">
                      {settings.size}px
                    </span>
                  </div>
                  <Slider
                    min={96}
                    max={240}
                    step={4}
                    value={settings.size}
                    onValueChange={(size) =>
                      setSettings((current) => ({ ...current, size }))
                    }
                    aria-label="Icon size"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex h-7 items-center justify-between gap-3">
                    <Label>Stroke</Label>
                    <span className="font-mono text-xs text-zinc-400">
                      {settings.strokeWidth}px
                    </span>
                  </div>
                  <Slider
                    min={1}
                    max={4}
                    step={0.25}
                    value={settings.strokeWidth}
                    onValueChange={(strokeWidth) =>
                      setSettings((current) => ({ ...current, strokeWidth }))
                    }
                    aria-label="Stroke width"
                  />
                </div>
              </div>

              <div className="grid gap-3 rounded-md border border-zinc-100 bg-zinc-50 px-3 py-3 sm:grid-cols-2 lg:grid-cols-[minmax(260px,1fr)_180px_132px_180px]">
                <div className="flex min-h-16 items-center justify-between gap-3 rounded-md border border-zinc-100 bg-white px-3 py-2">
                  <div className="min-w-0">
                    <Label>Loading middle state</Label>
                    <p className="mt-0.5 truncate text-[11px] text-zinc-500">
                      {hasLoadingDesign
                        ? asyncPhaseLabel(asyncPhase)
                        : "Loading paths required"}
                    </p>
                  </div>
                  <Switch
                    checked={settings.loadingEnabled}
                    onCheckedChange={(checked) => {
                      resetAsyncPreview(0)
                      setLoop(false)
                      setSettings((current) => ({
                        ...current,
                        loadingEnabled: checked,
                      }))
                    }}
                    aria-label="Use intermediate loading state"
                    className="shrink-0"
                  />
                </div>

                <div className="flex min-h-16 items-center justify-between gap-3 rounded-md border border-zinc-100 bg-white px-3 py-2">
                  <Label htmlFor="loading-duration">Hold</Label>
                  <div className="flex items-center gap-1.5">
                    <Input
                      id="loading-duration"
                      type="number"
                      min={loadingDurationMin}
                      max={loadingDurationMax}
                      step={loadingDurationStep}
                      value={loadingDurationInput}
                      disabled={!settings.loadingEnabled}
                      onChange={(event) =>
                        setLoadingDurationInput(event.currentTarget.value)
                      }
                      onBlur={commitLoadingDurationInput}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") event.currentTarget.blur()
                      }}
                      className="h-8 w-20 px-2 text-right text-xs"
                      aria-label="Loading hold duration in milliseconds"
                    />
                    <span className="text-xs text-zinc-500">ms</span>
                  </div>
                </div>

                <div className="flex min-h-16 items-center justify-between gap-3 rounded-md border border-zinc-100 bg-white px-3 py-2">
                  <Label>Color</Label>
                  <input
                    type="color"
                    value={settings.color}
                    onChange={(event) =>
                      setSettings((current) => ({
                        ...current,
                        color: event.currentTarget.value,
                      }))
                    }
                    className="h-9 w-14 cursor-pointer rounded-md border border-zinc-200 bg-white p-1"
                    aria-label="Icon color"
                  />
                </div>

                <div className="flex min-h-16 items-center justify-between gap-3 rounded-md border border-zinc-100 bg-white px-3 py-2">
                  <Label>Onion paths</Label>
                  <Switch
                    checked={settings.showOnion}
                    onCheckedChange={(showOnion) =>
                      setSettings((current) => ({ ...current, showOnion }))
                    }
                    aria-label="Show onion paths"
                    className="shrink-0"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-12">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-normal tracking-normal text-zinc-950">
                state transition preset gallery
              </h2>
              <p className="mt-1 text-sm text-zinc-500">
                {filteredPresets.length} visible state pairs
              </p>
            </div>
            <div className="relative w-full sm:w-72">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              <Input
                aria-label="Search preset gallery"
                value={presetSearch}
                onChange={(event) => setPresetSearch(event.currentTarget.value)}
                placeholder="search presets..."
                className="pl-9"
              />
            </div>
          </div>

          {filteredPresets.length > 0 ? (
            <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
              {filteredPresets.map((preset) => (
                <MorphPresetCard
                  key={preset.id}
                  active={selectedPreset === preset.id}
                  asset={preset}
                  color={settings.color}
                  copied={galleryCopyId === preset.id}
                  strokeWidth={settings.strokeWidth}
                  onCopyCode={() => copyPresetCode(preset)}
                  onClick={() => loadPreset(preset.id)}
                />
              ))}
            </div>
          ) : (
            <div className="grid min-h-44 place-items-center rounded-lg border border-zinc-100 bg-white text-sm text-zinc-500">
              No matching presets
            </div>
          )}
        </section>

      </main>
      {iconPickerTarget && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-zinc-950/45 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="icon-picker-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIconPickerTarget(null)
          }}
        >
          <div className="flex max-h-[min(760px,calc(100vh-32px))] w-full max-w-3xl flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white p-4 shadow-panel">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <h2
                  id="icon-picker-title"
                  className="truncate text-sm font-semibold text-zinc-950"
                >
                  {iconPickerTarget === "from" ? "From source" : "To source"}
                </h2>
                <p className="mt-1 truncate text-xs text-zinc-500">
                  {iconPickerLabel}
                </p>
              </div>
              <Button
                variant="ghost"
                size="iconSm"
                onClick={() => setIconPickerTarget(null)}
                aria-label="Close icon picker"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
              <Field label="Search icons">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                  <Input
                    aria-label="Search icons"
                    value={iconSearch}
                    onChange={(event) => setIconSearch(event.currentTarget.value)}
                    placeholder="camera, heart, arrow..."
                    className="pl-9"
                  />
                </div>
              </Field>
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  (iconPickerTarget === "from"
                    ? fromSvgInputRef
                    : toSvgInputRef
                  ).current?.click()
                }
              >
                <Upload className="h-4 w-4" />
                Upload SVG
              </Button>
            </div>

            <div className="mt-3 flex items-center justify-between gap-3 text-xs text-zinc-500">
              <span>{filteredIconNames.length} icons</span>
              <Badge tone="neutral">{allLucideIconNames.length}</Badge>
            </div>

            <div className="mt-3 flex min-h-0 flex-1 flex-col">
              <LucideIconGrid
                iconNames={filteredIconNames}
                selectedName={selectedPickerIcon}
                color={settings.color}
                onPick={(name) => applyLucideIcon(iconPickerTarget, name)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
