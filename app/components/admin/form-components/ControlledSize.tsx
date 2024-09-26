import { sizes } from "@/app/admin/sizes";
import { TProductSchema } from "@/lib/types";
import React from "react";
import { Control, Controller } from "react-hook-form";

type ControlledSizeProps = {
  control: Control<TProductSchema>;
  errors?: string;
};

const ControlledSize = ({ control, errors }: ControlledSizeProps) => {
  return (
    <>
      <h1 className="mb-2 text-lg font-semibold">Select Sizes</h1>
      <Controller
        control={control}
        name="size"
        render={({ field }) => (
          <div className="border p-5 grid grid-cols-2 gap-2 sm:grid-cols-5 xl:flex xl:flex-wrap">
            {sizes.map(({ size }: { size: string }) => (
              <button
                key={size}
                onClick={(e) => {
                  e.preventDefault();
                  const newSizes = field.value.includes(size)
                    ? field.value.filter((s: string) => s !== size)
                    : [...field.value, size];
                  field.onChange(newSizes);
                }}
                className={`p-2 ${
                  field.value.includes(size)
                    ? "border border-blue-400 rounded-md px-6 py-1"
                    : "border px-6 py-1 rounded-md"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        )}
      />
      {errors && <p className="mt-2 text-sm text-red-500">{errors}</p>}
    </>
  );
};

export default ControlledSize;
