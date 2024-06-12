import BlurImage from "@/components/ui/blur-image";
import Container from "@/components/ui/container";
import Link from "next/link";
import { Metadata } from "next";
import { projects } from "@/constants/projects";
import { format } from "date-fns";

export const metadata: Metadata = {
  title: "Samadhan Foundation | Projects",
  description:
    "Dynamic Krishok & Imam Muazzin Development Foundation (DKIMDF).",
};

const ProjectsPage = () => {
  return (
    <section className="min-h-screen">
      <Container>
        <div className="py-20">
          <h1 className="text-4xl font-bold mb-8">Projects</h1>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {projects.map(
              ({ id, title, description, image, dateTime, href }) => (
                <Link href={href} key={id}>
                  <div className="flex max-w-lg flex-col-reverse rounded-xl border-[1px] border-tertiary py-4 px-6 transition duration-200 hover:border-accent md:hover:scale-[1.01]">
                    <span className="mr-1 inline-flex items-center space-x-1 text-gray-300 transition duration-200">
                      <div className="mt-8 flex-col space-y-4">
                        <h2 className="text-lg font-semibold text-black transition duration-200 hover:opacity-60">
                          {title}
                        </h2>
                        <p className="text-gray-600 transition duration-200 hover:opacity-60">
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
        </div>
      </Container>
    </section>
  );
};

export default ProjectsPage;
