import clsx from "clsx";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { TITLE_ADD_QTASK } from "@/config";
import { useCreateQtaskMutation } from "@/hooks/api";

type Props = {
  className?: string;
  parentId: string | null;
  priority: number;
  open: boolean;
  onOpenChange(open: boolean): void;
};

export default function AddQtaskDialog(props: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const createQtaskM = useCreateQtaskMutation();

  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{TITLE_ADD_QTASK}</DialogTitle>
        </DialogHeader>

        <form
          className={clsx("flex flex-col gap-1", props.className)}
          onSubmit={(e) => {
            e.preventDefault();
            if (props.priority === undefined) return;

            createQtaskM.mutate({
              parentId: props.parentId,
              title: title,
              priority: props.priority,
              description,
            });
            setTitle("");
          }}
        >
          <Input
            placeholder="qtask title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Input
            placeholder="qtask description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit">Submit</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
