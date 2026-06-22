import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type ReactNode,
} from "react"
import {
  Check,
  Code2,
  Copy,
  icons as lucideIcons,
  Layers3,
  Pause,
  Play,
  Search,
  Settings,
  Sparkles,
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
import { Tooltip } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import {
  generateMorphLayersWithAgent,
  type AgentMorphResult,
} from "@/morph/agent"
import {
  componentNameForAsset,
  exportTargets,
  generateComponentCode,
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

const defaultSettings: EditorSettings = {
  componentName: "MenuToXIcon",
  color: "#f6f1e8",
  duration: defaultAnimationDuration,
  size: 220,
  strokeWidth: 2,
  showOnion: true,
}

function normalizeDuration(value: number) {
  if (!Number.isFinite(value)) return defaultAnimationDuration

  return (
    Math.round(
      clamp(value, animationDurationMin, animationDurationMax) / animationDurationStep,
    ) * animationDurationStep
  )
}

type IconPickTarget = "from" | "to"
type PreviewMode = "morph" | "lucide"
type UploadedSvg = {
  name: string
  markup: string
}
type AgentState =
  | { status: "idle" }
  | { status: "running"; message: string }
  | { status: "success"; message: string; rationale: string }
  | { status: "error"; message: string }

const allLucideIconNames = Object.keys(lucideIcons)
  .filter((name) => /^[A-Z]/.test(name))
  .sort((first, second) => first.localeCompare(second))

const lucideIconNameSet = new Set(allLucideIconNames)
const openAIKeyStorageKey = "morph-icon.openai-key"
const openAIBaseUrlStorageKey = "morph-icon.openai-base-url"
const openAIModelStorageKey = "morph-icon.openai-model"
const openAIStreamStorageKey = "morph-icon.openai-stream"
const defaultOpenAIBaseUrl = "https://api.openai.com/v1"
const defaultOpenAIModel = "gpt-5.4"

function getViteEnv(name: string) {
  const meta = import.meta as ImportMeta & {
    env?: Record<string, string | undefined>
  }

  return meta.env?.[name] ?? ""
}

function getStoredValue(key: string, fallback = "") {
  if (typeof window === "undefined") return fallback
  return window.localStorage.getItem(key) || fallback
}

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

function SectionTitle({
  icon: Icon,
  title,
  meta,
  className,
}: {
  icon: LucideIcon
  title: string
  meta?: ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex min-h-9 items-center justify-between gap-3", className)}>
      <div className="flex min-w-0 items-center gap-2">
        <Icon className="h-4 w-4 shrink-0 text-emerald-300" />
        <h2 className="truncate text-sm font-semibold text-zinc-100">{title}</h2>
      </div>
      {meta}
    </div>
  )
}

type CodeToken = {
  text: string
  className?: string
}

const codeTokenPattern =
  /(<!--[\s\S]*?-->|\/\*[\s\S]*?\*\/|\/\/[^\n]*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|\b(?:as|async|await|break|case|catch|class|const|default|defineProps|else|export|extends|false|for|from|function|get|if|import|in|interface|let|new|null|of|private|return|set|static|throw|true|try|type|undefined|watch|while|withDefaults)\b|\b\d+(?:\.\d+)?\b|<\/?[A-Za-z][\w:.-]*|[A-Za-z_:][\w:.-]*(?==))/g

const codeKeywordPattern =
  /^(?:as|async|await|break|case|catch|class|const|default|defineProps|else|export|extends|false|for|from|function|get|if|import|in|interface|let|new|null|of|private|return|set|static|throw|true|try|type|undefined|watch|while|withDefaults)$/

function classNameForCodeToken(token: string) {
  if (
    token.startsWith("//") ||
    token.startsWith("/*") ||
    token.startsWith("<!--")
  ) {
    return "text-zinc-500 italic"
  }

  if (
    token.startsWith('"') ||
    token.startsWith("'") ||
    token.startsWith("`")
  ) {
    return "text-amber-300"
  }

  if (token.startsWith("<")) return "text-sky-300"
  if (codeKeywordPattern.test(token)) return "text-fuchsia-300"
  if (/^\d/.test(token)) return "text-violet-300"
  if (/^[A-Za-z_:][\w:.-]*$/.test(token)) return "text-emerald-300"

  return undefined
}

function tokenizeCode(code: string) {
  const tokens: CodeToken[] = []
  let lastIndex = 0

  codeTokenPattern.lastIndex = 0

  for (const match of code.matchAll(codeTokenPattern)) {
    const text = match[0]
    const index = match.index ?? 0

    if (index > lastIndex) {
      tokens.push({ text: code.slice(lastIndex, index) })
    }

    tokens.push({ text, className: classNameForCodeToken(text) })
    lastIndex = index + text.length
  }

  if (lastIndex < code.length) {
    tokens.push({ text: code.slice(lastIndex) })
  }

  return tokens
}

function CodePreview({
  code,
  copyState,
  onCopy,
}: {
  code: string
  copyState: "idle" | "copied"
  onCopy: () => void
}) {
  const tokens = useMemo(() => tokenizeCode(code), [code])
  const copied = copyState === "copied"

  return (
    <div className="relative mt-4">
      <Button
        variant="secondary"
        size="iconSm"
        onClick={onCopy}
        aria-label={copied ? "Copied" : "Copy code"}
        className="absolute right-2 top-2 z-10 border border-zinc-700 bg-zinc-900/95 shadow-panel"
      >
        <span className="relative h-4 w-4 overflow-hidden">
          <Copy
            className={cn(
              "absolute inset-0 h-4 w-4 transition-all duration-200 ease-out",
              copied
                ? "scale-50 rotate-45 opacity-0"
                : "scale-100 rotate-0 opacity-100",
            )}
          />
          <Check
            className={cn(
              "absolute inset-0 h-4 w-4 text-emerald-300 transition-all duration-200 ease-out",
              copied
                ? "scale-100 rotate-0 opacity-100"
                : "scale-50 -rotate-45 opacity-0",
            )}
          />
        </span>
      </Button>
      <pre
        className="code-scroll h-[calc(100vh-330px)] min-h-96 overflow-auto rounded-md border border-zinc-800 bg-zinc-950 p-3 pt-12 pr-12 font-mono text-[11px] leading-relaxed text-zinc-300 outline-none"
        aria-label="Generated code"
        tabIndex={0}
      >
        <code>
          {tokens.map((token, index) => (
            <span key={index} className={token.className}>
              {token.text}
            </span>
          ))}
        </code>
      </pre>
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
        "grid shrink-0 place-items-center text-zinc-200",
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
        <span className="h-5 w-5 rounded-md border border-dashed border-zinc-700" />
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
        "flex min-w-0 items-center gap-3 rounded-md border bg-zinc-950 p-3 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500",
        active
          ? "border-emerald-600 bg-emerald-950/40"
          : "border-zinc-800 hover:border-zinc-700",
      )}
    >
      <LucideIconPreview
        name={name}
        svgMarkup={svgMarkup}
        color={color}
        size={28}
        className="h-10 w-10 rounded-md border border-zinc-800 bg-zinc-900"
      />
      <span className="min-w-0">
        <span className="block text-xs font-medium uppercase text-zinc-500">
          {target}
        </span>
        <span className="block truncate text-sm font-medium text-zinc-100">
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
      <div className="grid min-h-24 flex-1 place-items-center rounded-md border border-zinc-800 bg-zinc-950 text-sm text-zinc-500">
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
              "grid min-h-20 place-items-center gap-1 rounded-md border bg-zinc-950 px-2 py-2 text-center text-xs outline-none transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500",
              active
                ? "border-emerald-600 bg-emerald-950/50 text-emerald-100"
                : "border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-100",
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
          strokeWidth={strokeWidth}
          className="col-start-1 row-start-1 transition-none"
          style={{
            opacity: fromOpacity,
            transform: `scale(${1 - progress * 0.14}) rotate(${progress * 8}deg)`,
            transformOrigin: "center",
          }}
        />
      )}
      {ToIcon && (
        <ToIcon
          aria-hidden="true"
          size={size}
          strokeWidth={strokeWidth}
          className="col-start-1 row-start-1 transition-none"
          style={{
            opacity: toOpacity,
            transform: `scale(${0.86 + progress * 0.14}) rotate(${
              (1 - progress) * -8
            }deg)`,
            transformOrigin: "center",
          }}
        />
      )}
    </div>
  )
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
      <div className="flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-950/80 px-2 py-1.5 text-xs text-zinc-400 backdrop-blur">
        <LucideIconPreview
          name={asset.fromIcon}
          svgMarkup={fromSvgMarkup}
          color={color}
          size={18}
          strokeWidth={strokeWidth}
        />
        <span className="max-w-24 truncate">{asset.fromLabel}</span>
      </div>
      <div className="flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-950/80 px-2 py-1.5 text-xs text-zinc-400 backdrop-blur">
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
  const [progress, setProgress] = useState(0)
  const [loop, setLoop] = useState(false)
  const [copyState, setCopyState] = useState<"idle" | "copied">("idle")
  const [iconSearch, setIconSearch] = useState("")
  const [iconPickerTarget, setIconPickerTarget] =
    useState<IconPickTarget | null>(null)
  const [exportTarget, setExportTarget] = useState<ExportTarget>("react")
  const [uploadedSvgs, setUploadedSvgs] = useState<
    Partial<Record<IconPickTarget, UploadedSvg>>
  >({})
  const [previewMode, setPreviewMode] = useState<PreviewMode>("morph")
  const [agentState, setAgentState] = useState<AgentState>({ status: "idle" })
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [openAIKey, setOpenAIKey] = useState(() =>
    getStoredValue(openAIKeyStorageKey, getViteEnv("VITE_OPENAI_API_KEY")),
  )
  const [agentBaseUrl, setAgentBaseUrl] = useState(() =>
    getStoredValue(
      openAIBaseUrlStorageKey,
      getViteEnv("VITE_OPENAI_BASE_URL") || defaultOpenAIBaseUrl,
    ),
  )
  const [agentModel, setAgentModel] = useState(() =>
    getStoredValue(
      openAIModelStorageKey,
      getViteEnv("VITE_OPENAI_MODEL") || defaultOpenAIModel,
    ),
  )
  const [agentStream, setAgentStream] = useState(
    () => getStoredValue(openAIStreamStorageKey, "true") !== "false",
  )
  const lucideProbeRef = useRef<HTMLDivElement>(null)
  const fromSvgInputRef = useRef<HTMLInputElement>(null)
  const toSvgInputRef = useRef<HTMLInputElement>(null)

  usePreviewAnimation(progress, setProgress, settings.duration, loop)

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
  const exportCode = useMemo(
    () => generateComponentCode(asset, settings, exportTarget),
    [asset, settings, exportTarget],
  )
  const AgentFromIcon = getLucideIcon(asset.fromIcon)
  const AgentToIcon = getLucideIcon(asset.toIcon)
  const hasFromSource = Boolean(asset.fromIcon || uploadedSvgs.from)
  const hasToSource = Boolean(asset.toIcon || uploadedSvgs.to)
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

  function updateDuration(value: number) {
    const duration = normalizeDuration(value)

    setSettings((current) => ({
      ...current,
      duration,
    }))
    setDurationInput(String(duration))
  }

  function commitDurationInput() {
    updateDuration(Number(durationInput))
  }

  useEffect(() => {
    setDurationInput(String(settings.duration))
  }, [settings.duration])

  useEffect(() => {
    if (!openAIKey.trim()) {
      window.localStorage.removeItem(openAIKeyStorageKey)
      return
    }

    window.localStorage.setItem(openAIKeyStorageKey, openAIKey)
  }, [openAIKey])

  useEffect(() => {
    const baseUrl = agentBaseUrl.trim()

    if (!baseUrl || baseUrl === defaultOpenAIBaseUrl) {
      window.localStorage.removeItem(openAIBaseUrlStorageKey)
      return
    }

    window.localStorage.setItem(openAIBaseUrlStorageKey, agentBaseUrl)
  }, [agentBaseUrl])

  useEffect(() => {
    const model = agentModel.trim()

    if (!model || model === defaultOpenAIModel) {
      window.localStorage.removeItem(openAIModelStorageKey)
      return
    }

    window.localStorage.setItem(openAIModelStorageKey, agentModel)
  }, [agentModel])

  useEffect(() => {
    if (agentStream) {
      window.localStorage.removeItem(openAIStreamStorageKey)
      return
    }

    window.localStorage.setItem(openAIStreamStorageKey, "false")
  }, [agentStream])

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
    }

    setSelectedPreset("custom")
    setAsset(nextAsset)
    setUploadedSvgs((current) => ({ ...current, [target]: undefined }))
    setPreviewMode("lucide")
    setAgentState({ status: "idle" })
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
      }

      setSelectedPreset("custom")
      setAsset(nextAsset)
      setUploadedSvgs((current) => ({
        ...current,
        [target]: { name: label, markup },
      }))
      setPreviewMode("morph")
      setAgentState({ status: "idle" })
      setSettings((current) => ({
        ...current,
        componentName: componentNameForAsset(nextAsset),
      }))
      setIconPickerTarget(null)
    } catch (error) {
      setAgentState({
        status: "error",
        message: error instanceof Error ? error.message : "SVG upload failed.",
      })
    }
  }

  function readRenderedIconSvg(target: "from" | "to") {
    const uploadedSvg = uploadedSvgs[target]?.markup
    if (uploadedSvg) return uploadedSvg

    const svg = lucideProbeRef.current?.querySelector<SVGSVGElement>(
      `svg[data-agent-icon="${target}"]`,
    )

    return svg?.outerHTML ?? ""
  }

  async function generateAgentMorphLayers() {
    if (!hasFromSource || !hasToSource) {
      setAgentState({
        status: "error",
        message: "Select or upload both SVG sources first.",
      })
      return
    }

    setAgentState({
      status: "running",
      message: "Generating morph layers...",
    })

    try {
      const data: AgentMorphResult = await generateMorphLayersWithAgent({
        apiKey: openAIKey,
        baseUrl: agentBaseUrl,
        model: agentModel.trim() || "gpt-5.4",
        stream: agentStream,
        fromIcon: asset.fromIcon || uploadedSvgs.from?.name || asset.fromLabel,
        toIcon: asset.toIcon || uploadedSvgs.to?.name || asset.toLabel,
        fromLabel: asset.fromLabel,
        toLabel: asset.toLabel,
        fromSvg: readRenderedIconSvg("from"),
        toSvg: readRenderedIconSvg("to"),
      })

      if (!Array.isArray(data.layers) || data.layers.length === 0) {
        throw new Error("Agent response did not include morph layers.")
      }

      const nextAsset: MorphAsset = {
        ...asset,
        id: data.id || asset.id,
        name: data.name || asset.name,
        viewBox: data.viewBox || "0 0 24 24",
        layers: data.layers,
      }

      setSelectedPreset("custom")
      setAsset(nextAsset)
      setPreviewMode("morph")
      setProgress(0)
      setLoop(false)
      setAgentState({
        status: "success",
        message: `${data.layers.length} morph layers generated.`,
        rationale: data.rationale,
      })
      setSettings((current) => ({
        ...current,
        componentName: componentNameForAsset(nextAsset),
      }))
    } catch (error) {
      setAgentState({
        status: "error",
        message: error instanceof Error ? error.message : "Agent request failed.",
      })
    }
  }

  function loadPreset(id: string) {
    const next = cloneAsset(getPresetById(id))
    setSelectedPreset(id)
    setAsset(next)
    setUploadedSvgs({})
    setProgress(0)
    setLoop(false)
    setPreviewMode("morph")
    setAgentState({ status: "idle" })
    setSettings((current) => ({
      ...current,
      componentName: componentNameForAsset(next),
    }))
  }

  async function copyCode() {
    await navigator.clipboard.writeText(exportCode)
    setCopyState("copied")
    window.setTimeout(() => setCopyState("idle"), 1200)
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div
        ref={lucideProbeRef}
        aria-hidden="true"
        className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0"
      >
        {AgentFromIcon && (
          <AgentFromIcon
            data-agent-icon="from"
            size={24}
            strokeWidth={settings.strokeWidth}
          />
        )}
        {AgentToIcon && (
          <AgentToIcon
            data-agent-icon="to"
            size={24}
            strokeWidth={settings.strokeWidth}
          />
        )}
      </div>
      <header className="sticky top-0 z-30 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur">
        <div className="flex min-h-16 flex-wrap items-center justify-between gap-3 px-4 py-3 lg:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-emerald-700/70 bg-emerald-950 text-emerald-200">
              <Layers3 className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <h1 className="truncate text-base font-semibold text-zinc-50">
                Morph Icon Studio
              </h1>
              <p className="truncate text-xs text-zinc-500">
                Pair-designed SVG path morph editor
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Tooltip content="Agent settings" align="end">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setSettingsOpen(true)}
                aria-label="Agent settings"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </Tooltip>
          </div>
        </div>
      </header>

      <main className="grid min-h-[calc(100vh-65px)] grid-cols-1 lg:grid-cols-[320px_minmax(420px,1fr)_420px]">
        <aside className="flex min-h-[560px] flex-col border-b border-zinc-800 bg-zinc-950 p-4 lg:h-[calc(100vh-65px)] lg:min-h-0 lg:border-b-0 lg:border-r lg:p-5">
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
          <div className="border-b border-zinc-800 pb-5">
            <Field label="Preset">
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
            </Field>
          </div>
          <div className="mt-5 flex min-h-0 flex-1 flex-col gap-3">
            <div>
              <div className="grid gap-2">
                <IconReferenceCard
                  target="from"
                  active={iconPickerTarget === "from"}
                  name={asset.fromIcon}
                  svgMarkup={uploadedSvgs.from?.markup}
                  label={asset.fromLabel}
                  color={settings.color}
                  onClick={() =>
                    setIconPickerTarget((current) =>
                      current === "from" ? null : "from",
                    )
                  }
                />
                <IconReferenceCard
                  target="to"
                  active={iconPickerTarget === "to"}
                  name={asset.toIcon}
                  svgMarkup={uploadedSvgs.to?.markup}
                  label={asset.toLabel}
                  color={settings.color}
                  onClick={() =>
                    setIconPickerTarget((current) =>
                      current === "to" ? null : "to",
                    )
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Button
                type="button"
                variant="default"
                onClick={generateAgentMorphLayers}
                disabled={
                  agentState.status === "running" ||
                  !hasFromSource ||
                  !hasToSource
                }
                className="w-full"
              >
                <Sparkles className="h-4 w-4" />
                {agentState.status === "running" ? "Generating" : "Generate Morph"}
              </Button>
              {agentState.status !== "idle" && (
                <div
                  aria-live="polite"
                  className={cn(
                    "rounded-md border px-3 py-2 text-xs leading-5",
                    agentState.status === "error"
                      ? "border-rose-900/80 bg-rose-950/40 text-rose-100"
                      : "border-zinc-800 bg-zinc-900/70 text-zinc-300",
                  )}
                >
                  <div>{agentState.message}</div>
                  {agentState.status === "success" && agentState.rationale && (
                    <div className="mt-1 text-zinc-500">
                      {agentState.rationale}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </aside>

        <section className="min-w-0 bg-zinc-950">
          <div className="flex min-h-[420px] flex-col border-b border-zinc-800">
            <div className="stage-grid relative grid flex-1 place-items-center overflow-hidden p-8">
              <div className="absolute right-4 top-4 z-10">
                <Tooltip content={loop ? "Pause loop" : "Loop preview"}>
                  <Button
                    variant={loop ? "default" : "secondary"}
                    size="icon"
                    onClick={() => setLoop((value) => !value)}
                    aria-label={loop ? "Pause loop" : "Loop preview"}
                  >
                    {loop ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                </Tooltip>
              </div>
              <StageReferenceStrip
                asset={asset}
                fromSvgMarkup={uploadedSvgs.from?.markup}
                toSvgMarkup={uploadedSvgs.to?.markup}
                color={settings.color}
                strokeWidth={settings.strokeWidth}
              />
              {previewMode === "morph" ? (
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
              )}
            </div>

            <div className="grid gap-4 border-t border-zinc-800 bg-zinc-950 p-4 md:grid-cols-[minmax(180px,1fr)_minmax(180px,260px)] md:items-start">
              <div className="space-y-1">
                <div className="flex h-7 items-center justify-between text-xs text-zinc-500">
                  <span>{asset.fromLabel}</span>
                  <span>{asset.toLabel}</span>
                </div>
                <Slider
                  value={progress}
                  onValueChange={(value) => {
                    setLoop(false)
                    setProgress(value)
                  }}
                />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between gap-3">
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
                      onChange={(event) => setDurationInput(event.currentTarget.value)}
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
            </div>
          </div>
        </section>

        <aside className="border-t border-zinc-800 bg-zinc-950 p-4 lg:border-l lg:border-t-0 lg:p-5">
          <SectionTitle
            icon={Code2}
            title="Export"
          />

          <div className="mt-4 flex flex-wrap gap-2">
            <Badge tone="neutral">{asset.layers.length} layers</Badge>
            <Badge tone="warning">{settings.duration}ms</Badge>
          </div>

          <Field label="Target" className="mt-4">
            <Select
              value={exportTarget}
              onValueChange={(value) => setExportTarget(value as ExportTarget)}
            >
              <SelectTrigger aria-label="Export target">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {exportTargets.map((target) => (
                  <SelectItem key={target.value} value={target.value}>
                    {target.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <CodePreview code={exportCode} copyState={copyState} onCopy={copyCode} />
        </aside>
      </main>
      {iconPickerTarget && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="icon-picker-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIconPickerTarget(null)
          }}
        >
          <div className="flex max-h-[min(760px,calc(100vh-32px))] w-full max-w-3xl flex-col overflow-hidden rounded-md border border-zinc-800 bg-zinc-950 p-4 shadow-panel">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <h2
                  id="icon-picker-title"
                  className="truncate text-sm font-semibold text-zinc-100"
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
      {settingsOpen && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="agent-settings-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSettingsOpen(false)
          }}
        >
          <div className="w-full max-w-lg rounded-md border border-zinc-800 bg-zinc-950 p-4 shadow-panel">
            <div className="flex items-center justify-between gap-3">
              <h2
                id="agent-settings-title"
                className="truncate text-sm font-semibold text-zinc-100"
              >
                Agent settings
              </h2>
              <Button
                variant="ghost"
                size="iconSm"
                onClick={() => setSettingsOpen(false)}
                aria-label="Close settings"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-4 space-y-4">
              <Field label="Base URL">
                <Input
                  value={agentBaseUrl}
                  onChange={(event) => setAgentBaseUrl(event.currentTarget.value)}
                  placeholder={defaultOpenAIBaseUrl}
                />
              </Field>
              <Field label="Model">
                <Input
                  value={agentModel}
                  onChange={(event) => setAgentModel(event.currentTarget.value)}
                  placeholder={defaultOpenAIModel}
                />
              </Field>
              <Field label="API key">
                <Input
                  type="password"
                  autoComplete="off"
                  value={openAIKey}
                  onChange={(event) => setOpenAIKey(event.currentTarget.value)}
                  placeholder="sk-..."
                />
              </Field>
              <div className="flex items-center justify-between rounded-md border border-zinc-800 bg-zinc-900/70 px-3 py-2">
                <Label>Streaming</Label>
                <Switch
                  checked={agentStream}
                  onCheckedChange={setAgentStream}
                  aria-label="Use streaming requests"
                />
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setAgentBaseUrl(defaultOpenAIBaseUrl)
                  setAgentModel(defaultOpenAIModel)
                  setAgentStream(true)
                }}
              >
                Reset
              </Button>
              <Button onClick={() => setSettingsOpen(false)}>Done</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
