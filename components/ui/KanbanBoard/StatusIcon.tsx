"use client";

import { Circle } from "lucide-react";
import { DEFAULT_STATUSES } from "@/utils/constants";

export default function Icon({ status }: { status: string }) {
  const config = DEFAULT_STATUSES.find((st) => st.name === status);

  const LucideIcon = config?.icon ?? Circle;

  return (
    <div className="flex items-center gap-2">
      <LucideIcon
        size={15}
        color={config?.color}
        className={status === "In Progress" ? "animate-spin" : ""}
      />

      <span className="text-sm font-semibold tracking-tight text-primary">
        {status}
      </span>
    </div>
  );
}
