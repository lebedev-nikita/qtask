import { pg } from "@server/sensors/pg";
import z from "zod";
import { publicProcedure, router } from "./_config";

export const queueRouter = router({
  list: publicProcedure
    .output(
      z.array(
        z.object({
          queueId: z.string(),
          name: z.string(),
          createdAt: z.date(),
        }),
      ),
    )
    .query(async () => {
      return await pg.queue.list();
    }),

  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation(async ({ input: { name } }) => {
      await pg.queue.create({ name });
    }),

  delete: publicProcedure
    .input(
      z.object({
        queueId: z.string(),
      }),
    )
    .mutation(async ({ input: { queueId } }) => {
      await pg.queue.delete({ queueId });
    }),

  setName: publicProcedure
    .input(
      z.object({
        queueId: z.string(),
        name: z.string().min(1),
      }),
    )
    .mutation(async ({ input }) => {
      await pg.queue.setName(input);
    }),
});
