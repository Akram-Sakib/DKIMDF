import { DistrictsForm } from "@/components/forms/districts-form";
import { PoliceStationForm } from "@/components/forms/police-station-form";
import { QueryKeys } from "@/constants/common";
import { axiosInstance } from "@/helpers/axiosInstance";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

const PoliceStationPage = async ({
  params,
}: {
  params: { id: string };
}) => {
  const { id } = params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.THANA, id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/thana/${id}`);

      return res.data;
    },
  });

  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.DISTRICTS],
    queryFn: async () => {
      const res = await axiosInstance.get(`/districts?limit=500`);
      return res.data;
    },
  });

  return (
    <div className="flex-1 space-y-4 p-8">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PoliceStationForm />
      </HydrationBoundary>
    </div>
  );
};

export default PoliceStationPage;
