import { router } from "./_config";
import { authRouter } from "./auth";
import { queueRouter } from "./queue";
import { taskRouter } from "./task";

export const appRouter = router({
  auth: authRouter,
  queue: queueRouter,
  task: taskRouter,
});
