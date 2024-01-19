import Image from "next/image";
import Link from "next/link";
import { FaRegCalendar } from "react-icons/fa";
import { BsArrowRightShort } from "react-icons/bs";
import { format } from "date-fns";
import BlurImage from "../ui/blur-image";

type PostCardProps = {
  post: {
    title: string;
    excerpt: string;
    slug: string;
    createdAt: string;
    featuredImage: {
      url: string;
    };
    categories: { name: string }[];
    author: {
      name: string;
      photo: {
        url: string;
      };
    };
  };
};

const PostCard = ({ post }: PostCardProps) => {
  return (
    <Link href={`/news/${post.slug}`}>
      <article className={`flex flex-col gap-3 sm:gap-5 rounded cursor-pointer`}>
        <div className="">
          <BlurImage
            image={post.featuredImage.url}
            aspectRatio={16 / 9}
            // width={500}
            // height={500}
            alt={post.title}
            className="object-contain sm:object-cover object-top w-full sm:h-72 md:h-60 rounded"
          />
        </div>

        <div>
          <p className="text-sm font-[500] text-[#7c7c7c]">
            {post.categories[0].name}
          </p>
          <h2 className="sm:text-xl font-semibold">
            <span /* href={`/post/${post.slug}`} */ >{post.title}</span>
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <div>
            <Image
              src={post.author.photo.url}
              width={40}
              height={40}
              alt={post.author.name}
              className="cursor-pointer object-cover object-top rounded-full"
            />
          </div>
          <div>
            <p className="cursor-pointer text-sm font-[500]">
              {post.author.name}
            </p>
            <div className="flex items-center gap-1 mt-1">
              <FaRegCalendar className="text-indigo-500" />
              <p className="text-[#7c7c7c] text-sm">
                {format(new Date(post.createdAt), "MMM dd, yyyy")}
              </p>
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm sm:text-base">{post.excerpt}</p>
        </div>
        <span
          // href={`/post/${post.slug}`}
          className="block w-fit capitalize rounded-full font-[500] text-indigo-500 hover:text-indigo-600"
        >
          <span className="flex items-center gap-1 text-sm sm:text-base hover:gap-2 transition-all">
            read more
            <BsArrowRightShort className="text-xl mt-[2px] sm:text-2xl" />
          </span>
        </span>
      </article>
    </Link>
  );
};

export default PostCard;