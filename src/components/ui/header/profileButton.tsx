"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { QueryKeys } from "@/constants/common";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/helpers/axiosInstance";
import Link from "next/link";
import { logout } from "@/lib/logout";

const ProfileButton = () => {
  const { data: profileData, isLoading } = useQuery({
    queryKey: [QueryKeys.PROFILE],
    queryFn: async () => {
      const res = await axiosInstance.get(`/profile/me`);
      return res.data as any;
    },
  });
  const fullName = profileData?.firstName + " " + profileData?.lastName;
  if (!!profileData) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="flex items-center">
            {/* @ts-ignore */}
            <AvatarImage
              src={profileData?.imageUrl ?? ""}
              alt={profileData?.imageUrl ?? ""}
              className="w-7 h-7 md:w-9 md:h-9 rounded-full"
            />
            <AvatarFallback>{fullName[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">
            <Link href="/dashboard/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Link href="/dashboard/profile">Subscription</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" onClick={logout}>
            Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
};

export default ProfileButton;
