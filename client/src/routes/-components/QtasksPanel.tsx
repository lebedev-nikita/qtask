import { useSearch } from "@tanstack/react-router";
import { useBoardQtasks, useRemoveQtaskFromBoardMutation } from "@/hooks/api";
import QtaskCard from "./QtaskCard";

type Props = {
  className?: string;
};

export default function QtasksPanel(props: Props) {
  const boardId = useSearch({ from: "/", select: (s) => s.boardId ?? null });
  const qtasks = useBoardQtasks({ boardId });

  const removeQtaskM = useRemoveQtaskFromBoardMutation();

  return (
    <div className={`flex gap-2 rounded ${props.className ?? ""}`}>
      {qtasks.data?.map((qtask) => (
        <QtaskCard
          key={qtask.qtaskId}
          qtask={qtask}
          onRemoveFromBoard={
            boardId ? () => removeQtaskM.mutate({ boardId, qtaskId: qtask.qtaskId }) : undefined
          }
        />
      ))}
    </div>
  );
}
