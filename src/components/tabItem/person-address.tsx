import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import FormInput from "../formelements/form-input";
import { Button } from "../ui/button";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@/constants/common";
import { axiosInstance } from "@/helpers/axiosInstance";
import FormSelect from "../formelements/form-select";

const PersonAddress = ({
  handlePrevNextTabs,
}: {
  handlePrevNextTabs: (type: "prev" | "next") => void;
}) => {
  const { data: countries, isLoading: CountriesLoading } = useQuery({
    queryKey: [QueryKeys.COUNTRIES],
    queryFn: async () => {
      const response = await axiosInstance.get("/countries?limit=1000");
      return response.data;
    },
  });

  const { data: divisions, isLoading: DivisionsLoading } = useQuery({
    queryKey: [QueryKeys.DIVISIONS],
    queryFn: async () => {
      const response = await axiosInstance.get("/divisions?limit=1000");
      return response.data;
    },
  });

  const { data: districts, isLoading: DistrictsLoading } = useQuery({
    queryKey: [QueryKeys.DISTRICTS],
    queryFn: async () => {
      const response = await axiosInstance.get("/districts?limit=1000");
      return response.data;
    },
  });

  const { data: thanas, isLoading: ThanasLoading } = useQuery({
    queryKey: [QueryKeys.THANAS],
    queryFn: async () => {
      const response = await axiosInstance.get("/thana?limit=1000");
      return response.data;
    },
  });

  const { data: postOffices, isLoading: PostOfficesLoading } = useQuery({
    queryKey: [QueryKeys.POSTOFFICES],
    queryFn: async () => {
      const response = await axiosInstance.get("/post-offices?limit=1000");
      return response.data;
    },
  });

  const { data: villages, isLoading: VillagesLoading } = useQuery({
    queryKey: [QueryKeys.VILLAGES],
    queryFn: async () => {
      const response = await axiosInstance.get("/villages?limit=1000");
      return response.data;
    },
  });

  return (
    <div className="space-y-5">
      <FormSelect
        name="country"
        label="Country"
        options={countries?.data.map((country: any) => ({
          label: country.name,
          value: country.id,
        }))}
        loading={CountriesLoading}
        disabled={CountriesLoading}
        placeholder="Select Country"
        required={true}
      />
      <FormSelect
        name="division"
        label="Division"
        options={divisions?.data.map((division: any) => ({
          label: division.name,
          value: division.id,
        }))}
        loading={DivisionsLoading}
        disabled={DivisionsLoading}
        placeholder="Select Division"
        required={true}
      />
      <FormSelect
        name="district"
        label="District"
        options={districts?.data.map((district: any) => ({
          label: district.name,
          value: district.id,
        }))}
        loading={DistrictsLoading}
        disabled={DistrictsLoading}
        placeholder="Select District"
        required={true}
      />
      <FormSelect
        name="thana"
        label="Thana"
        options={thanas?.data.map((thana: any) => ({
          label: thana.name,
          value: thana.id,
        }))}
        loading={ThanasLoading}
        disabled={ThanasLoading}
        placeholder="Select Thana"
        required={true}
      />
      <FormSelect
        name="postOffice"
        label="Post Office"
        options={postOffices?.data.map((postOffice: any) => ({
          label: postOffice.name,
          value: postOffice.id,
        }))}
        loading={PostOfficesLoading}
        disabled={PostOfficesLoading}
        placeholder="Select Post Office"
        required={true}
      />
      <FormSelect
        name="village"
        label="Village"
        options={villages?.data.map((village: any) => ({
          label: village.name,
          value: village.id,
        }))}
        loading={VillagesLoading}
        disabled={VillagesLoading}
        placeholder="Select Village"
        required={true}
      />
      <div className="space-x-4 flex">
        <Button
          onClick={() => handlePrevNextTabs("prev")}
          type="button"
          className="space-x-2"
        >
          <FaArrowLeftLong size={18} />
          <span className="inline-block"> Prev</span>{" "}
        </Button>
        <Button
          onClick={() => handlePrevNextTabs("next")}
          type="button"
          className="space-x-2"
        >
          <span className="inline-block">Next</span>{" "}
          <FaArrowRightLong size={18} />
        </Button>
      </div>
    </div>
  );
};

export default PersonAddress;
