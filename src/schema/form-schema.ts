import { BLOODGROUP, GENDER } from "@/constants/common";
import * as z from "zod";

export const memberSchema = z.object({
  // body: z.object({
  firstName: z
    .string({ required_error: "First Name is required" })
    .min(3)
    .max(100),
  lastName: z
    .string({ required_error: "Last Name is required" })
    .min(3)
    .max(100),
  email: z.string({ required_error: "Email is required" }).email(),
  gender: z.enum([...GENDER.map((gn) => gn.value)] as [
    string,
    ...string[]
  ]),
  spouseName: z
    .string({ required_error: "Spouse Name is required" })
    .min(3)
    .max(100),
  phoneNumber: z
    .string({ required_error: "Phone Number is required" })
    .min(3)
    .max(100),
  dateOfBirth: z.string({ required_error: "Date of Birth is required" }),

  nidNumber: z
    .string({ required_error: "NID Number is required" })
    .min(3)
    .max(100),
  education: z
    .string({ required_error: "Education is required" })
    .min(3)
    .max(100),
  occupation: z
    .string({ required_error: "Occupation is required" })
    .min(3)
    .max(100),
  bloodGroup: z
    .enum([...BLOODGROUP.map((group) => group.value)] as [
      string,
      ...string[]
    ]),
  // Family Details
  fathersName: z
    .string({ required_error: "Father's Name is required" })
    .min(3)
    .max(100),
  mothersName: z
    .string({ required_error: "Mother's Name is required" })
    .min(3)
    .max(100),
  // Address Details
  presentAddress: z.object({
    country: z
      .string({ required_error: "Country is required" })
      .min(3)
      .max(100),
    division: z
      .string({ required_error: "Division is required" })
      .min(3)
      .max(100),
    district: z
      .string({ required_error: "District is required" })
      .min(3)
      .max(100),
    postOffice: z
      .string({ required_error: "Post Office is required" })
      .min(3)
      .max(100),
    thana: z.string({
      required_error: "Police Station is required"
    }).min(3)
      .max(100),
    village: z
      .string({ required_error: "Village is required" })
      .min(3)
      .max(100)
  }),
  permanentAddress: z.object({
    country: z
      .string({ required_error: "Country is required" })
      .min(3)
      .max(100),
    division: z
      .string({ required_error: "Division is required" })
      .min(3)
      .max(100),
    district: z
      .string({ required_error: "District is required" })
      .min(3)
      .max(100),
    postOffice: z
      .string({ required_error: "Post Office is required" })
      .min(3)
      .max(100),
    thana: z.string({
      required_error: "Police Station is required"
    }).min(3)
      .max(100),
    village: z
      .string({ required_error: "Village is required" })
      .min(3)
      .max(100)
  }),
  // Image
  imageUrl: z.string({ required_error: "Image is required" }),
  infoVerificationPhoto: z.string({ required_error: "Passport or Driving license image is required" }),
  termsAggrement: z.boolean({
    required_error: "Terms Aggrement is required",
  }),
})
// });
