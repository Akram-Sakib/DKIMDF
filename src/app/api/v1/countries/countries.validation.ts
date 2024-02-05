import { z } from "zod";

const CountrySchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Country name is required",
      })
      .min(3)
      .max(255),
  }),
});

const CountryUpdateSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(3)
      .max(255)
      .optional(),
  }),
});

export const CountryValidation = {
  CountrySchema,
  CountryUpdateSchema,
};
