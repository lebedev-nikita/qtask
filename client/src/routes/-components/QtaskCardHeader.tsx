import type { Qtask } from "@server/types";
import clsx from "clsx";
import { CheckIcon, EditIcon, TrashIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setQtaskTitle, useDeleteQtaskMutation } from "@/hooks/api";
import AddQtaskButton from "./AddQtaskButton";

type Props = {
  className?: string;
  qtask: Qtask;
  newChildPriority: number | undefined;
};

export default function QtaskCardHeader(props: Props) {
  const [draft, setDraft] = useState<null | string>(null);

  const deleteQueueM = useDeleteQtaskMutation();
  const setQueueNameM = setQtaskTitle();

  const editName = draft !== null;
  const didNameChange = draft !== props.qtask.title;

  return (
    <div className={clsx("flex items-center justify-between gap-1", props.className)}>
      {editName ? (
        <form
          className="flex grow gap-1"
          onSubmit={(e) => {
            e.preventDefault();
            setDraft(null);
            setQueueNameM.mutate({
              title: draft,
              qtaskId: props.qtask.qtaskId,
              parentId: props.qtask.parentId,
            });
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
        <b>{props.qtask.title}</b>
      )}

      <div className="flex gap-1">
        <AddQtaskButton short parentId={props.qtask.qtaskId} priority={props.newChildPriority} />

        {!editName ? (
          <Button onClick={() => setDraft(props.qtask.title)}>
            <EditIcon />
          </Button>
        ) : (
          <Button onClick={() => setDraft(null)}>
            <XIcon />
          </Button>
        )}

        <Button
          onClick={() => {
            deleteQueueM.mutate({
              qtaskId: props.qtask.qtaskId,
              parentId: props.qtask.parentId,
            });
          }}
        >
          <TrashIcon />
        </Button>
      </div>
    </div>
  );
}
