// import { CreateProfileOne } from "@/components/forms/user-profile-stepper/create-profile";
import BreadCrumb from "@/components/ui/dashboard/breadcrumb";
import CreateProfileOne from "@/components/ui/dashboard/create-profile";
import { QueryKeys } from "@/constants/common";
import { axiosInstance } from "@/helpers/axiosInstance";
import { IGenericResponse } from "@/types/common";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

const breadcrumbItems = [{ title: "Profile", link: "/dashboard/profile" }];
export default async function page() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.PROFILE],
    queryFn: async () => {
      const res = await axiosInstance.get(`/profile/me`);
      return res.data as IGenericResponse<any>;
    },
  });

  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <HydrationBoundary state={dehydrate(queryClient)}>
          <CreateProfileOne />
        </HydrationBoundary>
      </div>
    </>
  );
}
