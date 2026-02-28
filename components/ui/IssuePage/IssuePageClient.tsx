"use client";

import DescriptionEditor from "@/components/Common/TextEditor";
import { DEFAULT_STATUSES, priorityList } from "@/utils/constants";
import { commonSelectStyles } from "@/utils/styles";
import { CircleUser, Flag, SignalHigh } from "lucide-react";
import { useEffect, useState } from "react";
import Select, { ControlProps, components } from "react-select";

const createCustomControl = (Icon: any) => {
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
const AssigneeControl = createCustomControl(CircleUser);

const CustomOption = (props: any) => {
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

const CustomSingleValue = (props: any) => {
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

const createCustomPlaceholder = (PlaceholderIcon: any) => {
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
const StatusPlaceholder = createCustomPlaceholder(Flag);
const PriorityPlaceholder = createCustomPlaceholder(SignalHigh);

// Component
export const IssuePageClient = ({ issueData }: any) => {
  const { selectedIssue, statusList, workspaceMembers } = issueData;

  const [issueState, setIssueState] = useState(selectedIssue);
  const members = workspaceMembers?.map((mem: any) => {
    const name = !mem?.name
      ? mem?.user?.firstName + " " + mem?.user?.lastName
      : mem?.name;
    return {
      userId: mem.userId,
      role: mem?.role,
      name,
      email: mem.user?.email,
    };
  });

  return (
    <div className="flex justify-center">
      <div className="mt-10 w-[90%] h-screen rounded-md bg-[#1F2937] border border-[#374151] shadow-sm flex overflow-hidden">
        <div className="p-6 border-r border-[#374151] flex-1 flex flex-col">
          <textarea
            className="w-full bg-transparent text-3xl font-bold text-gray-100 placeholder:text-gray-500 outline-none resize-none mb-2"
            placeholder="Issue Title"
            rows={1}
            autoFocus
            value={issueState?.title}
            onChange={(e) => {
              setIssueState((prev: any) => ({
                ...prev,
                title: e.target.value,
              }));
            }}
          />

          <hr className="border-[#374151] mb-6 mt-2" />

          <div className="flex-1 overflow-y-auto pr-2">
            <DescriptionEditor
              state={issueState}
              setState={setIssueState}
              isEditing={true}
            />
          </div>
        </div>

        <div className="p-6 w-[300px] shrink-0 bg-[#111827]/30">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col">
              <label className="text-xs font-semibold text-gray-400 tracking-wider mb-1.5">
                Assignee
              </label>
              <Select
                options={members}
                onChange={(val: any) =>
                  setIssueState((prev: any) => ({
                    ...prev,
                    assigneeId: val?.userId,
                  }))
                }
                value={
                  members?.find(
                    (mem: any) => mem?.userId === issueState?.assigneeId,
                  ) || null
                }
                getOptionValue={(val: any) => val.userId}
                getOptionLabel={(val: any) => val.name}
                placeholder="Assignee"
                styles={commonSelectStyles}
                components={{ Control: AssigneeControl }}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-semibold text-gray-400 tracking-wider mb-1.5">
                Status
              </label>
              <Select
                options={statusList}
                defaultValue={statusList.find(
                  (item: any) => item?.id === issueState?.statusId,
                )}
                onChange={(val: any) =>
                  setIssueState((prev: any) => ({ ...prev, statusId: val?.id }))
                }
                value={
                  statusList?.find(
                    (st: any) => st.id === issueState.statusId,
                  ) || null
                }
                getOptionValue={(val: any) => val.id}
                getOptionLabel={(val: any) => val.name}
                placeholder="Status"
                styles={commonSelectStyles}
                components={{
                  Option: CustomOption,
                  SingleValue: CustomSingleValue,
                  Placeholder: StatusPlaceholder,
                }}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-semibold text-gray-400 tracking-wider mb-1.5">
                Priority
              </label>
              <Select
                options={priorityList}
                onChange={(val: any) =>
                  setIssueState((prev: any) => ({
                    ...prev,
                    priority: val?.value,
                  }))
                }
                value={
                  priorityList.find(
                    (p: any) => p.value === issueState.priority,
                  ) || null
                }
                getOptionValue={(val: any) => val.value}
                getOptionLabel={(val: any) => val.label}
                placeholder="Priority"
                styles={commonSelectStyles}
                components={{
                  Option: CustomOption,
                  SingleValue: CustomSingleValue,
                  Placeholder: PriorityPlaceholder,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
