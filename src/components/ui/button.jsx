// src/components/ui/button.jsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Variants + Fire-Style Hover Animation
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-semibold ring-offset-background transition duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-orange-600 hover:shadow-[0_0_15px_4px_rgba(255,115,0,0.6)] hover:animate-firepulse",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-red-600 hover:shadow-[0_0_15px_4px_rgba(255,0,0,0.6)] hover:animate-firepulse",
        outline:
          "border border-input bg-background hover:bg-orange-100 hover:text-orange-900 hover:animate-firepulse",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-orange-500 hover:shadow-[0_0_15px_4px_rgba(255,125,0,0.5)] hover:animate-firepulse",
        ghost:
          "hover:bg-orange-100 hover:text-orange-800 hover:animate-firepulse",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 rounded-md px-4",
        lg: "h-11 rounded-md px-8 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
