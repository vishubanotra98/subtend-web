import {
  CheckCircle2,
  Circle,
  Inbox,
  Loader,
  PauseCircle,
  XCircle,
} from "lucide-react";

export const NAV_ITEMS = [
  {
    label: "Dashboard",
    to: "/dashboard",
  },
  {
    label: "Issues",
    to: "/issues",
  },
];

export type Status =
  | "backlog"
  | "todo"
  | "inProgress"
  | "completed"
  | "cancelled"
  | "blocked";

export const statusConfig = {
  backlog: {
    name: "Backlog",
    icon: Inbox,
    color: "#6b7280",
  },
  todo: {
    name: "Todo",
    icon: Circle,
    color: "#6b7280",
  },
  inProgress: {
    name: "In Progress",
    icon: Loader,
    color: "#2563eb",
  },
  completed: {
    name: "Completed",
    icon: CheckCircle2,
    color: "#16a34a",
  },
  cancelled: {
    name: "Cancelled",
    icon: XCircle,
    color: "#ef4444",
  },
  blocked: {
    name: "Blocked",
    icon: PauseCircle,
    color: "#f59e0b",
  },
} as const;
