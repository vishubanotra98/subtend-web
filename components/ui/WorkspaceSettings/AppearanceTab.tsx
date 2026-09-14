"use client";

import { cn } from "@/lib/utils";
import { Monitor, Moon, Palette, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type ThemeOption = {
  label: string;
  value: "light" | "dark" | "system";
  icon: React.ElementType;
  description: string;
};

const themeOptions: ThemeOption[] = [
  {
    label: "Light",
    value: "light",
    icon: Sun,
    description: "Use the light workspace theme.",
  },
  {
    label: "Dark",
    value: "dark",
    icon: Moon,
    description: "Use the dark workspace theme.",
  },
  {
    label: "System",
    value: "system",
    icon: Monitor,
    description: "Match your device appearance.",
  },
];

export const AppearanceTab = () => {
  const { resolvedTheme, setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setMounted(true));

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const currentTheme = mounted ? theme : undefined;
  const resolvedLabel = resolvedTheme === "dark" ? "Dark" : "Light";

  return (
    <div className="space-y-10">
      <section>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
            <Palette size={16} className="text-brand" />
          </div>

          <h2 className="text-base font-semibold text-primary">Appearance</h2>
        </div>

        <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-secondary">
          Choose how Subtend looks in this browser.
        </p>
      </section>

      <section className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-primary">Theme</h3>

          <p className="mt-1 text-xs leading-5 text-secondary">
            Your selection is saved automatically.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {themeOptions.map((option) => {
            const Icon = option.icon;
            const isActive = currentTheme === option.value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  document.cookie = `theme=${option.value}; path=/; max-age=31536000; SameSite=Lax;`;

                  setTheme(option.value);
                }}
                className={cn(
                  "focus-ring flex min-h-32 cursor-pointer flex-col items-start rounded-xl border bg-card p-4 text-left transition-colors duration-150",
                  isActive
                    ? "border-brand bg-accent text-brand"
                    : "border-border text-primary hover:border-brand/50 hover:bg-accent/50",
                )}
              >
                <span
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-lg border",
                    isActive
                      ? "border-brand/30 bg-brand/10"
                      : "border-border bg-secondary",
                  )}
                >
                  <Icon size={18} strokeWidth={1.8} />
                </span>

                <span className="mt-4 text-sm font-semibold">
                  {option.label}
                </span>

                <span
                  className={cn(
                    "mt-1 text-xs leading-5",
                    isActive ? "text-brand" : "text-secondary",
                  )}
                >
                  {option.description}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <div className="border-t border-border pt-6">
        <div className="flex max-w-2xl gap-3">
          <div className="mt-2 size-1.5 shrink-0 rounded-full bg-secondary" />

          <p className="text-sm leading-relaxed text-secondary">
            <strong className="font-medium text-primary">
              Current appearance:
            </strong>{" "}
            {mounted
              ? currentTheme === "system"
                ? `System (${resolvedLabel})`
                : resolvedLabel
              : "Loading"}
          </p>
        </div>
      </div>
    </div>
  );
};
