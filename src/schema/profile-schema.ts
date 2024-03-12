import { BLOODGROUP, GENDER } from "@/constants/common";
import { z } from "zod";

export const memberProfileSchema = z.object({
  phoneNumber: z
    .string({ required_error: "Phone Number is required" })
    .min(3)
    .max(100)
    .optional(),
  email: z.string({ required_error: "Email is required" }).email().optional(),
  // password: z.string({ required_error: "Password is required}" }).min(8).max(100),
  // body: z.object({
  // member: z.object({
  firstName: z
    .string({ required_error: "First Name is required" })
    .min(3)
    .max(100)
    .optional(),
  lastName: z
    .string({ required_error: "Last Name is required" })
    .min(3)
    .max(100)
    .optional(),
  gender: z.enum([...GENDER.map((gn) => gn.value)] as [string, ...string[]]),
  dateOfBirth: z.coerce.date().optional(),
  nidNumber: z
    .string({ required_error: "NID Number is required" })
    .min(3)
    .max(100)
    .optional(),
  education: z
    .string({ required_error: "Education is required" })
    .min(3)
    .max(100)
    .optional(),
  occupation: z
    .string({ required_error: "Occupation is required" })
    .min(3)
    .max(100)
    .optional(),
  bloodGroup: z
    .enum([...BLOODGROUP.map((group) => group.value)] as [string, ...string[]])
    .optional(),
  // Family Details
  fathersName: z
    .string({ required_error: "Father's Name is required" })
    .min(3)
    .max(100)
    .optional(),
  mothersName: z
    .string({ required_error: "Mother's Name is required" })
    .min(3)
    .max(100)
    .optional(),
  spouseName: z
    .string({ required_error: "Spouse Name is required" })
    .min(3)
    .max(100)
    .optional(),

  imageUrl: z.string({ required_error: "Image is required" }).optional(),
  infoVerificationPhoto: z
    .string({
      required_error: "Passport or Driving license image is required",
    })
    .optional(),
  // membershipId: z.string({ required_error: "Membership is required" }),
  // // termsAggrement: z.boolean({
  // //   required_error: "Terms Aggrement is required",
  // // }),
  // subscription: z
  //   .object({
  //     startTime: z.coerce.date(),
  //   })
  //   .optional(),
  // }),
  // Address Details
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
  presentAddressId: z.string().optional(),
  permanentAddressId: z.string().optional(),
});

export const grandAdminProfileSchema = z.object({
  phoneNumber: z
    .string({ required_error: "Phone Number is required" })
    .min(3)
    .max(100)
    .optional(),
  email: z.string({ required_error: "Email is required" }).email().optional(),
  firstName: z
    .string({ required_error: "First Name is required" })
    .min(3)
    .max(100)
    .optional(),
  lastName: z
    .string({ required_error: "Last Name is required" })
    .min(3)
    .max(100)
    .optional(),
  gender: z.enum([...GENDER.map((gn) => gn.value)] as [string, ...string[]]),
  dateOfBirth: z.coerce.date().optional(),
  nidNumber: z
    .string({ required_error: "NID Number is required" })
    .min(3)
    .max(100)
    .optional(),
  education: z
    .string({ required_error: "Education is required" })
    .min(3)
    .max(100)
    .optional(),
  occupation: z
    .string({ required_error: "Occupation is required" })
    .min(3)
    .max(100)
    .optional(),
  bloodGroup: z
    .enum([...BLOODGROUP.map((group) => group.value)] as [string, ...string[]])
    .optional(),
  // Family Details
  fathersName: z
    .string({ required_error: "Father's Name is required" })
    .min(3)
    .max(100)
    .optional(),
  mothersName: z
    .string({ required_error: "Mother's Name is required" })
    .min(3)
    .max(100)
    .optional(),
  spouseName: z
    .string({ required_error: "Spouse Name is required" })
    .min(3)
    .max(100)
    .optional(),

  imageUrl: z.string({ required_error: "Image is required" }).optional(),
  infoVerificationPhoto: z
    .string({
      required_error: "Passport or Driving license image is required",
    })
    .optional(),
  presentAddress: z
    .union([
      z.object({ // Optional present address with string or null elements
        countryId: z.string({ required_error: "Country is required" }).optional().nullable(),
        divisionId: z.string({ required_error: "Division is required" }).optional().nullable(),
        districtId: z.string({ required_error: "District is required" }).optional().nullable(),
        postOfficeId: z.string({ required_error: "Post Office is required" }).optional().nullable(),
        thanaId: z.string({ required_error: "Police Station is required" }).optional().nullable(),
        villageId: z.string({ required_error: "Village is required" }).optional().nullable(),
      }),
      z.null(), // Allow completely null present address
    ]).optional(),

  permanentAddress: z
    .union([
      z.object({ // Optional permanent address with string or null elements
        countryId: z.string({ required_error: "Country is required" }).optional().nullable(),
        divisionId: z.string({ required_error: "Division is required" }).optional().nullable(),
        districtId: z.string({ required_error: "District is required" }).optional().nullable(),
        postOfficeId: z.string({ required_error: "Post Office is required" }).optional().nullable(),
        thanaId: z.string({ required_error: "Police Station is required" }).optional().nullable(),
        villageId: z.string({ required_error: "Village is required" }).optional().nullable(),
      }),
      z.null(), // Allow completely null permanent address
    ]).optional(),

  presentAddressId: z.string().nullable().optional(),
  permanentAddressId: z.string().nullable().optional(),
});

