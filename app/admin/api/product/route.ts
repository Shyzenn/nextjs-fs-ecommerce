import { productSchema } from "@/lib/types";
import { db } from "../../../../lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      description,
      price,
      stock,
      brand,
      type,
      size,
      mainImageUrl,
      secondaryImages,
    } = body;

    const result = productSchema.safeParse({
      name,
      description,
      price,
      stock,
      brand,
      type,
      size,
      mainImageUrl,
      secondaryImages,
    });

    const zodErrors: Record<string, string> = {};
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        zodErrors[issue.path[0]] = issue.message;
      });
    }

    const existingUser = await db.product.findFirst({
      where: {
        OR: [{ name }],
      },
    });

    if (existingUser) {
      if (existingUser.name === name) {
        zodErrors.name = "Product is already in the store";
      }
    }

    if (Object.keys(zodErrors).length > 0) {
      return NextResponse.json({ errors: zodErrors }, { status: 400 });
    }

    await db.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock),
        brand,
        type,
        size,
        mainImageUrl,
        secondaryImages,
      },
    });

    if (!mainImageUrl) {
      throw new Error("mainImageUrl is missing or invalid.");
    }

    console.log("Request body:", body);
    console.log("Request method:", req.method);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error creating product:", error);
    if (error instanceof Error) {
      console.error("Error in POST /api/product:", error.message);
      return NextResponse.json(
        { message: "Failed to create product", error: error.message },
        { status: 500 }
      );
    } else {
      console.error("Unknown error:", error);
      return NextResponse.json(
        { message: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}
