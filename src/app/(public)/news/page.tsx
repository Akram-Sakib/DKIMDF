import Categories from "@/components/post/categories";
import PostCard from "@/components/post/post-card";
import Container from "@/components/ui/container";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Somadhan Foundation | News",
  description:
    "Dynamic Krishok & Imam Muazzin Development Foundation (DKIMDF).",
};

const NewsPage = () => {
  const posts = [
    {
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      excerpt:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, voluptates.",
      slug: "lorem-ipsum-dolor-sit-amet-consectetur-adipisicing-elit",
      createdAt: "2021-07-01T10:00:00.000Z",
      featuredImage: {
        url: "https://cmsblogapp.vercel.app/_next/image?url=https%3A%2F%2Fmedia.graphassets.com%2FChu3sMuZQvwQ51HQbo2R&w=640&q=75",
      },
      categories: [
        {
          name: "News",
        },
      ],
      author: {
        name: "John Doe",
        photo: {
          url: "https://cmsblogapp.vercel.app/_next/image?url=https%3A%2F%2Fmedia.graphassets.com%2FC6KaM8BRTm24VQji2LdE&w=128&q=75",
        },
      },
    },
    {
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      excerpt:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, voluptates.",
      slug: "lorem-ipsum-dolor-sit-amet-consectetur-adipisicing-elit-2",
      createdAt: "2021-07-01T10:00:00.000Z",
      featuredImage: {
        url: "https://cmsblogapp.vercel.app/_next/image?url=https%3A%2F%2Fmedia.graphassets.com%2FChu3sMuZQvwQ51HQbo2R&w=640&q=75",
      },
      categories: [
        {
          name: "News",
        },
      ],
      author: {
        name: "John Doe",
        photo: {
          url: "https://cmsblogapp.vercel.app/_next/image?url=https%3A%2F%2Fmedia.graphassets.com%2FC6KaM8BRTm24VQji2LdE&w=128&q=75",
        },
      },
    },
  ];

  return (
    <main className="min-h-screen pt-20 relative">
      <Container>
        <div className="flex md:flex-row flex-col gap-5 relative">
          {/* blog posts (Left Side) */}
          <div className="flex-1 grid lg:grid-cols-2 gap-10 lg:gap-y-12 lg:gap-6">
            {posts.map((post) => (
              <PostCard post={post} key={post.title} />
            ))}
          </div>

          {/* line between (posts) & (postWidget,Categories) */}
          <div className="w-1 hidden md:block border-r border-neutral-200"></div>

          {/* postWidgets and Categories (Right Side) */}
          <div className="relative md:sticky top-2 left-0 right-0 flex-2 md:w-72 lg:w-80 h-fit flex flex-col gap-10">
            {/* <PostWidget /> */}
            <Categories />
          </div>
        </div>
      </Container>
    </main>
  );
};

export default NewsPage;
