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
import { SuperAdmin } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Heading } from "../../ui/dashboard/heading";
import { columns } from "./columns";
import { SuperAdminsTable } from "./super-admins-table";

interface ProductsClientProps {
  // data: User[];
}

export const SuperAdminsClient: React.FC<ProductsClientProps> = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const search = searchParams.get("search") || null;

  const { data, isLoading } = useQuery({
    queryKey: [QueryKeys.ADMINS],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/super-admins?page=${page}&limit=${limit}` +
          (search ? `&search=${search}` : ``)
      );
      return res.data as IGenericResponse<SuperAdmin[]>;
    },
  });

  const pageCount = data?.meta?.total as number;
  const total = data?.meta?.total as number;
  const allData = data?.data as SuperAdmin[];

  let content = null;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else {
    content = (
      <SuperAdminsTable
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
          title={`Super Admins (${isLoading ? "0" : total})`}
          description="Manage Super Admins for your business"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/manage-admins/super-admins/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      {content}
    </>
  );
};
