import LoadingButton from "@/components/loading-button";
import Link from "next/link";
import React from "react";
import { FieldErrors } from "react-hook-form";

interface ProductFormButtonProps {
  isSubmitting: boolean;
  buttonLabel: string;
  error: FieldErrors;
}

const ProductFormButton: React.FC<ProductFormButtonProps> = ({
  isSubmitting,
  buttonLabel,
  error,
}) => {
  return (
    <div className="p-5 w-full flex justify-center gap-4 md:justify-end">
      <button
        type="submit"
        disabled={Object.keys(error).length > 0}
        className="bg-blue-700 text-white  w-32 rounded-md disabled:bg-blue-300"
      >
        {isSubmitting ? <LoadingButton /> : buttonLabel}
      </button>
      <Link
        href="/admin/products"
        className="border text-blue-950 py-3 px-10 rounded-md hover:bg-slate-50"
      >
        Discard
      </Link>
    </div>
  );
};

export default ProductFormButton;
