import EventsImage from "@/assets/images/gallery-one-img-1.jpg";
import EventsImage2 from "@/assets/images/gallery-one-img-2.jpg";
import EventsImage3 from "@/assets/images/gallery-one-img-3.jpg";
import { TbWorld } from "react-icons/tb";
import BlurImage from "../ui/blur-image";
import HeadingText from "../ui/heading/heading-text";
import Container from "../ui/container";

const NewsAndEvents = () => {
  const news = [
    {
      id: 1,
      image: EventsImage,
      icon: <TbWorld />,
      title: "Festival of Architecture and Interior",
    },
    {
      id: 2,
      image: EventsImage2,
      icon: <TbWorld />,
      title: "Designing Club Culture",
    },
    {
      id: 3,
      image: EventsImage3,
      icon: <TbWorld />,
      title: "Nairobi Design Week",
    },
    {
      id: 4,
      image: EventsImage,
      icon: <TbWorld />,
      title: "Festival of Architecture and Interior",
    },
    {
      id: 5,
      image: EventsImage2,
      icon: <TbWorld />,
      title: "Designing Club Culture",
    },
    {
      id: 6,
      image: EventsImage3,
      icon: <TbWorld />,
      title: "Nairobi Design Week",
    },
  ];

  return (
    <section className="py-20" style={{
      background:"#f5f6fa"
    }}>
      <Container>
        {<HeadingText title="News & Events" className={"mb-10"} />}
        <div className="grid grid-cols-3 gap-16 mt-5 [&>*]:text-2xl">
          {news.map((item, i) => (
            <div key={item.id}>
              <div className="relative w-full shadow-lg hover:shadow-2xl  transition duration-500 ease-in-out rounded-lg hover:-translate-y-1.5 cursor-pointer group">
                <BlurImage
                  image={item.image}
                  alt="Events Image"
                  className="rounded-lg bg-gray-200"
                  imgClassName="rounded-lg"
                  aspectRatio={1 / 1}
                />
                <div className="absolute inset-0 from-black bg-gradient-to-t rounded-lg" />
                <div className="transition-all translate-y-0 z-10 absolute bottom-0 w-full text-white rounded-b-lg p-6 text-lg ">
                  <span className="text-sm">May 10 @ 12:00 am </span>
                  <h3 className="font-semibold text-xl">{item.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default NewsAndEvents;
