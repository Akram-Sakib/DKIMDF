import React from "react";
import Link from "next/link";
import BlurImage from "../ui/blur-image";
import HeadingText from "../ui/heading/heading-text";
import Container from "../ui/container";
// import { projects } from "@/constants/projects";
import { format } from "date-fns";
import { Project } from "@prisma/client";

// dateTime should be unique for each project
const FeaturedProjects = ({ projects }: { projects: Project[] }) => {
  let content = null;
  if (!projects || projects.length === 0) {
    content = (
      <Container>
        {/* Our Project text heading with a border bottom */}
        <HeadingText title="Our Projects" />
        <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-20 mt-10">
          {projects.map(({ id, title, imageUrl, createdAt }) => (
            <Link href={`/projects/${id}`} key={id}>
              <div className="flex max-w-lg flex-col-reverse rounded-xl border-[1px] border-tertiary py-4 px-6 transition duration-200 hover:border-accent md:hover:scale-[1.01]">
                <span className="mr-1 inline-flex items-center space-x-1 text-gray-300 transition duration-200">
                  <div className="mt-8 flex-col space-y-4">
                    <h2 className="text-lg font-semibold text-black transition duration-200 hover:opacity-60">
                      {title}
                    </h2>
                    <p className="text-gray-700 transition duration-200 hover:opacity-60">
                      {format(new Date(createdAt), "MMMM dd, yyyy")}
                    </p>
                  </div>
                </span>
                <BlurImage
                  alt="Image"
                  aspectRatio={16 / 9}
                  className="rounded-lg bg-gray-200 aspect-w-16 aspect-h-9"
                  imgClassName="rounded-lg"
                  image={imageUrl}
                />
              </div>
            </Link>
          ))}
        </div>
      </Container>
    );
  } else {
    content = (
      <Container>
        <HeadingText title="No projects available" />
      </Container>
    );
  }

  return (
    <section
      className="py-12 md:py-20"
      style={{
        background: "#f7fafd",
      }}
    >
      {content}
    </section>
  );
};

export default FeaturedProjects;
