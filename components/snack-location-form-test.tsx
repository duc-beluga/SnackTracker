"use client";

import React from "react";
import { z } from "zod";

import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import SnackLocationSearch from "./snack-location-search";
import { SnackLocationSchemaType } from "@/utils/zod/schemas/SnackLocationSchema";
import { getSnackLocationFormWithDefaultId } from "@/utils/zod/forms/SnackLocationForm";
import { addSnackLocation } from "@/app/server-actions/snacks/actions";
import { toast } from "sonner";

interface LocationImageFormProps {
  snackId: number;
}

const SnackLocationFormTest = ({ snackId }: LocationImageFormProps) => {
  const reactHookSnackLocationForm = getSnackLocationFormWithDefaultId(snackId);
  const { handleSubmit, control } = reactHookSnackLocationForm;

  const onNewLocationSubmit = async (
    values: z.infer<typeof SnackLocationSchemaType>
  ) => {
    try {
      await addSnackLocation(values);
      toast.success("New location successfully added");
    } catch (e: unknown) {
      if (e instanceof Error) {
        toast.error(e.message);
      } else {
        toast.error("Failed to add location");
      }
    }
  };

  return (
    <Form {...reactHookSnackLocationForm}>
      <form
        onSubmit={handleSubmit(onNewLocationSubmit)}
        className="space-y-6"
        id="addSnackLocationForm"
      >
        <FormField
          control={control}
          name="snackLocation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Search location</FormLabel>
              <FormControl>
                <SnackLocationSearch<
                  z.infer<typeof SnackLocationSchemaType>,
                  "snackLocation"
                >
                  field={field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="snackImage"
          render={({ field: { onChange, value, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Upload image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    onChange(file);
                  }}
                  {...fieldProps}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default SnackLocationFormTest;
