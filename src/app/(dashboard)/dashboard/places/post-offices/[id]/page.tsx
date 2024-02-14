import { PostOfficesForm } from "@/components/forms/post-office-form";
import { QueryKeys } from "@/constants/common";
import { axiosInstance } from "@/helpers/axiosInstance";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

const PostOfficePage = async ({
  params,
}: {
  params: { id: string };
}) => {
  const { id } = params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.POSTOFFICE, id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/post-offices/${id}`);

      return res.data;
    },
  });

  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.THANAS],
    queryFn: async () => {
      const res = await axiosInstance.get(`/thana?limit=500`);
      return res.data;
    },
  });

  return (
    <div className="flex-1 space-y-4 p-8">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PostOfficesForm />
      </HydrationBoundary>
    </div>
  );
};

export default PostOfficePage;
