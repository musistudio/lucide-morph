import * as React from "react"
import { cn } from "@/lib/utils"

type SliderProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "value" | "onChange"
> & {
  value: number
  onValueChange: (value: number) => void
}

export function Slider({
  className,
  value,
  onValueChange,
  min = 0,
  max = 1,
  step = 0.01,
  ...props
}: SliderProps) {
  return (
    <input
      type="range"
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={(event) => onValueChange(Number(event.currentTarget.value))}
      className={cn("m-0 h-9 w-full cursor-pointer", className)}
      {...props}
    />
  )
}
