import { ProjectForm } from "@/components/forms/project-form";
import { QueryKeys } from "@/constants/common";
import { axiosInstance } from "@/helpers/axiosInstance";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

const Project = async ({
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
    queryKey: [QueryKeys.PROJECT, id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/projects/${id}`);
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


  return (
    <div className="flex-1 space-y-4 p-8">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProjectForm />
      </HydrationBoundary>
    </div>
  );
};

export default Project;
