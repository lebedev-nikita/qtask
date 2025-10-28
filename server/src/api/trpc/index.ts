import { router } from "./_config";
import { queueRouter } from "./queue";
import { taskRouter } from "./task";

export const appRouter = router({
  queue: queueRouter,
  task: taskRouter,
});
