"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useSearchParams } from "next/navigation";
// import { DataTable } from "@/components/ui/data-table";
// import { columns } from "./columns";
import { Separator } from "@/components/ui/separator";
import { QueryKeys } from "@/constants/common";
import { axiosInstance } from "@/helpers/axiosInstance";
import { IGenericResponse } from "@/types/common";
import { Admin } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Heading } from "../../ui/dashboard/heading";
import { columns } from "./columns";
import { AdminsTable } from "./admins-table";

interface ProductsClientProps {
  isSuperOrGrandAdmin: boolean;
}

export const AdminsClient: React.FC<ProductsClientProps> = ({
  isSuperOrGrandAdmin,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const search = searchParams.get("search") || null;

  const { data, isLoading } = useQuery({
    queryKey: [QueryKeys.ADMINS],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/admins?page=${page}&limit=${limit}` +
          (search ? `&search=${search}` : ``)
      );
      return res.data as IGenericResponse<Admin[]>;
    },
  });

  const pageCount = Math.ceil((data?.meta?.total as number) / limit);
  const total = data?.meta?.total as number;
  const allData = data?.data as Admin[];

  let content = null;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else {
    content = (
      <AdminsTable
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
          title={`Admins (${isLoading ? "0" : total})`}
          description="Manage Admins for your business"
        />
        {isSuperOrGrandAdmin && (
          <Button
            className="text-xs md:text-sm"
            onClick={() => router.push(`/dashboard/manage-admins/admins/new`)}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Button>
        )}
      </div>
      <Separator />
      {content}
    </>
  );
};
