import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const inputVariants = cva(
  [
    "flex w-full rounded-lg border outline-none transition-normal",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
    "file:border-0 file:bg-transparent file:text-sm file:font-medium",
    "aria-invalid:border-red-500",
    "aria-invalid:ring-4",
    "aria-invalid:ring-red-500/20",
  ],
  {
    variants: {
      variant: {
        default: [
          "h-12 px-4 text-sm",
          "border-default bg-card text-primary placeholder:text-secondary",
          "hover:border-brand",
          "focus:border-brand",
          "focus:ring-4 focus:ring-[rgba(20,184,166,0.12)]",
        ],

        auth: [
          "h-12 px-4 text-sm",
          "border-default bg-card text-primary placeholder:text-secondary",
          "hover:border-brand",
          "focus:border-brand",
          "focus:ring-4 focus:ring-[rgba(20,184,166,0.18)]",
        ],

        error: [
          "h-12 px-4 text-sm",
          "border-[var(--destructive)] bg-card text-primary placeholder:text-secondary",
          "hover:border-[var(--destructive)]",
          "focus:border-[var(--destructive)]",
          "focus:ring-4 focus:ring-[rgba(220,38,38,0.18)]",
        ],
      },
    },

    defaultVariants: {
      variant: "default",
    },
  },
);

export interface InputProps
  extends
    React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

function Input({ className, variant, type, ...props }: InputProps) {
  return (
    <input
      type={type}
      className={cn(inputVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Input };
