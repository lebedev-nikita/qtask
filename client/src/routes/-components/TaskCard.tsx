import { useDraggable } from "@dnd-kit/core";
import clsx from "clsx";
import { GripVerticalIcon, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useDeleteTaskMutation, useSetTaskStatusMutation } from "@/hooks/api";
import type { DraggablePayload, Task } from "@/types";

type Props = {
  className?: string;
  task: Task;
};

export default function TaskCard(props: Props) {
  const deleteTaskM = useDeleteTaskMutation();
  const setStatusM = useSetTaskStatusMutation();

  const draggable = useDraggable({
    id: props.task.taskId,
    data: {
      queueId: props.task.queueId,
      taskId: props.task.taskId,
    } satisfies DraggablePayload,
  });

  return (
    <div
      className={clsx(
        "flex items-stretch justify-between gap-1 rounded-md border bg-white p-1",
        props.className,
      )}
      style={{
        transform: draggable.transform
          ? `translate(${draggable.transform.x}px, ${draggable.transform.y}px)`
          : undefined,
      }}
    >
      <div className={"flex grow items-center rounded align-middle"}>
        <span
          className={draggable.isDragging ? "cursor-grabbing" : "cursor-grab"}
          ref={draggable.setNodeRef}
          {...draggable.listeners}
          {...draggable.attributes}
        >
          <GripVerticalIcon className="h-5 text-slate-500" />
        </span>

        <div className="flex items-center gap-2">
          <Checkbox
            checked={props.task.status === "finished"}
            onCheckedChange={(e) => {
              setStatusM.mutate({
                taskId: props.task.taskId,
                queueId: props.task.queueId,
                status: e ? "finished" : "active",
              });
            }}
          />

          <span className={clsx(props.task.status === "finished" && "line-through")}>
            {props.task.title} ({props.task.priority})
          </span>
        </div>
      </div>
      <Button
        onClick={() => {
          deleteTaskM.mutate({
            queueId: props.task.queueId,
            taskId: props.task.taskId,
          });
        }}
      >
        <TrashIcon />
      </Button>
    </div>
  );
}
