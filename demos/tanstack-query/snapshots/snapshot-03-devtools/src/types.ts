export interface Todo {
  id: number;
  text: string;
  done: boolean;
  minutes: number;
  assigneeId: number;
}

export type Filter = "all" | "active" | "done";
