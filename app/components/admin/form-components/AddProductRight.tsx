import { TProductSchema } from "@/lib/types";
import Image from "next/image";
import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { MdOutlineFileUpload } from "react-icons/md";
import MainImageLabel from "./MainImageLabel";

interface AddProductRightProps {
  register: UseFormRegister<TProductSchema>;
  errors: FieldErrors<TProductSchema>;
  previewImage: string | null;
  displayImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleMultipleImages: (event: React.ChangeEvent<HTMLInputElement>) => void;
  additionalPreviewImages: string[];
}

const AddProductRight: React.FC<AddProductRightProps> = ({
  register,
  errors,
  previewImage,
  displayImage,
  handleMultipleImages,
  additionalPreviewImages,
}) => {
  return (
    <>
      <div className="p-5 w-full">
        <h1 className="mb-2 text-lg font-semibold">Product Image</h1>
        <div className="border gap-2 p-5">
          <h1 className=" font-semibold my-4">Main Image</h1>
          <div className="border flex flex-col items-center p-2 pb-4 lg:flex-row gap-2">
            <MainImageLabel mainImage={previewImage} />
            <input
              id="mainImage"
              type="file"
              className="file:hidden text-white w-0"
              {...register("mainImageUrl", {
                required: "Main image is required",
              })}
              onChange={displayImage}
            />
          </div>
          {errors.mainImageUrl?.message && (
            <p className="mt-2 text-sm text-red-500 text-center">
              {errors.mainImageUrl.message as string}
            </p>
          )}
        </div>
        <div className="p-5 w-full">
          <h1 className="mb-2 text-lg font-semibold">Additional Images</h1>
          <div className="border gap-2 p-5">
            <h1 className="font-semibold my-4">Upload Up to 4 Images</h1>
            <div className="border flex flex-col items-center p-2 pb-4 lg:flex-row gap-2">
              <label
                htmlFor="secondaryImages"
                className="border-2 border-blue-300 bg-blue-50 border-dashed w-full flex justify-center flex-col items-center py-8"
              >
                {additionalPreviewImages.length <= 0 ? (
                  <>
                    <MdOutlineFileUpload className="text-4xl" />
                    Choose files
                  </>
                ) : (
                  <>
                    {additionalPreviewImages.length > 0 && (
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 2xl:flex 2xl:flex-wrap 2xl:mx-2">
                        {additionalPreviewImages.map((preview, index) => (
                          <div
                            key={index}
                            className="relative w-[100px] h-[100px] lg:w-[150px] lg:h-[150px] xl:w-[80px] xl:h-[80px]  2xl:w-[150px] 2xl:h-[150px]"
                          >
                            <Image
                              src={preview}
                              alt={`Additional Image ${index + 1}`}
                              layout="fill"
                              objectFit="cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </label>
              <input
                id="secondaryImages"
                type="file"
                {...register("secondaryImages")}
                onChange={handleMultipleImages}
                multiple
                accept="image/*"
                className="file:hidden text-white w-0"
              />
            </div>
            {errors.secondaryImages?.message && (
              <p className="mt-2 text-sm text-red-500 text-center">
                {errors.secondaryImages.message as string}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProductRight;
