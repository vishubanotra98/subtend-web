"use client";

import { DragDropProvider } from "@dnd-kit/react";
import KanbanDroppable from "@/components/ui/KanbanBoard/KanbanDroppable";
import { useState } from "react";
import DraggableCard from "@/components/ui/KanbanBoard/DraggableCard";

interface KanbanPropInterface {
  workspaceId: string;
  teamId: string;
  projectId: string;
}

const KanbanClient = ({
  workspaceId,
  teamId,
  projectId,
}: KanbanPropInterface) => {
  const targets = ["A", "B", "C", "D"];
  const [target, setTarget] = useState();
  const draggable = <DraggableCard />;

  return (
    <DragDropProvider
      onDragEnd={(event) => {
        if (event.canceled) return;

        if (event) setTarget(event.operation.target?.id);
      }}
    >
      {!target ? draggable : null}

      <div className="flex items-center gap-4">
        {targets?.map((id) => (
          <KanbanDroppable key={id} id={id}>
            {target === id ? draggable : `Droppable ${id}`}
          </KanbanDroppable>
        ))}
      </div>
    </DragDropProvider>
  );
};

export default KanbanClient;
