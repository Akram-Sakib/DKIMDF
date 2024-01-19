"use client";

import grsImg from "@/assets/images/GRS.png";
import aboutusImg from "@/assets/images/aboutus.png";
import apaImg from "@/assets/images/apa.png";
import { cn } from "@/lib/utils";
import { IconContext } from "react-icons";
import { FaNetworkWired } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";
import { LuGoal } from "react-icons/lu";
import { FaEye } from "react-icons/fa6";
import HeadingText from "../ui/heading/heading-text";
import Container from "../ui/container";

const Featured = () => {
  const featuredList = [
    {
      id: 1,
      title: "How We Work",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      icon: <FaNetworkWired size={24} />,
    },
    {
      id: 2,
      title: "Our Mission",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      icon: <LuGoal size={24} />,
    },
    {
      id: 3,
      title: "Our Vision",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      icon: <FaEye size={24} />,
    },
  ];

  return (
    <section
      className="py-20"
      style={{
        background:
          "linear-gradient(0deg, rgb(231 216 255) 0%, rgb(255 255 255) 100%)",
      }}
    >
      <Container>
        <HeadingText
          title="How We Think"
          paragraph="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
        />
        <div className="grid grid-cols-3 gap-x-20 text-center [&>*]:text-2xl py-20">
          {featuredList.map((item) => (
            <div
              key={item.id}
              className={cn(
                "shadow-xl py-10 pb-16 px-8 flex flex-col justify-center items-center relative hover:shadow-2xl transition-all duration-300 ease-in-out cursor-pointer bg-white rounded-lg hover:scale-105 hover:bg-[#0056b3] group"
              )}
            >
              <div className="mb-3 h-16 w-16 flex justify-center items-center rounded-md bg-[#f6f4fd] group-hover:bg-white ">
                <IconContext.Provider value={{ className: "text-[#4f42d2]" }}>
                  {item.icon}
                </IconContext.Provider>
              </div>
              <h3 className="font-bold mb-3 text-xl text-black group-hover:text-white">
                {item.title}
              </h3>
              <p className="text-base font-semibold text-[#6f8ba4] group-hover:text-white">
                {item.description}
              </p>
              <div
                style={{
                  background: "linear-gradient(135deg,#3a2cc2,#695de5)",
                }}
                className="absolute inset-x-auto -bottom-6 w-12 h-12 transition-all duration-300 ease-in-out rounded-full flex items-center justify-center text-white"
              >
                <FaChevronRight size={20} />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Featured;
