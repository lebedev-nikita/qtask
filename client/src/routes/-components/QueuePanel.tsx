import clsx from "clsx";
import dayjs from "dayjs";
import { TrashIcon } from "lucide-react";
import { Fragment } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { useDeleteQueueMutation, useTasks } from "@/hooks/api";
import type { Queue } from "@/types";
import CreateTaskForm from "./CreateTaskForm";
import Dropzone from "./Dropzone";
import TaskCard from "./TaskCard";

type Props = {
  className?: string;
  queue: Queue;
};

export default function QueuePanel(props: Props) {
  const tasks = useTasks({ queueId: props.queue.queueId });

  const deleteQueueM = useDeleteQueueMutation();

  return (
    <div className={clsx("flex flex-col gap-2 border p-2", props.className)}>
      <div className="flex items-center justify-between">
        <b>{props.queue.name}</b>
        <Button onClick={() => deleteQueueM.mutate({ queueId: props.queue.queueId })}>
          <TrashIcon />
        </Button>
      </div>
      <p className="whitespace-nowrap">
        created at: {dayjs(props.queue.createdAt).format("YYYY-MM-DD HH:mm:ss")}
      </p>

      {tasks.data && (
        <>
          <div className="flex grow flex-col gap-1">
            <Dropzone
              priority={tasks.data[0] ? tasks.data[0].priority + 1 : 0}
              queueId={props.queue.queueId}
            />
            {tasks.data.map((task, index) => {
              const nextTask = tasks.data.at(index + 1);
              const nextPriority = nextTask
                ? (task.priority + nextTask.priority) / 2
                : task.priority - 1;

              return (
                <Fragment key={task.taskId}>
                  <TaskCard task={task} />
                  <Dropzone priority={nextPriority} queueId={props.queue.queueId} />
                </Fragment>
              );
            })}
          </div>

          <CreateTaskForm
            queueId={props.queue.queueId}
            priority={tasks.data[0] ? tasks.data[0].priority + 1 : 0}
          />
        </>
      )}
    </div>
  );
}
