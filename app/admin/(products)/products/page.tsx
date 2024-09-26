import { FilterDropDown } from "@/app/components/admin/FilterDropDown";
import Pagination from "@/app/components/admin/Pagination";
import ProductList from "@/app/components/admin/ProductList";
import ProfileDropDown from "@/app/components/admin/ProfileDropDown";
import Search from "@/app/components/admin/search";
import { TableRowSkeleton } from "@/app/components/admin/Skeleton";
import MobileMenu from "@/app/components/MobileMenu";
import { fetchProductsPages } from "@/lib/action"; // Import to fetch total pages
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

  return (
    <div className="h-svh">
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
                className="flex items-center bg-blue-600 w-[8rem] px-3 py-2 text-white rounded-md justify-between hover:bg-blue-500 transition-colors duration-200"
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
        <Suspense
          key={currentPage + query + filter}
          fallback={<TableRowSkeleton />}
        >
          <ProductList
            query={query}
            currentPage={currentPage}
            filter={filter}
          />
        </Suspense>
        <div className="flex w-full justify-center mt-4">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
};

export default page;
