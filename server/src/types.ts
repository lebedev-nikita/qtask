import type z from "zod";
import type { appRouter } from "./api/trpc";
import type { JwtPayloadSchema, QueueSchema, TaskSchema, TaskStatusSchema } from "./schemas";

export type AppRouter = typeof appRouter;

export type Task = z.infer<typeof TaskSchema>;
export type Queue = z.infer<typeof QueueSchema>;
export type TaskStatus = z.infer<typeof TaskStatusSchema>;
export type JwtPayload = z.infer<typeof JwtPayloadSchema>;
