import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function ProductSkeleton() {
  return (
    <>
      <tr className="w-full border-b border-gray-100">
        {/* Customer Name and Image */}
        <td className="relative overflow-hidden whitespace-nowrap py-3 pl-6 pr-3">
          <div className="flex items-center gap-1">
            <div className="h-8 w-8 bg-gray-100"></div>
            <div className="h-6 w-44 rounded bg-gray-100"></div>
          </div>
        </td>
        {/* Email */}
        <td className="whitespace-nowrap px-3 py-3">
          <div className="h-6 w-32 rounded bg-gray-100"></div>
        </td>
        {/* Amount */}
        <td className="whitespace-nowrap px-3 py-3">
          <div className="h-6 w-16 rounded bg-gray-100"></div>
        </td>
        {/* Date */}
        <td className="whitespace-nowrap px-3 py-3">
          <div className="h-6 w-16 rounded bg-gray-100"></div>
        </td>
        {/* Status */}
        <td className="whitespace-nowrap px-3 py-3">
          <div className="h-6 w-16 rounded bg-gray-100"></div>
        </td>
        <td className="whitespace-nowrap px-3 py-3">
          <div className="h-6 w-16 rounded bg-gray-100"></div>
        </td>
        {/* Actions */}
        <td className="whitespace-nowrap px-3 py-3 flex gap-2">
          <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
          <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
          <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
        </td>
      </tr>
    </>
  );
}

export function TableRowSkeleton() {
  return (
    <>
      <div className="px-4 bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-100">
              <TableHead className="text-black font-semibold">
                Product
              </TableHead>
              <TableHead className="text-black font-semibold">Price</TableHead>
              <TableHead className="text-black font-semibold">Stock</TableHead>
              <TableHead className="text-black font-semibold">Brand</TableHead>
              <TableHead className="text-black font-semibold">
                Category
              </TableHead>
              <TableHead className="text-black font-semibold">Date</TableHead>
              <TableHead className="text-black font-semibold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
          </TableBody>
        </Table>
      </div>
    </>
  );
}
