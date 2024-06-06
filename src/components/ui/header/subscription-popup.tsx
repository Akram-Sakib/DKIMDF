"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { QueryKeys } from "@/constants/common";
import { axiosInstance } from "@/helpers/axiosInstance";

import { IGenericResponse } from "@/types/common";
import { Subscription } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { isAfter } from "date-fns";
import { useSession } from "next-auth/react";

const SubscriptionPopup = () => {
  // const page = Number(searchParams.page) || 1;
  // const pageLimit = Number(searchParams.limit) || 10;
  // const search = searchParams.search || null;

  const { data: session } = useSession();
  const { data, isLoading } = useQuery({
    queryKey: [QueryKeys.SUBSCRIPTIONS],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/subscription?page=${1}&limit=${10}?`
      );
      return res.data as IGenericResponse<Subscription[]>;
    },
    enabled: (session as any)?.role === "member",
  });

  const isExpiredTime = isAfter(
    new Date(),
    new Date(data?.data[0]?.endTime as Date)
  );

  if (
    !isLoading &&
    data?.data[0]?.id &&
    isExpiredTime &&
    (session as any)?.role === "member"
  ) {
    return (
      <>
        <AlertDialog defaultOpen={true}>
          <AlertDialogContent className="bg-destructive border-0">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white">
                Exntend Your Subscription?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-white">
                Your subscription is about to expire. Please extend your
                subscription to continue using our services.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Extend</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  } else {
    return null;
  }
};

export default SubscriptionPopup;
