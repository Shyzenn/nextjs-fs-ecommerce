import { Table } from "@/app/components/ui/table";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import React from "react";
import Action from "./form-components/Action";
import { getProductList } from "@/lib/action";
import EmptyTable from "./EmptyTable";

const capitalizeFirstLetter = (str: string) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export type ProductType = {
  id: string;
  name: string;
  mainImageUrl: string | null;
  price: number;
  stock: number;
  brand: string;
  type: string;
  createdAt: Date;
};

export default async function ProductList({
  query = "",
  currentPage = 1,
  filter = "latest",
}: {
  query?: string;
  currentPage?: number;
  filter?: string;
}) {
  const products: ProductType[] = await getProductList(
    query,
    currentPage,
    filter
  );

  return (
    <>
      {products.length === 0 ? (
        <EmptyTable content="No Product Available" />
      ) : (
        <div className="overflow-y-auto max-h-[32rem] 2xl:max-h-[40rem] px-4 bg-white">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-100">
                <TableHead className="text-black font-semibold">
                  Product
                </TableHead>
                <TableHead className="text-black font-semibold">
                  Price
                </TableHead>
                <TableHead className="text-black font-semibold">
                  Stock
                </TableHead>
                <TableHead className="text-black font-semibold">
                  Brand
                </TableHead>
                <TableHead className="text-black font-semibold">
                  Category
                </TableHead>
                <TableHead className="text-black font-semibold">Date</TableHead>
                <TableHead className="text-black font-semibold">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <div className="relative w-[3rem] h-[3rem] border-2 border-blue-200 rounded-sm hidden sm:block">
                      <Image
                        src={product.mainImageUrl as string}
                        objectFit="cover"
                        fill
                        loading="lazy"
                        alt={product.mainImageUrl as string}
                      />
                    </div>
                    {product.name}
                  </TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>{capitalizeFirstLetter(product.brand)}</TableCell>
                  <TableCell>{capitalizeFirstLetter(product.type)}</TableCell>
                  <TableCell>
                    {new Date(product.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Action product={product} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
}
