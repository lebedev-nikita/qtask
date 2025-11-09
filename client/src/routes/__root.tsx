import { DndContext } from "@dnd-kit/core";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Toaster } from "@/components/ui/sonner";
import { useAddQtaskToBoardMutation, useSetQtaskParentMutation } from "@/hooks/api";
import { DraggablePayload, DropzonePayload } from "@/types";
import LeftPanel from "./-components/LeftPanel";

export const Route = createRootRoute({
  component: () => {
    const setQtaskParentM = useSetQtaskParentMutation();
    const addQtaskToBoardM = useAddQtaskToBoardMutation();

    return (
      <>
        <DndContext
          onDragEnd={(event) => {
            if (!event.over) return;

            const active = event.active.data.current as DraggablePayload;
            const over = event.over.data.current as DropzonePayload;

            if (over.type == "qtask") {
              setQtaskParentM.mutate({
                qtaskId: active.qtaskId,
                newParentId: over.parentId,
                oldParentId: active.parentId,
                priority: over.priority,
              });
            }

            if (over.type == "board") {
              addQtaskToBoardM.mutate({
                boardId: over.boardId,
                qtaskId: active.qtaskId,
              });
            }
          }}
        >
          <div className="flex">
            <LeftPanel className="border p-1" />
            <div className="flex grow">
              <Outlet />
            </div>
          </div>
        </DndContext>

        <Toaster duration={10e3} />
        <TanStackRouterDevtools />
      </>
    );
  },
});
