import type { Qtask } from "@server/types";
import clsx from "clsx";
import {
  CheckIcon,
  EditIcon,
  EllipsisVerticalIcon,
  PlusIcon,
  TrashIcon,
  XIcon,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { setQtaskTitle, useDeleteQtaskMutation } from "@/hooks/api";
import AddQtaskDialog from "./AddQtaskDialog";

type Props = {
  className?: string;
  qtask: Qtask;
  newChildPriority: number | undefined;
  onOpen(): void;
  onClose(): void;
};

export default function QtaskCardHeader(props: Props) {
  const [draft, setDraft] = useState<null | string>(null);

  const [openAddDialog, setOpenAddDialog] = useState(false);

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
        {!editName ? (
          <Button onClick={() => setDraft(props.qtask.title)}>
            <EditIcon />
          </Button>
        ) : (
          <Button onClick={() => setDraft(null)}>
            <XIcon />
          </Button>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>
              <EllipsisVerticalIcon />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="">
            <DropdownMenuItem
              onClick={() => {
                setOpenAddDialog(true);
                props.onOpen();
              }}
            >
              <span className="grow">Add Qtask</span>
              <PlusIcon />
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => {
                deleteQueueM.mutate({
                  qtaskId: props.qtask.qtaskId,
                  parentId: props.qtask.parentId,
                });
              }}
            >
              <span className="grow">Delete</span>
              <TrashIcon />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {props.newChildPriority !== undefined && (
          <AddQtaskDialog
            open={openAddDialog}
            onOpenChange={setOpenAddDialog}
            parentId={props.qtask.qtaskId}
            priority={props.newChildPriority}
          />
        )}
      </div>
    </div>
  );
}
