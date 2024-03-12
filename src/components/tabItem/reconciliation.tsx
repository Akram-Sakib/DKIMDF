import { QueryKeys } from "@/constants/common";
import { axiosInstance } from "@/helpers/axiosInstance";
import { IGenericResponse } from "@/types/common";
import { Membership } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { FaArrowLeftLong } from "react-icons/fa6";
import FormCheckBox from "../formelements/form-checkbox";
import FormCldImage from "../formelements/form-cldImage";
import FormMembershipCard from "../formelements/form-membership-card";
import { Button } from "../ui/button";

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
        name="member.imageUrl"
        label="Your Image"
        required
        width="100"
        height="100"
        className="rounded-full"
      />
      <FormCldImage
        name="member.infoVerificationPhoto"
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
              name="member.membershipId"
              label="Membership"
              required
            />
          ))}
        </div>
      )}
      {/* <FormCheckBox
        name="member.termsAggrement"
        label="Do you agree with our terms & conditions"
        required
      /> */}
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
