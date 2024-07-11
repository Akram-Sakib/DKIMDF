"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mb-16 items-center justify-center text-center">
      <span className="bg-gradient-to-b from-foreground to-transparent bg-clip-text text-[10rem] font-extrabold leading-none text-transparent">
        500
      </span>
      <h2 className="my-2 font-heading text-2xl font-bold">
       Internal Server Error
      </h2>
{/*       <h2 className="my-2 font-heading text-2xl font-bold">
        Something&apos;s missing
      </h2> */}
{/*       <p>
        Sorry, the page you are looking for doesn&apos;t exist or has been
        moved.
      </p> */}
      <p>
        If you are the author of this website, please contact your developer.
      </p>
      // <div className="mt-8 flex justify-center gap-2">
      //   <Button
      //     onClick={() => router.push("/dashboard")}
      //     variant="outline"
      //     size="lg"
      //   >
      //     Back to Dashboard
      //   </Button>
      //   <Button onClick={() => router.back()} variant="default" size="lg">
      //     Go back
      //   </Button>
      //   <Button
      //     onClick={() => router.push("/")}
      //     variant="outline"
      //     size="lg"
      //   >
      //     Back to Homepage
      //   </Button>
      // </div>
    </div>
  );
}
