import type { Qtask } from "@server/types";
import clsx from "clsx";
import {
  CheckIcon,
  EditIcon,
  EllipsisVerticalIcon,
  MinusIcon,
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
  onRemoveFromBoard?(): void;
};

export default function QtaskCardHeader(props: Props) {
  const [title, setTitle] = useState<null | string>(null);

  const [openAddDialog, setOpenAddDialog] = useState(false);

  const deleteQtaskM = useDeleteQtaskMutation();
  const setQtaskNameM = setQtaskTitle();

  const editName = title !== null;
  const didNameChange = title !== props.qtask.title;

  return (
    <div className={clsx("flex items-center justify-between gap-1", props.className)}>
      {editName ? (
        <form
          className="flex grow gap-1"
          onSubmit={(e) => {
            e.preventDefault();
            setTitle(null);
            setQtaskNameM.mutate({
              title,
              qtaskId: props.qtask.qtaskId,
              parentId: props.qtask.parentId,
            });
          }}
        >
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
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
          <Button onClick={() => setTitle(props.qtask.title)}>
            <EditIcon />
          </Button>
        ) : (
          <Button onClick={() => setTitle(null)}>
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
                deleteQtaskM.mutate({
                  qtaskId: props.qtask.qtaskId,
                  parentId: props.qtask.parentId,
                });
              }}
            >
              <span className="grow">Delete</span>
              <TrashIcon />
            </DropdownMenuItem>

            {props.onRemoveFromBoard && (
              <DropdownMenuItem onClick={props.onRemoveFromBoard}>
                Remove From Board <MinusIcon />
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {props.newChildPriority !== undefined && openAddDialog && (
          <AddQtaskDialog
            onClose={() => setOpenAddDialog(false)}
            parentId={props.qtask.qtaskId}
            priority={props.newChildPriority}
          />
        )}
      </div>
    </div>
  );
}
