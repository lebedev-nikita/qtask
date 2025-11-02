import { TaskSchema, TaskStatusSchema } from "@server/schemas";
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
    .output(z.array(TaskSchema))
    .query(async ({ input }) => {
      return await pg.task.list(input);
    }),

  create: publicProcedure
    .input(
      z.object({
        queueId: z.string(),
        title: z.string().min(1),
        priority: z.number(),
      }),
    )
    .mutation(async ({ input }) => {
      console.log(input);
      await pg.task.create(input);
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

  move: publicProcedure
    .input(
      z.object({
        taskId: z.string(),
        fromQueueId: z.string(),
        toQueueId: z.string(),
        priority: z.number(),
      }),
    )
    .mutation(async ({ input }) => {
      await pg.task.move(input);
    }),

  setStatus: publicProcedure
    .input(
      z.object({
        taskId: z.string(),
        queueId: z.string(),
        status: TaskStatusSchema,
      }),
    )
    .mutation(async ({ input }) => {
      await pg.task.setStatus(input);
    }),
});
