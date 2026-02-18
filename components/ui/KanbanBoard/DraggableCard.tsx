"use client";

import { useDraggable } from "@dnd-kit/react";

const DraggableCard = () => {
  const { ref } = useDraggable({
    id: "draggable",
  });
  return (
    <div ref={ref} className="p-3 flex flex-col gap-3">
      <div
        className="w-full p-4 rounded-md bg-[#1F2937]           
        border border-[#374151] hover:border-[#6B7280] shadow-sm hover:shadow-md transition-all duration-200 group cursor-grab
      "
      >
        <div className="flex justify-between items-start mb-2">
          <span className="text-[10px] font-mono text-gray-400">TSK-12</span>

          <div className="flex -space-x-1.5">
            <div
              className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center ring-2 ring-[#1F2937]"
              title="Assignee: Vishu Banotra"
            >
              <span className="text-[8px] font-bold text-white">VB</span>
            </div>
          </div>
        </div>

        <h4 className="text-[13px] font-medium text-gray-100 leading-snug">
          Fix the card contrast issue
        </h4>

        <div className="mt-3 flex gap-2">
          <span className="px-1.5 py-0.5 bg-[#111827] border border-[#374151] rounded text-[10px] text-gray-400">
            Design
          </span>
        </div>
      </div>
    </div>
  );
};

export default DraggableCard;
