import * as z from "zod";

export const formSchema = z.object({
  firstName: z.string().min(3).max(100),
  lastName: z.string().min(3).max(100),
  fathersName: z.string().min(3).max(100),
  mothersName: z.string().min(3).max(100),
  spouseName: z.string().min(3).max(100),
  phoneNumber: z.string().min(3).max(100),
  dateOfBirth: z.date(),
  presentAddress: z.string().min(3).max(100),
  permanentAddress: z.string().min(3).max(100),
  education: z.string().min(3).max(100),
  occupation: z.string().min(3).max(100),
});
