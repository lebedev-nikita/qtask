import camelcaseKeys from "camelcase-keys";
import z from "zod";

export const CamelizedSchema = z
  .record(z.string(), z.unknown())
  .transform((value) => camelcaseKeys(value));

export const QtaskStatusSchema = z.enum(["active", "finished"]);

export const UserSchema = z.object({
  userId: z.uuid(),
  email: z.email(),
  name: z.string(),
  picture: z.url().nullable(),

  createdAt: z.date(),
});

export const QtaskSchema = z.object({
  qtaskId: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  status: QtaskStatusSchema,
  priority: z.number(),
  parentId: z.string().nullable(),

  createdAt: z.date(),
  createdBy: z.uuid(),
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
