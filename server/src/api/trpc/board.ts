import { pg } from "@server/sensors/pg";
import z from "zod";
import { authenticatedProcedure, publicProcedure, router } from "./_config";

export const boardRouter = router({
  list: publicProcedure.query(async () => {
    return await pg.board.list();
  }),

  create: authenticatedProcedure
    .input(
      z.object({
        title: z.string().min(1),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      await pg.board.create({
        createdBy: ctx.jwt.userId,
        title: input.title,
      });
    }),

  delete: authenticatedProcedure
    .input(
      z.object({
        boardId: z.uuid(),
      }),
    )
    .mutation(async ({ input }) => {
      await pg.board.delete(input);
    }),

  addQtask: authenticatedProcedure
    .input(
      z.object({
        boardId: z.uuid(),
        qtaskId: z.uuid(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      await pg.board.addQtask({
        boardId: input.boardId,
        qtaskId: input.qtaskId,
        createdBy: ctx.jwt.userId,
      });
    }),

  removeQtask: authenticatedProcedure
    .input(
      z.object({
        qtaskId: z.uuid(),
        boardId: z.uuid(),
      }),
    )
    .mutation(async ({ input }) => {
      await pg.board.remoteQtask({
        boardId: input.boardId,
        qtaskId: input.qtaskId,
      });
    }),

  listQtasks: publicProcedure
    .input(
      z.object({
        boardId: z.uuid().nullable(),
      }),
    )
    .query(async ({ input: { boardId } }) => {
      return await pg.board.listQtasks({ boardId });
    }),
});