export const superAdminProfileSchema = z.object({
  phoneNumber: z
    .string({ required_error: "Phone Number is required" })
    .min(3)
    .max(100)
    .optional(),
  email: z.string({ required_error: "Email is required" }).email().optional(),
  // password: z.string({ required_error: "Password is required}" }).min(8).max(100),
  // body: z.object({
  // member: z.object({
  firstName: z
    .string({ required_error: "First Name is required" })
    .min(3)
    .max(100)
    .optional(),
  lastName: z
    .string({ required_error: "Last Name is required" })
    .min(3)
    .max(100)
    .optional(),
  gender: z.enum([...GENDER.map((gn) => gn.value)] as [string, ...string[]]),
  dateOfBirth: z.coerce.date().optional(),
  nidNumber: z
    .string({ required_error: "NID Number is required" })
    .min(3)
    .max(100)
    .optional(),
  education: z
    .string({ required_error: "Education is required" })
    .min(3)
    .max(100)
    .optional(),
  occupation: z
    .string({ required_error: "Occupation is required" })
    .min(3)
    .max(100)
    .optional(),
  bloodGroup: z
    .enum([...BLOODGROUP.map((group) => group.value)] as [string, ...string[]])
    .optional(),
  // Family Details
  fathersName: z
    .string({ required_error: "Father's Name is required" })
    .min(3)
    .max(100)
    .optional(),
  mothersName: z
    .string({ required_error: "Mother's Name is required" })
    .min(3)
    .max(100)
    .optional(),
  spouseName: z
    .string({ required_error: "Spouse Name is required" })
    .min(3)
    .max(100)
    .optional(),

  imageUrl: z.string({ required_error: "Image is required" }).optional(),
  infoVerificationPhoto: z
    .string({
      required_error: "Passport or Driving license image is required",
    })
    .optional(),
  // membershipId: z.string({ required_error: "Membership is required" }),
  // // termsAggrement: z.boolean({
  // //   required_error: "Terms Aggrement is required",
  // // }),
  // subscription: z
  //   .object({
  //     startTime: z.coerce.date(),
  //   })
  //   .optional(),
  // }),
  // Address Details
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
  presentAddressId: z.string().optional(),
  permanentAddressId: z.string().optional(),
});

export const adminProfileSchema = z.object({
  phoneNumber: z
    .string({ required_error: "Phone Number is required" })
    .min(3)
    .max(100)
    .optional(),
  email: z.string({ required_error: "Email is required" }).email().optional(),
  // password: z.string({ required_error: "Password is required}" }).min(8).max(100),
  // body: z.object({
  // member: z.object({
  firstName: z
    .string({ required_error: "First Name is required" })
    .min(3)
    .max(100)
    .optional(),
  lastName: z
    .string({ required_error: "Last Name is required" })
    .min(3)
    .max(100)
    .optional(),
  gender: z.enum([...GENDER.map((gn) => gn.value)] as [string, ...string[]]),
  dateOfBirth: z.coerce.date().optional(),
  nidNumber: z
    .string({ required_error: "NID Number is required" })
    .min(3)
    .max(100)
    .optional(),
  education: z
    .string({ required_error: "Education is required" })
    .min(3)
    .max(100)
    .optional(),
  occupation: z
    .string({ required_error: "Occupation is required" })
    .min(3)
    .max(100)
    .optional(),
  bloodGroup: z
    .enum([...BLOODGROUP.map((group) => group.value)] as [string, ...string[]])
    .optional(),
  // Family Details
  fathersName: z
    .string({ required_error: "Father's Name is required" })
    .min(3)
    .max(100)
    .optional(),
  mothersName: z
    .string({ required_error: "Mother's Name is required" })
    .min(3)
    .max(100)
    .optional(),
  spouseName: z
    .string({ required_error: "Spouse Name is required" })
    .min(3)
    .max(100)
    .optional(),

  imageUrl: z.string({ required_error: "Image is required" }).optional(),
  infoVerificationPhoto: z
    .string({
      required_error: "Passport or Driving license image is required",
    })
    .optional(),
  // membershipId: z.string({ required_error: "Membership is required" }),
  // // termsAggrement: z.boolean({
  // //   required_error: "Terms Aggrement is required",
  // // }),
  // subscription: z
  //   .object({
  //     startTime: z.coerce.date(),
  //   })
  //   .optional(),
  // }),
  // Address Details
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
  presentAddressId: z.string().optional(),
  permanentAddressId: z.string().optional(),
});