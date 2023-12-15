import React from "react";
import Image from "next/image";
import aboutusImg from "@/assets/images/aboutus.png";
import apaImg from "@/assets/images/apa.png";
import grsImg from "@/assets/images/GRS.png";

const Featured = () => {
  const featuredList = [
    {
      id: 1,
      title: "How We Work",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      image: aboutusImg,
    },
    {
      id: 2,
      title: "Our Mission",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      image: apaImg,
    },
    {
      id: 3,
      title: "Our Vision",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      image: grsImg,
    },
  ];

  return (
    <div className="mt-3 flex justify-between items-center gap-x-5 text-center [&>*]:text-2xl">
      {featuredList.map((item) => (
        <div
          key={item.id}
          className="shadow-xl basis-1/3 h-72 flex flex-col justify-center items-center relative hover:shadow-2xl transition-all duration-300 ease-in-out cursor-pointer"
        >
          <Image src={item.image} alt={item.title} width={150} height={150} />
          <h3 className="font-bold mt-3 text-base">{item.title}</h3>
          <p className="mt-3 text-sm">{item.description}</p>
          <button className="text-sm text-right font-bold self-end mr-5 mt-2 hover:underline underline-offset-2">
            More
          </button>
        </div>
      ))}
    </div>
  );
};

export default Featured;
