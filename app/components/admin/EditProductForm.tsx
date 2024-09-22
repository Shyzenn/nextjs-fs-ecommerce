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
import { updateProduct } from "@/lib/action";
import { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import Image from "next/image";
import { MdOutlineFileUpload } from "react-icons/md";
import { uploadMainImage } from "@/uploadImage/uploadMainImage";
import { uploadSecondaryImages } from "@/uploadImage/uploadSecondaryImages";

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

type ProductDataProps = {
  id: string;
  name: string;
  description: string;
  price: number;
  brand: string;
  type: string;
  stock: number;
  size: string[];
  mainImageUrl: string | null;
  secondaryImages: string[];
};

const EditProductForm = ({
  id,
  name,
  description,
  price,
  stock,
  size,
  brand,
  type,
  mainImageUrl,
  secondaryImages,
}: ProductDataProps) => {
  const [newName, setNewName] = useState(name);
  const [newDescription, setNewDescription] = useState(description);
  const [newPrice, setNewPrice] = useState(price);
  const [newStock, setNewStock] = useState(stock);
  const [newBrand] = useState(brand);
  const [newType] = useState(type);
  const [newMainImage, setNewMainImage] = useState<File | null>(null);
  const [updatedMainImageUrl, setUpdatedMainImageUrl] = useState<string | null>(
    mainImageUrl
  );
  const [newSecondaryImages, setNewSecondaryImages] = useState<File[]>([]);
  const [updatedSecondaryImages, setUpdatedSecondaryImages] =
    useState<string[]>(secondaryImages);

  const router = useRouter();
  const notify = () =>
    toast("Product Edited Successfully", {
      icon: "🍻",
    });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    control,
  } = useForm<TProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      size,
      brand: newBrand,
      type: newType,
      // secondaryImages: newSecondaryImages,
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
    try {
      // Upload main image if new image has been selected
      let currentMainImageUrl: string | undefined = mainImageUrl || undefined;
      if (newMainImage) {
        const uploadedMainImage = await uploadMainImage(newMainImage);
        currentMainImageUrl = uploadedMainImage;
      }

      // Upload secondary images
      let updatedSecondaryImages: string[] = [];
      if (newSecondaryImages.length > 0) {
        updatedSecondaryImages = await uploadSecondaryImages(
          newSecondaryImages
        );
      } else {
        updatedSecondaryImages = secondaryImages; // Keep existing if no new ones
      }

      const updatedProductData = {
        ...data,
        mainImageUrl: currentMainImageUrl,
        secondaryImages: updatedSecondaryImages, // Updated array
      };

      // Submit updated product data
      const responseData = await updateProduct(updatedProductData, id);

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
  };

  return (
    <>
      <header className="flex justify-between px-4 py-8 xl:py-4 items-center bg-white shadow-sm sticky top-0 z-10">
        <MobileMenu />
        <div className="text-xl sm:block font-semibold">Edit Product</div>
        <div>
          <ProfileDropDown />
        </div>
      </header>
      <div className="m-4">
        <Link
          href="/admin/products"
          className="text-sm flex items-center gap-2  mb-5 border w-20 justify-center py-1 rounded-md hover:bg-blue-600 hover:text-white"
        >
          <IoArrowBack className="text-xl" /> Back
        </Link>
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
                  onChange={(e) => setNewName(e.target.value)}
                  value={newName}
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
                  onChange={(e) => setNewDescription(e.target.value)}
                  value={newDescription}
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
                {...register("price", { valueAsNumber: true })}
                onChange={(e) => setNewPrice(parseFloat(e.target.value))}
                value={newPrice}
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
            </div>
            <h1 className="mb-2 text-lg font-semibold">Stock</h1>
            <div className="border p-5 mb-5">
              <input
                {...register("stock", { valueAsNumber: true })}
                onChange={(e) => setNewStock(parseFloat(e.target.value))}
                value={newStock}
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
              render={({ field }) => {
                const selectedSizes = field.value;

                return (
                  <div className="border p-5 grid grid-cols-2 gap-2 lg:grid-cols-5">
                    {sizes.map(({ size }) => (
                      <button
                        key={size}
                        onClick={(e) => {
                          e.preventDefault();
                          // Toggle size selection logic
                          const newSizes = selectedSizes.includes(size)
                            ? selectedSizes.filter((s: string) => s !== size)
                            : [...selectedSizes, size];
                          field.onChange(newSizes);
                        }}
                        className={`p-2 ${
                          selectedSizes.includes(size)
                            ? "bg-blue-500 text-white rounded-md px-6 py-1"
                            : "border px-6 py-1 rounded-md"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                );
              }}
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
                <h1 className="font-semibold my-4">Main Image</h1>
                <div className="border flex flex-col items-center p-2 pb-4 lg:flex-row gap-2">
                  <label
                    htmlFor="mainImage"
                    className={`border-2 border-blue-300 bg-blue-50 border-dashed w-full flex justify-center items-center py-8 ${
                      updatedMainImageUrl ? "py-0" : "py-8"
                    }`}
                  >
                    {updatedMainImageUrl ? (
                      <Image
                        src={updatedMainImageUrl}
                        alt="Main Image Preview"
                        width={250}
                        height={250}
                      />
                    ) : (
                      <>
                        <MdOutlineFileUpload className="text-4xl" />
                        Choose a file
                      </>
                    )}
                  </label>
                  <input
                    id="mainImage"
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setNewMainImage(file);
                      if (file) {
                        // Update the mainImageUrl to a local preview of the selected image
                        const previewUrl = URL.createObjectURL(file);
                        setUpdatedMainImageUrl(previewUrl);
                      }
                    }}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>
              <div className="border gap-2 p-5">
                <h1 className="font-semibold my-4">Upload Up to 4 Images</h1>
                <div className="border flex flex-col items-center p-2 pb-4 lg:flex-row gap-2">
                  <label
                    htmlFor="secondaryImages"
                    className="border-2 border-blue-300 bg-blue-50 border-dashed w-full flex justify-center items-center py-8"
                  >
                    {newSecondaryImages.length <= 0 ? (
                      // Display previously uploaded secondary images if no new images are selected
                      updatedSecondaryImages.length > 0 ? (
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                          {updatedSecondaryImages.map((url, index) => (
                            <div key={index} className="relative w-32 h-32">
                              <Image
                                src={url}
                                alt={`Secondary Image ${index + 1}`}
                                fill
                                objectFit="cover"
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <>
                          <MdOutlineFileUpload className="text-4xl" />
                          Choose files
                        </>
                      )
                    ) : (
                      // Display new secondary image previews
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                        {newSecondaryImages.map((file, index) => (
                          <div key={index} className="relative w-32 h-32">
                            <Image
                              src={URL.createObjectURL(file)}
                              alt={`New Secondary Image Preview ${index + 1}`}
                              fill
                              objectFit="cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </label>
                  <input
                    id="secondaryImages"
                    type="file"
                    multiple
                    onChange={(e) => {
                      const files = e.target.files
                        ? Array.from(e.target.files)
                        : [];

                      setNewSecondaryImages(files); // Update with selected files

                      if (files.length > 0) {
                        const previewUrls = files.map((file) =>
                          URL.createObjectURL(file)
                        );
                        setUpdatedSecondaryImages(previewUrls); // Update previews for selected files
                      } else {
                        setUpdatedSecondaryImages(secondaryImages); // Reset to existing images if no files
                      }
                    }}
                    accept="image/*"
                    className="hidden"
                  />
                  {errors.secondaryImages?.message && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.secondaryImages.message as string}
                    </p>
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
                {isSubmitting ? <LoadingButton /> : "Edit Product"}
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
    </>
  );
};

export default EditProductForm;
