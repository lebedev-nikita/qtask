import clsx from "clsx";
import { Fragment } from "react/jsx-runtime";
import { useTasks } from "@/hooks/api";
import type { Queue } from "@/types";
import CreateTaskForm from "./CreateTaskForm";
import Dropzone from "./Dropzone";
import QueuePanelHeader from "./QueuePanelHeader";
import TaskCard from "./TaskCard";

type Props = {
  className?: string;
  queue: Queue;
};

export default function QueuePanel(props: Props) {
  const tasks = useTasks({ queueId: props.queue.queueId });

  return (
    <div className={clsx("flex min-w-[350px] flex-col gap-2 border p-2", props.className)}>
      <QueuePanelHeader queue={props.queue} />
      {tasks.data && (
        <>
          <div className="flex grow flex-col gap-[1px]">
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
