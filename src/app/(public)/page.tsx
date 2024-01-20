
import Banner from "@/components/home/banner";
import BannerMiddle from "@/components/home/banner-middle";
import Featured from "@/components/home/featured";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import NewsAndEvents from "@/components/home/NewsAndEvents";
import ReachedTo from "@/components/home/reached-to/reached-to";
import NewsNavbar from "@/components/ui/header/NewsNavbar";


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
