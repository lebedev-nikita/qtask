import clsx from "clsx";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateTaskMutation } from "@/hooks/api";

type Props = {
  className?: string;
  queueId: string;
  priority: number;
};

export default function CreateTaskForm(props: Props) {
  const [taskName, setTaskName] = useState("");

  const createTaskM = useCreateTaskMutation();

  return (
    <form
      className={clsx("flex flex-col gap-1", props.className)}
      onSubmit={(e) => {
        e.preventDefault();

        createTaskM.mutate({
          queueId: props.queueId,
          title: taskName,
          priority: props.priority,
        });
        setTaskName("");
      }}
    >
      <Input
        placeholder="task name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <Button type="submit">+ TASK</Button>
    </form>
  );
}
