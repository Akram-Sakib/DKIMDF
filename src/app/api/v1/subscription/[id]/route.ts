import sendResponse from "@/lib/sendResponse";
import withErrorHandler from "@/lib/withErrorHandler";
import { Subscription } from "@prisma/client";
import httpStatus from "http-status";
import { NextRequest } from "next/server";
import { SubscriptionService } from "../subscription.service";
import { SubscriptionValidation } from "../subscription.validation";

export const GET = withErrorHandler(async (request, context) => {
  const { id } = context.params;
  const result = await SubscriptionService.getById(id);

  const data = {
    statusCode: httpStatus.OK,
    success: true,
    message: "Subscription Fetched Successfully!",
    data: result,
  };

  return sendResponse(data);
});

export const PATCH = withErrorHandler(
  async (
    req: NextRequest,
    {
      params,
    }: {
      params: { id: string };
    }
  ) => {
    const { id } = params;
    const body = await req.json();
    await SubscriptionValidation.SubscriptionUpdateSchema.parseAsync({
      body,
    });
    const { subscriptionFee, ...restProps } = body;
    const result = await SubscriptionService.updateById(
      id,
      subscriptionFee,
      restProps
    );

    return sendResponse<Subscription>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Subscription Updated Successfully!",
      data: result,
    });
  }
);

export const DELETE = withErrorHandler(
  async (
    req: NextRequest,
    {
      params,
    }: {
      params: { id: string };
    }
  ) => {
    const { id } = params;
    const result = await SubscriptionService.deleteById(id);

    return sendResponse<Subscription>({
      statusCode: httpStatus.OK,
      success: true,
      message: "Subscription Deleted Successfully!",
      data: result,
    });
  }
);
