"use client";

import { Plus } from "lucide-react";
import Icon from "./StatusIcon";
import { useDroppable } from "@dnd-kit/react";
import { useState } from "react";
import { IssueModal } from "@/components/Common/CommonModal";
import { IssueForm } from "@/components/Forms/IssueForm";

interface KanbanDroppableInterface {
  id: string;
  children: React.ReactNode;
  status: any;
}

const KanbanDroppable = ({
  id,
  children,
  status,
}: KanbanDroppableInterface) => {
  const { ref } = useDroppable({
    id,
  });

  const issueCount = status?._count?.issues;

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

        {/* Draggable Card */}
        {children}

        <div className="p-3 pt-0">
          <IssueModal title="Add Issue" body={<IssueForm />} />
        </div>
      </div>
    </div>
  );
};

export default KanbanDroppable;
