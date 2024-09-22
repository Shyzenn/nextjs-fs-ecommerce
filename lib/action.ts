import { TProductSchema, TSignUpSchema } from "@/lib/types";
import { db } from "./db";

export const registerUser = async (data: TSignUpSchema) => {
  const response = await fetch("/api/user", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    // If the response is not OK, throw an error
    const errorData = await response.json();
    throw new Error(JSON.stringify(errorData));
  }
  const responseData = await response.json();
  return responseData;
};

export const addProduct = async (data: TProductSchema) => {
  const response = await fetch("/admin/api/product", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(JSON.stringify(errorData));
  }
  const responseData = await response.json();
  return responseData;
};

const ITEMS_PER_PAGE = 6;

export const getProductList = async (
  query: string,
  currentPage: number,
  filter: string
) => {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const products = await db.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            brand: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
      select: {
        id: true,
        name: true,
        price: true,
        stock: true,
        brand: true,
        type: true,
        mainImageUrl: true,
      },
      orderBy: {
        createdAt: filter === "latest" ? "desc" : "asc", // Sort by createdAt based on filter
      },
      take: ITEMS_PER_PAGE, // Pagination limit
      skip: offset, // Pagination offset
    });

    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch product data");
  }
};

export async function fetchProductsPages(query: string) {
  try {
    // Get total number of products with the query filter
    const totalProducts = await db.product.count({
      where: {
        name: {
          contains: query, // Filter products by name
        },
      },
    });

    // Calculate total pages based on the number of products
    const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);

    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of products.");
  }
}

export async function getProductById(id: string) {
  try {
    const product = await db.product.findUnique({
      where: { id },
    });
    if (product) {
      return { product };
    } else {
      return { error: "Product not found" };
    }
  } catch (error) {
    return { error: "An error occurred while fetching the product" };
  }
}

export async function updateProduct(
  data: {
    name: string;
    description: string;
    price: number;
    stock: number;
    size: string[];
    brand: string;
    type: string;
    mainImageUrl?: string;
    secondaryImages?: string[];
  },
  id: string
) {
  try {
    const response = await fetch(`/admin/api/product/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Update failed: ${errorData.error}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API call error:", error);
    throw error;
  }
}
