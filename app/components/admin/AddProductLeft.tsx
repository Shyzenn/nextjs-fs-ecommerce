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
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";

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
  sizes,
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
        <div className="flex flex-col mb-4">
          <label htmlFor="product-brand" className="text-slate-400">
            Product Brand
          </label>
          <Controller
            control={control}
            name="brand"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Brands</SelectLabel>
                    <SelectItem value="nike">Nike</SelectItem>
                    <SelectItem value="adidas">Adidas</SelectItem>
                    <SelectItem value="vans">Vans</SelectItem>
                    <SelectItem value="puma">Puma</SelectItem>
                    <SelectItem value="converse">Converse</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          {errors.brand && (
            <p className="mt-2 text-sm text-red-500">{errors.brand.message}</p>
          )}
        </div>

        <div className="flex flex-col mb-4">
          <label htmlFor="product-category" className="text-slate-400">
            Product Category
          </label>
          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    <SelectItem value="running">Running</SelectItem>
                    <SelectItem value="basketball">Basketball</SelectItem>
                    <SelectItem value="fashion">Fashion</SelectItem>
                    <SelectItem value="skate">Skate</SelectItem>
                    <SelectItem value="walking">Walking</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          {errors.type && (
            <p className="mt-2 text-sm text-red-500">{errors.type.message}</p>
          )}
        </div>
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
      {errors.size && (
        <p className="mt-2 text-sm text-red-500">{errors.size.message}</p>
      )}
    </>
  );
};

export default AddProductLeft;
