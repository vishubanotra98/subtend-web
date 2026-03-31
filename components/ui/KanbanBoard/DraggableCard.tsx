"use client";

import { useDraggable } from "@dnd-kit/react";
import { getTeamPrefix, priorityList } from "@/utils/constants";

const DraggableCard = ({ issueData }: any) => {
  const issue = issueData?.issue;

  const { ref } = useDraggable({
    id: issue?.id,
  });

  const nameInitials = issueData?.name
    ?.split(" ")
    ?.map((name: string) => name[0])
    .join("");

  const team = issueData?.team;

  const currentPriority = priorityList?.find(
    (p) => p.value === issue?.priority?.toUpperCase(),
  );

  const PriorityIcon = currentPriority?.icon;

  return (
    <div ref={ref} className="p-3 flex flex-col gap-3">
      <div
        className="w-full p-4 rounded-md bg-[#1F2937]           
        border border-[#374151] hover:border-[#6B7280] shadow-sm hover:shadow-md transition-all duration-200 group cursor-grab
      "
      >
        <div className="flex justify-between items-start mb-2">
          <span className="text-[10px] font-mono text-gray-400">
            {getTeamPrefix(team, issueData?.issue)}
          </span>

          <div className="flex -space-x-1.5">
            <div className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center ring-2 ring-[#1F2937]">
              <span className="text-[8px] font-bold text-white">
                {nameInitials}
              </span>
            </div>
          </div>
        </div>

        <h4 className="text-[13px] font-medium text-gray-100 leading-snug">
          {issue?.title}
        </h4>

        <div className="mt-3 flex items-center gap-2">
          {PriorityIcon && (
            <div
              className="flex items-center gap-1 px-1.5 py-0.5 bg-[#111827] border border-[#374151] rounded"
              title={`Priority: ${currentPriority?.label}`}
            >
              <PriorityIcon size={12} color={currentPriority?.color} />
              <span className="text-[10px] text-gray-400 font-medium">
                {currentPriority?.label}
              </span>
            </div>
          )}

          <span className="px-1.5 py-0.5 bg-[#111827] border border-[#374151] rounded text-[10px] text-gray-400">
            {team?.name}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DraggableCard;
