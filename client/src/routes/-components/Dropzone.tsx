import { useDroppable } from "@dnd-kit/core";
import clsx from "clsx";
import type { DropzonePayload } from "@/types";

type Props = {
  className?: string;
  parentId: string;
  priority: number;
};

export default function Dropzone(props: Props) {
  const droppable = useDroppable({
    id: `${props.parentId}:${props.priority}`,
    data: {
      type: "qtask",
      parentId: props.parentId,
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
