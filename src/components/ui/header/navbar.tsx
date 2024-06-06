import Link from "next/link";
import Container from "../container";
import LanguageSelect from "../languageSwitch/languageSelect";
import MenuButton from "./menuButton";
import ProfileButton from "./profileButton";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { QueryKeys } from "@/constants/common";
import { axiosInstance } from "@/helpers/axiosInstance";
import Image from "next/image";
import Logo from "@/assets/images/somadhan-foundation-logo.png"

const Navbar = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.PROFILE],
    queryFn: async () => {
      const res = await axiosInstance.get(`/profile/me`);
      return res.data as any;
    },
  });

  const profileData = await queryClient.getQueryData<any>([QueryKeys.PROFILE]);
  // console.log(profileData.id);

  const routes = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Gallery", href: "/gallery" },
    { label: "News", href: "/news" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Login", href: "/login" },
    { label: "Dashboard", href: "/dashboard" },
  ];

  const filteredRoutes = routes.filter((route) => {
    // Hide Login if profileData exists, hide Dashboard otherwise
    return profileData?.id
      ? route.label !== "Login"
      : route.label !== "Dashboard";
  });

  return (
    <div
      className={
        "flex py-3 lg:px-4 z-[1] bg-background/50 backdrop-filter-blur"
      }
    >
      <Container>
        <div className="flex h-12 sm:h-14 md:h-16 items-center justify-between w-full">
          <div className="flex space-x-2">
            <MenuButton routes={routes} />
            <Link href="/">
              <Image
                src={Logo}
                alt="Somadhan Foundation"
                width={40}
                height={40}
              />
              {/* <h1 className="text-xl font-bold hidden lg:block">
                Somadhan Foundation
              </h1> */}
            </Link>
          </div>
          <nav className="flex items-center space-x-4 md:space-x-6 lg:space-x-8 text-lg">
            {filteredRoutes.map((route) => {
              return (
                <Link
                  key={route.label}
                  href={route.href}
                  className="hidden sm:block text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100 border-transparent px-2 rounded border"
                >
                  {route.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-x-2 md:gap-x-3">
            {/* <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle Theme"
              className="rounded-full"
              // onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-6 w-6 md:h-7 md:w-7 hidden dark:block transition-all" />
              <Moon className="h-6 w-6 md:h-7 md:w-7 block dark:hidden transition-all" />
            </Button> */}

            <HydrationBoundary state={dehydrate(queryClient)}>
              <ProfileButton />
            </HydrationBoundary>
            <LanguageSelect />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
