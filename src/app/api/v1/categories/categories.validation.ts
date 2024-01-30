import { z } from "zod";

const CategorySchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Category name is required",
      })
      .min(3)
      .max(255),
    description: z.string().min(3).max(255).optional(),
  }),
});

export const CategoryValidation = {
  CategorySchema,
};
