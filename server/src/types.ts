import type z from "zod";
import type { QueueSchema, TaskSchema, TaskStatusSchema } from "./schemas";

export type Task = z.infer<typeof TaskSchema>;
export type Queue = z.infer<typeof QueueSchema>;
export type TaskStatus = z.infer<typeof TaskStatusSchema>;
