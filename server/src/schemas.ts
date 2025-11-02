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

export const UserSchema = z.object({
  userId: z.uuid(),
  email: z.email(),
  name: z.string(),
  picture: z.url().nullable(),
  createdAt: z.date(),
});

export const GooglePayloadSchema = z.object({
  sub: z.string(),
  email: z.email(),
  name: z.string().optional(),
  picture: z.url().optional(),
});

export const JwtPayloadSchema = z.object({
  userId: z.string(),
});
