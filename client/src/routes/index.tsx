import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import AddQtaskButton from "./-components/AddQtaskButton";
import QtasksPanel from "./-components/QtasksPanel";

export const Route = createFileRoute("/")({
  component: Index,
  validateSearch: z.object({
    boardId: z.string().optional(),
  }),
});

function Index() {
  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center gap-4">
      <QtasksPanel />

      <AddQtaskButton priority={0} parentId={null} />
    </div>
  );
}
