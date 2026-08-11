"use client";

import DashboardButton from "@/components/Common/TeamDashboardButton";
import { Sun } from "lucide-react";

export default function DashboardHeader({
  selectedWorkspace,
  userData,
  isAdmin = false,
}: any) {
  const hour = new Date().getHours();
  const userName =
    userData?.user?.name ??
    `${userData?.user?.firstName ?? ""} ${userData?.user?.lastName ?? ""}`.trim();

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
            {greeting}, {userName?.split(" ")[0]}
          </h1>
        </div>

        <p className="text-sm text-secondary">
          Here's what's happening in{" "}
          <span className="font-medium text-primary">
            {selectedWorkspace?.name}
          </span>{" "}
          today.
        </p>
      </div>

      {isAdmin && <DashboardButton />}
    </header>
  );
}
