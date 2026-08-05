"use client";

import { ReactNode } from "react";

type Props = {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
};

export function PageHeader({ title, subtitle, actions }: Props) {
  return (
    <header className="mb-10 flex items-start justify-between gap-8">
      <div className="min-w-0">
        <h1 className="text-3xl font-semibold tracking-tight text-primary">
          {title}
        </h1>

        {subtitle && <p className="mt-2 text-sm text-secondary">{subtitle}</p>}
      </div>

      {actions && (
        <div className="flex shrink-0 items-center gap-3">{actions}</div>
      )}
    </header>
  );
}
