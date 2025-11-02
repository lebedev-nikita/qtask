import { TRPCClientError } from "@trpc/client";
import { toast } from "sonner";

export function showError(error: unknown) {
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
