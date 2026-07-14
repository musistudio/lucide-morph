import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium outline-none transition-colors disabled:pointer-events-none disabled:opacity-45 focus-visible:ring-2 focus-visible:ring-[#FF5B00]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFF7ED]",
  {
    variants: {
      variant: {
        default: "bg-[#FF5B00] text-white hover:bg-[#E64D00]",
        secondary: "bg-zinc-100 text-zinc-950 hover:bg-zinc-200",
        outline:
          "border border-zinc-200 bg-white text-zinc-950 hover:bg-zinc-100",
        ghost: "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950",
        destructive: "bg-rose-600 text-white hover:bg-rose-500",
      },
      size: {
        default: "h-9 px-3",
        sm: "h-8 px-2.5 text-xs",
        icon: "h-9 w-9",
        iconSm: "h-8 w-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  ),
)

Button.displayName = "Button"
