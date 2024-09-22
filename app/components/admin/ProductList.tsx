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
import { GrFormView } from "react-icons/gr";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import Link from "next/link";

const capitalizeFirstLetter = (str: string) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

type ProductType = {
  id: string;
  name: string;
  mainImageUrl: string | null;
  price: number;
  stock: number;
  brand: string;
  type: string;
};

export default function ProductList({ products }: { products: ProductType[] }) {
  return (
    <>
      {products.length === 0 ? (
        <div>No Products Available</div>
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
                    <div className="flex text-xl gap-2">
                      <GrFormView />
                      <Link href={`/admin/products/editProduct/${product.id}`}>
                        <CiEdit />
                      </Link>
                      <AiOutlineDelete />
                    </div>
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
