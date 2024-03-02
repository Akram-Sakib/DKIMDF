import React from "react";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { useFormContext } from "react-hook-form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { format } from "date-fns";

interface FormInputProps {
  name: string;
  membershipData: any;
  label?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  startTime?: number | Date | undefined;
  endTime?: number | Date | undefined;
  remainingDays?: number;
  nextMonth?: number | Date | undefined;
  subscriptionFee?: string;
}

const FormSubscriptionCard = ({
  membershipData,
  name,
  label,
  placeholder,
  type = "text",
  required = false,
  disabled = false,
  startTime,
  endTime,
  remainingDays,
  nextMonth,
  subscriptionFee,

  ...props
}: FormInputProps) => {
  const { control, getValues, setValue } = useFormContext();
  const selectedId = getValues(name);
  console.log(new Date().getTime());

  const handleSubscriptionFee = (subscriptionFee: string) => {
    setValue("subscriptionFee", {
      subscriptionFee,
    });
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem
            onClick={() => {
              setValue(name, membershipData.id);
              handleSubscriptionFee(
                // membershipData.membershipFee.registrationFee,
                // membershipData.membershipFee.smartCardFee,
                membershipData.membershipFee.membershipFee
              );
            }}
          >
            <FormControl>
              <Card
                className={`w-[350px] shadow-2xl py-5 hover:bg-gray-900 hover:text-white transition-all duration-300 ease-in-out cursor-pointer group`}
                //   ${
                //     selectedId === membership.id
                //       ? "bg-gray-900 text-white"
                //       : "bg-white text-black"
                //   }
              >
                <CardHeader className="flex flex-col justify-center items-center gap-y-2">
                  <CardTitle className="text-xl">
                    {membershipData?.title}
                  </CardTitle>
                  <CardTitle>{subscriptionFee}Tk</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <h6 className="text-lg font-semibold">
                    Current Subscription
                  </h6>
                  <ul className="list-disc px-8 space-y-4 mx-auto">
                    <li>
                      Started Time:{" "}
                      {startTime
                        ? format(new Date(startTime), "dd/MM/yyyy")
                        : "N/A"}
                    </li>
                    <li>
                      End Time:{" "}
                      {endTime
                        ? format(new Date(endTime), "dd/MM/yyyy")
                        : "N/A"}
                    </li>
                    <li>Subscription Ends In {remainingDays} Days</li>
                  </ul>
                  <h6 className="text-lg font-semibold">
                    Extend Subscription for next Month
                  </h6>
                  <ul className="list-disc px-8 space-y-4 mx-auto">
                    <li>
                      Next Month: {nextMonth ? format(nextMonth, "PPP") : "N/A"}
                    </li>
                    <li>
                      Monthly Subscription Fee:{" "}
                      {subscriptionFee ? `${subscriptionFee}Tk` : "N/A"}
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="group-hover:bg-white group-hover:text-black hover:scale-105 transition-all">
                    Extend Subscription
                  </Button>
                </CardFooter>
              </Card>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default FormSubscriptionCard;
