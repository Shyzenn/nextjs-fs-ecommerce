import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TProductSchema } from "@/lib/types";
import React from "react";
import { Control, Controller, FieldPath } from "react-hook-form";

type ControlledSelectProps = {
  control: Control<TProductSchema>;
  name: FieldPath<TProductSchema>;
  label: string;
  options: { value: string; label: string }[];
  placeholder: string;
  errors?: string;
  selectLabel: string;
};

const ControlledSelect = ({
  control,
  name,
  label,
  options,
  placeholder,
  errors,
  selectLabel,
}: ControlledSelectProps) => {
  return (
    <div className="flex flex-col mb-4">
      <label htmlFor="product-category" className="text-slate-400">
        {label}
      </label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{selectLabel}</SelectLabel>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />
      {errors && <p className="mt-2 text-sm text-red-500">{errors}</p>}
    </div>
  );
};

export default ControlledSelect;
