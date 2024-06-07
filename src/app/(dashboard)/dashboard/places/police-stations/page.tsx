import { PoliceStationClient } from "@/components/tables/police-stations-table/police-station-client";
import BreadCrumb from "@/components/ui/dashboard/breadcrumb";
import { QueryKeys } from "@/constants/common";
import { axiosInstance } from "@/helpers/axiosInstance";
import { IGenericResponse } from "@/types/common";
import { Thana } from "@prisma/client";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
const breadcrumbItems = [
  { title: "Places", link: "/dashboard/places" },
  { title: "Police Stations", link: "/dashboard/places/police-stations" },
];
type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Samadhan Foundation | PoliceStations",
  description:
    "Dynamic Krishok & Imam Muazzin Development Foundation (DKIMDF) Dashboard Page.",
};

const PoliceStationsPage = async ({ searchParams }: paramsProps) => {
  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;
  const search = searchParams.search || null;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.THANAS],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/thana?page=${page}&limit=${pageLimit}` +
          (search ? `&search=${search}` : ``)
      );
      return res.data as IGenericResponse<Thana[]>;
    },
  });

  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <HydrationBoundary state={dehydrate(queryClient)}>
          <PoliceStationClient />
        </HydrationBoundary>
      </div>
    </>
  );
};

export default PoliceStationsPage;
