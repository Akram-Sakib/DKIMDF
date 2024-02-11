"use client";
import { Plus } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
// import { DataTable } from "@/components/ui/data-table";
// import { columns } from "./columns";
import { User } from "@/constants/data";
import { Separator } from "@/components/ui/separator";
import { Heading } from "../../ui/dashboard/heading";
import { columns } from "./columns";
import { DataTable } from "../../ui/data-table";
import { axiosInstance } from "@/helpers/axiosInstance";
import { useQuery } from "@tanstack/react-query";

interface ProductsClientProps {
  // data: User[];
}

export const AdminClient: React.FC<ProductsClientProps> = () => {
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const search = searchParams.get("search") || null;

  const { data, isLoading } = useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/countries?page=${page}&limit=${limit}` +
          (search ? `&search=${search}` : ``)
      );
      return res;
    },
  });

  // console.log(data?.data.data);

  let content = null;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (data?.data.data.length === 0) {
    content = <p>No data found</p>;
  } else {
    content = (
      <DataTable searchKey="name" columns={columns} data={data?.data.data} />
    );
  }

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Countries (${data?.data.data.length})`}
          description="Manage countries for your business"
        />
        <Button
          className="text-xs md:text-sm"
          // onClick={() => router.push(`/dashboard/countries/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      {content}
    </>
  );
};
