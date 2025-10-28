import { TrashIcon } from "lucide-react";
import { useDeleteTaskMutation } from "@/hooks/api";
import type { Task } from "@/types";
import { Button } from "./ui/button";

type Props = {
  className?: string;
  task: Task;
};

export default function TaskCard(props: Props) {
  const deleteTaskM = useDeleteTaskMutation();

  return (
    <div
      className={`flex items-center justify-between rounded-md border p-1 ${props.className ?? ""}`}
    >
      <div>{props.task.title}</div>
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
