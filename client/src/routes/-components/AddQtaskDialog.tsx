import clsx from "clsx";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
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
  onClose(): void;
};

export default function AddQtaskDialog(props: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const createQtaskM = useCreateQtaskMutation();

  return (
    <Dialog open onOpenChange={props.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{TITLE_ADD_QTASK}</DialogTitle>
        </DialogHeader>

        <form
          className={clsx("flex flex-col gap-1", props.className)}
          onSubmit={(e) => {
            e.preventDefault();
            setTitle("");
            props.onClose();

            createQtaskM.mutate({
              parentId: props.parentId,
              title: title,
              priority: props.priority,
              description,
            });
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
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
