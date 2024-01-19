import React from "react";
// import FeaturedProject from "./featured-project";
// import lawRulesImg from "@/assets/images/Law Rules.png";
// import PledgedImg from "@/assets/images/প্রদান প্রতিশ্রুতি (সিটিজেন্_স চার্টার).png";
// import grsImg from "@/assets/images/GRS.png";
import Link from "next/link";
import BlurImage from "../ui/blur-image";
import HeadingText from "../ui/heading/heading-text";
import Container from "../ui/container";

const FeaturedProjects = () => {
  // const featuredList = [
  //   {
  //     id: 1,
  //     title: "Project 1",
  //     description:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
  //     image: lawRulesImg,
  //   },
  //   {
  //     id: 2,
  //     title: "Project 2",
  //     description:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
  //     image: PledgedImg,
  //   },
  //   {
  //     id: 3,
  //     title: "Project 3",
  //     description:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
  //     image: grsImg,
  //   },
  //   {
  //     id: 4,
  //     title: "Project 4",
  //     description:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
  //     image: lawRulesImg,
  //   },
  //   {
  //     id: 5,
  //     title: "Project 5",
  //     description:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
  //     image: PledgedImg,
  //   },
  //   {
  //     id: 6,
  //     title: "Project 6",
  //     description:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
  //     image: grsImg,
  //   },

  // ];

  return (
    <section
      className="py-20"
      style={{
        background: "#f7fafd",
      }}
    >
      <Container>
        {/* Our Project text heading with a border bottom */}
        <HeadingText title="Our Projects" />
        {/* project card should be 6 card */}
        <div className="grid grid-cols-3 gap-20 mt-10">
          {/* Project card */}
          {/* {featuredList.map((item) => (
          <FeaturedProject
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            image={item.image}
          />
        ))} */}
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="flex max-w-lg flex-col-reverse rounded-xl border-[1px] border-tertiary py-4 px-6 transition duration-200 hover:border-accent md:hover:scale-[1.01]"
            >
              <Link
                href={"/projects/new"}
                className="mr-1 inline-flex items-center space-x-1 text-gray-300 transition duration-200"
              >
                <div className="mt-8 flex-col space-y-4">
                  <h2 className="text-lg font-semibold text-black transition duration-200 hover:opacity-60">
                    Creating a Custom Solana Connect Wallet UI with React and
                    Chakra UI
                  </h2>
                  <p className="text-gray-300 transition duration-200 hover:opacity-60">
                    February 15th, 2023
                  </p>
                </div>
              </Link>
              {/* <Link
              href={"/projects/#"}
              className="mr-1 inline-flex items-center space-x-1 text-gray-300 transition duration-200 aspect-[16/9] overflow-hidden rounded-2xl drop-shadow-md"
            > */}
              <BlurImage
                alt="Image"
                aspectRatio={16 / 9}
                className="rounded-lg bg-gray-200"
                imgClassName="rounded-lg"
                image={
                  "https://cdn.hashnode.com/res/hashnode/image/upload/v1661675955811/Oyqc_FemE.png?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp"
                }
              />
              {/* </Link> */}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FeaturedProjects;
