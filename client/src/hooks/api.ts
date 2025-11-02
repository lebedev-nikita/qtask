import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { inferInput } from "@trpc/tanstack-react-query";
import { trpc } from "@/api/trpc";

export function useCreateQueueMutation() {
  const client = useQueryClient();

  return useMutation(
    trpc.queue.create.mutationOptions({
      onSuccess() {
        client.invalidateQueries({ queryKey: trpc.queue.list.queryKey() });
      },
    }),
  );
}

export function useDeleteQueueMutation() {
  const client = useQueryClient();

  return useMutation(
    trpc.queue.delete.mutationOptions({
      onSuccess() {
        client.invalidateQueries({ queryKey: trpc.queue.list.queryKey() });
      },
    }),
  );
}

export function useCreateTaskMutation() {
  const client = useQueryClient();

  return useMutation(
    trpc.task.create.mutationOptions({
      onSuccess(_, { queueId }) {
        client.invalidateQueries({ queryKey: trpc.task.list.queryKey({ queueId }) });
      },
    }),
  );
}

export function useDeleteTaskMutation() {
  const client = useQueryClient();

  return useMutation(
    trpc.task.delete.mutationOptions({
      onSuccess(_, { queueId }) {
        client.invalidateQueries({ queryKey: trpc.task.list.queryKey({ queueId }) });
      },
    }),
  );
}

export function useQueues() {
  return useQuery(trpc.queue.list.queryOptions());
}

export function useTasks(input: inferInput<typeof trpc.task.list>) {
  return useQuery(trpc.task.list.queryOptions(input));
}

export function useMoveTaskMutation() {
  const client = useQueryClient();

  return useMutation(
    trpc.task.move.mutationOptions({
      onSuccess(_, { fromQueueId, toQueueId }) {
        client.invalidateQueries({
          queryKey: trpc.task.list.queryKey({ queueId: fromQueueId }),
        });
        client.invalidateQueries({
          queryKey: trpc.task.list.queryKey({ queueId: toQueueId }),
        });
      },
    }),
  );
}

export function useSetQueueNameMutation() {
  const client = useQueryClient();

  return useMutation(
    trpc.queue.setName.mutationOptions({
      onSuccess() {
        client.invalidateQueries({ queryKey: trpc.queue.list.queryKey() });
      },
    }),
  );
}

export function useSetTaskStatusMutation() {
  const client = useQueryClient();

  return useMutation(
    trpc.task.setStatus.mutationOptions({
      onSuccess(_, { queueId }) {
        client.invalidateQueries({ queryKey: trpc.task.list.queryKey({ queueId }) });
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
