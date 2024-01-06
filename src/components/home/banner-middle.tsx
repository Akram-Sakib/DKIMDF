import React from "react";
import PrimeMinisterImage from "@/assets/images/prime-minister.png";
import Image from "next/image";

const BannerMiddle = () => {
  return (
    <section className="w-full py-20">
      <Image
        src={PrimeMinisterImage}
        width={1500}
        height={1000}
        alt="Prime Minister Image"
      />
    </section>
  );
};

export default BannerMiddle;
