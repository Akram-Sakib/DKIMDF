import { DivisionsForm } from "@/components/forms/divisions-form";
import { QueryKeys } from "@/constants/common";
import { axiosInstance } from "@/helpers/axiosInstance";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

const AddNewCountryPage = async ({
  params,
}: {
  params: { id: string };
}) => {
  const { id } = params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.COUNTRY, id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/divisions/${id}`);

      return res.data;
    },
  });

  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.COUNTRIES],
    queryFn: async () => {
      const res = await axiosInstance.get(`/countries?limit=100`);
      return res.data;
    },
  });

  return (
    <div className="flex-1 space-y-4 p-8">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <DivisionsForm />
      </HydrationBoundary>
    </div>
  );
};

export default AddNewCountryPage;
