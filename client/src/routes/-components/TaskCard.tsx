import { useDraggable } from "@dnd-kit/core";
import clsx from "clsx";
import { TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDeleteTaskMutation } from "@/hooks/api";
import type { DraggablePayload, Task } from "@/types";

type Props = {
  className?: string;
  task: Task;
};

export default function TaskCard(props: Props) {
  const deleteTaskM = useDeleteTaskMutation();

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
      <div
        className={clsx(
          "flex grow items-center rounded bg-slate-100 px-2 align-middle",
          draggable.isDragging ? "cursor-grabbing" : "cursor-grab",
        )}
        ref={draggable.setNodeRef}
        {...draggable.listeners}
        {...draggable.attributes}
      >
        {props.task.title} ({props.task.priority})
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
