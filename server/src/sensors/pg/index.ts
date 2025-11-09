import { boradStore } from "./board";
import { qtaskStore } from "./qtask";
import { userStore } from "./user";

export const pg = {
  board: boradStore,
  qtask: qtaskStore,
  user: userStore,
};
