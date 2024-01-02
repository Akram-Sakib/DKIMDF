import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

interface FormInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
}

const FormInput = ({
  name,
  label,
  placeholder,
  type = "text",
  required = false,
  ...props
}: FormInputProps) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>
              {label} {required && <span className="text-red-500">*</span>}
            </FormLabel>
            <FormControl>

                <Input
                  type={type}
                  placeholder={placeholder}
                  {...field}
                  {...props}
                />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default FormInput;
