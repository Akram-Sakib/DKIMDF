"use client";

import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";

interface BlurImageProps {
  image: string | StaticImageData;
  alt: string;
  className?: string;
  imgClassName?: string;
  aspectRatio?: number;
}

export default function BlurImage({
  image,
  alt,
  className,
  imgClassName,
  aspectRatio
}: BlurImageProps) {
  const [isLoading, setLoading] = useState(true);

  return (
    <div className="group">
      <div
        className={cn(
          "w-full overflow-hidden",
          className
        )}
      >
        <Image
          alt={alt}
          src={image}
          fill
          // objectFit="cover"
          className={cn(
            `duration-700 ease-in-out group-hover:scale-105
          ${
            isLoading
              ? "scale-110 blur-2xl grayscale"
              : "scale-100 blur-0 grayscale-0"
          })`,
            imgClassName
          )}
          onLoad={() => setLoading(false)}
        />
      </div>
    </div>
  );
}
