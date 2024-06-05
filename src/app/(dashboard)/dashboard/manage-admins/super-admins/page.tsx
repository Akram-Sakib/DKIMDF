import { SuperAdminsClient } from "@/components/tables/super-admins-table/super-admins-client";
import BreadCrumb from "@/components/ui/dashboard/breadcrumb";
import { QueryKeys } from "@/constants/common";
import { axiosInstance } from "@/helpers/axiosInstance";
import { IGenericResponse } from "@/types/common";
import { SuperAdmin } from "@prisma/client";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
const breadcrumbItems = [
  { title: "Manage Admins", link: "/dashboard/manage-admins" },
  { title: "Super Admins", link: "/dashboard/admins/super-admins" },
];
type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Somadhan Foundation | Super Admins",
  description:
    "Dynamic Krishok & Imam Muazzin Development Foundation (DKIMDF) Dashboard Page.",
};

const SuperAdminsPage = async ({ searchParams }: paramsProps) => {
  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;
  const search = searchParams.search || null;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.SUPERADMINS],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/super-admins?page=${page}&limit=${pageLimit}` +
          (search ? `&search=${search}` : ``)
      );
      return res.data as IGenericResponse<SuperAdmin[]>;
    },
  });

  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <HydrationBoundary state={dehydrate(queryClient)}>
          <SuperAdminsClient />
        </HydrationBoundary>
      </div>
    </>
  );
};

export default SuperAdminsPage;
