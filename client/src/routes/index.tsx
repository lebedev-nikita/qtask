import { DndContext } from "@dnd-kit/core";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateQueueMutation, useMoveTaskMutation, useQueues } from "@/hooks/api";
import QueuePanel from "@/routes/-components/QueuePanel";
import type { DraggablePayload, DropzonePayload } from "@/types";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [queueName, setQueueName] = useState("");

  const queues = useQueues();
  const createQueueM = useCreateQueueMutation();

  const moveTaskM = useMoveTaskMutation();

  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center gap-6">
      <div className="flex flex-col gap-2">
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            createQueueM.mutate({ name: queueName });
            setQueueName("");
          }}
        >
          <Input
            className="min-w-[140px]"
            placeholder="queue name"
            value={queueName}
            onChange={(e) => setQueueName(e.target.value)}
          />
          <Button type="submit">+ QUEUE</Button>
        </form>

        <form onSubmit={(e) => e.preventDefault()}></form>
      </div>

      <DndContext
        onDragEnd={(event) => {
          if (!event.over) return;

          const active = event.active.data.current as DraggablePayload;
          const over = event.over.data.current as DropzonePayload;

          moveTaskM.mutate({
            taskId: active.taskId,
            toQueueId: over.queueId,
            fromQueueId: active.queueId,
            priority: over.priority,
          });
        }}
      >
        <div className="flex rounded border border-black">
          {queues.data?.map((queue) => (
            <QueuePanel key={queue.queueId} queue={queue} />
          ))}
        </div>
      </DndContext>
    </div>
  );
}

export default Index;
