"use client";

import ProfileDropDown from "@/app/components/admin/ProfileDropDown";
import MobileMenu from "@/app/components/MobileMenu";
import Link from "next/link";
import { productSchema, TProductSchema } from "@/lib/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { updateProduct } from "@/lib/action";
import { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import Image from "next/image";
import { MdOutlineFileUpload } from "react-icons/md";
import { uploadMainImage } from "@/uploadImage/uploadMainImage";
import { uploadSecondaryImages } from "@/uploadImage/uploadSecondaryImages";
import ProductFormButton from "./form-components/ProductFormButton";
import { handleImagePreview } from "@/lib/images/mainImage";
import { handleAdditonalImage } from "@/lib/images/additionalImage";
import ControlledSelect from "./form-components/ControlledSelect";
import ControlledSize from "./form-components/ControlledSize";
import PriceStockField from "./form-components/PriceStockField";
import { brandOptions, typeOptions } from "@/app/admin/options";
import MainImageLabel from "./form-components/MainImageLabel";

export type ProductDataProps = {
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
    clearErrors,
  } = useForm<TProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      size,
      brand: newBrand,
      type: newType,
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

  const displayImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setNewMainImage(file);
    if (file) {
      // Update the mainImageUrl to a local preview of the selected image
      handleImagePreview(e, setUpdatedMainImageUrl, setError, clearErrors);
    }
  };

  const handleMultipleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];

    setNewSecondaryImages(files); // Update with selected files

    if (files.length > 0) {
      handleAdditonalImage(e, setError, clearErrors, setUpdatedSecondaryImages);
    } else {
      setUpdatedSecondaryImages(secondaryImages); // Reset to existing images if no files
    }
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
        notify();
        router.push("/admin/products");
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

            <PriceStockField
              label="Price"
              name="price"
              onChange={(e) => setNewPrice(parseFloat(e.target.value))}
              placeholder="$0.00"
              register={register}
              value={newPrice}
              errors={errors.price?.message}
              min={0}
              step={0.01}
              type="number"
            />
            <PriceStockField
              label="Stock"
              name="stock"
              onChange={(e) => setNewStock(parseFloat(e.target.value))}
              value={newStock}
              placeholder="0"
              type="number"
              errors={errors.stock?.message}
              register={register}
            />
            <ControlledSize control={control} errors={errors.size?.message} />
          </div>
          {/* RIGHT */}
          <div className="bg-white xl:w-[50%]">
            <div className="p-5 w-full">
              <h1 className="mb-2 text-lg font-semibold">Product Image</h1>
              <div className="border gap-2 p-5">
                <h1 className="font-semibold my-4">Main Image</h1>
                <div className="border flex flex-col items-center p-2 pb-4 lg:flex-row gap-2">
                  <MainImageLabel mainImage={updatedMainImageUrl} />
                  <input
                    id="mainImage"
                    type="file"
                    onChange={displayImage}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>
              <div className="border gap-2 p-5 mt-6">
                <h1 className="font-semibold my-4">Addtional Images</h1>
                <div className="border flex flex-col items-center p-2 pb-4 lg:flex-row gap-2">
                  <label
                    htmlFor="secondaryImages"
                    className="border-2 border-blue-300 bg-blue-50 border-dashed w-full flex justify-center items-center py-8"
                  >
                    {newSecondaryImages.length <= 0 ? (
                      updatedSecondaryImages.length > 0 ? (
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 2xl:flex 2xl:flex-wrap 2xl:mx-2">
                          {updatedSecondaryImages.map((url, index) => (
                            <div
                              key={index}
                              className="relative w-[100px] h-[100px] lg:w-[150px] lg:h-[150px] xl:w-[80px] xl:h-[80px]  2xl:w-[150px] 2xl:h-[150px]"
                            >
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
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 2xl:flex 2xl:flex-wrap 2xl:mx-2">
                        {newSecondaryImages.map((file, index) => (
                          <div
                            key={index}
                            className="relative w-[100px] h-[100px] lg:w-[150px] lg:h-[150px] xl:w-[80px] xl:h-[80px]  2xl:w-[150px] 2xl:h-[150px]"
                          >
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
                    onChange={handleMultipleImages}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
                {errors.secondaryImages?.message && (
                  <p className="mt-2 text-sm text-red-500 text-center">
                    {errors.secondaryImages.message as string}
                  </p>
                )}
              </div>
            </div>

            <ProductFormButton
              isSubmitting={isSubmitting}
              buttonLabel="Edit Product"
              error={errors}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProductForm;
