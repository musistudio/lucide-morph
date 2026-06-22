import * as React from "react"
import { cn } from "@/lib/utils"

export function Tooltip({
  align = "center",
  content,
  children,
  className,
}: {
  align?: "center" | "end" | "start"
  content: string
  children: React.ReactNode
  className?: string
}) {
  const alignClassName = {
    center: "left-1/2 -translate-x-1/2",
    end: "right-0",
    start: "left-0",
  }[align]

  return (
    <span className="group relative inline-flex">
      {children}
      <span
        className={cn(
          "pointer-events-none absolute top-full z-50 mt-2 hidden whitespace-nowrap rounded-md border border-zinc-700 bg-zinc-950 px-2 py-1 text-xs text-zinc-200 opacity-0 shadow-panel transition-opacity group-hover:block group-hover:opacity-100 group-focus-within:block group-focus-within:opacity-100",
          alignClassName,
          className,
        )}
      >
        {content}
      </span>
    </span>
  )
}
