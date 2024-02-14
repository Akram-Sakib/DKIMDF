import { DistrictsForm } from "@/components/forms/districts-form";
import { QueryKeys } from "@/constants/common";
import { axiosInstance } from "@/helpers/axiosInstance";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

const DistrictPage = async ({
  params,
}: {
  params: { id: string };
}) => {
  const { id } = params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.DISTRICT, id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/districts/${id}`);

      return res.data;
    },
  });

  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.DIVISIONS],
    queryFn: async () => {
      const res = await axiosInstance.get(`/divisions?limit=100`);
      return res.data;
    },
  });

  return (
    <div className="flex-1 space-y-4 p-8">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <DistrictsForm />
      </HydrationBoundary>
    </div>
  );
};

export default DistrictPage;
