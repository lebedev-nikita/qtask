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
import { useCreateQtaskMutation } from "@/hooks/api";

type Props = {
  className?: string;
  parentId: string | null;
  priority: number;
  open: boolean;
  onOpenChange(open: boolean): void;
};

const FULL_TITLE = "Add Qtask";

export default function AddQtaskDialog(props: Props) {
  const [title, setTitle] = useState("");

  const createQtaskM = useCreateQtaskMutation();

  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{FULL_TITLE}</DialogTitle>
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
              description: null,
            });
            setTitle("");
          }}
        >
          <Input
            placeholder="qtask title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
