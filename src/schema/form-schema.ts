import { BLOODGROUP, GENDER } from "@/constants/common";
import * as z from "zod";

export const memberSchema = z.object({
  phoneNumber: z
    .string({ required_error: "Phone Number is required" })
    .min(3)
    .max(100),
  email: z.string({ required_error: "Email is required" }).email(),
  password: z.string({ required_error: "Password is required}" }).min(8).max(100),
  // body: z.object({
  member: z.object({
    firstName: z
      .string({ required_error: "First Name is required" })
      .min(3)
      .max(100),
    lastName: z
      .string({ required_error: "Last Name is required" })
      .min(3)
      .max(100),
    gender: z.enum([...GENDER.map((gn) => gn.value)] as [
      string,
      ...string[]
    ]),
    dateOfBirth: z.coerce.date(),
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
    spouseName: z
      .string({ required_error: "Spouse Name is required" })
      .min(3)
      .max(100),

    imageUrl: z.string({ required_error: "Image is required" }),
    infoVerificationPhoto: z.string({ required_error: "Passport or Driving license image is required" }),
    membershipId: z.string({ required_error: "Membership is required" }),
    // termsAggrement: z.boolean({
    //   required_error: "Terms Aggrement is required",
    // }),
    subscription: z.object({
      startTime: z.coerce.date(),
    }),
  }),
  // Address Details
  presentAddress: z.object({
    countryId: z
      .string({ required_error: "Country is required" })
      .min(3)
      .max(100),
    divisionId: z
      .string({ required_error: "Division is required" })
      .min(3)
      .max(100),
    districtId: z
      .string({ required_error: "District is required" })
      .min(3)
      .max(100),
    postOfficeId: z
      .string({ required_error: "Post Office is required" })
      .min(3)
      .max(100),
    thanaId: z.string({
      required_error: "Police Station is required"
    }).min(3)
      .max(100),
    villageId: z
      .string({ required_error: "Village is required" })
      .min(3)
      .max(100)
  }),
  permanentAddress: z.object({
    countryId: z
      .string({ required_error: "Country is required" })
      .min(3)
      .max(100),
    divisionId: z
      .string({ required_error: "Division is required" })
      .min(3)
      .max(100),
    districtId: z
      .string({ required_error: "District is required" })
      .min(3)
      .max(100),
    postOfficeId: z
      .string({ required_error: "Post Office is required" })
      .min(3)
      .max(100),
    thanaId: z.string({
      required_error: "Police Station is required"
    }).min(3)
      .max(100),
    villageId: z
      .string({ required_error: "Village is required" })
      .min(3)
      .max(100)
  }),
})
// });
