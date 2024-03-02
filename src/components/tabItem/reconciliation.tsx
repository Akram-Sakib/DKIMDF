import { FaArrowLeftLong } from "react-icons/fa6";
import FormCheckBox from "../formelements/form-checkbox";
import FormCldImage from "../formelements/form-cldImage";
import { Button } from "../ui/button";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@/constants/common";
import { axiosInstance } from "@/helpers/axiosInstance";
import { Membership } from "@prisma/client";
import { IGenericResponse } from "@/types/common";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import FormMembershipCard from "../formelements/form-membership-card";

const Reconciliation = ({
  handlePrevNextTabs,
}: {
  handlePrevNextTabs: (type: "prev" | "next") => void;
}) => {
  const { data, isLoading } = useQuery({
    queryKey: [QueryKeys.MEMBERSHIPS],
    queryFn: async () => {
      const res = await axiosInstance.get(`/membership?limit=10`);
      return res.data as IGenericResponse<Membership[]>;
    },
  });

  return (
    <div className="space-y-5">
      <FormCldImage
        name="imageUrl"
        label="Your Image"
        required
        width="100"
        height="100"
        className="rounded-full"
      />
      <FormCldImage
        name="infoVerificationPhoto"
        label="Your Driving License or Passport image"
        height="300"
        width="300"
        className="rounded-lg"
        required
      />

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="!my-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data?.data.map((membership: any) => (
            <FormMembershipCard
              key={membership.id}
              membership={membership}
              name="membershipId"
              label="Membership"
              required
            />
          ))}
        </div>
      )}
      <FormCheckBox
        name="termsAggrement"
        label="Do you agree with our terms & conditions"
        required
      />
      <div className="flex gap-x-4">
        <Button
          onClick={() => handlePrevNextTabs("prev")}
          type="button"
          className="space-x-2 w-24"
        >
          <FaArrowLeftLong size={18} />
          <span className="inline-block"> Prev</span>{" "}
        </Button>
        <Button type="submit">Submit</Button>
      </div>
    </div>
  );
};

export default Reconciliation;
