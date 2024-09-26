import { TProductSchema } from "@/lib/types";
import React from "react";
import { FieldPath, UseFormRegister } from "react-hook-form";

type PriceStockFieldProps = {
  label: string;
  name: FieldPath<TProductSchema>;
  value: number | string;
  placeholder: string;
  register: UseFormRegister<TProductSchema>;
  errors?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "number";
  min?: number;
  step?: number;
};

const PriceStockField = ({
  label,
  name,
  value,
  placeholder,
  register,
  errors,
  onChange,
  type = "text",
  min,
  step,
}: PriceStockFieldProps) => {
  return (
    <div className="mb-5">
      <h1 className="mb-2 text-lg font-semibold">{label}</h1>
      <div className="border p-5">
        <input
          {...register(name, { valueAsNumber: type === "number" })}
          value={value}
          onChange={onChange}
          type={type}
          placeholder={placeholder}
          min={min}
          step={step}
          className="border p-2 rounded-md w-full"
        />
        {errors && <p className="mt-2 text-sm text-red-500">{errors}</p>}
      </div>
    </div>
  );
};

export default PriceStockField;
