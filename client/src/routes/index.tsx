import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import QueuePanel from "@/components/QueuePanel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateQueueMutation, useQueues } from "@/hooks/api";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [queueName, setQueueName] = useState("");

  const queues = useQueues();
  const createQueueM = useCreateQueueMutation();

  return (
    <div className="mx-auto flex min-h-screen max-w-xl items-center justify-center gap-6">
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

      <div className="flex border border-black">
        {queues.data?.map((queue) => (
          <QueuePanel key={queue.queueId} queue={queue} />
        ))}
      </div>
    </div>
  );
}

export default Index;
