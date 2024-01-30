import { z } from "zod";

const ProjectSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: "Project Title is required",
      })
      .min(3)
      .max(255),
    description: z.string().min(3).max(3000).optional(),
  }),
});

const ProjectSchemaUpdate = z.object({
  body: z.object({
    title: z
      .string({
        required_error: "Project Title is required",
      })
      .min(3)
      .max(255)
      .optional(),
    description: z.string().min(3).max(3000).optional(),
  }),
});

export const ProjectValidation = {
  ProjectSchema,
  ProjectSchemaUpdate,
};
