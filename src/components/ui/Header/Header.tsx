import React from "react";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <>
      <div className="flex justify-between [&>*]:border-2 [&>*]:border-black [&>*]:p-2 [&>*]:px-5 text-lg">
        <h2>Logo</h2>
        <h2 className="basis-[80%] text-center">
          Dynamic Krishok & Imam Muazzin Development Foundation
        </h2>
        <div>Calendar</div>
      </div>
      <Navbar />
    </>
  );
};

export default Header;
