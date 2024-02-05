import { z } from "zod";

const DivisionSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Division name is required",
      })
      .min(3)
      .max(255),
  }),
});

const DivisionUpdateSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(3)
      .max(255)
      .optional(),
  }),
});

export const DivisionValidation = {
  DivisionSchema,
  DivisionUpdateSchema,
};
