import prisma from "@/lib/prisma";
import withErrorHandler from "@/lib/withErrorHandler";
import { NextRequest, NextResponse } from "next/server";

export const POST = withErrorHandler(async (req: NextRequest) => {
  const trans_id = req.nextUrl.searchParams.get("tran_id")

  if (!trans_id) {
    return new NextResponse(
      JSON.stringify({
        message: "Transaction ID is required",
      }),
      {
        status: 400,
      }
    );
  }

  const subscriptionFee = await prisma.subscriptionFee.findFirst({
    where: {
      transactionId: trans_id
    },
  })

  if (!subscriptionFee) {
    throw new Error("Subscription not found");
  }

  // update subscription Fee isPaid to true
  const result = await prisma.subscriptionFee.update({
    where: {
      id: subscriptionFee.id
    },
    data: {
      isPaid: true
    }
  })

  // Construct redirect URL based on payment success or failure
  const redirectUrl = result
    ? new URL('/payments/success', req.url)
    : new URL('/payments/failed', req.url);

  // Redirect to the constructed URL
  return NextResponse.redirect(redirectUrl);
})