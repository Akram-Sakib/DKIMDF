import { z } from "zod";

// export const formSchema = z.object({});

export const formSchema = z.object({
  body: z.object({
    aa: z.string({ required_error: "AA is required" }).min(3).max(100),
    email: z.string({ required_error: "Email is required" }).email(),
    member: z.object({
      firstName: z
        .string({ required_error: "First Name is required" })
        .min(3)
        .max(100),
      lastName: z
        .string({ required_error: "Last Name is required" })
        .min(3)
        .max(100),
    }),
  }),
});
