import BlurImage from "@/components/ui/blur-image";
import { projects } from "@/constants/projects";
import { format } from "date-fns";
import { notFound } from "next/navigation";

const ProjectDetailsPage = ({
  params,
}: {
  params: {
    slug: string;
  };
}) => {
  const slug = params.slug;
  const getProject = projects.find((project) => project.href === slug);
  if (!getProject) return notFound();
  const { title, descriptions, image, dateTime } = getProject;
  return (
    <main className="min-h-screen pt-20 relative">
      <div className="max-w-3xl mx-auto px-5 md:px-0">
        <div className="relative">
          <div className="flex md:flex-row flex-col gap-5 relative">
            {/* blog post (Left Side) */}
            <div className="flex flex-col flex-1 gap-8">
              <section>
                <div className="mb-5 md:mb-10">
                  <BlurImage
                    image={image}
                    // width={500}
                    // height={500}
                    alt={"featured"}
                    className="w-full h-full rounded object-cover object-top aspect-w-16 aspect-h-9"
                  />
                </div>

                <div className="flex flex-col gap-3 md:gap-5">
                  {/* <div className="flex items-center gap-2">
                    <div>
                      <Image
                        src={
                          "https://cmsblogapp.vercel.app/_next/image?url=https%3A%2F%2Fmedia.graphassets.com%2FC6KaM8BRTm24VQji2LdE&w=128&q=75"
                        }
                        width={50}
                        height={50}
                        alt={"author"}
                        className="cursor-pointer object-cover object-top rounded-full"
                      />
                    </div>
                    <div id="author">
                      <p className="cursor-pointer text-lg font-semibold">
                        John Doe
                      </p>
                      <div className="flex items-center gap-1">
                        <FaRegCalendar className="text-indigo-500 text-sm" />
                        <p className="text-[#7c7c7c]">
                          {format(
                            new Date(dateTime),
                            "MMM dd, yyyy"
                          )}
                        </p>
                      </div>
                    </div>
                  </div> */}

                  <h1 className="text-xl md:text-2xl font-bold">{title}</h1>

                  <div className="flex flex-col gap-5">
                    {descriptions.map((description, index) => (
                      <p key={index}>{description}</p>
                    ))}
                  </div>
                </div>
              </section>
              <section className="mt-5">
                <div
                  className={`  : "bg-[#1d1e20] text-[#f7f7f7]"
        } relative rounded-lg p-5 py-6 pt-[4.5rem] md:pt-16 lg:pt-[4.5rem] text-center flex items-center gap-2`}
                >
                  {/* <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                    <Image
                      src={"/images/author.jpg"}
                      width={100}
                      height={100}
                      alt={"Author Name"}
                      className="cursor-pointer object-cover object-top rounded-full"
                    />
                  </div> */}

                  <div className="flex flex-col gap-1 md:gap-0 lg:gap-3 mx-auto">
                    <h2 className="text-xl sm:text-3xl md:text-xl lg:text-3xl font-bold font-serif">
                      {format(new Date(dateTime), "MMMM dd, yyyy")}
                    </h2>
                    {/* <p className="text-sm md:text-base capitalize">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit
                    </p> */}
                  </div>
                </div>
              </section>
            </div>

            {/* line between (post) & (postWidget,Categories) */}
            {/* <div className="w-1 hidden md:block border-r border-neutral-200"></div> */}

            {/* postWidgets and Categories (Right Side) */}
            {/* <div className="relative md:sticky top-2 left-0 right-0 md:w-72 lg:w-80 h-fit flex flex-col gap-10">
              <PostWidget
                slug={post.slug}
                // categories={post.categories.map((category) => category.slug)}
              />
              <Categories />
            </div> */}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProjectDetailsPage;
