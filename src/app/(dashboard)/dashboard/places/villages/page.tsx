import { VillagesClient } from "@/components/tables/villages-table/villages-client";
import BreadCrumb from "@/components/ui/dashboard/breadcrumb";
import { QueryKeys } from "@/constants/common";
import { axiosInstance } from "@/helpers/axiosInstance";
import { IGenericResponse } from "@/types/common";
import { Village } from "@prisma/client";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
const breadcrumbItems = [
  { title: "Places", link: "/dashboard/places" },
  { title: "Villages", link: "/dashboard/places/villages" },
];
type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Samadhan Foundation | Villages",
  description:
    "Dynamic Krishok & Imam Muazzin Development Foundation (DKIMDF) Dashboard Page.",
};

const VillagesPage = async ({ searchParams }: paramsProps) => {
  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;
  const search = searchParams.search || null;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.DISTRICTS],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/villages?page=${page}&limit=${pageLimit}` +
          (search ? `&search=${search}` : ``)
      );
      return res.data as IGenericResponse<Village[]>;
    },
  });

  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <HydrationBoundary state={dehydrate(queryClient)}>
          <VillagesClient />
        </HydrationBoundary>
      </div>
    </>
  );
};

export default VillagesPage;
