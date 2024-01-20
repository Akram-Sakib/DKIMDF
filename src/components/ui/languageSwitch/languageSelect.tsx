import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GlobeIcon } from "lucide-react";

const LanguageSelect = () => {
  return (
    <>
      <Select >
        <SelectTrigger className="w-[80px] text-sm">
          <SelectValue
            placeholder={
              <div className="flex gap-x-1 items-center">
                {<GlobeIcon className="w-4 h-4" />} <span>Bn</span>
              </div>
            }
          />
        </SelectTrigger>
        <SelectContent className="min-w-[80px]">
          <SelectItem value="bn">Bn</SelectItem>
          <SelectItem value="en">En</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
};

export default LanguageSelect;
