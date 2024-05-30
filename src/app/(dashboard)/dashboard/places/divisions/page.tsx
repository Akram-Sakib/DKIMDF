import { DivisionsClient } from "@/components/tables/divisions-table/divisions-client";
import BreadCrumb from "@/components/ui/dashboard/breadcrumb";
import { QueryKeys } from "@/constants/common";
import { axiosInstance } from "@/helpers/axiosInstance";
import { IGenericResponse } from "@/types/common";
import { Country } from "@prisma/client";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
const breadcrumbItems = [
  { title: "Places", link: "/dashboard/places" },
  { title: "Divisions", link: "/dashboard/places/divisions" },
];
type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Somadhan Foundation | Divisions",
  description:
    "Dynamic Krishok & Imam Muazzin Development Foundation (DKIMDF) Dashboard Page.",
};

const DivisionsPage = async ({ searchParams }: paramsProps) => {
  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;
  const country = searchParams.search || null;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.DIVISIONS],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/divisions?page=${page}&limit=${pageLimit}` +
          (country ? `&search=${country}` : ``)
      );
      return res.data as IGenericResponse<Country[]>;
    },
  });

  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <HydrationBoundary state={dehydrate(queryClient)}>
          <DivisionsClient />
        </HydrationBoundary>
      </div>
    </>
  );
};

export default DivisionsPage;
