"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Separator } from "../separator";
type Props = {
  routes: {
    label: string;
    href: string;
  }[];
};

const MenuButton = ({ routes }: Props) => {

  const [open, setOpen] = React.useState(false);
  const pathName = usePathname();

  // whenever routes changes, close the menu
  React.useEffect(() => {
    setOpen(false);
  }, [pathName]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Menu className=" w-6 h-6 sm:hidden" />
      </SheetTrigger>
      <SheetContent side="left" className="w-3/4">
        <h3 className="text-lg font-bold">Shamadhan Foundation</h3>
        <Separator className="mb-4 mt-2"/>
        <nav className="flex flex-col gap-4">
          {routes.map((route) => (
            <Link
              key={route.label}
              href={route.href}
              className="block px-2 text-base"
            >
              {route.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MenuButton;
