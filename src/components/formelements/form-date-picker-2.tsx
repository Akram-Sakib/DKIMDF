"use client";

import { CalendarIcon } from "@radix-ui/react-icons";
import { format, parseISO } from "date-fns";
import { useFormContext } from "react-hook-form";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface FormDatePickerProps {
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
}

const FormDateTimePickerV2 = ({
  name,
  label,
  placeholder,
  type = "text",
  ...props
}: FormDatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { control } = useFormContext();

  return (
    <div className="space-y-8">
      <div className="flex w-full gap-4">
        <FormField
          control={control}
          name={name}
          render={({ field }) => {
            // Parse field value into Date object for compatibility with date-fns
            const selectedDate = field.value ? parseISO(field.value) : null;

            return (
              <FormItem className="flex flex-col w-full">
                <FormLabel>{label}</FormLabel>
                <Popover open={isOpen} onOpenChange={setIsOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full font-normal",
                          !field?.value && "text-muted-foreground"
                        )}
                      >
                        {selectedDate ? (
                          `${format(selectedDate, "PPP")}`
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      captionLayout="dropdown"
                      selected={selectedDate || undefined}
                      onSelect={(selectedDate) => {
                        field.onChange(selectedDate?.toISOString() || null);
                        setIsOpen(false); // Close popover after selecting
                      }}
                      fromYear={1900}
                      toYear={new Date().getFullYear()}
                      defaultMonth={selectedDate || new Date()}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            );
          }}
        />
      </div>
    </div>
  );
};

export default FormDateTimePickerV2;
