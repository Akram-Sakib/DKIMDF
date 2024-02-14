import { VillagesForm } from "@/components/forms/villages-form";
import { QueryKeys } from "@/constants/common";
import { axiosInstance } from "@/helpers/axiosInstance";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

const VillagePage = async ({
  params,
}: {
  params: { id: string };
}) => {
  const { id } = params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.VILLAGE, id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/villages/${id}`);

      return res.data;
    },
  });

  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.POSTOFFICES],
    queryFn: async () => {
      const res = await axiosInstance.get(`/post-offices?limit=500`);
      return res.data;
    },
  });

  return (
    <div className="flex-1 space-y-4 p-8">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <VillagesForm />
      </HydrationBoundary>
    </div>
  );
};

export default VillagePage;
