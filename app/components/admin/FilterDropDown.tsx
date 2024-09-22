"use client";

import { Button } from "@/components/ui/button";
import { CiFilter } from "react-icons/ci";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function FilterDropDown() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get current filter from URL or default to 'latest'
  const [filter, setFilter] = useState(searchParams.get("filter") || "latest");

  // Update filter and modify the query parameters in the URL
  const handleFilterChange = (value: string) => {
    setFilter(value);
    const params = new URLSearchParams(searchParams);
    params.set("filter", value);
    params.set("page", "1"); // Reset to page 1 when changing filter
    router.replace(`?${params.toString()}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <CiFilter />
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-20">
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={filter}
          onValueChange={handleFilterChange}
        >
          <DropdownMenuRadioItem value="latest">Latest</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="oldest">Oldest</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
