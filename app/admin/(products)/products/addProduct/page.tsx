"use client";

import ProfileDropDown from "@/app/components/admin/ProfileDropDown";
import MobileMenu from "@/app/components/MobileMenu";
import Link from "next/link";
import { productSchema, TProductSchema } from "@/lib/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { addProduct } from "@/lib/action";
import { IoArrowBack } from "react-icons/io5";
import { useState } from "react";
import AddProductRight from "@/app/components/admin/form-components/AddProductRight";
import AddProductLeft from "@/app/components/admin/form-components/AddProductLeft";
import { uploadMainImage } from "@/uploadImage/uploadMainImage";
import { uploadSecondaryImages } from "@/uploadImage/uploadSecondaryImages";
import ProductFormButton from "@/app/components/admin/form-components/ProductFormButton";
import { handleImagePreview } from "@/lib/images/mainImage";
import { handleAdditonalImage } from "@/lib/images/additionalImage";
import { sizes } from "@/app/admin/sizes";
import Modal from "@/app/components/admin/form-components/imageModal";

const AddProduct = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [additionalPreviewImages, setAdditionalPreviewImages] = useState<
    string[]
  >([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const router = useRouter();
  const notify = () =>
    toast("Product Added Successfully", {
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
      size: [], // Initializing sizes as an empty array
    },
  });

  const displayImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleImagePreview(event, setPreviewImage, setError, clearErrors);
  };

  const handleMultipleImages = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleAdditonalImage(
      event,
      setError,
      clearErrors,
      setAdditionalPreviewImages
    );
  };

  const handleErrors = (errors: Record<string, string>) => {
    Object.keys(errors).forEach((field) => {
      setError(field as keyof TProductSchema, {
        type: "server",
        message: errors[field],
      });
    });
  };

  const onSubmit = async (data: TProductSchema) => {
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
      // Upload main image
      const rawMainImage = data.mainImageUrl[0];
      const mainImageUrl = await uploadMainImage(rawMainImage);

      // Upload secondary images
      let secondaryImageUrls: string[] = [];
      if (data.secondaryImages && data.secondaryImages.length > 0) {
        const rawSecondaryImages = data.secondaryImages as File[];
        secondaryImageUrls = await uploadSecondaryImages(rawSecondaryImages);
      }

      const productData = {
        ...data,
        mainImageUrl,
        secondaryImages: secondaryImageUrls,
      };

      const response = await addProduct(productData);

      if (response.success) {
        router.push("/admin/products");
        notify();
      } else if (response.errors) {
        handleErrors(response.errors);
      }
    } catch (error) {
      console.error("Error submitting form", error);
      if (error instanceof Error) {
        try {
          const errorData = JSON.parse(error.message);
          if (errorData.errors) {
            handleErrors(errorData.errors);
          } else {
            alert("An unexpected error occurred.");
          }
        } catch {
          setModalMessage("Oops! Image are required.");
          setIsModalOpen(true);
        }
      } else {
        alert("An unexpected error occurred.");
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalMessage("");
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        message={modalMessage}
      />
      <header className="flex justify-between px-4 py-8 xl:py-4 items-center bg-white shadow-sm sticky top-0 z-10">
        <MobileMenu />
        <div className="text-xl sm:block font-semibold">Add Product</div>
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
            <AddProductLeft
              register={register}
              errors={errors}
              control={control}
              sizes={sizes}
            />
          </div>
          {/* RIGHT */}
          <div className="bg-white xl:w-[50%]">
            <AddProductRight
              register={register}
              errors={errors}
              previewImage={previewImage}
              displayImage={displayImage}
              handleMultipleImages={handleMultipleImages}
              additionalPreviewImages={additionalPreviewImages}
            />
            <ProductFormButton
              error={errors}
              isSubmitting={isSubmitting}
              buttonLabel="Add Product"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
