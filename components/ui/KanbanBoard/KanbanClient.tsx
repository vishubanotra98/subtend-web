"use client";

import { DragDropProvider } from "@dnd-kit/react";
import KanbanDroppable from "@/components/ui/KanbanBoard/KanbanDroppable";
import { useState } from "react";
import DraggableCard from "@/components/ui/KanbanBoard/DraggableCard";

const KanbanClient = ({ statusList }: any) => {
  const [target, setTarget] = useState("");
  const draggable = <DraggableCard />;

  return (
    <DragDropProvider
      onDragEnd={(event) => {
        if (event.canceled) return;
        const id = event.operation.target?.id as string;
        if (event) setTarget(id);
      }}
    >
      <div className="flex items-center gap-4">
        {statusList?.map((status: any, id: any) => {
          return (
            <KanbanDroppable status={status} key={status?.id} id={status?.id}>
              {target === status?.id ? draggable : `Droppable-${id}`}
            </KanbanDroppable>
          );
        })}
      </div>
    </DragDropProvider>
  );
};

export default KanbanClient;
