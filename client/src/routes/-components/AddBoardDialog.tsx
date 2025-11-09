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
import { useCreateBoardMutation } from "@/hooks/api";

type Props = {
  className?: string;
  onClose(): void;
};

export default function AddBoardDialog(props: Props) {
  const createBoardM = useCreateBoardMutation();
  const [title, setTitle] = useState("");

  return (
    <Dialog open onOpenChange={props.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>AddBoardDialog</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            props.onClose();
            createBoardM.mutate({ title });
          }}
        >
          <Input placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />

          <DialogFooter>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
