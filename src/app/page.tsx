import Banner from "@/components/home/Banner";
import BannerMiddle from "@/components/home/BannerMiddle";
import Featured from "@/components/home/Featured";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import NewsAndEvents from "@/components/home/NewsAndEvents";
import ReachedTo from "@/components/home/ReachedTo";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header/Header";
import LatestNavbar from "@/components/ui/Header/LatestNavbar";

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl">
      <Header />
      <Banner />
      <LatestNavbar />
      <Featured />
      <FeaturedProjects />
      <BannerMiddle />
      <ReachedTo />
      <NewsAndEvents />
      <Footer />
    </main>
  );
}
