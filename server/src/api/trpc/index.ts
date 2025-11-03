import { router } from "./_config";
import { authRouter } from "./auth";
import { qtaskRouter } from "./qtask";

export const appRouter = router({
  auth: authRouter,
  qtask: qtaskRouter,
});
