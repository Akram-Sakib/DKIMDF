import BreadCrumb from "@/components/ui/dashboard/breadcrumb";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import Link from "next/link";

const breadcrumbItems = [{ title: "Payment", link: "/dashboard/payment" }];

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Somadhan Foundation | Payment",
  description:
    "Dynamic Krishok & Imam Muazzin Development Foundation (DKIMDF) Dashboard Page.",
};

const Payment = () => {
  return (
    <div className="flex-1 space-y-12 p-4 md:p-8 pt-6">
      <BreadCrumb items={breadcrumbItems} />
      <div className="flex flex-col md:flex-row gap-12">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>Check your payment history</CardDescription>
          </CardHeader>
          <CardFooter>
            <Link href={"/dashboard/payment/history"}>
              <Button>History</Button>
            </Link>
          </CardFooter>
        </Card>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Buy New Subscription</CardTitle>
            <CardDescription>
              Buy next subscription for your account
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Link href={"/dashboard/payment/buy-subscription"}>
              <Button>Buy</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Payment;
