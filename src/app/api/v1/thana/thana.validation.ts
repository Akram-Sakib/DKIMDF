import { z } from "zod";

const ThanaSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Thana name is required",
      })
      .min(3)
      .max(255),
  }),
});

const ThanaUpdateSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(3)
      .max(255)
      .optional(),
  }),
});

export const ThanaValidation = {
  ThanaSchema,
  ThanaUpdateSchema,
};
