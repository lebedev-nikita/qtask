import type z from "zod";
import type { appRouter } from "./api/trpc";
import type { BoardSchema, JwtPayloadSchema, QtaskSchema, QtaskStatusSchema } from "./schemas";

export type AppRouter = typeof appRouter;

export type Qtask = z.infer<typeof QtaskSchema>;
export type QtaskStatus = z.infer<typeof QtaskStatusSchema>;
export type Board = z.infer<typeof BoardSchema>;

export type JwtPayload = z.infer<typeof JwtPayloadSchema>;
