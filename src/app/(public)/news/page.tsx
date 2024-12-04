import PostCard from "@/components/post/post-card";
import Container from "@/components/ui/container";
import { QueryKeys } from "@/constants/common";
import { Post, Project } from "@prisma/client";
import { axiosInstance } from "@/helpers/axiosInstance";
import { newsEvents } from "@/constants/news-events";
import { QueryClient } from "@tanstack/react-query";

import { IGenericResponse } from "@/types/common";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Samadhan Foundation | News",
  description:
    "Dynamic Krishok & Imam Muazzin Development Foundation (DKIMDF).",
};

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

const NewsPage = async ({ searchParams }: paramsProps) => {
  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;
  const search = searchParams.search || null;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.POSTS],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/posts?page=${page}&limit=${pageLimit}` +
          (search ? `&search=${search}` : ``)
      );
      return res.data as IGenericResponse<Post[]>;
    },
  });

  const posts = queryClient.getQueryData([QueryKeys.POSTS]);
 
  let content = null;
  if ((posts as any)?.data.length > 0) {
    content = (posts as any)?.data.map((post: Post) => (
      <PostCard post={post} key={post.title} />
    ));
  } else {
    content = <h3>No Data Founded</h3>;
  }

  return (
    <main className="min-h-screen py-20 relative">
      <Container>
        <div className="flex md:flex-row flex-col gap-5 relative">
          {/* blog posts (Left Side) */}
          <div className="flex-1 grid lg:grid-cols-2 xl:grid-cols-3 gap-10 lg:gap-y-12 lg:gap-6">
            {content}
          </div>

          {/* line between (posts) & (postWidget,Categories) */}
          <div className="w-1 hidden md:block border-r border-neutral-200"></div>

          {/* postWidgets and Categories (Right Side) */}
          {/* <div className="relative md:sticky top-2 left-0 right-0 flex-2 md:w-72 lg:w-80 h-fit flex flex-col gap-10"> */}
          {/* <PostWidget /> */}
          {/* <Categories />
          </div> */}
        </div>
      </Container>
    </main>
  );
};

export default NewsPage;
