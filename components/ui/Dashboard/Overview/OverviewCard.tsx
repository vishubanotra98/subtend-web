"use client";

type OverviewCardProps = {
  title: string;
  value: number | string;
};

export default function OverviewCard({ title, value }: OverviewCardProps) {
  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-card
        border
        border-default
        bg-card
        shadow-card
        px-6
        py-6
        min-h-[140px]
        transition-normal
        hover-card
        hover:border-brand
      "
    >
      <div
        className="
          absolute
          left-0
          top-0
          h-px
          w-0
          bg-brand
          transition-normal
          group-hover:w-full
        "
      />

      <p
        className="
          text-[11px]
          font-semibold
          uppercase
          tracking-[0.18em]
          text-secondary
        "
      >
        {title}
      </p>

      <h3
        className="
          mt-4
          text-4xl
          font-semibold
          tracking-tight
          text-primary
          transition-colors
          duration-200
        "
      >
        {value}
      </h3>
    </div>
  );
}
