import { CountryService } from "@/app/api/v1/countries/countries.service";
import BreadCrumb from "@/components/ui/dashboard/breadcrumb";
import { CountriesForm } from "@/components/forms/countries-form";
import { QueryKeys } from "@/constants/common";
import { axiosInstance } from "@/helpers/axiosInstance";
import { Country } from "@prisma/client";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

const AddNewCountryPage = async ({
  params,
}: {
  params: { countryId: string };
}) => {
  const { countryId } = params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.COUNTRY, countryId],
    queryFn: async () => {
      if (!countryId) return;
      const res = await axiosInstance.get(`/countries/${countryId}`);
      return res.data;
    },
  });

  return (
    <div className="flex-1 space-y-4 p-8">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CountriesForm key={null} />
      </HydrationBoundary>
    </div>
  );
};

export default AddNewCountryPage;
