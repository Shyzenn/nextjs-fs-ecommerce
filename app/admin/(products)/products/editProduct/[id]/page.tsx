import EditProductForm from "@/app/components/admin/EditProductForm";
import { getProductById } from "@/lib/action";

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { product } = await getProductById(id);

  if (!product) {
    return <div>Error: Product not found</div>;
  }

  return (
    <div>
      <EditProductForm {...product} />
    </div>
  );
};

export default page;
