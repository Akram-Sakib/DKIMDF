import EventsImage from "@/assets/images/EventsImage.jpg";
import Image from "next/image";

const NewsAndEvents = () => {
  const news = [
    {
      id: 1,
      image: EventsImage,
    },
    {
      id: 2,
      image: EventsImage,
    },
    {
      id: 3,
      image: EventsImage,
    },
    {
      id: 4,
      image: EventsImage,
    },
    {
      id: 5,
      image: EventsImage,
    },
    {
      id: 6,
      image: EventsImage,
    },
  ];

  return (
    <section className="mt-10">
      <h2 className="border-b-2 border-black text-center text-3xl max-w-[15rem] pb-3 mx-auto mb-10">
        News & Events
      </h2>
      <div className="grid grid-cols-3 gap-10 mt-5 [&>*]:text-2xl">
        {
          // Loop 6 times

          news.map((item, i) => (
            <div key={item.id} className="">
              <div className="relative h-96 w-full shadow-lg hover:shadow-2xl   transition duration-500 ease-in-out">
                <Image
                  src={item.image}
                  alt="Events Image"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
          ))
        }
      </div>
    </section>
  );
};

export default NewsAndEvents;
