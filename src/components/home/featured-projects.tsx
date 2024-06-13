import React from "react";
import Link from "next/link";
import BlurImage from "../ui/blur-image";
import HeadingText from "../ui/heading/heading-text";
import Container from "../ui/container";
import { projects } from "@/constants/projects";
import { format } from "date-fns";

// dateTime should be unique for each project
const FeaturedProjects = () => {
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
          {projects.map(
            ({ title, description, image, dateTime, href }, index) => (
              <Link href={`/projects/${href}`} key={index}>
                <div className="flex max-w-lg flex-col-reverse rounded-xl border-[1px] border-tertiary py-4 px-6 transition duration-200 hover:border-accent md:hover:scale-[1.01]">
                  <span className="mr-1 inline-flex items-center space-x-1 text-gray-300 transition duration-200">
                    <div className="mt-8 flex-col space-y-4">
                      <h2 className="text-lg font-semibold text-black transition duration-200 hover:opacity-60">
                        {title}
                      </h2>
                      <p className="text-gray-700 transition duration-200 hover:opacity-60">
                        {format(new Date(dateTime), "MMMM dd, yyyy")}
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
