"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useSearchParams } from "next/navigation";
// import { DataTable } from "@/components/ui/data-table";
// import { columns } from "./columns";
import { Separator } from "@/components/ui/separator";
import { axiosInstance } from "@/helpers/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { Heading } from "../../ui/dashboard/heading";
import { DataTable } from "../../ui/data-table";
import { columns } from "./columns";
import { CountriesTable } from "./countries-table";
import { QueryKeys } from "@/constants/common";
import { useRouter } from "next/navigation";
import { IGenericResponse } from "@/types/common";
import { Country } from "@prisma/client";

interface ProductsClientProps {
  // data: User[];
}

export const CountriesClient: React.FC<ProductsClientProps> = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const search = searchParams.get("search") || null;

  const { data, isLoading } = useQuery({
    queryKey: [QueryKeys.COUNTRIES],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/countries?page=${page}&limit=${limit}` +
          (search ? `&search=${search}` : ``)
      );
      return res.data as IGenericResponse<Country[]>;
    },
  });

  const pageCount = Math.ceil((data?.meta?.total as number) / limit);
  const total = data?.meta?.total as number;
  const allData = data?.data as Country[];

  let content = null;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else {
    content = (
      <CountriesTable
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
          title={`Countries (${ isLoading ? "0" :total})`}
          description="Manage countries for your business"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/places/countries/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      {content}
    </>
  );
};
