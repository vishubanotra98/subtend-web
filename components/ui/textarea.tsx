import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const textareaVariants = cva(
  [
    "w-full rounded-lg border resize-none outline-none transition-normal",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
    "aria-invalid:border-red-500",
    "aria-invalid:ring-4",
    "aria-invalid:ring-red-500/20",
  ],
  {
    variants: {
      variant: {
        default: [
          "min-h-[120px] px-4 py-3 text-sm",
          "border-default bg-card text-primary placeholder:text-secondary",
          "hover:border-brand",
          "focus:border-brand",
          "focus:ring-4 focus:ring-[rgba(20,184,166,0.12)]",
        ],

        auth: [
          "min-h-[120px] px-4 py-3 text-sm",
          "border-default bg-card text-primary placeholder:text-secondary",
          "hover:border-brand",
          "focus:border-brand",
          "focus:ring-4 focus:ring-[rgba(20,184,166,0.18)]",
        ],
      },
    },

    defaultVariants: {
      variant: "default",
    },
  },
);

export interface TextareaProps
  extends
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {}

function Textarea({ className, variant, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(textareaVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Textarea };
