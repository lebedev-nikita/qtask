import { trpcServer } from "@hono/trpc-server";
import { createContext, router } from "./_config";
import { authRouter } from "./auth";
import { qtaskRouter } from "./qtask";

export const appRouter = router({
  auth: authRouter,
  qtask: qtaskRouter,
});

export const trpcHandler = trpcServer({
  router: appRouter,
  createContext,
  onError({ error }) {
    console.error(error);
  },
});
