import { productSchema } from "@/lib/types";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();

    const validationResult = productSchema.safeParse(body);
    if (!validationResult.success) {
      console.error("Validation errors:", validationResult.error.issues);
      return NextResponse.json(
        { errors: validationResult.error.issues },
        { status: 400 }
      );
    }

    const {
      name,
      description,
      price,
      stock,
      size,
      brand,
      type,
      mainImageUrl,
      secondaryImages,
    } = validationResult.data;

    await db.product.update({
      where: { id },
      data: {
        name,
        description,
        price,
        stock,
        size,
        brand,
        type,
        mainImageUrl,
        secondaryImages,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update product error:", error);
    return NextResponse.json(
      { error: "An error occurred while updating the product" },
      { status: 500 }
    );
  }
}
