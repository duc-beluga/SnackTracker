"use client";
import { useFormContext, useWatch } from "react-hook-form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui";
import { ItemCategory } from "@/app/interfaces/SnackInterfaces";
import { useEffect } from "react";

export function CategorySelect() {
  const { setValue, register, control } = useFormContext();

  useEffect(() => {
    register("category");
  }, [register]);

  const selectedCategory = useWatch({
    control,
    name: "category",
  });

  return (
    <Select
      value={selectedCategory}
      onValueChange={(value) => {
        setValue("category", value as ItemCategory);
      }}
    >
      <SelectTrigger className="inline-flex w-auto h-auto p-0 border-0 bg-transparent shadow-none focus:ring-0 focus:ring-offset-0 font-bold text-blue-400 hover:text-blue-600 text-base px-1">
        <SelectValue placeholder="select category" />
      </SelectTrigger>
      <SelectContent align="start" sideOffset={4}>
        <SelectItem value={ItemCategory.Snack}>snack</SelectItem>
        <SelectItem value={ItemCategory.Drink}>drink</SelectItem>
      </SelectContent>
    </Select>
  );
}
