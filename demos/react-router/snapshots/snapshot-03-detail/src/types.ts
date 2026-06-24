export interface Todo {
  id: number;
  text: string;
  done: boolean;
  minutes: number;
  assigneeId: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export type Filter = "all" | "active" | "done";
