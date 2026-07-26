"use client";

import DescriptionEditor from "@/components/Common/TextEditor";
import { priorityList } from "@/utils/constants";
import { commonSelectStyles } from "@/utils/styles";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Select from "react-select";
import { DeleteModal } from "./DeleteModal";
import { useAppDispatch } from "@/Store/hooks";
import {
  editIssueAction,
  fetchIssuesByProjectAction,
  fetchWorkspaceMambersAction,
  fetchWorkspaceStatusAction,
} from "@/Store/actions/workspace.action";
import IssueNotFound from "./IssueNotFound";
import {
  AssigneeControl,
  CustomOption,
  CustomSingleValue,
  PriorityPlaceholder,
  StatusPlaceholder,
} from "../Common";
import IssueLoading from "./IssueLoading";
import { IssueType, Params } from "@/types/types";

export const IssuePageClient = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { workspaceId, teamId, projectId, issueId } = useParams<Params>();

  const [issueState, setIssueState] = useState<IssueType>({
    assigneeId: "",
    description: "",
    id: null,
    priority: "",
    projectId: "",
    statusId: "",
    ticket_num: null,
    title: "",
  });
  const [members, setMembers] = useState<any>(null);
  const [statusList, setStatusList] = useState<any>(null);
  const [isLoadingIssue, setIsLoadingIssue] = useState(true);
  const [open, setOpen] = useState(false);

  const { title, description, priority, statusId, assigneeId } = issueState;

  useEffect(() => {
    if (!workspaceId || !projectId || !issueId) return;

    const init = async () => {
      setIsLoadingIssue(true);

      const issuesRes: any = await dispatch(
        fetchIssuesByProjectAction(projectId),
      ).unwrap();

      const workspaceStatusRes: any = await dispatch(
        fetchWorkspaceStatusAction({ workspaceId, projectId }),
      ).unwrap();

      const membersRes = await dispatch(
        fetchWorkspaceMambersAction(workspaceId),
      ).unwrap();

      const issuesData = issuesRes?.data?.issues;
      const membersList = membersRes?.data?.members;
      const statusRes = workspaceStatusRes?.data?.status;

      const selectedIssue =
        issuesData?.find((issue: any) => issue?.id === issueId) ?? null;

      const membersData =
        membersList?.map((mem: any) => {
          const name =
            mem?.user?.name ||
            [mem?.user?.firstName, mem?.user?.lastName]
              .filter(Boolean)
              .join(" ");

          return {
            userId: mem.user?.id,
            role: mem?.role,
            name,
            email: mem.user?.email,
          };
        }) ?? [];

      setIssueState(selectedIssue);
      setMembers(membersData);
      setStatusList(statusRes);
      setIsLoadingIssue(false);
    };

    init();
  }, [dispatch, workspaceId, projectId, issueId]);

  useEffect(() => {
    if (!issueState.id) {
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
      await dispatch(editIssueAction(payload));
    }, 1000);

    return () => clearTimeout(delayDebounce);
  }, [
    assigneeId,
    description,
    dispatch,
    issueState?.id,
    priority,
    statusId,
    title,
  ]);

  if (isLoadingIssue) {
    return <IssueLoading />;
  }

  if (!issueState?.id) {
    return <IssueNotFound />;
  }

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
            value={issueState?.title ?? ""}
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
