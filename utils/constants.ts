import {
  AlertCircle,
  ArrowDown,
  ArrowRight,
  ArrowUp,
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

export const DEFAULT_STATUSES = [
  { name: "Todo", color: "#6b7280", order: 1, isDefault: true, icon: Circle },
  {
    name: "In Progress",
    color: "#2563eb",
    order: 2,
    isDefault: false,
    icon: Loader,
  },
  {
    name: "Done",
    color: "#16a34a",
    order: 3,
    isDefault: false,
    icon: CheckCircle2,
  },
  {
    name: "Canceled",
    color: "#ef4444",
    order: 4,
    isDefault: false,
    icon: XCircle,
  },
];

export const priorityList = [
  { value: "LOW", label: "Low", icon: ArrowDown, color: "#3b82f6" },
  { value: "MEDIUM", label: "Medium", icon: ArrowRight, color: "#f59e0b" },
  { value: "HIGH", label: "High", icon: ArrowUp, color: "#ef4444" },
  { value: "URGENT", label: "Urgent", icon: AlertCircle, color: "#dc2626" },
];
