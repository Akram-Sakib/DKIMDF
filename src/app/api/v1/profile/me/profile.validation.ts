import { BLOODGROUP, GENDER } from "@/constants/common";
import { grandAdminProfileSchema } from "@/schema/profile-schema";
import { z } from "zod";

const GrandAdminProfileUpdateSchema = z.object({
  body: grandAdminProfileSchema
})

const ProfileUpdateSchema = z.object({
  body: z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    phoneNumber: z.string().optional(),
    email: z.string().optional(),
    imageUrl: z.string().nullable().optional(),
    gender: z.enum([...GENDER.map((gn) => gn.value)] as [string, ...string[]])
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
    presentAddress: z.object({
      countryId: z
        .string({ required_error: "Country is required" })
        .min(3)
        .max(100)
        .optional(),
      divisionId: z
        .string({ required_error: "Division is required" })
        .min(3)
        .max(100)
        .optional(),
      districtId: z
        .string({ required_error: "District is required" })
        .min(3)
        .max(100)
        .optional(),
      postOfficeId: z
        .string({ required_error: "Post Office is required" })
        .min(3)
        .max(100)
        .optional(),
      thanaId: z
        .string({
          required_error: "Police Station is required",
        })
        .min(3)
        .max(100)
        .optional(),
      villageId: z
        .string({ required_error: "Village is required" })
        .min(3)
        .max(100)
        .optional(),
    }),
    permanentAddress: z.object({
      countryId: z
        .string({ required_error: "Country is required" })
        .min(3)
        .max(100)
        .optional(),
      divisionId: z
        .string({ required_error: "Division is required" })
        .min(3)
        .max(100)
        .optional(),
      districtId: z
        .string({ required_error: "District is required" })
        .min(3)
        .max(100)
        .optional(),
      postOfficeId: z
        .string({ required_error: "Post Office is required" })
        .min(3)
        .max(100)
        .optional(),
      thanaId: z
        .string({
          required_error: "Police Station is required",
        })
        .min(3)
        .max(100)
        .optional(),
      villageId: z
        .string({ required_error: "Village is required" })
        .min(3)
        .max(100)
        .optional(),
    }),
    infoVerificationPhoto: z.string().nullable().optional(),
  }),
});

export const ProfileValidation = {
  ProfileUpdateSchema,
  GrandAdminProfileUpdateSchema
};
