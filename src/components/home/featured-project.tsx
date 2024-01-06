import Image, { StaticImageData } from "next/image";
import React from "react";

type FeaturedProjectProps = {
  id: number;
  title: string;
  description: string;
  image: StaticImageData;
};

const FeaturedProject = ({
  id,
  title,
  description,
  image,
}: FeaturedProjectProps) => {
  return (
    <div
      key={id}
      className="shadow-xl h-72 flex flex-col justify-center items-center relative hover:shadow-2xl transition-all duration-300 ease-in-out cursor-pointer px-5 rounded-md"
    >
      <Image src={image} alt={title} width={150} height={150} />
      <h3 className="font-bold mt-3 text-lg">{title}</h3>
      <p className="mt-3 text-sm font-semibold text-[#6f8ba4] text-center">
        {description}
      </p>
      <button className="text-sm text-right font-bold self-end mr-5 mt-2 hover:underline underline-offset-2">
        More
      </button>
    </div>
  );
};

export default FeaturedProject;
