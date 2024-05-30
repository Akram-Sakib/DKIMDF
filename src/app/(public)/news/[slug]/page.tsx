// import Author from "@/components/Author";
// import Categories from "@/components/Categories";
// import Comments from "@/components/Comments";
// import CommentsForm from "@/components/CommentsForm";
// import PostDetails from "@/components/PostDetails";
// import PostWidget from "@/components/PostWidget";
import Author from "@/components/post/author";
import Categories from "@/components/post/categories";
import PostDetails from "@/components/post/post-details";
import PostWidget from "@/components/post/postwidget";
import Container from "@/components/ui/container";
// import { getPostDetails, getPosts } from "@/services";

import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const post = {
  title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  slug: "lorem-ipsum-dolor-sit-amet-consectetur-adipisicing-elit",
  content: {
    raw: {
      children: [
        {
          children: [
            {
              text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque cum, quaerat culpa sapiente necessitatibus temporibus provident dolor beatae ipsa, ad dicta alias fugiat sit similique cupiditate veniam atque praesentium in. Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque cum, quaerat culpa sapiente necessitatibus temporibus provident dolor beatae ipsa, ad dicta alias fugiat sit similique cupiditate veniam atque praesentium in. Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque cum, quaerat culpa sapiente necessitatibus temporibus provident dolor beatae ipsa, ad dicta alias fugiat sit similique cupiditate veniam atque praesentium in.Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque cum, quaerat culpa sapiente necessitatibus temporibus provident dolor beatae ipsa, ad dicta alias fugiat sit similique cupiditate veniam atque praesentium in. Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque cum, quaerat culpa sapiente necessitatibus temporibus provident dolor beatae ipsa, ad dicta alias fugiat sit similique cupiditate veniam atque praesentium in. Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque cum, quaerat culpa sapiente necessitatibus temporibus provident dolor beatae ipsa, ad dicta alias fugiat sit similique cupiditate veniam atque praesentium in.Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque cum, quaerat culpa sapiente necessitatibus temporibus provident dolor beatae ipsa, ad dicta alias fugiat sit similique cupiditate veniam atque praesentium in. Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque cum, quaerat culpa sapiente necessitatibus temporibus provident dolor beatae ipsa, ad dicta alias fugiat sit similique cupiditate veniam atque praesentium in. Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque cum, quaerat culpa sapiente necessitatibus temporibus provident dolor beatae ipsa, ad dicta alias fugiat sit similique cupiditate veniam atque praesentium in.",
            },
          ],
          type: "paragraph",
        },
        {
          children: [
            {
              text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque cum, quaerat culpa sapiente necessitatibus temporibus provident dolor beatae ipsa, ad dicta alias fugiat sit similique cupiditate veniam atque praesentium in. Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque cum, quaerat culpa sapiente necessitatibus temporibus provident dolor beatae ipsa, ad dicta alias fugiat sit similique cupiditate veniam atque praesentium in. Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque cum, quaerat culpa sapiente necessitatibus temporibus provident dolor beatae ipsa, ad dicta alias fugiat sit similique cupiditate veniam atque praesentium in.Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque cum, quaerat culpa sapiente necessitatibus temporibus provident dolor beatae ipsa, ad dicta alias fugiat sit similique cupiditate veniam atque praesentium in. Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque cum, quaerat culpa sapiente necessitatibus temporibus provident dolor beatae ipsa, ad dicta alias fugiat sit similique cupiditate veniam atque praesentium in. Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque cum, quaerat culpa sapiente necessitatibus temporibus provident dolor beatae ipsa, ad dicta alias fugiat sit similique cupiditate veniam atque praesentium in.Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque cum, quaerat culpa sapiente necessitatibus temporibus provident dolor beatae ipsa, ad dicta alias fugiat sit similique cupiditate veniam atque praesentium in. Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque cum, quaerat culpa sapiente necessitatibus temporibus provident dolor beatae ipsa, ad dicta alias fugiat sit similique cupiditate veniam atque praesentium in. Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque cum, quaerat culpa sapiente necessitatibus temporibus provident dolor beatae ipsa, ad dicta alias fugiat sit similique cupiditate veniam atque praesentium in.",
            },
          ],
          type: "paragraph",
        },
      ],
    },
  },
  createdAt: "2021-07-01T10:00:00.000Z",
  featuredImage: {
    url: "https://cmsblogapp.vercel.app/_next/image?url=https%3A%2F%2Fmedia.graphassets.com%2FChu3sMuZQvwQ51HQbo2R&w=640&q=75",
  },
  categories: [
    {
      name: "News",
      slug: "news",
    },
  ],
  author: {
    name: "John Doe",
    photo: {
      url: "https://cmsblogapp.vercel.app/_next/image?url=https%3A%2F%2Fmedia.graphassets.com%2FC6KaM8BRTm24VQji2LdE&w=128&q=75",
    },
    bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque cum, quaerat culpa sapiente necessitatibus temporibus provident dolor beatae ipsa, ad dicta alias fugiat sit similique cupiditate veniam atque praesentium in.",
  },
};


export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {

  return {
    title: post.title + " | Somadhan Foundation",
    // openGraph: {
    //   images: ["/some-specific-page-image.jpg", ...previousImages],
    // },
  };
}

const Post = () => {
  
  return (
    <main className="min-h-screen pt-20 relative">
      <Container>
        <div className="relative">
          <div className="flex md:flex-row flex-col gap-5 relative">
            {/* blog post (Left Side) */}
            <div className="flex flex-col flex-1 gap-8">
              <PostDetails post={post} />
              <Author author={post.author} />
              {/* <CommentsForm slug={post.slug} /> */}
              {/* <Comments slug={post.slug} /> */}
            </div>

            {/* line between (post) & (postWidget,Categories) */}
            <div className="w-1 hidden md:block border-r border-neutral-200"></div>

            {/* postWidgets and Categories (Right Side) */}
            <div className="relative md:sticky top-2 left-0 right-0 md:w-72 lg:w-80 h-fit flex flex-col gap-10">
              <PostWidget
                slug={post.slug}
                // categories={post.categories.map((category) => category.slug)}
              />
              <Categories />
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default Post;
