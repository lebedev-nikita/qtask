import { QueryCache, QueryClient } from "@tanstack/react-query";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import SuperJSON from "superjson";
import { showError } from "@/lib/error";
import type { AppRouter } from "@/types";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({ onError: showError }),
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false, onError: showError },
  },
});

export const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `/trpc/`,
      transformer: SuperJSON,
    }),
  ],
});

export const trpc = createTRPCOptionsProxy<AppRouter>({
  client,
  queryClient,
});
