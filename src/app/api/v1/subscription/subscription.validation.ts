import { z } from "zod";

const SubscriptionSchema = z.object({
  body: z.object({
    startTime: z.coerce.date(),
    endTime: z.coerce.date(),
    subscriptionFee: z.object({
      registrationFee: z.string().min(3).max(255),
      smartCardFee: z.string().min(3).max(255),
      subscriptionFee: z.string().min(3).max(255),
    }),
  }),
});

const SubscriptionUpdateSchema = z.object({
  body: z.object({
    startTime: z.coerce.date().optional(),
    endTime: z.coerce.date().optional(),
    subscriptionFee: z
      .object({
        registrationFee: z.string().min(3).max(255).optional(),
        smartCardFee: z.string().min(3).max(255).optional(),
        subscriptionFee: z.string().min(3).max(255).optional(),
      })
      .optional(),
  }),
});

export const SubscriptionValidation = {
  SubscriptionSchema,
  SubscriptionUpdateSchema,
};
