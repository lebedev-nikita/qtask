import dayjs from "dayjs";
import { TrashIcon } from "lucide-react";
import { useState } from "react";
import { useCreateTaskMutation, useDeleteQueueMutation, useTasks } from "@/hooks/api";
import type { Queue } from "@/types";
import TaskCard from "./TaskCard";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type Props = {
  className?: string;
  queue: Queue;
};

export default function QueuePanel(props: Props) {
  const [newTaskName, setNewTaskName] = useState("");

  const tasks = useTasks({ queueId: props.queue.queueId });

  const createTaskM = useCreateTaskMutation();
  const deleteQueueM = useDeleteQueueMutation();

  return (
    <div className={`flex flex-col gap-2 border p-2 ${props.className}`}>
      <div className="flex items-center justify-between">
        <b>{props.queue.name}</b>
        <Button onClick={() => deleteQueueM.mutate({ queueId: props.queue.queueId })}>
          <TrashIcon />
        </Button>
      </div>
      <p className="whitespace-nowrap">
        created at: {dayjs(props.queue.createdAt).format("YYYY-MM-DD HH:mm:ss")}
      </p>

      <div>
        {tasks.data?.map((task) => (
          <TaskCard key={task.taskId} task={task} />
        ))}
      </div>

      <form
        className="flex flex-col gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          createTaskM.mutate({ queueId: props.queue.queueId, title: newTaskName });
          setNewTaskName("");
        }}
      >
        <Input
          placeholder="task name"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
        />
        <Button type="submit">+ TASK</Button>
      </form>
    </div>
  );
}
