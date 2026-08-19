"use client";

export default function OverviewCard({
  title,
  value,
  description,
  icon: Icon,
}: any) {
  return (
    <div
      className="
        group
        rounded-card
        border border-default
        bg-card
        p-5
        text-left
        shadow-card
        transition-normal
        hover:border-brand/30
        hover:shadow-md
      "
    >
      <div className="flex items-start justify-between">
        <div className="flex size-8 items-center justify-center rounded-lg bg-secondary">
          <Icon
            size={16}
            strokeWidth={2}
            className="text-secondary transition-normal group-hover:text-brand"
          />
        </div>
      </div>

      <div className="mt-4">
        <p className="text-2xl font-semibold tracking-tight text-primary">
          {value}
        </p>

        <p className="mt-1 text-sm font-medium text-primary">{title}</p>

        <p className="mt-0.5 text-xs text-secondary">{description}</p>
      </div>
    </div>
  );
}
