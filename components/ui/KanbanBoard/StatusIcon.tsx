"use client";

import React from "react";
import { DEFAULT_STATUSES } from "@/utils/constants";
import { Circle } from "lucide-react";

export default function Icon({ status }: { status: any }) {
  const config = DEFAULT_STATUSES.find((st) => st.name === status);
  const LucideIcon = config ? config.icon : Circle;

  return (
    <div className="flex items-center gap-1.5">
      <LucideIcon
        size={14}
        color={config ? config.color : "#6b7280"}
        className={status === "In Progress" ? "animate-spin" : ""}
      />

      <span className="text-xs font-medium text-neutral-200">{status}</span>
    </div>
  );
}
