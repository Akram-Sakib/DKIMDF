import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { redirect } from 'next/navigation';

export const POST = async (req: NextRequest) => {
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
    ? '/payments/success'
    : '/payments/failed'

  // Redirect to the constructed URL
  return redirect(redirectUrl);
}