
const breadcrumbItems = [
  { title: "Payment", link: "/dashboard/payment" },
  { title: "History", link: "/dashboard/payment/history" },
];

import { buttonVariants } from "@/components/ui/button";
import BreadCrumb from "@/components/ui/dashboard/breadcrumb";
import { Heading } from "@/components/ui/dashboard/heading";
import { columns } from "@/components/tables/user-tables/columns";
import { UserTable } from "@/components/tables/user-tables/user-table";
import { Separator } from "@/components/ui/separator";
import { Employee } from "@/constants/data";
import { cn } from "@/lib/utils";
import { CheckSquare2 } from "lucide-react";
import Link from "next/link";

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Somadhan Foundation | Payment History",
  description:
    "Dynamic Krishok & Imam Muazzin Development Foundation (DKIMDF) Dashboard Page.",
};


export default async function PaymentHistoryPage({
  searchParams,
}: paramsProps) {
  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;
  const country = searchParams.search || null;
  const offset = (page - 1) * pageLimit;

  const res = await fetch(
    `https://api.slingacademy.com/v1/sample-data/users?offset=${offset}&limit=${pageLimit}` +
      (country ? `&search=${country}` : "")
  );
  const userRes = await res.json();
  const totalUsers = userRes.total_users; //1000
  const pageCount = Math.ceil(totalUsers / pageLimit);
  const user: Employee[] = userRes.users;
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`User (${totalUsers})`}
            description="Manage users (Server side table functionalities.)"
          />

          <Link
            href={"/dashboard/payment/buy-subscription"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <CheckSquare2 className="mr-2 h-4 w-4" />Buy Subscription
          </Link>
        </div>
        <Separator />

        <UserTable
          searchKey="country"
          pageNo={page}
          columns={columns}
          totalUsers={totalUsers}
          data={user}
          pageCount={pageCount}
        />
      </div>
    </>
  );
}
