import { z } from "zod";

const DistrictSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "District name is required",
      })
      .min(3)
      .max(255),
  }),
});

const DistrictUpdateSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(3)
      .max(255)
      .optional(),
  }),
});

export const DistrictValidation = {
  DistrictSchema,
  DistrictUpdateSchema,
};
