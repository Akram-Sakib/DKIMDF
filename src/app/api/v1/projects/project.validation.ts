import { z } from "zod";

const ProjectSchema = z.object({
  title: z.string().min(1, "Title is required"), // Title must be at least 1 character long
  description: z.string().min(3).max(3000).optional(), // Optional description
  imageUrl: z.string().url("Invalid URL format"), // Image URL must be a valid URL
  views: z.number().min(0).default(0).optional(), // Views default to 0 and must be non-negative
  userId: z.string().uuid("Invalid User ID format"), // User ID must be a valid UUID
});

const ProjectSchemaUpdate = ProjectSchema.optional();

export const ProjectValidation = {
  ProjectSchema,
  ProjectSchemaUpdate,
};
