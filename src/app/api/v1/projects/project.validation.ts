import { z } from "zod";

const PostSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: "Post Title is required",
      })
      .min(3)
      .max(255),
    description: z.string().min(3).max(3000).optional(),
  }),
});

const PostSchemaUpdate = z.object({
  body: z.object({
    title: z
      .string({
        required_error: "Post Title is required",
      })
      .min(3)
      .max(255)
      .optional(),
    description: z.string().min(3).max(3000).optional(),
  }),
});

export const PostValidation = {
  PostSchema,
  PostSchemaUpdate,
};
