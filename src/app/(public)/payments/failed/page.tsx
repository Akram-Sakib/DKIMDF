import Link from "next/link";
import React from "react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Samadhan Foundation | Payment Failed",
  description:
    "Dynamic Krishok & Imam Muazzin Development Foundation (DKIMDF).",
};

const Failed = async () =>
  //   {
  //   searchParams,
  // }: {
  //   searchParams: {
  //     [key: string]: string | string[] | undefined;
  //   };
  // }
  {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center w-full">
        <div className="bg-white p-6">
          <svg
            viewBox="0 0 24 24"
            className="text-red-600 w-16 h-16 mx-auto my-6"
          >
            <path
              fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
            ></path>
          </svg>
          <div className="text-center">
            <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
              Payment Failed!
            </h3>
            <p className="text-gray-600 my-2">
              Your payment was not successful. Please try again.
            </p>
            <div className="py-10 text-center ">
              <Link
                href="/"
                className="rounded-lg px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
              >
                GO BACK
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default Failed;
