import { DndContext } from "@dnd-kit/core";
import { createFileRoute } from "@tanstack/react-router";
import { useQtasks, useSetParentMutation } from "@/hooks/api";
import QtaskCard from "@/routes/-components/QtaskCard";
import type { DraggablePayload, DropzonePayload } from "@/types";
import AddQtaskButton from "./-components/AddQtaskButton";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const qtasks = useQtasks({ parentId: null });

  const setParent = useSetParentMutation();

  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center gap-4">
      <DndContext
        onDragEnd={(event) => {
          if (!event.over) return;

          const active = event.active.data.current as DraggablePayload;
          const over = event.over.data.current as DropzonePayload;

          setParent.mutate({
            qtaskId: active.qtaskId,
            newParentId: over.parentId,
            oldParentId: active.parentId,
            priority: over.priority,
          });
        }}
      >
        <div className="flex gap-2 rounded">
          {qtasks.data?.map((queue) => (
            <QtaskCard key={queue.qtaskId} qtask={queue} />
          ))}
        </div>
      </DndContext>

      <AddQtaskButton priority={0} parentId={null} />
    </div>
  );
}
