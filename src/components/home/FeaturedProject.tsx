import React from "react";

const FeaturedProject = () => {
  return (
    <div className="border-2 border-black h-[16rem] flex flex-col justify-center items-center relative">
      <h2>Project 1</h2>
      <button className="border-2 px-2 border-black self-end absolute right-2 bottom-2 text-sm ">
        More
      </button>
    </div>
  );
};

export default FeaturedProject;
