import { useDroppable } from "@dnd-kit/core";
import { Board } from "@server/types";
import { Link } from "@tanstack/react-router";
import clsx from "clsx";
import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDeleteBoardMutation } from "@/hooks/api";
import { DropzonePayload } from "@/types";

type Props = {
  className?: string;
  board: Board;
};

export default function BoardCard(props: Props) {
  const deleteBoardM = useDeleteBoardMutation();

  const droppable = useDroppable({
    id: props.board.boardId,
    data: {
      type: "board",
      boardId: props.board.boardId,
    } satisfies DropzonePayload,
  });

  return (
    <Link
      ref={droppable.setNodeRef}
      to="/"
      activeProps={{ className: "ring" }}
      activeOptions={{ exact: true }}
      search={{ boardId: props.board.boardId }}
      className={clsx(
        "flex items-center justify-between rounded-md border pl-1 hover:border-black",
        droppable.isOver && "bg-orange-300",
      )}
    >
      <span>{props.board.title}</span>
      <div key={props.board.boardId}>
        <Button onClick={() => deleteBoardM.mutate({ boardId: props.board.boardId })}>
          <XIcon />
        </Button>
      </div>
    </Link>
  );
}
