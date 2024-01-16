import EventsImage from "@/assets/images/EventsImage.jpg";
import { TbWorld } from "react-icons/tb";
import BlurImage from "../ui/blur-image";

const NewsAndEvents = () => {
  const news = [
    {
      id: 1,
      image: EventsImage,
      icon: <TbWorld />,
      title: "Lorem, ipsum.",
    },
    {
      id: 2,
      image: EventsImage,
      icon: <TbWorld />,
      title: "Lorem, ipsum.",
    },
    {
      id: 3,
      image: EventsImage,
      icon: <TbWorld />,
      title: "Lorem, ipsum.",
    },
    {
      id: 4,
      image: EventsImage,
      icon: <TbWorld />,
      title: "Lorem, ipsum.",
    },
    {
      id: 5,
      image: EventsImage,
      icon: <TbWorld />,
      title: "Lorem, ipsum.",
    },
    {
      id: 6,
      image: EventsImage,
      icon: <TbWorld />,
      title: "Lorem, ipsum.",
    },
  ];

  return (
    <section className="mt-10">
      <h2 className="text-center font-bold text-3xl max-w-[15rem] pb-3 mx-auto mb-10">
        News & Events
      </h2>
      <div className="grid grid-cols-3 gap-16 mt-5 [&>*]:text-2xl">
        {news.map((item, i) => (
          <div key={item.id}>
            <div className="relative w-full shadow-lg hover:shadow-2xl   transition duration-500 ease-in-out rounded-lg hover:-translate-y-1.5 cursor-pointer group">
              <BlurImage
                image={item.image}
                alt="Events Image"
                className="rounded-lg bg-gray-200"
                imgClassName="rounded-lg"
                aspectRatio={1 / 1}
              />
              <div className="transition-all invisible group-hover:visible translate-y-0 h-0 group-hover:h-16 bg-gray-950 z-10 absolute bottom-0 w-full text-white flex justify-between items-center rounded-b-lg p-3 text-lg">
                <h2 className="font-semibold">{item.title}</h2>
                <span className="h-10 w-10 rounded-full bg-blue-800 items-center justify-center flex">
                  {item.icon}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewsAndEvents;
