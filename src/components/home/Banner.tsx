import React from "react";
import bongobondhuImage from "@/assets/images/bongobondhu.png";
import Image from "next/image";

const Banner = () => {
  return (
    <div className="w-full mt-3">
      <Image
        src={bongobondhuImage}
        width={1500}
        height={1000}
        alt="Bongobondhu Image"
      />
    </div>
  );
};

export default Banner;
