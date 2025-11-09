export type * from "@server/types";

export type DraggablePayload = {
  parentId: string | null;
  qtaskId: string;
};

export type DropzonePayload =
  | {
      type: "qtask";
      parentId: string;
      priority: number;
    }
  | {
      type: "board";
      boardId: string;
    };
