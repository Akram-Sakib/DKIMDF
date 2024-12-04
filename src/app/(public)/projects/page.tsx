import BlurImage from "@/components/ui/blur-image";
import Container from "@/components/ui/container";
import { QueryKeys } from "@/constants/common";
import { axiosInstance } from "@/helpers/axiosInstance";
import { IGenericResponse } from "@/types/common";
import { Project } from "@prisma/client";
import { QueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Samadhan Foundation | Projects",
  description:
    "Dynamic Krishok & Imam Muazzin Development Foundation (DKIMDF).",
};

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

const ProjectsPage = async ({ searchParams }: paramsProps) => {
  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;
  const search = searchParams.search || null;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.POSTS],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/projects?page=${page}&limit=${pageLimit}` +
          (search ? `&search=${search}` : ``)
      );
      return res.data as IGenericResponse<Project[]>;
    },
  });

  const projects = queryClient.getQueryData([QueryKeys.POSTS]);

  let content = null;
  if ((projects as any)?.data.length > 0) {
    content = (projects as any)?.data.map(
      ({ id, title, imageUrl, createdAt }: Project) => (
        <Link href={`/projects/${id}`} key={id}>
          <div className="flex max-w-lg flex-col-reverse rounded-xl border-[1px] border-tertiary py-4 px-6 transition duration-200 hover:border-accent md:hover:scale-[1.01]">
            <span className="mr-1 inline-flex items-center space-x-1 text-gray-300 transition duration-200">
              <div className="mt-8 flex-col space-y-4">
                <h2 className="text-lg font-semibold text-black transition duration-200 hover:opacity-60">
                  {title}
                </h2>
                <p className="text-gray-600 transition duration-200 hover:opacity-60">
                  {format(new Date(createdAt), "MMMM dd, yyyy")}
                </p>
              </div>
            </span>
            <BlurImage
              alt="Image"
              className="rounded-lg bg-gray-200 aspect-w-16 aspect-h-9"
              imgClassName="rounded-lg"
              image={imageUrl}
            />
          </div>
        </Link>
      )
    );
  } else {
    content = <h3>No Data Founded</h3>;
  }

  return (
    <section className="min-h-screen">
      <Container>
        <div className="py-20">
          <h1 className="text-4xl font-bold mb-8">Projects</h1>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">{content}</div>
        </div>
      </Container>
    </section>
  );
};

export default ProjectsPage;
