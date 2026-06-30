import { z } from "zod";

export const TodoCreateSchema = z.object({
  text: z.string().trim().min(1, "text cannot be empty").max(200),
  minutes: z.number().int().min(1, "minutes must be at least 1").max(24 * 60),
  categoryId: z.number().int().positive().optional(),
});

export const TodoPatchSchema = z
  .object({
    text: z.string().trim().min(1).max(200).optional(),
    done: z.boolean().optional(),
    minutes: z.number().int().min(1).max(24 * 60).optional(),
    // Use .nullable() so the client can clear a category by sending null.
    categoryId: z.number().int().positive().nullable().optional(),
  })
  .refine((obj) => Object.keys(obj).length > 0, {
    message: "Body must include at least one field",
  });
