"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
// import { getRecentPosts, getSimilarPosts } from "@/services";
import { useTheme } from "next-themes";
import Image from "next/image";
import { format } from "date-fns";

interface PostWidgetProps {
  categories?: {
    name: string;
    slug: string;
  }[];
  slug: string;
}

interface RelatedPostProps {
  title: string;
  slug: string;
  featuredImage: {
    url: string;
  };
  createdAt: string;
}

const PostWidget = ({ categories, slug }: PostWidgetProps) => {
  const [relatedPosts, setRelatedPosts] = useState<RelatedPostProps[]>([
    {
      title: "",
      slug: "",
      featuredImage: {
        url: "",
      },
      createdAt: "",
    },
  ]);
  const { theme, setTheme } = useTheme();

  //   useEffect(() => {
  //     if (slug) {
  //       getSimilarPosts(categories, slug).then((res) => setRelatedPosts(res));
  //     } else {
  //       getRecentPosts().then((res) => setRelatedPosts(res));
  //     }
  //   }, [slug]);

  return (
    <div
      className={`${
        theme === "light"
          ? "bg-[#f7f7f7] text-[#1d1e20]"
          : "bg-[#1d1e20] text-[#f7f7f7]"
      } rounded-lg p-5 py-6`}
    >
      <h2 className="mb-8 pb-3 text-lg font-semibold border-b border-[#d4d4d4]">
        {slug ? "Related Posts" : "Recent Posts"}
      </h2>
      <div>
        <ul className="flex flex-col gap-5">
          {relatedPosts.map((post) => (
            <Link
              href={post.slug}
              key={post.slug}
              className="flex items-center gap-1 border-b border-[#d4d4d4] pb-2"
            >
              <Image
                src={post.featuredImage.url}
                width={50}
                height={50}
                alt={post.title}
                className="rounded-full object-cover object-top w-10 h-10 aspect-auto mr-1"
              />
              <li className="hover:text-indigo-500">
                <p className="text-sm">{post.title.slice(0, 25)}...</p>
                <p className="text-xs">
                  {/* {format(new Date(post.createdAt), "MMM, dd yyyy")} */}
                  {post.createdAt}
                </p>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PostWidget;
