import { QtaskStatusSchema } from "@server/schemas";
import { pg } from "@server/sensors/pg";
import z from "zod";
import { publicProcedure, router } from "./_config";

export const qtaskRouter = router({
  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string().nullable(),
        priority: z.number(),
        parentId: z.string().nullable(),
      }),
    )
    .mutation(async ({ input }) => {
      await pg.qtask.create(input);
    }),

  list: publicProcedure
    .input(
      z.object({
        parentId: z.string().nullable(),
      }),
    )
    .query(async ({ input }) => {
      return await pg.qtask.list(input);
    }),

  setParent: publicProcedure
    .input(
      z.object({
        qtaskId: z.string(),
        oldParentId: z.string().nullable(),
        newParentId: z.string().nullable(),
        priority: z.number(),
      }),
    )
    .mutation(async ({ input }) => {
      await pg.qtask.setParent({
        parentId: input.newParentId,
        qtaskId: input.qtaskId,
        priority: input.priority,
      });
    }),

  setStatus: publicProcedure
    .input(
      z.object({
        parentId: z.string().nullable(),
        qtaskId: z.string(),
        status: QtaskStatusSchema,
      }),
    )
    .mutation(async ({ input }) => {
      await pg.qtask.setStatus({ qtaskId: input.qtaskId, status: input.status });
    }),

  delete: publicProcedure
    .input(
      z.object({
        qtaskId: z.string(),
        parentId: z.string().nullable(),
      }),
    )
    .mutation(async ({ input: { qtaskId } }) => {
      await pg.qtask.delete({ qtaskId });
    }),

  setName: publicProcedure
    .input(
      z.object({
        qtaskId: z.string(),
        title: z.string(),
        parentId: z.string().nullable(),
      }),
    )
    .mutation(async ({ input }) => {
      pg.qtask.setTitle(input);
    }),
});
