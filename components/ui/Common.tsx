import { ControlProps, components } from "react-select";
import { DEFAULT_STATUSES } from "@/utils/constants";
import { CircleUser, Flag, SignalHigh } from "lucide-react";

export const createCustomControl = (Icon: any) => {
  return function CustomSelectControl({
    children,
    ...props
  }: ControlProps<any>) {
    return (
      <components.Control {...props}>
        <div className="pl-2.5 flex items-center text-gray-400 shrink-0">
          <Icon size={14} />
        </div>
        {children}
      </components.Control>
    );
  };
};

export const AssigneeControl = createCustomControl(CircleUser);
export const CustomOption = (props: any) => {
  const Icon =
    props.data.icon ||
    DEFAULT_STATUSES.find((st) => st.name === props.data.name)?.icon;
  const color =
    props.data.color ||
    DEFAULT_STATUSES.find((st) => st.name === props.data.name)?.color;

  return (
    <components.Option {...props}>
      <div className="flex items-center gap-2">
        {Icon && <Icon size={14} style={{ color: color }} />}
        <span>{props.label || props.data.name}</span>
      </div>
    </components.Option>
  );
};

export const CustomSingleValue = (props: any) => {
  const Icon =
    props.data.icon ||
    DEFAULT_STATUSES.find((st) => st.name === props.data.name)?.icon;
  const color =
    props.data.color ||
    DEFAULT_STATUSES.find((st) => st.name === props.data.name)?.color;

  return (
    <components.SingleValue {...props}>
      <div className="flex items-center gap-2">
        {Icon && <Icon size={14} style={{ color: color }} />}
        <span>{props.children}</span>
      </div>
    </components.SingleValue>
  );
};

export const createCustomPlaceholder = (PlaceholderIcon: any) => {
  return function CustomPlaceholder(props: any) {
    return (
      <components.Placeholder {...props}>
        <div className="flex items-center gap-2 text-gray-400">
          <PlaceholderIcon size={14} />
          <span>{props.children}</span>
        </div>
      </components.Placeholder>
    );
  };
};

export const StatusPlaceholder = createCustomPlaceholder(Flag);
export const PriorityPlaceholder = createCustomPlaceholder(SignalHigh);
