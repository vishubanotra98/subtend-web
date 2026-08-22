"use client";

import { Loader2 } from "lucide-react";
import { redirect, useSearchParams } from "next/navigation";

export const Integration = () => {
  const searchParams = useSearchParams();

  const githubConnected = searchParams.get("githubconnected");


  if (githubConnected) {
    redirect("http://localhost:3000/cmsrndmdo000bsfqgs21kfaau/settings");
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center text-center">
        <div className="flex size-10 items-center justify-center rounded-xl border border-default bg-card shadow-card">
          <Loader2
            size={18}
            strokeWidth={2}
            className="animate-spin text-brand"
          />
        </div>

        <h2 className="mt-4 text-sm font-semibold text-primary">
          Connecting integration
        </h2>

        <p className="mt-1.5 max-w-sm text-xs leading-5 text-secondary">
          We're completing the connection and setting things up for your
          workspace.
        </p>
      </div>
    </div>
  );
};
