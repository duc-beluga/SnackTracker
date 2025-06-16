"use client";

import React from "react";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input,
} from "@/components/ui";
import { SnackLocationSearch } from "./snack-location-search";
import { SnackLocationSchemaType } from "@/utils/zod/schemas/SnackLocationSchema";
import { getSnackLocationFormWithDefaultId } from "@/utils/zod/forms/SnackLocationForm";
import { addSnackLocation } from "@/app/server-actions/snacks/actions";
import { toast } from "sonner";
import { catchError, handleValidationError } from "@/utils/exceptionHandler";

interface LocationImageFormProps {
  snackId: number;
  closeDialog: () => void;
}

export function SnackLocationForm({
  snackId,
  closeDialog,
}: LocationImageFormProps) {
  const reactHookSnackLocationForm = getSnackLocationFormWithDefaultId(snackId);
  const { handleSubmit, control } = reactHookSnackLocationForm;

  const onNewLocationSubmit = async (
    values: z.infer<typeof SnackLocationSchemaType>
  ) => {
    const [error] = await catchError(addSnackLocation(values));

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("New location successfully added");
      closeDialog();
    }
  };

  return (
    <Form {...reactHookSnackLocationForm}>
      <form
        onSubmit={handleSubmit(onNewLocationSubmit, handleValidationError)}
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
}
