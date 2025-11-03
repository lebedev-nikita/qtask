import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { inferInput } from "@trpc/tanstack-react-query";
import { trpc } from "@/api/trpc";

export function useCreateQtaskMutation() {
  const client = useQueryClient();

  return useMutation(
    trpc.qtask.create.mutationOptions({
      onSuccess(_, { parentId }) {
        client.invalidateQueries({ queryKey: trpc.qtask.list.queryKey({ parentId }) });
      },
    }),
  );
}

export function useDeleteQtaskMutation() {
  const client = useQueryClient();

  return useMutation(
    trpc.qtask.delete.mutationOptions({
      onSuccess(_, { parentId }) {
        client.invalidateQueries({ queryKey: trpc.qtask.list.queryKey({ parentId }) });
      },
    }),
  );
}

export function useQtasks(input: inferInput<typeof trpc.qtask.list>) {
  return useQuery(trpc.qtask.list.queryOptions(input));
}

export function useSetParentMutation() {
  const client = useQueryClient();

  return useMutation(
    trpc.qtask.setParent.mutationOptions({
      onSuccess(_, { newParentId, oldParentId }) {
        client.invalidateQueries({
          queryKey: trpc.qtask.list.queryKey({ parentId: newParentId }),
        });
        client.invalidateQueries({
          queryKey: trpc.qtask.list.queryKey({ parentId: oldParentId }),
        });
      },
    }),
  );
}

export function setQtaskTitle() {
  const client = useQueryClient();

  return useMutation(
    trpc.qtask.setName.mutationOptions({
      onSuccess(_, { parentId }) {
        client.invalidateQueries({ queryKey: trpc.qtask.list.queryKey({ parentId }) });
      },
    }),
  );
}

export function useSetStatusMutation() {
  const client = useQueryClient();

  return useMutation(
    trpc.qtask.setStatus.mutationOptions({
      onSuccess(_, { parentId }) {
        client.invalidateQueries({ queryKey: trpc.qtask.list.queryKey({ parentId }) });
      },
    }),
  );
}

export function useIsLoggedIn() {
  return useQuery(trpc.auth.isLoggedIn.queryOptions());
}

export function useLogOutMutation() {
  const client = useQueryClient();

  return useMutation(
    trpc.auth.logOut.mutationOptions({
      onSuccess() {
        client.invalidateQueries({ queryKey: trpc.auth.isLoggedIn.queryKey() });
      },
    }),
  );
}

export function useLogInMutation() {
  const client = useQueryClient();

  return useMutation(
    trpc.auth.logIn.mutationOptions({
      onSuccess() {
        client.invalidateQueries({ queryKey: trpc.auth.isLoggedIn.queryKey() });
      },
    }),
  );
}
