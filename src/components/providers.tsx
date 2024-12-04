"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider, SessionProviderProps } from "next-auth/react";
import React from "react";
// import ThemeProvider from "./ui/dashboard/ThemeToggle/theme-provider";

export default function Providers({
  session,
  children,
  // locale,
}: {
  session: SessionProviderProps["session"];
  children: React.ReactNode;
  // locale: string;
}) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // queryKey: ["countries", "country"],
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            // staleTime: 60 * 1000,
          },
        },
      })
  );

  return (
    <>
        {/* <ThemeProvider attribute="class" defaultTheme="light"> */}
          <SessionProvider session={session}>
            <QueryClientProvider client={queryClient}>
              {children}
              {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            </QueryClientProvider>
          </SessionProvider>
        {/* </ThemeProvider> */}
    </>
  );
}
