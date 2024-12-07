import BrandsMarquee from "@/components/cards/brands-marquee";
import Banner from "@/components/home/banner";
import BannerMiddle from "@/components/home/banner-middle";
import Featured from "@/components/home/featured";
import FeaturedProjects from "@/components/home/featured-projects";
import NewsAndEvents from "@/components/home/news-and-events";
import ReachedTo from "@/components/home/reached-to/reached-to";
import NewsNavbar from "@/components/ui/header/news-navbar";
import { IGenericResponse } from "@/types/common";
import { QueryKeys } from "@/constants/common";
import { QueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/helpers/axiosInstance";
import { Post, Project } from "@prisma/client";

export default async function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const pageLimit = 6;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.PROJECTS],
    queryFn: async () => {
      const res = await axiosInstance.get(`/projects?limit=${pageLimit}`);
      return res.data.data as IGenericResponse<Project[]>;
    },
  });

  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.POSTS],
    queryFn: async () => {
      const res = await axiosInstance.get(`/posts?limit=${pageLimit}`);
      return res.data.data as IGenericResponse<Post[]>;
    },
  });

  const posts = queryClient.getQueryData([QueryKeys.POSTS]) as Post[];
  const projects = queryClient.getQueryData([QueryKeys.PROJECTS]) as Project[];
  // console.log(posts);

  return (
    <>
      <Banner />
      <NewsNavbar />
      {/* <div className="mx-auto container pt-20"> */}
      <BrandsMarquee />
      <Featured />
      <FeaturedProjects projects={projects} />
      <BannerMiddle />
      <ReachedTo />
      <NewsAndEvents posts={posts} />
      {/* </div> */}
    </>
  );
}
