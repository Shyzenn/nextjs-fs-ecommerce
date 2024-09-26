import { TProductSchema } from "@/lib/types";
import React from "react";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import ControlledSelect from "./ControlledSelect";
import ControlledSize from "./ControlledSize";
import { brandOptions, typeOptions } from "@/app/admin/options";

interface AddProductLeftProps {
  register: UseFormRegister<TProductSchema>;
  errors: FieldErrors<TProductSchema>;
  control: Control<TProductSchema>;
  sizes: { size: string }[];
}

const AddProductLeft: React.FC<AddProductLeftProps> = ({
  register,
  errors,
  control,
}) => {
  return (
    <>
      <h1 className="mb-2 text-lg font-semibold">Description</h1>
      <div className="border p-5 mb-5">
        <div className="flex flex-col mb-4">
          <label htmlFor="product-name" className="text-slate-400">
            Product Name
          </label>
          <input
            {...register("name")}
            type="text"
            id="name"
            placeholder="product name"
            className="ml-2 p-2 border rounded-sm"
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-500">
              {`${errors.name.message}`}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="product-description" className="text-slate-400">
            Description
          </label>
          <textarea
            {...register("description")}
            id="description"
            placeholder="product description"
            className="ml-2 p-2 border rounded-sm"
          />
          {errors.description && (
            <p className="mt-2 text-sm text-red-500">
              {`${errors.description.message}`}
            </p>
          )}
        </div>
      </div>
      <h1 className="mb-2 text-lg font-semibold">Category</h1>
      <div className="border p-5 mb-5">
        <ControlledSelect
          label="Product Brand"
          control={control}
          name="brand"
          placeholder="Select a brand"
          selectLabel="Brands"
          errors={errors.brand?.message}
          options={brandOptions}
        />
        <ControlledSelect
          label="Product Category"
          control={control}
          name="type"
          selectLabel="Categories"
          placeholder="Select a category"
          errors={errors.type?.message}
          options={typeOptions}
        />
      </div>

      <h1 className="mb-2 text-lg font-semibold">Price</h1>
      <div className="border p-5 mb-5">
        <input
          {...register("price", { valueAsNumber: true })}
          className="border p-2 rounded-md w-full"
          placeholder="$0.00"
          type="number"
          min="0"
          step="0.01"
        />
        {errors.price && (
          <p className="mt-2 text-sm text-red-500">{errors.price.message}</p>
        )}
      </div>
      <h1 className="mb-2 text-lg font-semibold">Stock</h1>
      <div className="border p-5 mb-5">
        <input
          {...register("stock", { valueAsNumber: true })}
          className="border p-2 rounded-md w-full"
          placeholder="0"
          type="number"
        />
        {errors.stock && (
          <p className="mt-2 text-sm text-red-500">
            {`${errors.stock.message}`}
          </p>
        )}
      </div>
      <ControlledSize control={control} errors={errors.size?.message} />
    </>
  );
};

export default AddProductLeft;
