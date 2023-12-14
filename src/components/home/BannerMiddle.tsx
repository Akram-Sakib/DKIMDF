import React from "react";
import PrimeMinisterImage from "@/assets/images/prime-minister.png";
import Image from "next/image";

const BannerMiddle = () => {
  return (
    <div className="w-full mt-3">
      <Image
        src={PrimeMinisterImage}
        width={1500}
        height={1000}
        alt="Prime Minister Image"
      />
    </div>
  );
};

export default BannerMiddle;
