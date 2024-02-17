import { BLOODGROUP, GENDERTYPE } from "@/constants/common";
import { z } from "zod";


const ProfileUpdateSchema = z.object({
  body: z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    phoneNumber: z.string().optional(),
    email: z.string().optional(),
    imageUrl: z.string().optional(),
    gender: z.enum([...GENDERTYPE] as [
      string,
      ...string[]
    ])
      .optional(),
    dateOfBirth: z.string().optional(),
    education: z.string().optional(),
    bloodGroup: z.enum([...BLOODGROUP.map(grp => grp.value)] as [
      string,
      ...string[]
    ])
      .optional(),
    nidNumber: z.string().optional(),
    occupation: z.string().optional(),
    referenceId: z.string().optional(),
    spouseName: z.string().optional(),
    fathersName: z.string().optional(),
    mothersName: z.string().optional(),
    presentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
    infoVerificationPhoto: z.string().optional(),
  }),
});

export const ProfileValidation = {
  ProfileUpdateSchema
};
