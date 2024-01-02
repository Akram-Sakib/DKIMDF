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
      className="shadow-xl basis-1/3 h-72 flex flex-col justify-center items-center relative hover:shadow-2xl transition-all duration-300 ease-in-out cursor-pointer"
    >
      <Image src={image} alt={title} width={150} height={150} />
      <h3 className="font-bold mt-3 text-base">{title}</h3>
      <p className="mt-3 text-sm text-center">{description}</p>
      <button className="text-sm text-right font-bold self-end mr-5 mt-2 hover:underline underline-offset-2">
        More
      </button>
    </div>
  );
};

export default FeaturedProject;
