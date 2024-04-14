import { columns } from "@/components/tables/countries-table/columns";
import { CountriesTable } from "@/components/tables/countries-table/countries-table";
import { buttonVariants } from "@/components/ui/button";
import BreadCrumb from "@/components/ui/dashboard/breadcrumb";
import { Heading } from "@/components/ui/dashboard/heading";
import { Separator } from "@/components/ui/separator";
import { QueryKeys } from "@/constants/common";
import { axiosInstance } from "@/helpers/axiosInstance";
import { cn } from "@/lib/utils";
import { IGenericResponse } from "@/types/common";
import { Country } from "@prisma/client";

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { Plus } from "lucide-react";
import Link from "next/link";

const breadcrumbItems = [{ title: "Countries", link: "/dashboard/countries" }];

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

type CountryResponse ={
  data: IGenericResponse<Country[]>
};

export default async function page({ searchParams }: paramsProps) {
  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;
  const country = searchParams.search || null;
  const offset = (page - 1) * pageLimit;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.COUNTRIES],
    queryFn: async () => {
      const countries = await axiosInstance.get(
        `/countries?offset=${offset}&limit=${pageLimit}` +
          (country ? `&search=${country}` : "")
      );
      return countries;
    },
  });
  

  const countriesRes  = queryClient.getQueryData([QueryKeys.COUNTRIES]) as CountryResponse
  const totalCountries = countriesRes.data.meta.total; //1000
  // const pageCount = Math.ceil(totalCountries / pageLimit);
  const pageCount = countriesRes.data.meta.page;
  const countries: Country[] = countriesRes.data.data;
  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`Countries (${totalCountries})`}
            description="Manage Countries (Server side table functionalities.)"
          />

          <Link
            href={"/dashboard/countries/new"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />
        <HydrationBoundary state={dehydrate(queryClient)}>
          <CountriesTable
            searchKey="name"
            pageNo={page}
            // @ts-ignore
            columns={columns}
            totalUsers={totalCountries}
            data={countries}
            pageCount={pageCount}
          />
        </HydrationBoundary>
      </div>
    </>
  );
}
