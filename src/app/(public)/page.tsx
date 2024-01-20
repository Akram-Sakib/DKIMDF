import Featured from "@/components/home/featured";
import Banner from "@/components/home/banner";
import BannerMiddle from "@/components/home/banner-middle";
import FeaturedProjects from "@/components/home/featured-projects";
import NewsAndEvents from "@/components/home/news-and-events";
import ReachedTo from "@/components/home/reached-to/reached-to";
import NewsNavbar from "@/components/ui/header/news-navbar";

export default function Home() {
  return (
    <>
      <Banner />
      <NewsNavbar />
      {/* <div className="mx-auto container pt-20"> */}
      <Featured />
      <FeaturedProjects />
      <BannerMiddle />
      <ReachedTo />
      <NewsAndEvents />
      {/* </div> */}
    </>
  );
}
