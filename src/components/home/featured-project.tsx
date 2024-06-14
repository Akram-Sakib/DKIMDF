import Image, { StaticImageData } from "next/image";
import React from "react";
import { Card } from "../ui/card";

type FeaturedProjectProps = {
  id: number;
  title: string;
  descriptions: string[];
  image: StaticImageData | string;
};

const FeaturedProject = ({
  id,
  title,
  descriptions,
  image,
}: FeaturedProjectProps) => {
  return (
    <Card
      key={id}
      className="shadow-xl h-72 flex flex-col justify-center items-center relative hover:shadow-2xl transition-all duration-300 ease-in-out cursor-pointer px-5 rounded-md"
    >
      <Image src={image} alt={title} width={150} height={150} />
      <h3 className="font-bold mt-3 text-lg">{title}</h3>
      <p className="mt-3 text-sm font-semibold text-[#6f8ba4] text-center">
        {descriptions}
      </p>
      <button className="text-sm text-right font-bold self-end mr-5 mt-2 hover:underline underline-offset-2">
        More
      </button>
    </Card>
  );
};

export default FeaturedProject;
