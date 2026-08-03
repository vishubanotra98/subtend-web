"use client";

import * as React from "react";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import {
  DayPicker,
  getDefaultClassNames,
  type DayButton,
} from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
}) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "group/calendar bg-card p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className,
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString("default", { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn(
          "relative flex flex-col gap-4 md:flex-row",
          defaultClassNames.months,
        ),
        month: cn("flex w-full flex-col gap-3", defaultClassNames.month),
        nav: cn(
          "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
          defaultClassNames.nav,
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) rounded-md p-0 text-secondary transition-fast select-none hover:bg-secondary hover:text-primary aria-disabled:pointer-events-none aria-disabled:opacity-40",
          defaultClassNames.button_previous,
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) rounded-md p-0 text-secondary transition-fast select-none hover:bg-secondary hover:text-primary aria-disabled:pointer-events-none aria-disabled:opacity-40",
          defaultClassNames.button_next,
        ),
        month_caption: cn(
          "flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)",
          defaultClassNames.month_caption,
        ),
        dropdowns: cn(
          "flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-sm font-medium tracking-tight",
          defaultClassNames.dropdowns,
        ),
        dropdown_root: cn(
          "relative rounded-md border border-default transition-fast has-focus:border-[var(--ring)] has-focus:ring-[3px] has-focus:ring-[var(--ring)]/25",
          defaultClassNames.dropdown_root,
        ),
        dropdown: cn(
          "absolute inset-0 bg-card opacity-0",
          defaultClassNames.dropdown,
        ),
        caption_label: cn(
          "font-semibold tracking-tight select-none",
          captionLayout === "label"
            ? "text-sm"
            : "flex h-8 items-center gap-1 rounded-md pr-1 pl-2 text-sm transition-fast hover:bg-secondary [&>svg]:size-3.5 [&>svg]:text-secondary",
          defaultClassNames.caption_label,
        ),
        month_grid: cn("w-full border-collapse", defaultClassNames.month_grid),
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "flex-1 select-none rounded-md text-[11px] font-medium tracking-wide text-secondary/80 uppercase",
          defaultClassNames.weekday,
        ),
        week: cn("mt-1 flex w-full", defaultClassNames.week),
        week_number_header: cn(
          "w-(--cell-size) select-none",
          defaultClassNames.week_number_header,
        ),
        week_number: cn(
          "text-[0.8rem] tabular-nums text-secondary select-none",
          defaultClassNames.week_number,
        ),
        day: cn(
          "group/day relative aspect-square h-full w-full p-0 text-center select-none [&:last-child[data-selected=true]_button]:rounded-r-md",
          props.showWeekNumber
            ? "[&:nth-child(2)[data-selected=true]_button]:rounded-l-md"
            : "[&:first-child[data-selected=true]_button]:rounded-l-md",
          defaultClassNames.day,
        ),
        range_start: cn(
          "rounded-l-md bg-accent",
          defaultClassNames.range_start,
        ),
        range_middle: cn(
          "rounded-none bg-accent",
          defaultClassNames.range_middle,
        ),
        range_end: cn("rounded-r-md bg-accent", defaultClassNames.range_end),
        today: cn(
          "font-semibold text-brand",
          "data-[selected=true]:bg-brand",
          "data-[selected=true]:text-inverse",
          "data-[selected=true]:ring-0",
          defaultClassNames.today,
        ),
        outside: cn(
          "text-secondary/50 aria-selected:text-secondary/50",
          defaultClassNames.outside,
        ),
        disabled: cn(
          "pointer-events-none text-secondary/40 opacity-60",
          defaultClassNames.disabled,
        ),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          );
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return (
              <ChevronLeftIcon className={cn("size-4", className)} {...props} />
            );
          }

          if (orientation === "right") {
            return (
              <ChevronRightIcon
                className={cn("size-4", className)}
                {...props}
              />
            );
          }

          return (
            <ChevronDownIcon className={cn("size-4", className)} {...props} />
          );
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-(--cell-size) items-center justify-center text-center">
                {children}
              </div>
            </td>
          );
        },
        ...components,
      }}
      {...props}
    />
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames();

  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <button
      ref={ref}
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        // Base
        "inline-flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium text-primary transition-all duration-150 ease-out",

        // Hover
        "hover:bg-secondary hover:text-primary",

        // Focus
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30",

        // Keyboard Navigation
        "group-data-[focused=true]/day:ring-2 group-data-[focused=true]/day:ring-brand/30",

        // -----------------------
        // Single Selection
        // -----------------------
        "data-[selected-single=true]:bg-brand",
        "data-[selected-single=true]:text-inverse",
        "data-[selected-single=true]:hover:bg-[var(--primary-hover)]",
        "data-[selected-single=true]:active:bg-[var(--primary-active)]",

        // -----------------------
        // Range Start
        // -----------------------
        "data-[range-start=true]:rounded-l-lg",
        "data-[range-start=true]:bg-brand",
        "data-[range-start=true]:text-inverse",
        "data-[range-start=true]:hover:bg-[var(--primary-hover)]",

        // -----------------------
        // Range Middle
        // -----------------------
        "data-[range-middle=true]:bg-accent",
        "data-[range-middle=true]:text-primary",
        "data-[range-middle=true]:hover:bg-secondary",

        // -----------------------
        // Range End
        // -----------------------
        "data-[range-end=true]:rounded-r-lg",
        "data-[range-end=true]:bg-brand",
        "data-[range-end=true]:text-inverse",
        "data-[range-end=true]:hover:bg-[var(--primary-hover)]",

        // Disabled
        "disabled:pointer-events-none disabled:opacity-35",

        defaultClassNames.day,
        className,
      )}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };
