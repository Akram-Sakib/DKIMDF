import { QueryKeys } from "@/constants/common";
import { axiosInstance } from "@/helpers/axiosInstance";
import { IGenericResponse } from "@/types/common";
import { Membership, Subscription } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { differenceInDays } from "date-fns";
import FormSubscriptionCard from "../formelements/form-subscription-card";

const SubscriptionCard = () => {
  const { data, isLoading } = useQuery({
    queryKey: [QueryKeys.SUBSCRIPTIONS],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/subscription?page=1&limit=10&orderBy=createdAt&sortOrder=desc`
      );
      return res.data as IGenericResponse<Subscription[]>;
    },
  });

  const {
    id,
    subscriptionFee: subscriptionFeePayload,
    startTime,
    endTime,
    membershipId,
  } = data?.data[0] || {};

  const { data: membershipData, isLoading: membershipLoading } = useQuery({
    queryKey: [QueryKeys.MEMBERSHIP],
    queryFn: async () => {
      const res = await axiosInstance.get(`/membership/${membershipId}`);
      return res.data as Membership;
    },
    enabled: !!membershipId,
  });

  // console.log(membershipData);

  //   calculate gap days between start and end time using date fns
  const gapDays = differenceInDays(new Date(endTime), new Date(startTime));
  const remainingDays = differenceInDays(new Date(endTime), new Date());

  // get next month afther end time
  const nextMonth = new Date(endTime);
  nextMonth.setMonth(nextMonth.getMonth() + 1);

  const { subscriptionFee } = subscriptionFeePayload || {};

  if (isLoading || membershipLoading) {
    return <div>Loading...</div>;
  }

  if (!data?.data[0]) {
    return <div>No Subscription Found</div>;
  }

  if (data?.data[0].id && membershipData?.id) {
    return (
      <FormSubscriptionCard
        name="membershipId"
        membershipData={membershipData}
        startTime={startTime}
        endTime={endTime}
        remainingDays={remainingDays}
        nextMonth={nextMonth}
        subscriptionFee={subscriptionFee}
      />
    );
  }
};

export default SubscriptionCard;
