"use client";

import { commonSelectStyles2 } from "@/utils/styles";
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
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

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
  const { title, description, userId, priority, status, blockedReason } =
    issueState;

  const [date, setDate] = useState<Date>();
  const [open, setOpen] = useState(false);

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
        blockedReason,
        targetDate: date,
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

  const blocked =
    statusList.find((st: any) => st.id === status)?.name === "Blocked";

  return (
    <form onSubmit={submitHandler} className="flex flex-col gap-4 mt-8 ">
      <div>
        <label className="text-sm font-medium text-primary">Issue Title</label>
        <Textarea
          className="mt-1.5 outline-none overflow-hidden resize-none border-b pb-5"
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

      <div className="">
        <label className="text-sm font-medium text-primary">
          Issue Description
        </label>
        <div className="mt-1.5 flex-1 rounded-card border border-default bg-background">
          <Tiptap state={issueState} setState={setIssueState} />
        </div>
      </div>

      {blocked && (
        <div>
          <label className="text-sm font-medium text-primary">
            Blocked Reason
          </label>
          <Textarea
            className="mt-1.5"
            placeholder="Blocked Reason..."
            name="blockedReason"
            value={blockedReason}
            onChange={(e) => {
              setIssueState((prev: any) => ({
                ...prev,
                title: e.target.value,
              }));
            }}
          />
        </div>
      )}

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-primary mb-1">
            Select Assignee
          </label>
          <Select
            className="mt-1.5"
            options={members}
            onChange={(val: any) =>
              setIssueState((prev: any) => ({
                ...prev,
                userId: val?.userId,
              }))
            }
            value={
              members?.find((mem: any) => mem.userId === issueState.userId) ||
              null
            }
            getOptionValue={(val: any) => val.userId}
            getOptionLabel={(val: any) => val.name}
            placeholder="Assignee"
            styles={commonSelectStyles2}
            components={{ Control: AssigneeControl }}
            isSearchable={false}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-primary">
            Select Status
          </label>
          <Select
            className="mt-1.5"
            options={statusList}
            defaultValue={statusList.find((item: any) => item?.isDefault)}
            onChange={(val: any) =>
              setIssueState((prev: any) => ({
                ...prev,
                status: val?.id,
              }))
            }
            value={
              statusList?.find((st: any) => st.id === issueState.status) || null
            }
            getOptionValue={(val: any) => val.id}
            getOptionLabel={(val: any) => val.name}
            placeholder="Status"
            styles={commonSelectStyles2}
            isSearchable={false}
            components={{
              Option: CustomOption,
              SingleValue: CustomSingleValue,
              Placeholder: StatusPlaceholder,
            }}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-primary">
            Target Date
          </label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="secondary"
                className="h-12 mt-1.5 w-full justify-start font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-secondary" />

                {date ? (
                  <span>{format(date, "dd MMM yyyy")}</span>
                ) : (
                  <span className="text-secondary">No target date</span>
                )}
              </Button>
            </PopoverTrigger>

            <PopoverContent
              align="start"
              className="w-auto rounded-lg border border-default bg-card p-3 shadow-card"
            >
              <Calendar
                mode="single"
                selected={date}
                onSelect={(selectedDate) => {
                  setDate(selectedDate);

                  if (selectedDate) {
                    setOpen(false);
                  }
                }}
                captionLayout="label"
              />

              <div className="mt-3 flex items-center justify-between border-t border-default pt-3">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setDate(undefined);
                    setOpen(false);
                  }}
                >
                  Clear
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <label className="text-sm font-medium text-primary mb-1">
            Select Priority
          </label>
          <Select
            className="mt-1.5"
            options={priorityList}
            onChange={(val: any) =>
              setIssueState((prev: any) => ({
                ...prev,
                priority: val?.value,
              }))
            }
            value={
              priorityList.find((p: any) => p.value === issueState.priority) ||
              null
            }
            getOptionValue={(val: any) => val.value}
            getOptionLabel={(val: any) => val.label}
            placeholder="Priority"
            styles={commonSelectStyles2}
            components={{
              Option: CustomOption,
              SingleValue: CustomSingleValue,
              Placeholder: PriorityPlaceholder,
            }}
            isSearchable={false}
          />
        </div>
      </div>

      <div className="mt-8 flex items-center justify-end gap-3 border-t border-default pt-5">
        <Button type="button" variant={"secondary"} onClick={handleClose}>
          Cancel
        </Button>

        <Button type="submit" disabled={loading}>
          {loading && <Spinner color="#fff" />}
          Create Issue
        </Button>
      </div>
    </form>
  );
};
