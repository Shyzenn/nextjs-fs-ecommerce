"use client";

import { deleteProduct } from "@/lib/deleteProduct";
import { toast } from "react-hot-toast";
import { useTransition } from "react";

const Delete = ({ id }: { id: string }) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    startTransition(async () => {
      const result = await deleteProduct(id);

      if (result.success) {
        toast.success("Product deleted successfully!");
      } else {
        toast.error(result.message || "Failed to delete product.");
      }
    });
  };

  return (
    <form action={handleDelete}>
      <button disabled={isPending}>
        {isPending ? "Deleting..." : "Continue"}
      </button>
    </form>
  );
};

export default Delete;
