import Link from "next/link";
import Container from "../container";
import LanguageSelect from "../languageSwitch/languageSelect";
import MenuButton from "./menuButton";
import ProfileButton from "./profileButton";

const Navbar = () => {
  const routes = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Gallery", href: "/gallery" },
    { label: "News", href: "/news" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Dashboard", href: "/dashboard" },
  ];

  return (
    <div
      className={
        "flex py-3 lg:px-4 z-[1] bg-background/50 backdrop-filter-blur"
      }
    >
      <Container>
        <div className="lg:px-8 flex h-12 sm:h-14 md:h-16 items-center justify-between w-full">
          <div className="flex space-x-2">
            <MenuButton routes={routes} />
            <Link href="/">
              <h1 className="text-xl font-bold hidden lg:block">
                Somadhan Foundation
              </h1>
            </Link>
          </div>
          <nav className="flex items-center space-x-4 md:space-x-6 lg:space-x-8 text-lg">
            {routes.map((route) => (
              <Link
                key={route.label}
                href={route.href}
                className="hidden sm:block text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100 border-transparent px-2 rounded border"
              >
                {route.label}
              </Link>
            ))}
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
            <ProfileButton />
            <LanguageSelect />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
