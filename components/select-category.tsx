"use client";
import { useFormContext, useWatch } from "react-hook-form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui";

import { ItemCategory } from "@/app/interfaces/SnackInterfaces";
import { useEffect } from "react";
import { Cookie, Coffee } from "lucide-react";

type CategorySelectProps = {
  setStep?: (step: number) => void;
};

export function CategorySelect({ setStep }: CategorySelectProps) {
  const { setValue, register, control } = useFormContext();

  useEffect(() => {
    register("category");
  }, [register]);

  const selectedCategory = useWatch({
    control,
    name: "category",
  });

  return (
    <FormField
      control={control}
      name="category"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Category</FormLabel>
          <FormControl>
            <Select
              value={selectedCategory}
              onValueChange={(value) => {
                setValue("category", value as ItemCategory);
                // Don't automatically advance to step 2 - let the search appear first
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="select category" />
              </SelectTrigger>
              <SelectContent align="start" sideOffset={4}>
                <SelectItem value={ItemCategory.Snack}>
                  <div className="flex items-center gap-2">
                    <Cookie className="w-4 h-4" />
                    <span>snack</span>
                  </div>
                </SelectItem>
                <SelectItem value={ItemCategory.Drink}>
                  <div className="flex items-center gap-2">
                    <Coffee className="w-4 h-4" />
                    <span>drink</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
        </FormItem>
      )}
    />
  );
}
