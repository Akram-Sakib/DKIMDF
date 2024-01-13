"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useState } from "react";

interface BlurImageProps {
  image: string | StaticImageData;
  alt: string;
}

export default function BlurImage({ image, alt }: BlurImageProps) {
  const [isLoading, setLoading] = useState(true);

  return (
    <div className="group">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-5">
        <Image
          alt={alt}
          src={image}
          layout="fill"
          objectFit="cover"
          className={`
                duration-700 ease-in-out group-hover:scale-105
                ${
                  isLoading
                    ? "scale-110 blur-2xl grayscale"
                    : "scale-100 blur-0 grayscale-0"
                })`}
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
    </div>
  );
}
