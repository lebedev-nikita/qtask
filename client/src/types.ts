export type * from "@server/types";

export type DraggablePayload = {
  queueId: string;
  taskId: string;
};

export type DropzonePayload = {
  queueId: string;
  priority: number;
};
