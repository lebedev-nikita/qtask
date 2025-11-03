export type * from "@server/types";

export type DraggablePayload = {
  parentId: string | null;
  qtaskId: string;
};

export type DropzonePayload = {
  parentId: string;
  priority: number;
};
