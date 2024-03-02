import { z } from "zod";

const SuperAdminCreateSchema = z.object({
  body: z.object({
    firstName: z
      .string({
        required_error: "Super Admin First Name is required",
      })
      .min(3)
      .max(255),
  }),
});

const SuperAdminUpdateSchema = z.object({
  body: z.object({
    firstName: z
      .string()
      .min(3)
      .max(255)
      .optional(),
  }),
});

export const SuperAdminValidation = {
  SuperAdminCreateSchema,
  SuperAdminUpdateSchema,
};
