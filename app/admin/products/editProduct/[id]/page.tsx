import EditProductForm from "@/app/components/admin/EditProductForm";
import { getProductById } from "@/lib/action";
import { Suspense } from "react";

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { product } = await getProductById(id);

  if (!product) {
    return <div>Error: Product not found</div>;
  }

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditProductForm {...product} />
      </Suspense>
    </div>
  );
};

export default page;
