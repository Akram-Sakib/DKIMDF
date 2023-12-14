import React from "react";

const Featured = () => {
  return (
    <div className="mt-3 flex justify-between items-center gap-x-5 text-center [&>*]:text-2xl">
      <div className="border-2 border-black basis-1/3 h-60 flex flex-col justify-center items-center relative">
        <h2>Who We Are</h2>
        <button className="border-2 px-2 border-black self-end absolute right-2 bottom-2 text-sm ">More</button>
      </div>
      <div className="border-2 border-black basis-1/3 h-60 flex flex-col justify-center items-center">
        <h2>Mission</h2>
      </div>
      <div className="border-2 border-black basis-1/3 h-60 flex flex-col justify-center items-center">
        <h2>Vission</h2>
      </div>
    </div>
  );
};

export default Featured;
