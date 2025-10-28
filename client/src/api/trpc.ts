import { QueryClient } from "@tanstack/react-query";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import type { AppRouter } from "server";
import SuperJSON from "superjson";

export const queryClient = new QueryClient();

export const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `http://localhost:3000/trpc/`,
      transformer: SuperJSON,
    }),
  ],
});

export const trpc = createTRPCOptionsProxy<AppRouter>({
  client,
  queryClient,
});
