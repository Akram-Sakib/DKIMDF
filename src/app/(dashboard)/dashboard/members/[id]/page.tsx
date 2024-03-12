import { MemberForm } from "@/components/forms/member-form";
import { QueryKeys } from "@/constants/common";
import { axiosInstance } from "@/helpers/axiosInstance";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

const Member = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { id } = params;
  // const authorizationScope = searchParams.authorizationScope;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.ADMIN, id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/members/${id}`);
      return res.data;
    },
  });

  // await queryClient.prefetchQuery({
  //   queryKey: [QueryKeys.COUNTRIES],
  //   queryFn: async () => {
  //     const res = await axiosInstance.get(`/countries?limit=500`);
  //     return res.data;
  //   },
  // });

  // await queryClient.prefetchQuery({
  //   queryKey: [QueryKeys.DIVISIONS],
  //   queryFn: async () => {
  //     const res = await axiosInstance.get(`/divisions?limit=500`);
  //     return res.data;
  //   },
  // });

  // await queryClient.prefetchQuery({
  //   queryKey: [QueryKeys.DISTRICTS],
  //   queryFn: async () => {
  //     const res = await axiosInstance.get(`/districts?limit=500`);
  //     return res.data;
  //   },
  // });

  // await queryClient.prefetchQuery({
  //   queryKey: [QueryKeys.THANAS],
  //   queryFn: async () => {
  //     const res = await axiosInstance.get(`/thana?limit=500`);
  //     return res.data;
  //   },
  // });

  // await queryClient.prefetchQuery({
  //   queryKey: [QueryKeys.POSTOFFICES],
  //   queryFn: async () => {
  //     const res = await axiosInstance.get(`/post-offices?limit=500`);
  //     return res.data;
  //   },
  // });

  // await queryClient.prefetchQuery({
  //   queryKey: [QueryKeys.VILLAGES],
  //   queryFn: async () => {
  //     const res = await axiosInstance.get(`/villages?limit=500`);
  //     return res.data;
  //   },
  // });

  return (
    <div className="flex-1 space-y-4 p-8">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MemberForm />
      </HydrationBoundary>
    </div>
  );
};

export default Member;
