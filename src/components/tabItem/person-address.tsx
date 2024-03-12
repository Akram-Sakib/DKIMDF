import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import FormInput from "../formelements/form-input";
import { Button } from "../ui/button";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@/constants/common";
import { axiosInstance } from "@/helpers/axiosInstance";
import FormSelect from "../formelements/form-select";
import { useState } from "react";
import { Checkbox } from "../ui/checkbox";

const PersonAddress = ({
  handlePrevNextTabs,
}: {
  handlePrevNextTabs: (type: "prev" | "next") => void;
}) => {
  const [isSameAddress, setIsSameAddress] = useState<boolean>(false);
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

  const disableCountriesLoading = isSameAddress
    ? isSameAddress
    : CountriesLoading;
  const disableDivisionsLoading = isSameAddress
    ? isSameAddress
    : DivisionsLoading;
  const disableDistrictsLoading = isSameAddress
    ? isSameAddress
    : DistrictsLoading;
  const disableThanasLoading = isSameAddress ? isSameAddress : ThanasLoading;
  const disablePostOfficesLoading = isSameAddress
    ? isSameAddress
    : PostOfficesLoading;
  const disableVillagesLoading = isSameAddress
    ? isSameAddress
    : VillagesLoading;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-x-10">
        <div className="space-y-5">
          <h2 className="text-2xl font-bold">Permanent Address</h2>
          <div className="space-y-5">
            <FormSelect
              name="permanentAddress.countryId"
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
              name="permanentAddress.divisionId"
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
              name="permanentAddress.districtId"
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
              name="permanentAddress.thanaId"
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
              name="permanentAddress.postOfficeId"
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
              name="permanentAddress.villageId"
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
          </div>
        </div>
        <div className="space-y-5">
          <h2 className="text-2xl font-bold">Present Address</h2>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={isSameAddress}
              onCheckedChange={(e) => setIsSameAddress(!isSameAddress)}
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Same as Present Address
            </label>
          </div>
          <div className="space-y-5">
            <FormSelect
              name="presentAddress.countryId"
              label="Country"
              options={countries?.data.map((country: any) => ({
                label: country.name,
                value: country.id,
              }))}
              loading={CountriesLoading}
              disabled={disableCountriesLoading}
              placeholder="Select Country"
              required={true}
            />
            <FormSelect
              name="presentAddress.divisionId"
              label="Division"
              options={divisions?.data.map((division: any) => ({
                label: division.name,
                value: division.id,
              }))}
              loading={DivisionsLoading}
              disabled={disableDivisionsLoading}
              placeholder="Select Division"
              required={true}
            />
            <FormSelect
              name="presentAddress.districtId"
              label="District"
              options={districts?.data.map((district: any) => ({
                label: district.name,
                value: district.id,
              }))}
              loading={DistrictsLoading}
              disabled={disableDistrictsLoading}
              placeholder="Select District"
              required={true}
            />
            <FormSelect
              name="presentAddress.thanaId"
              label="Thana"
              options={thanas?.data.map((thana: any) => ({
                label: thana.name,
                value: thana.id,
              }))}
              loading={ThanasLoading}
              disabled={disableThanasLoading}
              placeholder="Select Thana"
              required={true}
            />
            <FormSelect
              name="presentAddress.postOfficeId"
              label="Post Office"
              options={postOffices?.data.map((postOffice: any) => ({
                label: postOffice.name,
                value: postOffice.id,
              }))}
              loading={PostOfficesLoading}
              disabled={disablePostOfficesLoading}
              placeholder="Select Post Office"
              required={true}
            />
            <FormSelect
              name="presentAddress.villageId"
              label="Village"
              options={villages?.data.map((village: any) => ({
                label: village.name,
                value: village.id,
              }))}
              loading={VillagesLoading}
              disabled={disableVillagesLoading}
              placeholder="Select Village"
              required={true}
            />
          </div>
        </div>
      </div>
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
