import { QueryKeys } from "@/constants/common";
import { axiosInstance } from "@/helpers/axiosInstance";
import { cn } from "@/lib/utils";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import Link from "next/link";
// import ThemeToggle from "./ThemeToggle/theme-toggle";
import { MobileSidebar } from "./mobile/mobile-sidebar";
import { UserNav } from "./user-nav";
import Image from "next/image";
import SubscriptionPopup from "../header/subscription-popup";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export default async function DashboardHeader() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.PROFILE],
    queryFn: async () => {
      const res = await axiosInstance.get(`/profile/me`);
      return res.data as any;
    },
  });
  const session = (await getServerSession(authOptions)) as any;
  const role = session?.role;

  return (
    <div className="fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-20">
      <nav className="h-14 flex items-center justify-between px-4">
        <div className={cn("hidden md:block")}>
          <Link href="/">
            <Image
              src={"/samadhan-foundation.png"}
              alt="Samadhan Foundation"
              width={40}
              height={40}
            />
            {/* <strong className="text-lg font-bold">Samadhan Foundation</strong> */}
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg> */}
          </Link>
        </div>
        <div className={cn("block sm:!hidden")}>
          <MobileSidebar role={role}/>
        </div>

        <div className="flex items-center gap-2">
          <HydrationBoundary state={dehydrate(queryClient)}>
            <UserNav />
          </HydrationBoundary>
          {/* <ThemeToggle /> */}
        </div>
      </nav>
      <SubscriptionPopup />
    </div>
  );
}
