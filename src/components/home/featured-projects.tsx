import React from "react";
import FeaturedProject from "./featured-project";
import lawRulesImg from "@/assets/images/Law Rules.png";
import PledgedImg from "@/assets/images/প্রদান প্রতিশ্রুতি (সিটিজেন্_স চার্টার).png";
import grsImg from "@/assets/images/GRS.png";

const FeaturedProjects = () => {
  const featuredList = [
    {
      id: 1,
      title: "Project 1",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      image: lawRulesImg,
    },
    {
      id: 2,
      title: "Project 2",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      image: PledgedImg,
    },
    {
      id: 3,
      title: "Project 3",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      image: grsImg,
    },
    {
      id: 4,
      title: "Project 4",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      image: lawRulesImg,
    },
    {
      id: 5,
      title: "Project 5",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      image: PledgedImg,
    },
    {
      id: 6,
      title: "Project 6",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      image: grsImg,
    },

  ];

  return (
    <section className="py-20">
      {/* Our Project text heading with a border bottom */}
      <h2 className="text-center text-3xl font-bold max-w-[12rem] pb-3 mx-auto">
        Our Projects
      </h2>
      {/* project card should be 6 card */}
      <div className="grid grid-cols-3 gap-20 mt-10 [&>*]:text-2xl">
        {/* Project card */}
        {featuredList.map((item) => (
          <FeaturedProject
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            image={item.image}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProjects;
