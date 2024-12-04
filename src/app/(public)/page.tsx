import BrandsMarquee from "@/components/cards/brands-marquee";
import Banner from "@/components/home/banner";
import BannerMiddle from "@/components/home/banner-middle";
import Featured from "@/components/home/featured";
import FeaturedProjects from "@/components/home/featured-projects";
import NewsAndEvents from "@/components/home/news-and-events";
import ReachedTo from "@/components/home/reached-to/reached-to";
import NewsNavbar from "@/components/ui/header/news-navbar";

export default async function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return (
    <>
      <Banner />
      <NewsNavbar />
      {/* <div className="mx-auto container pt-20"> */}
      <BrandsMarquee />
      <Featured />
      <FeaturedProjects />
      <BannerMiddle />
      <ReachedTo />
      <NewsAndEvents />
      {/* </div> */}
    </>
  );
}
