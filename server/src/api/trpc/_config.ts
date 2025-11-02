import type { trpcServer } from "@hono/trpc-server";
import { JWT_COOKIE_NAME } from "@server/consts";
import { env } from "@server/env";
import { JwtPayloadSchema } from "@server/schemas";
import { initTRPC, TRPCError } from "@trpc/server";
import { getCookie } from "hono/cookie";
import * as jwt from "hono/jwt";
import SuperJSON from "superjson";

type Context = ReturnType<typeof createContext>;

type CreateContext = Parameters<NonNullable<Parameters<typeof trpcServer>[0]["createContext"]>>;

export const createContext = (...[_, c]: CreateContext) => ({ c });

const t = initTRPC.context<Context>().create({
  transformer: SuperJSON,
});

export const router = t.router;

export const publicProcedure = t.procedure.use(async ({ ctx, next }) => {
  const token = getCookie(ctx.c, JWT_COOKIE_NAME);

  const res = token && JwtPayloadSchema.safeParse(await jwt.verify(token, env.JWT_SECRET));
  return next({ ctx: { ...ctx, jwt: res && res.success ? res.data : null } });
});

export const authenticatedProcedure = publicProcedure.use(async ({ ctx, next }) => {
  const { jwt } = ctx;
  if (!jwt) throw new TRPCError({ code: "UNAUTHORIZED" });

  return await next({ ctx: { ...ctx, jwt } });
});
