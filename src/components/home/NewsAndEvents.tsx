import Image from "next/image";
import React from "react";
import EventsImage from "@/assets/images/EventsImage.jpg";

const NewsAndEvents = () => {
  return (
    <section className="mt-5">
      <h2 className="border-b-2 border-black text-center text-3xl max-w-[15rem] pb-3 mx-auto">
        News & Events
      </h2>
      <div className="grid grid-cols-3 gap-10 mt-5 [&>*]:text-2xl">
        {
          // Loop 6 times

          [...Array(6)].map((_, i) => (
            <div key={i} className="">
              <div className="relative h-96 w-full">
                <Image
                  src={EventsImage}
                  alt="Events Image"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
          ))
        }
      </div>
    </section>
  );
};

export default NewsAndEvents;
