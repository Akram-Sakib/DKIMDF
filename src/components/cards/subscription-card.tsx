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
      // <Card
      //   key={id}
      //   className={`w-[350px] shadow-2xl py-5 hover:bg-gray-900 hover:text-white transition-all duration-300 ease-in-out cursor-pointer group`}
      //   //   ${
      //   //     selectedId === membership.id
      //   //       ? "bg-gray-900 text-white"
      //   //       : "bg-white text-black"
      //   //   }
      // >
      //   <CardHeader className="flex flex-col justify-center items-center gap-y-2">
      //     <CardTitle className="text-xl">{membershipData?.title}</CardTitle>
      //     <CardTitle>{subscriptionFee}Tk</CardTitle>
      //   </CardHeader>
      //   <CardContent className="space-y-4">
      //     <h6 className="text-lg font-semibold">Current Subscription</h6>
      //     <ul className="list-disc px-8 space-y-4 mx-auto">
      //       <li>
      //         Started Time:{" "}
      //         {startTime ? format(new Date(startTime), "dd/MM/yyyy") : "N/A"}
      //       </li>
      //       <li>
      //         End Time:{" "}
      //         {endTime ? format(new Date(endTime), "dd/MM/yyyy") : "N/A"}
      //       </li>
      //       <li>Subscription Ends In {remainingDays} Days</li>
      //     </ul>
      //     <h6 className="text-lg font-semibold">
      //       Extend Subscription for next Month
      //     </h6>
      //     <ul className="list-disc px-8 space-y-4 mx-auto">
      //       <li>Next Month: {nextMonth ? format(nextMonth, "PPP") : "N/A"}</li>
      //       <li>
      //         Monthly Subscription Fee:{" "}
      //         {subscriptionFee ? `${subscriptionFee}Tk` : "N/A"}
      //       </li>
      //     </ul>
      //   </CardContent>
      //   <CardFooter>
      //     <Button className="group-hover:bg-white group-hover:text-black hover:scale-105 transition-all">
      //       Extend Subscription
      //     </Button>
      //   </CardFooter>
      // </Card>
    );
  }
};

export default SubscriptionCard;
