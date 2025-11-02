import { trpcServer } from "@hono/trpc-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { appRouter } from "./api/trpc";
import { createContext } from "./api/trpc/_config";

const app = new Hono();

app.use(cors());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

// TODO: move to "/api/trpc/*"
app.use("/trpc/*", trpcServer({ router: appRouter, createContext }));

export default app;
