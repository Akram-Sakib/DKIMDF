import { SubscriptionForm } from "@/components/forms/subscription-form";
import { QueryKeys } from "@/constants/common";
import { axiosInstance } from "@/helpers/axiosInstance";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

const SubscriptionPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.SUBSCRIPTION, id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/subscription/${id}`);
      return res.data;
    },
  });

  // await queryClient.prefetchQuery({
  //   queryKey: [QueryKeys.POSTOFFICES],
  //   queryFn: async () => {
  //     const res = await axiosInstance.get(`/post-offices?limit=500`);
  //     return res.data;
  //   },
  // });

  return (
    <div className="flex-1 space-y-4 p-8">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SubscriptionForm />
      </HydrationBoundary>
    </div>
  );
};

export default SubscriptionPage;
