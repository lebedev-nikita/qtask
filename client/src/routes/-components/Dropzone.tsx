import { useDroppable } from "@dnd-kit/core";
import clsx from "clsx";
import type { DropzonePayload } from "@/types";

type Props = {
  className?: string;
  queueId: string;
  priority: number;
};

export default function Dropzone(props: Props) {
  const droppable = useDroppable({
    id: `${props.queueId}:${props.priority}`,
    data: {
      queueId: props.queueId,
      priority: props.priority,
    } satisfies DropzonePayload,
  });

  return (
    <div
      ref={droppable.setNodeRef}
      className={clsx(
        "rounded-sm p-1 text-center text-red-600 text-xs",
        droppable.isOver ? "border-red-600 bg-red-200" : "border-red-400 bg-red-100",
        props.className,
      )}
    >
      {props.priority}
    </div>
  );
}
