import { z } from "zod";

// Zod schemas describe shape AND constraints in one declarative object.
// Each .parse() call validates AND narrows the TypeScript type.

// Body shape for POST /api/todos
export const TodoCreateSchema = z.object({
  text: z.string().trim().min(1, "text cannot be empty").max(200),
  minutes: z.number().int().min(1, "minutes must be at least 1").max(24 * 60),
});

// Body shape for PATCH /api/todos/:id — every field optional.
export const TodoPatchSchema = z
  .object({
    text: z.string().trim().min(1).max(200).optional(),
    done: z.boolean().optional(),
    minutes: z.number().int().min(1).max(24 * 60).optional(),
  })
  // Reject empty bodies — at least one field must be present.
  .refine((obj) => Object.keys(obj).length > 0, {
    message: "Body must include at least one of: text, done, minutes",
  });

export type TodoCreateInput = z.infer<typeof TodoCreateSchema>;
export type TodoPatchInput = z.infer<typeof TodoPatchSchema>;
