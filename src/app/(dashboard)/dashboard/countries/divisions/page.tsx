const breadcrumbItems = [
  { title: "Countries", link: "/dashboard/countries" },
  { title: "Divisions", link: "/dashboard/countries/divisions" },
];

import { columns } from "@/components/tables/user-tables/columns";
import { UserTable } from "@/components/tables/user-tables/user-table";
import { buttonVariants } from "@/components/ui/button";
import BreadCrumb from "@/components/ui/dashboard/breadcrumb";
import { Heading } from "@/components/ui/dashboard/heading";
import { Separator } from "@/components/ui/separator";
import { Employee } from "@/constants/data";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Samadhan Foundation | Divisions",
  description:
    "Dynamic Krishok & Imam Muazzin Development Foundation (DKIMDF) Dashboard Page.",
};

export default async function DivisionsPage({
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
            title={`Divisions (${totalUsers})`}
            description="Manage Division (Server side table functionalities.)"
          />

          <Link
            href={"/dashboard/divisions/new"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New Division
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
