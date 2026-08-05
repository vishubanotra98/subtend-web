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
  PlusCircle,
  Trash2,
  ArrowRightLeft,
  Flag,
  UserPlus,
  Pencil,
  CircleSlash,
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
  {
    name: "Blocked",
    color: "#ef4444",
    order: 5,
    isDefault: false,
    icon: CircleSlash,
  },
];

export const priorityList = [
  { value: "LOW", label: "Low", icon: ArrowDown, color: "#3b82f6" },
  { value: "MEDIUM", label: "Medium", icon: ArrowRight, color: "#f59e0b" },
  { value: "HIGH", label: "High", icon: ArrowUp, color: "#ef4444" },
  { value: "URGENT", label: "Urgent", icon: AlertCircle, color: "#dc2626" },
];

export const getTeamPrefix = (team: any, issue: any) => {
  const teamPrefix = team?.name?.split("")?.splice(0, 3)?.join("");
  const ticketNumber = `${teamPrefix}-${issue?.ticket_num}`;

  return ticketNumber;
};

export const activityConfig: any = {
  CREATED: {
    icon: PlusCircle,
    label: "created",
    color: "text-emerald-400",
  },
  DELETED: {
    icon: Trash2,
    label: "deleted",
    color: "text-red-400",
  },
  STATUS_CHANGED: {
    icon: ArrowRightLeft,
    label: "changed the status of",
    color: "text-blue-400",
  },
  PRIORITY_CHANGED: {
    icon: Flag,
    label: "updated the priority of",
    color: "text-orange-400",
  },
  ASSIGNED: {
    icon: UserPlus,
    label: "assigned",
    color: "text-indigo-400",
  },
  DETAILS_UPDATED: {
    icon: Pencil,
    label: "updated the details of",
    color: "text-gray-400",
  },
};

export const nameInitials = (user: any) => {
  return user?.name
    ? user?.name
        ?.split(" ")
        .map((item: any) => item[0])
        .join("")
    : user?.firstName[0] + user?.lastName[0];
};
