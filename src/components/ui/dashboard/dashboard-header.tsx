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

export default async function DashboardHeader() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.PROFILE],
    queryFn: async () => {
      const res = await axiosInstance.get(`/profile/me`);
      return res.data as any;
    },
  });

  return (
    <div className="fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-20">
      <nav className="h-14 flex items-center justify-between px-4">
        <div className={cn("hidden md:block")}>
          <Link href="/">
            <strong className="text-lg font-bold">Somadhan Foundation</strong>
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
          <MobileSidebar />
        </div>

        <div className="flex items-center gap-2">
          <HydrationBoundary state={dehydrate(queryClient)}>
            <UserNav />
          </HydrationBoundary>
          {/* <ThemeToggle /> */}
        </div>
      </nav>
    </div>
  );
}
