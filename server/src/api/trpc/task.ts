import { pg } from "@server/sensors/pg";
import z from "zod";
import { publicProcedure, router } from "./_config";

export const taskRouter = router({
  list: publicProcedure
    .input(
      z.object({
        queueId: z.string(),
      }),
    )
    .output(
      z.array(
        z.object({
          taskId: z.string(),
          queueId: z.string(),
          title: z.string(),
          createdAt: z.date(),
        }),
      ),
    )
    .query(async ({ input }) => {
      return await pg.task.list(input);
    }),

  create: publicProcedure
    .input(
      z.object({
        queueId: z.string(),
        title: z.string().min(1),
      }),
    )
    .mutation(async ({ input: { queueId, title } }) => {
      await pg.task.create({ queueId, title });
    }),

  delete: publicProcedure
    .input(
      z.object({
        queueId: z.string(),
        taskId: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      await pg.task.delete(input);
    }),
});
