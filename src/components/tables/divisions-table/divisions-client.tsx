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
import { Division } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Heading } from "../../ui/dashboard/heading";
import { columns } from "./columns";
import { DivisionsTable } from "./divisions-table";

interface ProductsClientProps {
  // data: User[];
}

export const DivisionsClient: React.FC<ProductsClientProps> = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const search = searchParams.get("search") || null;

  const { data, isLoading } = useQuery({
    queryKey: [QueryKeys.DIVISIONS],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/divisions?page=${page}&limit=${limit}` +
          (search ? `&search=${search}` : ``)
      );
      return res.data as IGenericResponse<Division[]>;
    },
  });

  const pageCount = data?.meta?.total as number;
  const total = data?.meta?.total as number;
  const allData = data?.data as Division[];

  let content = null;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else {
    content = (
      <DivisionsTable
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
          title={`Divisions (${ isLoading ? "0" :total})`}
          description="Manage divisions for your business"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/places/divisions/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      {content}
    </>
  );
};
