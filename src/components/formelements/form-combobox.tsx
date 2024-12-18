"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

interface FormComboBoxProps {
  placeholder: string;
  name: string;
  label: string;
  required?: boolean;
  isLoading?: boolean;
  options: { value: string; label: string }[];
}

export function FormComboBox({
  placeholder,
  name,
  label,
  required = false,
  isLoading = false,
  options,
}: FormComboBoxProps) {
  const [open, setOpen] = React.useState(false);
  const { control, getValues, setValue } = useFormContext();
  const value = getValues(name);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            <div className="space-y-2">
              <FormLabel className="block">
                {label} {required && <span className="text-red-500">*</span>}
              </FormLabel>
              <FormControl aria-disabled={isLoading}>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-full justify-between"
                    >
                      {value
                        ? options?.find((option) => option.value === value)
                            ?.label
                        : placeholder}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search..."
                        // onValueChange={(value) => setSearch(value)}
                      />
                      {isLoading && <CommandEmpty>Loading...</CommandEmpty>}
                      {options?.length === 0 && (
                        <CommandEmpty>No Data Found</CommandEmpty>
                      )}
                      <CommandGroup>
                        {!isLoading &&
                          options?.length > 0 &&
                          options?.map((option) => (
                            <CommandItem
                              key={option.value}
                              value={option.label}
                              onSelect={(currentValue) => {
                                const value = options.find(
                                  (option) =>
                                    option.label.toLowerCase() === currentValue
                                )?.value;
                                setValue(name, value ?? "");
                                setOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  value === option.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {option.label}
                            </CommandItem>
                          ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        );
      }}
    />
  );
}
