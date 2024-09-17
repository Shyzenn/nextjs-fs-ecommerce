"use client";

import ProfileDropDown from "@/app/components/admin/ProfileDropDown";
import MobileMenu from "@/app/components/MobileMenu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { productSchema, TProductSchema } from "@/lib/types";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import LoadingButton from "@/components/loading-button";
import { addProduct } from "@/lib/action";
import { useState } from "react";
import { UploadButton, UploadDropzone } from "@/utils/uploadthing";
import Image from "next/image";

const sizes = [
  { size: "EU-45" },
  { size: "EU-44" },
  { size: "EU-43" },
  { size: "EU-42" },
  { size: "EU-41" },
  { size: "EU-40" },
  { size: "EU-39" },
  { size: "EU-38" },
  { size: "EU-37" },
  { size: "EU-36" },
];

const AddProduct = () => {
  const router = useRouter();
  const notify = () =>
    toast("Product Added Successfuly", {
      icon: "🍻",
    });

  const [imageUrl, setImageUrl] = useState<string>("");
  const [secondaryImageUrls, setSecondaryImageUrls] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    control,
    setValue,
  } = useForm<TProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      size: [], // Initializing sizes as an empty array
    },
  });

  const handleErrors = (errors: Record<string, string>) => {
    Object.keys(errors).forEach((field) => {
      setError(field as keyof TProductSchema, {
        type: "server",
        message: errors[field],
      });
    });
  };

  const onSubmit = async (data: TProductSchema) => {
    // Validate the data using the schema
    const result = productSchema.safeParse(data);

    if (!result.success) {
      const zodErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        zodErrors[issue.path[0]] = issue.message;
      });
      handleErrors(zodErrors);
      return;
    }

    try {
      const responseData = await addProduct(data);

      if (responseData.errors) {
        handleErrors(responseData.errors);
      } else if (responseData.success) {
        router.push("/admin/products");
        notify();
      }
    } catch (error) {
      if (error instanceof Error) {
        try {
          const errorData = JSON.parse(error.message);
          if (errorData.errors) {
            handleErrors(errorData.errors);
          } else {
            alert("An unexpected error occurred.");
          }
        } catch {
          alert("An unexpected error occurred.");
        }
      } else {
        alert("An unexpected error occurred.");
      }
    }
    console.log(data);
  };

  return (
    <div className="m-4">
      <header className="flex justify-between px-4 py-8 xl:py-2 items-center">
        <MobileMenu />
        <div className="text-xl sm:block font-semibold">Add Product</div>
        <div>
          <ProfileDropDown />
        </div>
      </header>
      <form className="xl:flex gap-5" onSubmit={handleSubmit(onSubmit)}>
        {/* LEFT */}
        <div className="bg-white xl:w-[50%] rounded-md p-5">
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
                <p className="mt-2 text-sm text-red-500">
                  {errors.brand.message}
                </p>
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
                <p className="mt-2 text-sm text-red-500">
                  {errors.type.message}
                </p>
              )}
            </div>
          </div>

          <h1 className="mb-2 text-lg font-semibold">Price</h1>
          <div className="border p-5 mb-5">
            <input
              {...register("price")}
              className="border p-2 rounded-md w-full"
              placeholder="$0.00"
              type="number"
              min="0"
              step="0.01"
            />
            {errors.price && (
              <p className="mt-2 text-sm text-red-500">
                {errors.price.message}
              </p>
            )}
            <h1 className="mb-2 text-lg font-semibold">Stock</h1>
            <input
              {...register("stock")}
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
              <div className="border p-5 grid grid-cols-2 gap-2 lg:grid-cols-5">
                {sizes.map(({ size }) => (
                  <button
                    key={size}
                    onClick={(e) => {
                      e.preventDefault();
                      // Toggle size selection logic
                      const newSizes = field.value.includes(size)
                        ? field.value.filter((s: string) => s !== size)
                        : [...field.value, size];
                      field.onChange(newSizes);
                    }}
                    className={`p-2 ${
                      field.value.includes(size)
                        ? "bg-blue-500 text-white"
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
        </div>
        {/* RIGHT */}
        <div className="bg-white xl:w-[50%]">
          <div className="p-5 w-full">
            <h1 className="mb-2 text-lg font-semibold">Product Image</h1>
            <div className="border gap-2 p-5">
              <h1 className=" font-semibold my-4">Main Image</h1>
              <div className="border flex flex-col items-center p-2">
                <UploadButton
                  className="mt-5 "
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    console.log("Files: ", res);
                    setImageUrl(res[0].url);
                    setValue("mainImageUrl", res[0].url);
                  }}
                  onUploadError={(error: Error) => {
                    alert(`ERROR! ${error.message}`);
                  }}
                />
                {imageUrl.length ? (
                  <div>
                    <Image
                      src={imageUrl}
                      alt="myImage"
                      width={300}
                      height={300}
                    />
                  </div>
                ) : null}
              </div>
              <h1 className="font-semibold my-4">More Image</h1>
              <div className="border p-2">
                <UploadDropzone
                  endpoint="imagesUploader"
                  onClientUploadComplete={(res) => {
                    console.log("Files: ", res);

                    // Handle multiple files in the response
                    const newUrls = res.map((file) => file.url);

                    // Update state with the new uploaded file URLs
                    setSecondaryImageUrls((prev) => [...prev, ...newUrls]);

                    // Update form value for secondaryImages
                    setValue("secondaryImages", [
                      ...secondaryImageUrls,
                      ...newUrls,
                    ]);
                  }}
                  onUploadError={(error: Error) => {
                    alert(`ERROR! ${error.message}`);
                  }}
                />

                {secondaryImageUrls.length > 0 && (
                  <div className="grid grid-cols-2 gap-4 mt-5 md:grid-cols-4 lg:flex  lg:justify-evenly">
                    {secondaryImageUrls.map((url, index) => (
                      <div key={index}>
                        <Image
                          src={url}
                          alt={`Secondary Image ${index + 1}`}
                          width={150}
                          height={150}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="p-5 w-full flex justify-center gap-4 md:justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-700 text-white  w-32 rounded-md"
            >
              {isSubmitting ? <LoadingButton /> : "Add Product"}
            </button>
            <Link
              href="/admin/products"
              className="border text-blue-950 py-3 px-10 rounded-md hover:bg-slate-50"
            >
              Discard
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
