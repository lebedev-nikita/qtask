import camelcaseKeys from "camelcase-keys";
import z from "zod";

export const CamelizedSchema = z
  .record(z.string(), z.unknown())
  .transform((value) => camelcaseKeys(value));

export const TaskStatusSchema = z.enum(["active", "finished"]);

export const TaskSchema = z.object({
  taskId: z.string(),
  queueId: z.string(),
  title: z.string(),
  priority: z.number(),
  createdAt: z.date(),
  status: TaskStatusSchema,
});

export const QueueSchema = z.object({
  queueId: z.string(),
  name: z.string(),
  createdAt: z.date(),
});
