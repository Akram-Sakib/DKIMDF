import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface FormInputProps {
  name: string;
  membership: any;
  label?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
}

const FormMembershipCard = ({
  membership,
  name,
  label,
  placeholder,
  type = "text",
  required = false,
  disabled = false,
  ...props
}: FormInputProps) => {
  const { control, getValues, setValue } = useFormContext();
  const selectedId = getValues(name);

  const handleSubscription = () =>
    // registrationFee: string,
    // smartCardFee: string,
    // subscriptionFee: string
    {
      setValue("member.subscription", {
        // current date
        startTime: new Date().toISOString(),
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
              setValue(name, membership.id);
              handleSubscription();
              // membership.membershipFee.registrationFee,
              // membership.membershipFee.smartCardFee,
              // membership.membershipFee.membershipFee
            }}
          >
            <FormControl>
              <Card
                key={membership.id}
                className={`w-[350px] shadow-2xl py-5 hover:bg-gray-900 hover:text-white transition-all duration-300 ease-in-out cursor-pointer ${
                  selectedId === membership.id
                    ? "bg-gray-900 text-white"
                    : "bg-white text-black"
                }`}
              >
                <CardHeader className="flex flex-col justify-center items-center gap-y-2">
                  <CardTitle className="text-base">
                    {membership.title}
                  </CardTitle>
                  <CardTitle>
                    ${membership.membershipFee.membershipFee}
                  </CardTitle>
                </CardHeader>
                <CardContent className="">
                  <ul className="list-disc px-8 space-y-4 mx-auto">
                    <li>
                      Registration Fee: $
                      {membership.membershipFee.registrationFee}
                    </li>
                    <li>
                      Smart Card Fee: ${membership.membershipFee.smartCardFee}
                    </li>

                    <li>Total Fee: ${membership.membershipFee.totalFee}</li>
                  </ul>
                </CardContent>
              </Card>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default FormMembershipCard;
