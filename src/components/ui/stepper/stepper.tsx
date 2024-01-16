import { cn } from "@/lib/utils";
import React from "react";

export default function Stepper({
  currentStep,
  label,
}: {
  currentStep: number;
  label: string[];
}) {
  const activeColor = (index: number) =>
    currentStep >= index ? "bg-gray-900 text-white" : "bg-gray-300 dark:bg-gray-600";
  const isFinalStep = (index: number) => index === label.length - 1;

  return (
    <div className="flex items-center relative">
      {label.map((item, index) => (
        <React.Fragment key={index}>
          <div
            className={cn(
              `flex items-center justify-center w-12 h-12 rounded-full ${activeColor(
                index
              )} font-bold  transition-all duration-300 delay-300`
            )}
          >
            {index + 1}
            <span className="absolute mt-28 text-black dark:text-white text-center w-32">{item}</span>
          </div>
          {isFinalStep(index) ? null : (
            <div
              className={`w-40 transition-all delay-200 duration-500 h-1 ${activeColor(
                index
              )}`}
            ></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
