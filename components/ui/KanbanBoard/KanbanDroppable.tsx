"use client";

import Icon from "./StatusIcon";
import { useDroppable } from "@dnd-kit/react";
import { IssueModal } from "@/components/Common/CommonModal";
import { IssueForm } from "@/components/Forms/IssueForm";
import { useState } from "react";

interface KanbanDroppableInterface {
  id: string;
  children: React.ReactNode;
  status: any;
  workspaceMembers: any;
  statusList: any;
  projectId: string;
  setIssues: any;
}

const KanbanDroppable = ({
  id,
  children,
  status,
  workspaceMembers,
  statusList,
  setIssues,
}: KanbanDroppableInterface) => {
  const [open, setOpen] = useState(false);
  const [issueState, setIssueState] = useState({
    title: "",
    description: "",
    userId: "",
    priority: "",
    status: "",
  });

  const { ref } = useDroppable({
    id,
  });

  const issueCount = status?._count?.issues;

  const handleClose = () => {
    setIssueState({
      title: "",
      description: "",
      userId: "",
      priority: "",
      status: "",
    });
    setOpen(false);
  };

  const issueFormPropObj = {
    issueState,
    setIssueState,
    open,
    setOpen,
    workspaceMembers,
    statusList,
    handleClose,
    setIssues,
  };

  return (
    <div ref={ref} className="bg-[#111827] min-h-[80vh] mt-8">
      <div className=" w-[350px] h-fit rounded-lg bg-[#0B0F19] border border-[#1F2937]/50 flex flex-col">
        <div className="px-4 py-3 border-b border-[#1F2937]/50 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Icon status={status?.name} />
          </div>
          <span className="text-xs text-gray-600 bg-[#111827] px-2 py-0.5 rounded">
            {issueCount}
          </span>
        </div>

        {children}

        <div className="p-3 pt-0">
          <IssueModal
            title="Add Issue"
            open={open}
            setOpen={setOpen}
            handleClose={handleClose}
            body={<IssueForm issueFormProp={issueFormPropObj} />}
          />
        </div>
      </div>
    </div>
  );
};

export default KanbanDroppable;
