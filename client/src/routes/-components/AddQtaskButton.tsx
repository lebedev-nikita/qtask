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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useCreateQtaskMutation } from "@/hooks/api";

type Props = {
  className?: string;
  parentId: string | null;
  priority?: number;
  short?: boolean;
};

const FULL_TITLE = "Add Qtask";

export default function AddQtaskButton(props: Props) {
  const [title, setTitle] = useState("");

  const createQtaskM = useCreateQtaskMutation();

  const disabled = props.priority === undefined;

  return (
    <Dialog>
      <Tooltip disableHoverableContent open={disabled || !props.short ? false : undefined}>
        <DialogTrigger asChild disabled={disabled}>
          <TooltipTrigger asChild>
            <Button disabled={disabled} variant="outline">
              {props.short ? "+" : FULL_TITLE}
            </Button>
          </TooltipTrigger>
        </DialogTrigger>
        <TooltipContent>
          <p>{FULL_TITLE}</p>
        </TooltipContent>
      </Tooltip>

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
