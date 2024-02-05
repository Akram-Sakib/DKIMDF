import { z } from "zod";
import { MEMBERSHIP_TYPE } from "./membership.constants";

const MembershipSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: "Membership Title is required",
      })
      .min(3)
      .max(255),
    type: z.enum([...MEMBERSHIP_TYPE] as [string, ...string[]]),
    membershipFee: z.object({
      registrationFee: z.string().min(3).max(255),
      smartCardFee: z.string().min(3).max(255),
      membershipFee: z.string().min(3).max(255),
    }),
  }),
});

const MembershipUpdateSchema = z.object({
  body: z.object({
    title: z.string().min(3).max(255).optional(),
    type: z.enum([...MEMBERSHIP_TYPE] as [string, ...string[]]).optional(),
    membershipFee: z
      .object({
        registrationFee: z.string().min(3).max(255).optional(),
        smartCardFee: z.string().min(3).max(255).optional(),
        membershipFee: z.string().min(3).max(255).optional(),
      })
      .optional(),
  }),
});

export const MembershipValidation = {
  MembershipSchema,
  MembershipUpdateSchema,
};
