import type { Queue } from "@server/types";
import { CheckIcon, EditIcon, TrashIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDeleteQueueMutation, useSetQueueNameMutation } from "@/hooks/api";

type Props = {
  className?: string;
  queue: Queue;
};

export default function QueuePanelHeader(props: Props) {
  const [draft, setDraft] = useState<null | string>(null);

  const deleteQueueM = useDeleteQueueMutation();
  const setQueueNameM = useSetQueueNameMutation();

  const editName = draft !== null;
  const didNameChange = draft !== props.queue.name;

  return (
    <div className="flex items-center justify-between gap-1">
      {editName ? (
        <form
          className="flex grow gap-1"
          onSubmit={(e) => {
            e.preventDefault();
            setDraft(null);
            setQueueNameM.mutate({ queueId: props.queue.queueId, name: draft });
          }}
        >
          <Input value={draft} onChange={(e) => setDraft(e.target.value)} />
          {didNameChange && (
            <Button type="submit">
              <CheckIcon />
            </Button>
          )}
        </form>
      ) : (
        <b>{props.queue.name}</b>
      )}

      <div className="flex gap-1">
        {!editName ? (
          <Button onClick={() => setDraft(props.queue.name)}>
            <EditIcon />
          </Button>
        ) : (
          <Button onClick={() => setDraft(null)}>
            <XIcon />
          </Button>
        )}

        <Button onClick={() => deleteQueueM.mutate({ queueId: props.queue.queueId })}>
          <TrashIcon />
        </Button>
      </div>
    </div>
  );
}
