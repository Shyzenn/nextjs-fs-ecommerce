"use server";

import { revalidatePath } from "next/cache";
import { db } from "./db";

export const deleteProduct = async (id: string) => {
  try {
    await db.product.delete({
      where: { id },
    });
    revalidatePath("/admin/products");
    return { success: true, message: "Product deleted successfully!" };
  } catch (error) {
    console.error("Error deleting product:", error);
    return { success: false, message: "Failed to delete product" };
  }
};
