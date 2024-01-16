"use client";

import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AspectRatio } from "./aspect-ratio";

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
      <AspectRatio ratio={aspectRatio}
        className={cn(
          "w-full overflow-hidden",
          className
        )}
      >
        <Image
          alt={alt}
          src={image}
          layout="fill"
          objectFit="cover"
          className={cn(
            `duration-700 ease-in-out group-hover:scale-105
          ${
            isLoading
              ? "scale-110 blur-2xl grayscale"
              : "scale-100 blur-0 grayscale-0"
          })`,
            imgClassName
          )}
          onLoadingComplete={() => setLoading(false)}
        />
      </AspectRatio>
    </div>
  );
}
