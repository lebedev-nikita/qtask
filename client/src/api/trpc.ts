import { QueryCache, QueryClient } from "@tanstack/react-query";
import { createTRPCProxyClient, httpBatchLink, TRPCClientError } from "@trpc/client";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import type { AppRouter } from "server";
import { toast } from "sonner";
import SuperJSON from "superjson";

function onError(error: unknown) {
  if (error instanceof TRPCClientError) {
    const message = error.message;
    const { httpStatus, path } = error.data;
    return toast.error(`${path}: ${message}: ${httpStatus}`);
  }
  if (error instanceof Error) {
    return toast.error(error.message);
  }
  if (typeof error === "string") {
    return toast.error(error);
  }
}

export const queryClient = new QueryClient({
  queryCache: new QueryCache({ onError }),
  defaultOptions: { mutations: { onError } },
});

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
