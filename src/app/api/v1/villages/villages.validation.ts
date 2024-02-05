import { z } from "zod";

const VillageSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Village name is required",
      })
      .min(3)
      .max(255),
  }),
});

const VillageUpdateSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(3)
      .max(255)
      .optional(),
  }),
});

export const VillageValidation = {
  VillageSchema,
  VillageUpdateSchema,
};
