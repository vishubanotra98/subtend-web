"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";

type Props = {
  children: ReactNode;
};

export function PageContainer({ children }: Props) {
  const pathname = usePathname();

  const isSettingsPage = pathname.includes("/settings");

  return (
    <div className="flex-1">
      <div className={isSettingsPage ? "w-full" : "w-full px-10 py-10"}>
        {children}
      </div>
    </div>
  );
}
