import { FilterDropDown } from "@/app/components/admin/FilterDropDown";
import Pagination from "@/app/components/admin/Pagination";
import ProductList from "@/app/components/admin/ProductList";
import ProfileDropDown from "@/app/components/admin/ProfileDropDown";
import Search from "@/app/components/admin/search";
import MobileMenu from "@/app/components/MobileMenu";
import { fetchProductsPages, getProductList } from "@/lib/action";
import Link from "next/link";
import { Suspense } from "react";
import { IoAdd } from "react-icons/io5";

const page = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    filter?: string;
  };
}) => {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const filter = searchParams?.filter || "latest";

  const totalPages = await fetchProductsPages(query);
  const products = await getProductList(query, currentPage, filter);

  return (
    <div>
      <header className="flex justify-between px-4 py-8 xl:py-4 items-center bg-white shadow-sm sticky top-0 z-10">
        <MobileMenu />
        <div className="text-xl  sm:block font-semibold ">Products</div>
        <div>
          <ProfileDropDown />
        </div>
      </header>
      <div className="m-4 pb-4 bg-white">
        <div className="p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-lg font-semibold">Product List</h1>
            <div className="md:w-[20rem] hidden md:block">
              <Search placeholder="Search products..." />
            </div>
            <div className="flex items-center gap-8">
              <Link
                href="/admin/products/addProduct"
                className="flex items-center bg-blue-500 px-2 py-1 text-white rounded-md justify-center"
              >
                <IoAdd className="text-xl" />
                <p className="text-sm">Add Product</p>
              </Link>
              <FilterDropDown />
            </div>
          </div>
          <div className="mt-5 md:hidden">
            <Search placeholder="Search products..." />
          </div>
        </div>

        <Suspense key={query + currentPage} fallback={<div>Loading...</div>}>
          <ProductList products={products} />
        </Suspense>
        <div className="flex w-full justify-center mt-4">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
};

export default page;
