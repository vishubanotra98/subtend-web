"use client";

import { Plus } from "lucide-react";
import Icon from "./StatusIcon";
import { useDroppable } from "@dnd-kit/react";

interface KanbanDroppableInterface {
  id: string;
  children: React.ReactNode;
}

const KanbanDroppable = ({ id, children }: KanbanDroppableInterface) => {
  const { ref } = useDroppable({
    id,
  });
  return (
    <div ref={ref} className="bg-[#111827] min-h-[80vh] mt-8">
      <div className=" w-[350px] h-fit rounded-lg bg-[#0B0F19] border border-[#1F2937]/50 flex flex-col">
        <div className="px-4 py-3 border-b border-[#1F2937]/50 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Icon status="todo" />
          </div>
          <span className="text-xs text-gray-600 bg-[#111827] px-2 py-0.5 rounded">
            3
          </span>
        </div>

        {/* Draggable Card */}
        {children}

        <div className="p-3 pt-0">
          <button className="w-full flex items-center gap-2 p-2 rounded text-xs font-medium text-gray-500 hover:text-gray-200 hover:bg-[#1F2937] transition-all duration-200 group cursor-pointer">
            <div className="p-0.5 rounded bg-transparent group-hover:bg-[#374151] transition-colors">
              <Plus size={14} />
            </div>
            <span>Add Issue</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default KanbanDroppable;
