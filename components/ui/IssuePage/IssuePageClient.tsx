"use client";

import { editIssueAction } from "@/actions/workspace.actions";
import DescriptionEditor from "@/components/Common/TextEditor";
import { DEFAULT_STATUSES, priorityList } from "@/utils/constants";
import { commonSelectStyles } from "@/utils/styles";
import { ArrowLeft, CircleUser, Flag, SignalHigh } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Select, { ControlProps, components } from "react-select";
import { DeleteModal } from "./DeleteModal";
import { useAppSelector } from "@/Store/hooks";

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

export const IssuePageClient = ({ issueData }: any) => {
  const {
    workspaceData: { workspaceStatus },
  } = useAppSelector((store: any) => store);

  const { selectedIssue, workspaceMembers } = issueData;
  const router = useRouter();
  const { workspaceId, teamId, projectId, issueId } = useParams();
  const [issueState, setIssueState] = useState(selectedIssue);
  const [statusList, setStatusList] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const firstRdr = useRef(true);

  const { title, description, priority, statusId, assigneeId } = issueState;

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

  useEffect(() => {
    setStatusList(workspaceStatus);
  }, [workspaceStatus]);

  console.log("Status List: ", statusList);

  useEffect(() => {
    if (firstRdr.current) {
      firstRdr.current = false;
      return;
    }

    const delayDebounce = setTimeout(async () => {
      const payload = {
        workspaceId,
        teamId,
        projectId,
        issueId,
        title,
        description,
        assigneeId,
        priority,
        statusId,
      };
      await editIssueAction(payload);
    }, 1000);

    return () => clearTimeout(delayDebounce);
  }, [title, description, priority, statusId, assigneeId]);

  return (
    <div className="w-[90%] mx-auto">
      <div className="flex justify-end ">
        <button
          onClick={() =>
            router.push(`/${workspaceId}/team/${teamId}/project/${projectId}`)
          }
          className="flex items-center gap-1 button-primary !px-6 !py-2"
        >
          <ArrowLeft size={14} />
          Back
        </button>
      </div>
      <div className="mt-5   h-screen rounded-md bg-[#1F2937] border border-[#374151] shadow-sm flex overflow-hidden">
        <div className="p-6 border-r border-[#374151] flex-1 flex flex-col">
          <textarea
            className="w-full bg-transparent text-3xl font-bold text-gray-100 placeholder:text-gray-500 outline-none overflow-hidden resize-none mb-2"
            placeholder="Issue Title"
            rows={1}
            autoFocus
            value={issueState?.title}
            onChange={(e) => {
              const newVal = e.target.value;
              setIssueState((prev: any) => ({
                ...prev,
                title: newVal,
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
                onChange={(val: any) => {
                  setIssueState((prev: any) => ({
                    ...prev,
                    assigneeId: val?.userId,
                  }));
                }}
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
                onChange={(val: any) => {
                  setIssueState((prev: any) => ({
                    ...prev,
                    statusId: val?.id,
                  }));
                }}
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
                onChange={(val: any) => {
                  setIssueState((prev: any) => ({
                    ...prev,
                    priority: val?.value,
                  }));
                }}
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

            <DeleteModal open={open} setOpen={setOpen} />
          </div>
        </div>
      </div>
    </div>
  );
};
