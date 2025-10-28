import type { inferOutput } from "@trpc/tanstack-react-query";
import type { trpc } from "./api/trpc";

export type Queue = inferOutput<typeof trpc.queue.list>[number];
export type Task = inferOutput<typeof trpc.task.list>[number];
