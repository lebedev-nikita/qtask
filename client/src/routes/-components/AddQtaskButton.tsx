import { useState } from "react";
import { Button } from "@/components/ui/button";
import AddQtaskDialog from "./AddQtaskDialog";

type Props = {
  className?: string;
  parentId: string | null;
  priority?: number;
};

const FULL_TITLE = "Add Qtask";

export default function AddQtaskButton(props: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        disabled={props.priority === undefined}
        variant="outline"
        onClick={() => setOpen(true)}
      >
        {FULL_TITLE}
      </Button>

      {props.priority !== undefined && (
        <AddQtaskDialog
          open={open}
          onOpenChange={setOpen}
          parentId={props.parentId}
          priority={props.priority}
        />
      )}
    </>
  );
}
