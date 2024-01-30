import { z } from "zod";

const CreateSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: "Image Title is required",
      })
      .min(3)
      .max(255),
    eventTime: z
      .string({
        required_error: "Event Time is required",
      })
      .datetime(),
  }),
});

const UpdateSchema = z.object({
  body: z.object({
    title: z.string().min(3).max(255).optional(),
    eventTime: z.string().datetime().optional(),
  }),
});

export const GalleryValidation = {
  CreateSchema,
  UpdateSchema,
};
