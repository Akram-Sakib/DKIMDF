import BlurImage from "@/components/ui/blur-image";
import Container from "@/components/ui/container";
import Link from "next/link";

const ProjectsPage = () => {
  return (
    <section className="min-h-screen">
      <Container>
        <div className="py-20">
          <h1 className="text-4xl font-bold mb-8">Projects</h1>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <article className="flex max-w-lg flex-col-reverse rounded-xl border-[1px] border-tertiary py-4 px-6 transition duration-200 hover:border-accent md:hover:scale-[1.01]">
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
            </article>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ProjectsPage;
