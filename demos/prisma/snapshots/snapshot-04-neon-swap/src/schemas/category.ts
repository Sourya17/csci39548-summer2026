import { z } from "zod";

export const CategoryCreateSchema = z.object({
  name: z.string().trim().min(1, "name cannot be empty").max(50),
});
