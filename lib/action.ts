import { TProductSchema, TSignUpSchema } from "@/lib/types";

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
