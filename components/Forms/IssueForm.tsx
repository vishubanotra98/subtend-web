"use client";

import { commonSelectStyles } from "@/utils/styles";
import Tiptap from "../Common/TextEditor";
import { CircleUser, Flag, SignalHigh } from "lucide-react";
import Select, { ControlProps, components } from "react-select";
import { DEFAULT_STATUSES, priorityList } from "@/utils/constants";
import { addIssueAction } from "@/actions/workspace.actions";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import { Spinner } from "../ui/Spinner/spinner";
import { useState } from "react";

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

export const IssueForm = ({ issueFormProp }: any) => {
  const params = useParams();
  const {
    workspaceMembers,
    statusList,
    issueState,
    setIssueState,
    handleClose,
  } = issueFormProp;

  const [loading, setLoading] = useState(false);
  const { projectId, workspaceId, teamId } = params;
  const { title, description, userId, priority, status } = issueState;

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

  const submitHandler = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      title,
      description,
      userId,
      priority,
      status,
      projectId,
      workspaceId,
      teamId,
    };
    const res = await addIssueAction(payload);
    if (res?.success) {
      toast.success(res?.message);
      handleClose();
    } else {
      toast.error(res?.message);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={submitHandler} className="flex flex-col h-full gap-4 mt-2">
      <div>
        <textarea
          className="w-full bg-transparent text-2xl font-semibold text-gray-100 placeholder:text-gray-500  outline-none overflow-hidden resize-none"
          placeholder="Issue Title"
          rows={1}
          autoFocus
          onChange={(e) => {
            setIssueState((prev: any) => ({
              ...prev,
              title: e.target.value,
            }));
          }}
        />
      </div>

      <div className="min-h-[20vh] text-gray-300 text-sm [&_.ProseMirror]:outline-none [&_.ProseMirror.is-editor-empty:before]:text-gray-600">
        <Tiptap state={issueState} setState={setIssueState} />
      </div>

      <div className="h-px w-full bg-[#374151]/50 my-2" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Select
            options={members}
            onChange={(val: any) =>
              setIssueState((prev: any) => ({ ...prev, userId: val?.userId }))
            }
            value={
              members?.find((mem: any) => mem.userId === issueState.userId) ||
              null
            }
            getOptionValue={(val: any) => val.userId}
            getOptionLabel={(val: any) => val.name}
            placeholder="Assignee"
            styles={commonSelectStyles}
            components={{ Control: AssigneeControl }}
          />

          <Select
            options={statusList}
            defaultValue={statusList.find((item: any) => item?.isDefault)}
            onChange={(val: any) =>
              setIssueState((prev: any) => ({ ...prev, status: val?.id }))
            }
            value={
              statusList?.find((st: any) => st.id === issueState.status) || null
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

          <Select
            options={priorityList}
            onChange={(val: any) =>
              setIssueState((prev: any) => ({ ...prev, priority: val?.value }))
            }
            value={
              priorityList.find((p: any) => p.value === issueState.priority) ||
              null
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

        <div className="flex items-center gap-3">
          <button
            onClick={handleClose}
            type="button"
            className="text-xs font-medium text-gray-400 hover:text-gray-200 transition-colors cursor-pointer mr-3"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-1 px-4 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-semibold rounded-md shadow-sm transition-colors cursor-pointer"
          >
            {loading && <Spinner color="#ffffff" />}
            Create Issue
          </button>
        </div>
      </div>
    </form>
  );
};
