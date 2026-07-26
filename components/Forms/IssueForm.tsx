"use client";

import { commonSelectStyles } from "@/utils/styles";
import Tiptap from "../Common/TextEditor";
import Select from "react-select";
import { priorityList } from "@/utils/constants";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import { Spinner } from "../ui/Spinner/spinner";
import { useState } from "react";
import { useAppDispatch } from "@/Store/hooks";
import {
  createIssueAction,
  fetchIssuesByProjectAction,
  fetchWorkspaceStatusAction,
} from "@/Store/actions/workspace.action";
import {
  AssigneeControl,
  CustomOption,
  CustomSingleValue,
  PriorityPlaceholder,
  StatusPlaceholder,
} from "../ui/Common";

export const IssueForm = ({ issueFormProp }: any) => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const {
    workspaceMembers,
    statusList,
    issueState,
    setIssueState,
    handleClose,
    setIssues,
  } = issueFormProp;

  const [loading, setLoading] = useState(false);
  const { projectId, workspaceId, teamId } = params;
  const { title, description, userId, priority, status } = issueState;

  const members = workspaceMembers?.map((mem: any) => {
    const name = !mem?.name
      ? mem?.user?.firstName + " " + mem?.user?.lastName
      : mem?.name;
    return {
      userId: mem?.user?.id,
      role: mem?.role,
      name,
      email: mem.user?.email,
    };
  });

  const submitHandler = async (e: any) => {
    e.preventDefault();
    if (typeof workspaceId !== "string") {
      return toast?.error("Error Creating Issue.");
    }
    try {
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
      const res = await dispatch(createIssueAction(payload)).unwrap();
      const issuesRes = await dispatch(
        fetchIssuesByProjectAction(projectId),
      ).unwrap();
      setIssues(issuesRes?.data?.issues ?? []);
      const payload2 = {
        workspaceId,
        projectId,
      };
      await dispatch(fetchWorkspaceStatusAction(payload2));
      if (res?.success) {
        toast.success(res?.message);
        handleClose();
      }
    } catch (err: any) {
      toast.error(err?.message);
    } finally {
      setLoading(false);
    }
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
            getOptionValue={(val: any) => {
              return val.userId;
            }}
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
