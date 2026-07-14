import * as React from "react"
import { cn } from "@/lib/utils"

type SwitchProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "checked" | "onChange"
> & {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}

export function Switch({
  className,
  checked,
  onCheckedChange,
  ...props
}: SwitchProps) {
  return (
    <label
      className={cn(
        "relative inline-flex h-6 w-10 cursor-pointer items-center rounded-full border border-zinc-300 bg-zinc-200 transition-colors has-[:checked]:border-[#FF5B00] has-[:checked]:bg-[#FF5B00]",
        className,
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onCheckedChange(event.currentTarget.checked)}
        className="peer sr-only"
        {...props}
      />
      <span className="ml-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform peer-checked:translate-x-4" />
    </label>
  )
}
