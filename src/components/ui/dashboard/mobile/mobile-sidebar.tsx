"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navItems } from "@/constants/data";
import { MenuIcon } from "lucide-react";
import { useState } from "react";
import { DashboardNav } from "../dashboard-nav";

// import { Playlist } from "../data/playlists";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  // playlists: Playlist[];
  role: string;
}

export function MobileSidebar({ className, role }: SidebarProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <MenuIcon />
        </SheetTrigger>
        <SheetContent side="left" className="!px-0">
          <div className="space-y-4 py-4">
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                Samadhan Group
              </h2>
              <div className="space-y-1">
                {/* @ts-ignore */}
                <DashboardNav items={navItems(role)} setOpen={setOpen} />
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
