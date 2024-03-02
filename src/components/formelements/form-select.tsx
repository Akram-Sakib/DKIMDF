"use client";

import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

type Option = {
  label: string;
  value: string;
};

interface FormSelectProps {
  name: string;
  label?: string;
  placeholder?: string;
  options: Option[];
  required?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

const FormSelect = ({
  name,
  label,
  placeholder,
  options,
  disabled = false,
  required = false,
  loading = false,
  ...props
}: FormSelectProps) => {
  const { control, getValues } = useFormContext();

  // const value = getValues(name);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label}
            {required && <span className="text-red-500">*</span>}
          </FormLabel>
          <Select
            disabled={disabled}
            onValueChange={(selectedValue) => {
              field.onChange(selectedValue);
              if (name === "superAdmin.authorizationScope") {
                router.push(
                  pathname +
                    "?" +
                    createQueryString("authorizationScope", selectedValue)
                );
              }
            }}
            defaultValue={field.value}
            {...props}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {loading ? (
                <SelectItem value="loading" disabled>
                  Loading...
                </SelectItem>
              ) : (
                options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
          {/* <FormDescription>
            You can manage email addresses in your{" "}
            <Link href="/examples/forms">email settings</Link>.
          </FormDescription> */}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormSelect;
