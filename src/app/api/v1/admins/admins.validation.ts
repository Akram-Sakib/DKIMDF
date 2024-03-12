import { z } from "zod";

const AdminCreateSchema = z.object({
  body: z.object({
    firstName: z
      .string({
        required_error: "Super Admin First Name is required",
      })
      .min(3)
      .max(255),
  }),
});

const AdminUpdateSchema = z.object({
  body: z.object({
    firstName: z
      .string()
      .min(3)
      .max(255)
      .optional(),
  }),
});

export const AdminValidation = {
  AdminCreateSchema,
  AdminUpdateSchema,
};
