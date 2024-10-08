import { AdminsClient } from "@/components/tables/admins-table/admins-client";
import BreadCrumb from "@/components/ui/dashboard/breadcrumb";
import { QueryKeys } from "@/constants/common";
import { axiosInstance } from "@/helpers/axiosInstance";
import { authOptions } from "@/lib/authOptions";
import { IGenericResponse } from "@/types/common";
import { Admin } from "@prisma/client";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getServerSession } from "next-auth";
const breadcrumbItems = [
  { title: "Manage Admins", link: "/dashboard/manage-admins" },
  { title: "Admins", link: "/dashboard/manage-admins/admins" },
];
type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Samadhan Foundation | Admins",
  description:
    "Dynamic Krishok & Imam Muazzin Development Foundation (DKIMDF) Dashboard Page.",
};

const AdminsPage = async ({ searchParams }: paramsProps) => {
  const session = (await getServerSession(authOptions)) as any;
  const isSuperOrGrandAdmin =
    session.role === "super_admin" || session.role === "grand_admin";

  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;
  const search = searchParams.search || null;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.SUPERADMINS],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/admins?page=${page}&limit=${pageLimit}` +
          (search ? `&search=${search}` : ``)
      );
      return res.data as IGenericResponse<Admin[]>;
    },
  });

  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <HydrationBoundary state={dehydrate(queryClient)}>
          <AdminsClient isSuperOrGrandAdmin={isSuperOrGrandAdmin} />
        </HydrationBoundary>
      </div>
    </>
  );
};

export default AdminsPage;
