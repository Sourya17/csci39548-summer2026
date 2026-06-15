// ============================================================
// Snapshot 08 — Modules (file 1 of 3): exporting types.
//
// `export` makes a name available to OTHER files via `import`.
// Without `export`, a name is private to its file.
// ============================================================


// `export interface ...` — the most common export in TS apps.
export interface Todo {
  readonly id: number;
  text: string;
  done: boolean;
  minutes: number;
  priority: Priority;
}

// Export a type alias too.
export type Priority = 1 | 2 | 3;
