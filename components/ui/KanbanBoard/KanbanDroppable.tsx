"use client";

import Icon from "./StatusIcon";
import { useDroppable } from "@dnd-kit/react";
import { IssueForm } from "@/components/Forms/IssueForm";
import { useState } from "react";
import { Modal } from "@/components/Common/Modal";
import { Plus } from "lucide-react";

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
    <div ref={ref} className="flex h-full w-[360px] shrink-0 flex-col">
      <header className="mb-3 flex items-center justify-between px-2">
        <Icon status={status?.name} />
        <div className="flex items-center gap-2">
          <span className="flex h-6 min-w-6 items-center justify-center rounded-md border border-default bg-card px-2 text-[11px] font-semibold text-secondary">
            {issueCount}
          </span>
        </div>
      </header>

      <div className="flex-1 min-h-[68vh] overflow-y-auto rounded-xl border border-default/60 bg-secondary/15 p-2 transition-colors duration-200 transition-colors duration-200 hover:bg-secondary/8">
        <Modal
          open={open}
          setOpen={setOpen}
          title="Create team"
          buttonVariant="default"
          buttonSize="icon"
          modalWidth="1080"
          buttonClassName="w-full bg-brand/30 hover:bg-primary active:bg-primary text-primary"
          buttonInnerText={
            <>
              Add Issue
              <Plus
                size={15}
                strokeWidth={2.2}
                className="transition-transform duration-200 group-hover:rotate-90"
              />
            </>
          }
          subHeading={
            "Teams help organize people and projects within your workspace."
          }

          body={<IssueForm issueFormProp={issueFormPropObj} />}
        />
        <div className="space-y-1">{children}</div>
      </div>
    </div>
  );
};

export default KanbanDroppable;
