import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TITLE_ADD_QTASK } from "@/config";
import AddQtaskDialog from "./AddQtaskDialog";

type Props = {
  className?: string;
  parentId: string | null;
  priority?: number;
};

export default function AddQtaskButton(props: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        disabled={props.priority === undefined}
        variant="outline"
        onClick={() => setOpen(true)}
      >
        {TITLE_ADD_QTASK}
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
