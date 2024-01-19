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
      <Select>
        <SelectTrigger className="w-[100px]">
          <SelectValue
            placeholder={
              <div className="flex gap-x-2">
                {<GlobeIcon className="w-5 h-5" />} <span>Bn</span>
              </div>
            }
          />
        </SelectTrigger>
        <SelectContent className="min-w-[100px]">
          <SelectItem value="bn">Bn</SelectItem>
          <SelectItem value="en">En</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
};

export default LanguageSelect;
