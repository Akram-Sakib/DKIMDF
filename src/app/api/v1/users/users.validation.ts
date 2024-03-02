import { BLOODGROUP, GENDER } from "@/constants/common";
import { z } from "zod";

const SuperAdminUserSchema = z.object({
  body: z.object({
    phoneNumber: z.string({ required_error: "Phone Number is required" }),
    email: z.string({ required_error: "Email is required" }).email().optional(),
    password: z.string({ required_error: "Password is required" }),
    superAdmin: z.object({
      firstName: z
        .string({ required_error: "First Name is required" })
        .min(3)
        .max(100),
      lastName: z
        .string({ required_error: "Last Name is required" })
        .min(3)
        .max(100),
      imageUrl: z
        .string({ required_error: "Image Url is required" })
        .optional(),
      gender: z.enum([...GENDER.map((gn) => gn.value)] as [
        string,
        ...string[]
      ]).optional(),
      dateOfBirth: z
        .string({ required_error: "Date of Birth is required" })
        .optional(),
      education: z
        .string({ required_error: "Education is required" })
        .optional(),
      bloodGroup: z
        .enum([...BLOODGROUP.map((group) => group.value)] as [
          string,
          ...string[]
        ])
        .optional(),
      nidNumber: z.string({ required_error: "NID Number is required" }).optional(),
      occupation: z
        .string({ required_error: "Occupation is required" })
        .optional(),
      referanceId: z
        .string({ required_error: "Referance Id is required" })
        .optional(),
      spouseName: z
        .string({ required_error: "Spouse Name is required" })
        .optional(),
      fathersName: z
        .string({ required_error: "Fathers Name is required" })
        .optional(),
      mothersName: z
        .string({ required_error: "Mothers Name is required" })
        .optional(),
      // presentAddress: z
      //   .string({ required_error: "Present Address is required" })
      //   .optional(),
      // permanentAddress: z
      //   .string({ required_error: "Permanent Address is required" })
      //   .optional(),
      infoVerificationPhoto: z
        .string({ required_error: "Info Verification is required" })
        .optional(),
    }),
  }),
});

const AdminUserSchema = z.object({
  body: z.object({
    phoneNumber: z.string({ required_error: "Phone Number is required" }),
    email: z.string({ required_error: "Email is required" }).email().optional(),
    password: z.string({ required_error: "Password is required" }),
    admin: z.object({
      firstName: z
        .string({ required_error: "First Name is required" })
        .min(3)
        .max(100),
      lastName: z
        .string({ required_error: "Last Name is required" })
        .min(3)
        .max(100),
      imageUrl: z
        .string({ required_error: "Image Url is required" })
        .optional(),
      gender: z.enum([...GENDER.map((gn) => gn.value)] as [
        string,
        ...string[]
      ]),
      dateOfBirth: z
        .string({ required_error: "Date of Birth is required" })
        .optional(),
      education: z
        .string({ required_error: "Education is required" })
        .optional(),
      bloodGroup: z
        .enum([...BLOODGROUP.map((group) => group.value)] as [
          string,
          ...string[]
        ])
        .optional(),
      nidNumber: z.string({ required_error: "NID Number is required" }),
      occupation: z
        .string({ required_error: "Occupation is required" })
        .optional(),
      referanceId: z
        .string({ required_error: "Referance Id is required" })
        .optional(),
      spouseName: z
        .string({ required_error: "Spouse Name is required" })
        .optional(),
      fathersName: z
        .string({ required_error: "Fathers Name is required" })
        .optional(),
      mothersName: z
        .string({ required_error: "Mothers Name is required" })
        .optional(),
      presentAddress: z
        .string({ required_error: "Present Address is required" })
        .optional(),
      permanentAddress: z
        .string({ required_error: "Permanent Address is required" })
        .optional(),
      infoVerificationPhoto: z
        .string({ required_error: "Info Verification is required" })
        .optional(),
    }),
  }),
});

const MemberUserSchema = z.object({
  body: z.object({
    phoneNumber: z.string({ required_error: "Phone Number is required" }),
    email: z.string({ required_error: "Email is required" }).email().optional(),
    password: z.string({ required_error: "Password is required" }),
    member: z.object({
      firstName: z
        .string({ required_error: "First Name is required" })
        .min(3)
        .max(100),
      lastName: z
        .string({ required_error: "Last Name is required" })
        .min(3)
        .max(100),
      imageUrl: z.string({ required_error: "Image Url is required" }),
      gender: z.enum([...GENDER.map((gn) => gn.value)] as [
        string,
        ...string[]
      ]),
      dateOfBirth: z.string({ required_error: "Date of Birth is required" }),
      education: z
        .string({ required_error: "Education is required" })
        .optional(),
      bloodGroup: z
        .enum([...BLOODGROUP.map((group) => group.value)] as [
          string,
          ...string[]
        ])
        .optional(),
      nidNumber: z.string({ required_error: "NID Number is required" }),
      occupation: z
        .string({ required_error: "Occupation is required" })
        .optional(),
      referanceId: z
        .string({ required_error: "Referance Id is required" })
        .optional(),
      spouseName: z
        .string({ required_error: "Spouse Name is required" })
        .optional(),
      fathersName: z
        .string({ required_error: "Fathers Name is required" })
        .optional(),
      mothersName: z
        .string({ required_error: "Mothers Name is required" })
        .optional(),
      presentAddress: z
        .string({ required_error: "Present Address is required" })
        .optional(),
      permanentAddress: z
        .string({ required_error: "Permanent Address is required" })
        .optional(),
      infoVerificationPhoto: z
        .string({ required_error: "Info Verification is required" })
        .optional(),
    }),
  }),
});

export const UserValidation = {
  SuperAdminUserSchema,
  MemberUserSchema,
  AdminUserSchema
};