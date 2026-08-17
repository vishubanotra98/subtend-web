import * as React from "react";
import { Search } from "lucide-react";

import { cn } from "@/lib/utils";

export interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

function SearchInput({ className, ...props }: SearchInputProps) {
  return (
    <div
      className={cn(
        "flex h-11 w-full items-center rounded-lg border transition-normal",
        "border-default bg-card",
        "hover:border-brand",
        "focus-within:border-brand",
        "focus-within:ring-4 focus-within:ring-[rgba(20,184,166,0.12)]",
        "has-[:disabled]:pointer-events-none",
        "has-[:disabled]:cursor-not-allowed",
        "has-[:disabled]:opacity-50",
        className,
      )}
    >
      <Search
        size={18}
        strokeWidth={2}
        className="ml-4 shrink-0 text-secondary"
      />

      <input
        type="search"
        className={cn(
          "h-full w-full bg-transparent px-3 text-sm outline-none",
          "text-primary placeholder:text-secondary",
          "disabled:pointer-events-none disabled:cursor-not-allowed",
        )}
        {...props}
      />
    </div>
  );
}

export { SearchInput };
