import BreadCrumb from "@/components/ui/dashboard/breadcrumb";
import { AdminClient } from "@/components/tables/admin-tables/cilent";
import { users } from "@/constants/data";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { axiosInstance } from "@/helpers/axiosInstance";
import { QueryKeys } from "@/constants/common";
import { CountriesClient } from "@/components/tables/countries-table/countries-client";
import { IGenericResponse } from "@/types/common";
import { Country } from "@prisma/client";
const breadcrumbItems = [
  { title: "Places", link: "/dashboard/places" },
  { title: "Countries", link: "/dashboard/places/countries" },
];
type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};
const CountriesPage = async ({ searchParams }: paramsProps) => {
  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;
  const country = searchParams.search || null;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.COUNTRIES],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/countries?page=${page}&limit=${pageLimit}` +
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
          <CountriesClient />
        </HydrationBoundary>
      </div>
    </>
  );
};

export default CountriesPage;
