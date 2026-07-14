import * as React from "react"
import { Check, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

type SelectContextValue = {
  disabled?: boolean
  open: boolean
  selectedLabel: string
  setOpen: (open: boolean) => void
  setSelectedLabel: (label: string) => void
  value: string
  onValueChange: (value: string) => void
}

const SelectContext = React.createContext<SelectContextValue | undefined>(
  undefined,
)

function useSelectContext(component: string) {
  const context = React.useContext(SelectContext)

  if (!context) {
    throw new Error(`${component} must be used inside Select.`)
  }

  return context
}

type SelectProps = {
  children: React.ReactNode
  disabled?: boolean
  value: string
  onValueChange: (value: string) => void
}

export function Select({
  children,
  disabled,
  value,
  onValueChange,
}: SelectProps) {
  const [open, setOpen] = React.useState(false)
  const [selectedLabel, setSelectedLabel] = React.useState("")
  const rootRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener("pointerdown", handlePointerDown)
    return () => document.removeEventListener("pointerdown", handlePointerDown)
  }, [])

  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false)
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <SelectContext.Provider
      value={{
        disabled,
        open,
        selectedLabel,
        setOpen,
        setSelectedLabel,
        value,
        onValueChange,
      }}
    >
      <div ref={rootRef} className="relative">
        {children}
      </div>
    </SelectContext.Provider>
  )
}

export const SelectTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  const { disabled, open, setOpen } = useSelectContext("SelectTrigger")

  return (
    <button
      ref={ref}
      type="button"
      aria-expanded={open}
      disabled={disabled}
      onClick={() => setOpen(!open)}
      className={cn(
        "flex h-9 w-full items-center justify-between gap-2 rounded-md border border-zinc-200 bg-white px-3 text-left text-sm text-zinc-950 outline-none transition-colors hover:bg-zinc-50 focus:border-[#FF5B00] focus:ring-2 focus:ring-[#FF5B00]/15 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <span className="min-w-0 truncate">{children}</span>
      <ChevronDown
        aria-hidden="true"
        className={cn(
          "h-4 w-4 shrink-0 text-zinc-500 transition-transform",
          open && "rotate-180",
        )}
      />
    </button>
  )
})

SelectTrigger.displayName = "SelectTrigger"

export function SelectValue({ placeholder }: { placeholder?: string }) {
  const { selectedLabel, value } = useSelectContext("SelectValue")

  return <>{selectedLabel || placeholder || value}</>
}

export function SelectContent({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  const { open } = useSelectContext("SelectContent")

  return (
    <div
      hidden={!open}
      className={cn(
        "absolute left-0 right-0 top-full z-50 mt-1 max-h-72 overflow-auto rounded-md border border-zinc-200 bg-white p-1 text-sm text-zinc-950 shadow-panel",
        !open && "hidden",
        className,
      )}
      role="listbox"
    >
      {children}
    </div>
  )
}

export function SelectItem({
  className,
  children,
  value,
}: {
  className?: string
  children: React.ReactNode
  value: string
}) {
  const {
    value: selectedValue,
    setOpen,
    setSelectedLabel,
    onValueChange,
  } = useSelectContext("SelectItem")
  const selected = selectedValue === value
  const label = typeof children === "string" ? children : value

  React.useEffect(() => {
    if (selected) setSelectedLabel(label)
  }, [label, selected, setSelectedLabel])

  return (
    <button
      type="button"
      role="option"
      aria-selected={selected}
      onClick={() => {
        onValueChange(value)
        setSelectedLabel(label)
        setOpen(false)
      }}
      className={cn(
        "flex min-h-8 w-full items-center justify-between gap-2 rounded-sm px-2 py-1.5 text-left outline-none transition-colors hover:bg-zinc-100 focus:bg-zinc-100",
        selected ? "text-[#FF5B00]" : "text-zinc-700",
        className,
      )}
    >
      <span className="min-w-0 truncate">{children}</span>
      {selected && <Check aria-hidden="true" className="h-4 w-4 shrink-0" />}
    </button>
  )
}
