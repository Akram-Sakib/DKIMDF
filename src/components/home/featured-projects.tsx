import React from "react";
import agronomistImg from "@/assets/images/projects/young-bangaldeshi-farmer-agronomist-banker-discuss-home.jpg";
import bazaarImg from "@/assets/images/projects/bangladeshi-man-bazaar.jpg";
import gardenImg from "@/assets/images/projects/closeup-shot-two-bangladesh-men-opening-birthday-gifts-garden.jpg";
import farmingTips from "@/assets/images/projects/farming-tips.jpg";
import clgMenShakingHandsTips from "@/assets/images/projects/diverse-colleague-men-shaking-hands-together.jpg";
import workingBoyShakingHandsTips from "@/assets/images/projects/brunette-boy-with-beard-working-laptop-typing.jpg";
import Link from "next/link";
import BlurImage from "../ui/blur-image";
import HeadingText from "../ui/heading/heading-text";
import Container from "../ui/container";

// dateTime should be unique for each project
const FeaturedProjects = () => {
  const featuredList = [
    {
      id: 1,
      title:
        "Banker Advising Farmers on Financial Management Strategies and Loans",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      slug: "/projects/new",
      image: agronomistImg,
      dateTime: "February 15th, 2023",
    },
    {
      id: 2,
      title:
        "Older Man Focused on Creating Intricate Clay Objects with Precision",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      image: bazaarImg,
      slug: "/projects/new",
      dateTime: "January 15th, 2022",
    },
    {
      id: 3,
      title:
        "Closeup of Two Men Celebrating and Opening Gifts in a Garden",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      image: gardenImg,
      slug: "/projects/new",
      dateTime: "March 12th, 2023",
    },
    {
      id: 4,
      title:
        "Man Demonstrating Agricultural Mobile App to Farmer and Son in Field",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      image: farmingTips,
      dateTime: "September 29th, 2023",
      slug: "/projects/new",
    },
    {
      id: 5,
      title:
        "Agronomist and Farmer Discussing Crop Management",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      image: clgMenShakingHandsTips,
      dateTime: "July 18th, 2022",
      slug: "/projects/new",
    },
    {
      id: 6,
      title:
        "Young Farmer Using Technology to Monitor Crop Growth Harvest Yields",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      image: workingBoyShakingHandsTips,
      dateTime: "August 24th, 2023",
      slug: "/projects/new",
    },
  ];

  return (
    <section
      className="py-12 md:py-20"
      style={{
        background: "#f7fafd",
      }}
    >
      <Container>
        {/* Our Project text heading with a border bottom */}
        <HeadingText title="Our Projects" />
        {/* project card should be 6 card */}
        <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-20 mt-10">
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
          {featuredList.map(
            ({ title, description, image, dateTime, slug }, index) => (
              <Link href={slug} key={index}>
                <div className="flex max-w-lg flex-col-reverse rounded-xl border-[1px] border-tertiary py-4 px-6 transition duration-200 hover:border-accent md:hover:scale-[1.01]">
                  <span className="mr-1 inline-flex items-center space-x-1 text-gray-300 transition duration-200">
                    <div className="mt-8 flex-col space-y-4">
                      <h2 className="text-lg font-semibold text-black transition duration-200 hover:opacity-60">
                        {title}
                      </h2>
                      <p className="text-gray-700 transition duration-200 hover:opacity-60">
                        {dateTime}
                      </p>
                    </div>
                  </span>
                  {/* <Link
           href={"/projects/#"}
           className="mr-1 inline-flex items-center space-x-1 text-gray-300 transition duration-200 aspect-[16/9] overflow-hidden rounded-2xl drop-shadow-md"
         > */}
                  <BlurImage
                    alt="Image"
                    aspectRatio={16 / 9}
                    className="rounded-lg bg-gray-200 aspect-w-16 aspect-h-9"
                    imgClassName="rounded-lg"
                    image={image}
                  />
                  {/* </Link> */}
                </div>
              </Link>
            )
          )}
        </div>
      </Container>
    </section>
  );
};

export default FeaturedProjects;
