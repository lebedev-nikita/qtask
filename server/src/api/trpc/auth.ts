import { JWT_COOKIE_NAME } from "@server/consts";
import { env } from "@server/env";
import { GooglePayloadSchema } from "@server/schemas";
import { googleClient } from "@server/sensors/google";
import { pg } from "@server/sensors/pg";
import type { JwtPayload } from "@server/types";
import { deleteCookie, setCookie } from "hono/cookie";
import * as jwt from "hono/jwt";
import z from "zod";
import { authenticatedProcedure, publicProcedure, router } from "./_config";

export const authRouter = router({
  isLoggedIn: publicProcedure.query(({ ctx }) => {
    return Boolean(ctx.jwt);
  }),

  logIn: publicProcedure
    .input(
      z.object({
        idToken: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input: { idToken } }) => {
      const ticket = await googleClient.verifyIdToken({
        idToken,
        audience: env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();

      const { email, name = email, picture = null } = GooglePayloadSchema.parse(payload);
      let user = await pg.user.getUserByEmail({ email });
      if (!user) user = await pg.user.create({ email, name, picture });

      const jwtToken = await jwt.sign({ userId: user.userId } satisfies JwtPayload, env.JWT_SECRET);
      setCookie(ctx.c, JWT_COOKIE_NAME, jwtToken);
    }),

  logOut: authenticatedProcedure.mutation(({ ctx }) => {
    deleteCookie(ctx.c, JWT_COOKIE_NAME);
  }),
});
