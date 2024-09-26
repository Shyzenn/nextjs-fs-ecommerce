import Link from "next/link";
import React from "react";
import { CiEdit } from "react-icons/ci";
import { GrFormView } from "react-icons/gr";
import Delete from "../Delete";
import { ProductType } from "../ProductList";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AiOutlineDelete } from "react-icons/ai";

const Action = ({ product }: { product: ProductType }) => {
  return (
    <div className="flex text-xl gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button>
              <GrFormView />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>View Product</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <button>
              <Link href={`/admin/products/editProduct/${product.id}`}>
                <CiEdit />
              </Link>
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Edit Product</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button>
            <AiOutlineDelete />
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-white ">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              product ({product.name}) from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>
              <Delete id={product.id} />
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Action;
