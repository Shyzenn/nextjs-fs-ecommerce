import { object, string, z } from "zod";

// Register Form
export const signUpSchema = z
  .object({
    username: z.string().min(4, "Username must contain at least 4 characters"),
    email: z.string().email("Invalid Email"),
    phone: z
      .string()
      .length(11, "Phone number must be exactly 11 digits")
      .regex(
        /^09\d{9}$/,
        "Phone number must start with 09 and be exactly 11 digits"
      ),
    address: z.string().min(10, "Address must contain at least 10 characters"),
    password: z.string().min(8, "Password must contain at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Confirm Password must contain at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });

export type TSignUpSchema = z.infer<typeof signUpSchema>;

// Login Form
export const signInSchema = object({
  username: z.string().min(4, "Username must contain at least 4 characters"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export type TSignInSchema = z.infer<typeof signInSchema>;

export const productSchema = z.object({
  name: z.string().min(1, { message: "Product name is required." }),
  description: z
    .string()
    .min(1, { message: "Product description is required." }),
  price: z.number().min(0.01, { message: "Price must be greater than 0." }),
  stock: z.number().min(1, { message: "Stock is required." }),
  brand: z.string({ message: "Brand is required." }),
  type: z.string({ message: "Type is required." }),
  size: z
    .array(z.string())
    .min(1, { message: "At least one size is required." }),
  mainImageUrl: z.any(),
  secondaryImages: z.any(),
});

export type TProductSchema = z.infer<typeof productSchema>;
