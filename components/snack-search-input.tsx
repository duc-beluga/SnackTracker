"use client";

import React, { useCallback, useEffect, useState } from "react";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Package } from "lucide-react";
import { useSnackNames } from "@/app/hooks/useSnackNames";
import { SnackDisplay } from "@/app/interfaces/SnackInterfaces";
import { ItemCategory } from "@/app/interfaces/SnackInterfaces";

interface SnackSearchInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
> {
  field: ControllerRenderProps<TFieldValues, TName>;
  category: ItemCategory;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  suggestions: SnackDisplay[];
  showSuggestions: boolean;
  onSnackSelect: (snack: SnackDisplay) => void;
  onCreateNew: () => void;
}

export function SnackSearchInput<
  TFieldValue extends FieldValues,
  TName extends Path<TFieldValue>,
>({
  field,
  category,
  searchQuery,
  setSearchQuery,
  suggestions,
  showSuggestions,
  onSnackSelect,
  onCreateNew,
}: SnackSearchInputProps<TFieldValue, TName>) {
  const handleInputChange = useCallback(
    (value: string) => {
      field.onChange(value);
      setSearchQuery(value);
    },
    [field, setSearchQuery]
  );

  const categoryLabel = category.toLowerCase();

  return (
    <div className="space-y-2">
      <div className="relative">
        <Input
          value={searchQuery}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder={`Type ${categoryLabel} name...`}
          autoComplete="off"
        />

        {showSuggestions && searchQuery && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-md shadow-lg z-50 max-h-48 overflow-y-auto">
            {suggestions.length > 0 && (
              <div className="p-2 space-y-1">
                {suggestions.map((item) => (
                  <button
                    key={item.snack_id}
                    onClick={() => onSnackSelect(item)}
                    className="w-full p-3 text-left hover:bg-muted rounded-md transition-colors border border-transparent hover:border-border"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {item.brand}
                        </div>
                      </div>
                      <Badge variant="secondary">
                        {item.location_count || 0} locations
                      </Badge>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {suggestions.length === 0 && searchQuery.length >= 2 && (
              <div className="border-t border-border p-2">
                <button
                  onClick={onCreateNew}
                  className="w-full p-3 text-left hover:bg-muted rounded-md transition-colors border border-border hover:border-primary"
                >
                  <div className="flex items-center gap-2 text-primary font-medium">
                    <Package className="w-4 h-4" />
                    Create "{searchQuery}"
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Add this as a new {categoryLabel}
                  </div>
                </button>
              </div>
            )}

            {suggestions.some(
              (item) => item.name.toLowerCase() === searchQuery.toLowerCase()
            ) &&
              suggestions.length > 0 && (
                <div className="p-3 border-t border-border bg-muted/50">
                  <div className="text-sm">
                    This {categoryLabel} already exists. Select it above to add
                    a location.
                  </div>
                </div>
              )}
          </div>
        )}
      </div>
    </div>
  );
}
