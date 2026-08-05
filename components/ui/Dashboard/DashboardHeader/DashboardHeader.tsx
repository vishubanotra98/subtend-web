"use client";

import DashboardButton from "@/components/Common/TeamDashboardButton";
import { Sun } from "lucide-react";

export default function DashboardHeader({
  workspaceName = "Engineering",
  workspaceId,
}: {
  workspaceName?: string;
  workspaceId: string;
}) {
  const hour = new Date().getHours();

  const greeting =
    hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  return (
    <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div className="space-y-1.5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-brand/20 bg-brand/10">
            <Sun className="h-4 w-4 text-brand" />
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-primary">
            {greeting}, Vishu
          </h1>
        </div>

        <p className="text-sm text-secondary">
          Here's what's happening in{" "}
          <span className="font-medium text-primary">{workspaceName}</span>{" "}
          today.
        </p>
      </div>

      <DashboardButton workspaceId={workspaceId} />
    </header>
  );
}
