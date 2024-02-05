import { z } from "zod";

const PostOfficeSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "PostOffice name is required",
      })
      .min(3)
      .max(255),
    postCode: z.string().min(3).max(255),
  }),
});

const PostOfficeUpdateSchema = z.object({
  body: z.object({
    name: z.string().min(3).max(255).optional(),
    postCode: z.string().min(3).max(255).optional(),
  }),
});

export const PostOfficeValidation = {
  PostOfficeSchema,
  PostOfficeUpdateSchema,
};
