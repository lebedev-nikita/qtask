import { QtaskStatusSchema } from "@server/schemas";
import { pg } from "@server/sensors/pg";
import z from "zod";
import { authenticatedProcedure, publicProcedure, router } from "./_config";

export const qtaskRouter = router({
  create: authenticatedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z
          .string()
          .trim()
          .nullable()
          .transform((str) => str || null),
        priority: z.number(),
        parentId: z.string().nullable(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      await pg.qtask.create({ ...input, createdBy: ctx.jwt.userId });
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

  setParent: authenticatedProcedure
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

  setStatus: authenticatedProcedure
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

  delete: authenticatedProcedure
    .input(
      z.object({
        qtaskId: z.string(),
        parentId: z.string().nullable(),
      }),
    )
    .mutation(async ({ input: { qtaskId } }) => {
      await pg.qtask.delete({ qtaskId });
    }),

  setName: authenticatedProcedure
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
