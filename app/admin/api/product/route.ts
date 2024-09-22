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

    const parsedPrice = parseFloat(price);
    const parsedStock = parseInt(stock, 10);

    // Validate using Zod schema with parsed values
    const result = productSchema.safeParse({
      name,
      description,
      price: parsedPrice,
      stock: parsedStock,
      brand,
      type,
      size,
      mainImageUrl,
      secondaryImages,
    });

    if (secondaryImages.length > 4) {
      return NextResponse.json(
        {
          errors: { secondaryImages: "You can upload a maximum of 4 images." },
        },
        { status: 400 }
      );
    }

    // Handle Zod errors
    const zodErrors: Record<string, string> = {};
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        zodErrors[issue.path[0]] = issue.message;
      });
      return NextResponse.json({ errors: zodErrors }, { status: 400 });
    }

    // Check if product already exists
    const existingProduct = await db.product.findFirst({
      where: { name },
    });

    if (existingProduct) {
      zodErrors.name = "Product with this name already exists.";
      return NextResponse.json({ errors: zodErrors }, { status: 400 });
    }

    // Create the product in the database
    await db.product.create({
      data: {
        name,
        description,
        price: parsedPrice,
        stock: parsedStock,
        brand,
        type,
        size,
        mainImageUrl,
        secondaryImages,
      },
    });

    // Return success response
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error creating product:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Failed to create product", error: error.message },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { message: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}
