"use client";
import { buttonVariants } from "@/components/ui/button";
import { CheckSquare2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
// import { DataTable } from "@/components/ui/data-table";
// import { columns } from "./columns";
import { Separator } from "@/components/ui/separator";
import { QueryKeys } from "@/constants/common";
import { axiosInstance } from "@/helpers/axiosInstance";
import { cn } from "@/lib/utils";
import { IGenericResponse } from "@/types/common";
import { Subscription } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heading } from "../../ui/dashboard/heading";
import { columns } from "./columns";
import { SubscriptionTable } from "./subscription-table";

interface ProductsClientProps {
  // data: User[];
}

export const SubscriptionClient: React.FC<ProductsClientProps> = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const search = searchParams.get("search") || null;

  const { data, isLoading } = useQuery({
    queryKey: [QueryKeys.SUBSCRIPTIONS],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/subscription?page=${page}&limit=${limit}` +
          (search ? `&search=${search}` : ``)
      );
      return res.data as IGenericResponse<Subscription[]>;
    },
  });

  const pageCount = data?.meta?.total as number;
  const total = data?.meta?.total as number;
  const allData = data?.data as Subscription[];

  let content = null;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else {
    content = (
      <SubscriptionTable
        pageCount={pageCount}
        searchKey="name"
        columns={columns}
        data={allData}
        total={total}
        pageNo={page}
      />
    );
  }

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Subscriptoins (${isLoading ? 0 : total})`}
          description="Manage subscriptions for your business"
        />
        <Link
          href={"/dashboard/subscription/list/buy-subscription"}
          className={cn(buttonVariants({ variant: "default" }))}
        >
          <CheckSquare2 className="mr-2 h-4 w-4" />
          Buy Subscription
        </Link>
      </div>
      <Separator />
      {content}
    </>
  );
};
