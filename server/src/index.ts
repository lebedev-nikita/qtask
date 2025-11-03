import { Hono } from "hono";
import { cors } from "hono/cors";
import { trpcHandler } from "./api/trpc";

const app = new Hono();

app.use(cors());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

// TODO: move to "/api/trpc/*"
app.use("/trpc/*", trpcHandler);

export default app;
