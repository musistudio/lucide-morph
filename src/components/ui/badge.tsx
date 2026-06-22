import * as React from "react"
import { cn } from "@/lib/utils"

type BadgeTone = "neutral" | "success" | "warning" | "danger" | "accent"

const tones: Record<BadgeTone, string> = {
  neutral: "border-zinc-700 bg-zinc-900 text-zinc-300",
  success: "border-emerald-700/70 bg-emerald-950/70 text-emerald-200",
  warning: "border-amber-700/70 bg-amber-950/70 text-amber-200",
  danger: "border-rose-700/70 bg-rose-950/70 text-rose-200",
  accent: "border-cyan-700/70 bg-cyan-950/70 text-cyan-200",
}

export function Badge({
  className,
  tone = "neutral",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { tone?: BadgeTone }) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center rounded-md border px-2 text-xs font-medium",
        tones[tone],
        className,
      )}
      {...props}
    />
  )
}
