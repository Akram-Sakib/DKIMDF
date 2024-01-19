import { cn } from "@/lib/utils";
import React from "react";

interface HeadingTextProps {
  className?: string;
  title: string;
  titleClassName?: string;
  paragraph?: string;
  paragraphClassName?: string;
}

const HeadingText = ({
  className,
  title,
  paragraph,
  titleClassName,
  paragraphClassName,
}: HeadingTextProps) => {
  return (
    <div className={cn("text-center max-w-md mx-auto", className)}>
      <h2 className={cn("text-3xl font-bold mb-3 mx-auto", titleClassName)}>
        {title}
      </h2>
      {!!paragraph && <p className={cn(paragraphClassName)}>{paragraph}</p>}
    </div>
  );
};

export default HeadingText;
