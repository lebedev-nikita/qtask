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
        "rounded-sm bg-orange-200 p-0.5",
        droppable.isOver ? "opacity-100" : "opacity-0",
        props.className,
      )}
    ></div>
  );
}
