import Banner from "@/components/home/banner";
import BannerMiddle from "@/components/home/banner-middle";
import Featured from "@/components/home/featured";
import FeaturedProjects from "@/components/home/featured-projects";
import NewsAndEvents from "@/components/home/news-and-events";
import ReachedTo from "@/components/home/reached-to";
import LatestNavbar from "@/components/ui/header/latest-navbar";

export default function Home() {
  return (
    <>
      <Banner />
      <LatestNavbar />
      <Featured />
      <FeaturedProjects />
      <BannerMiddle />
      <ReachedTo />
      <NewsAndEvents />
    </>
  );
}
