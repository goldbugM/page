import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-apple text-apple-caption ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-br from-primary/95 via-accent/90 to-secondary/85 text-white hover:from-primary hover:via-accent hover:to-secondary shadow-medium border border-white/30",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-white/50 bg-white/10 text-white hover:bg-white/20 hover:text-white",
        secondary:
          "bg-white/20 text-white hover:bg-white/30 border border-white/30",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "bg-gradient-primary text-white hover:opacity-90 shadow-glow rounded-apple-xs text-apple-headline transform hover:scale-105 transition-elegant",
        luxury: "bg-gradient-rose text-primary-dark hover:opacity-95 shadow-medium rounded-apple-xs text-apple-caption border border-primary/20",
        floating: "bg-primary/90 text-white hover:bg-primary shadow-strong rounded-apple-xs text-apple-caption backdrop-blur-sm transform hover:scale-110 transition-elegant",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-apple px-3",
        lg: "h-11 rounded-apple px-8",
        xl: "h-14 px-10 py-4 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
