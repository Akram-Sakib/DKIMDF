
import { PostOfficeClient } from "@/components/tables/post-offices-table/post-offices-client";
import BreadCrumb from "@/components/ui/dashboard/breadcrumb";
import { QueryKeys } from "@/constants/common";
import { axiosInstance } from "@/helpers/axiosInstance";
import { IGenericResponse } from "@/types/common";
import { PostOffice } from "@prisma/client";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
const breadcrumbItems = [
  { title: "Places", link: "/dashboard/places" },
  { title: "Post Office", link: "/dashboard/places/post-offices" },
];
type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Somadhan Foundation | Post Office",
  description:
    "Dynamic Krishok & Imam Muazzin Development Foundation (DKIMDF) Dashboard Page.",
};

const PostOfficePage = async ({ searchParams }: paramsProps) => {
  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;
  const search = searchParams.search || null;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.POSTOFFICES],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/post-offices?page=${page}&limit=${pageLimit}` +
          (search ? `&search=${search}` : ``)
      );
      return res.data as IGenericResponse<PostOffice[]>;
    },
  });

  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <HydrationBoundary state={dehydrate(queryClient)}>
          <PostOfficeClient />
        </HydrationBoundary>
      </div>
    </>
  );
};

export default PostOfficePage;
