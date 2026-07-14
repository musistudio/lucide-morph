import * as React from "react"
import { cn } from "@/lib/utils"

type BadgeTone = "neutral" | "success" | "warning" | "danger" | "accent"

const tones: Record<BadgeTone, string> = {
  neutral: "border-zinc-200 bg-white text-zinc-600",
  success: "border-emerald-200 bg-emerald-50 text-emerald-700",
  warning: "border-amber-200 bg-amber-50 text-amber-700",
  danger: "border-rose-200 bg-rose-50 text-rose-700",
  accent: "border-[#FF5B00]/25 bg-[#FF5B00]/10 text-[#9A3412]",
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
