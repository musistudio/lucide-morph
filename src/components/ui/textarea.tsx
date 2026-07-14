import * as React from "react"
import { cn } from "@/lib/utils"

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "min-h-20 w-full resize-y rounded-md border border-zinc-200 bg-white px-3 py-2 font-mono text-xs leading-5 text-zinc-950 outline-none transition-colors placeholder:text-zinc-400 focus:border-[#FF5B00] focus:ring-2 focus:ring-[#FF5B00]/15 disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  />
))

Textarea.displayName = "Textarea"
