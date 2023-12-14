import React from "react";
import FeaturedProject from "./FeaturedProject";

const FeaturedProjects = () => {
  return (
    <section className="mt-10">
      {/* Our Project text heading with a border bottom */}
      <h2 className="border-b-2 border-black text-center text-3xl max-w-[12rem] pb-3 mx-auto">
        Our Projects
      </h2>
      {/* project card should be 6 card */}
      <div className="grid grid-cols-3 gap-5 mt-5 [&>*]:text-2xl">
        {/* Project card */}
        <FeaturedProject />
        <FeaturedProject />
        <FeaturedProject />
        <FeaturedProject />
        <FeaturedProject />
        <FeaturedProject />
      </div>
    </section>
  );
};

export default FeaturedProjects;
