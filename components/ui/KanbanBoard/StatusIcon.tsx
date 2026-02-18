"use client";

import React from "react";
import { Status, statusConfig } from "@/utils/constants";

export default function Icon({ status }: { status: Status }) {
  const config = statusConfig[status];
  const LucideIcon = config.icon;

  return (
    <div className="flex items-center gap-1.5">
      <LucideIcon
        size={14}
        color={config.color}
        className={status === "inProgress" ? "animate-spin" : ""}
      />

      <span className="text-xs font-medium text-neutral-200">
        {config.name}
      </span>
    </div>
  );
}
