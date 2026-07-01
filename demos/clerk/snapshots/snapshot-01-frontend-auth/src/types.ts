// SNAPSHOT 01 — no userId yet. The Todo model on the backend doesn't have one.
export type Todo = {
  id: number;
  text: string;
  done: boolean;
  minutes: number;
  createdAt: string;
};
