import { newsEvents } from "@/constants/news-events";
import { format } from "date-fns";
import Link from "next/link";
import BlurImage from "../ui/blur-image";
import Container from "../ui/container";
import HeadingText from "../ui/heading/heading-text";
import { Post } from "@prisma/client";

const NewsAndEvents = async ({ posts }: { posts: Post[] }) => {

  return (
    <section
      className="py-12 md:py-20"
      style={{
        background: "#f5f6fa",
      }}
    >
      <Container>
        {<HeadingText title="News & Events" className={"mb-10"} />}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-rows-2 gap-16 mt-5 [&>*]:text-2xl">
          {posts.map((item, i) => (
            <Link href={`/news/${item.id}`} key={item.id}>
              <div
                className={`relative w-full shadow-lg hover:shadow-2xl  transition duration-500 ease-in-out rounded-lg hover:-translate-y-1.5 cursor-pointer group ${
                  i == 3 && "col-start-2"
                }`}
              >
                <BlurImage
                  image={item.imageUrl}
                  alt={item.title}
                  className="rounded-lg bg-gray-200 aspect-w-10 aspect-h-9"
                  imgClassName="rounded-lg"
                />
                <div className="absolute inset-0 from-black bg-gradient-to-t rounded-lg" />
                <div className="transition-all translate-y-0 z-10 absolute bottom-0 w-full text-white rounded-b-lg p-6 text-lg ">
                  <span className="text-sm">
                    {format(new Date(item?.createdAt), "MMM dd @ hh:mm a")}
                  </span>
                  <h3 className="font-semibold text-xl">{item.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default NewsAndEvents;
