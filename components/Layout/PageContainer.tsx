"use client";

import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function PageContainer({ children }: Props) {
  return (
    <div className="flex-1 ">
      <div
        className="
          w-full px-10 py-10
        "
      >
        {children}
      </div>
    </div>
  );
}
