import { useDraggable } from "@dnd-kit/core";
import clsx from "clsx";
import { ChevronDownIcon, ChevronUpIcon, GripVerticalIcon } from "lucide-react";
import { useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useQtasks, useSetStatusMutation } from "@/hooks/api";
import type { DraggablePayload, Qtask } from "@/types";
import Dropzone from "./Dropzone";
import QtaskCardHeader from "./QtaskCardHeader";

type Props = {
  className?: string;
  qtask: Qtask;
};

export default function QtaskCard(props: Props) {
  const tasks = useQtasks({ parentId: props.qtask.qtaskId });
  const [open, setOpen] = useState(false);

  const draggable = useDraggable({
    id: props.qtask.qtaskId,
    data: {
      qtaskId: props.qtask.qtaskId,
      parentId: props.qtask.parentId,
    } satisfies DraggablePayload,
  });

  const setStatusM = useSetStatusMutation();

  const newChildPriority = tasks.data && (tasks.data[0] ? tasks.data[0].priority + 1 : 0);

  return (
    <div
      style={{
        transform: draggable.transform
          ? `translate(${draggable.transform.x}px, ${draggable.transform.y}px)`
          : undefined,
      }}
      className={clsx(
        "flex min-w-[350px] flex-col gap-2 rounded-sm border border-slate-300 p-2",
        props.className,
      )}
    >
      <div className="flex items-center gap-1">
        <span
          className={clsx(
            "rounded-xs hover:bg-slate-200",
            draggable.isDragging ? "cursor-grabbing" : "cursor-grab",
          )}
          ref={draggable.setNodeRef}
          {...draggable.listeners}
          {...draggable.attributes}
        >
          <GripVerticalIcon className="-mx-0.5 h-5 text-slate-500" />
        </span>

        <Checkbox
          checked={props.qtask.status === "finished"}
          onCheckedChange={(e) => {
            setStatusM.mutate({
              qtaskId: props.qtask.qtaskId,
              parentId: props.qtask.parentId,
              status: e ? "finished" : "active",
            });
          }}
        />

        <Button onClick={() => setOpen(!open)}>
          {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </Button>

        <QtaskCardHeader
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          newChildPriority={newChildPriority}
          className="grow"
          qtask={props.qtask}
        />
      </div>

      {open && tasks.data && newChildPriority !== undefined && (
        <>
          <div className="flex grow flex-col gap-[1px]">
            <Dropzone priority={newChildPriority} parentId={props.qtask.qtaskId} />
            {tasks.data.map((task, index) => {
              const nextTask = tasks.data.at(index + 1);
              const dropzonePriority = nextTask
                ? (task.priority + nextTask.priority) / 2
                : task.priority - 1;

              return (
                <Fragment key={task.qtaskId}>
                  <QtaskCard qtask={task} />
                  <Dropzone priority={dropzonePriority} parentId={props.qtask.qtaskId} />
                </Fragment>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
