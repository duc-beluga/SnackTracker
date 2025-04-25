import React from "react";
import { z } from "zod";

import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import SnackLocationSearch from "./snack-location-search";
import { SnackLocationSchemaType } from "@/utils/zod/schemas/SnackLocationSchema";
import { getSnackLocationFormWithDefaultId } from "@/utils/zod/forms/SnackLocationForm";

interface LocationImageFormProps {
  footerSlot: React.ReactNode;
  headerSlot: React.ReactNode;
  snackId: number;
  addSnackLocation: (
    values: z.infer<typeof SnackLocationSchemaType>
  ) => Promise<void>;
}

const SnackLocationForm = ({
  footerSlot,
  headerSlot,
  addSnackLocation,
  snackId,
}: LocationImageFormProps) => {
  const reactHookSnackLocationForm = getSnackLocationFormWithDefaultId(snackId);
  const { handleSubmit, control } = reactHookSnackLocationForm;

  return (
    <Form {...reactHookSnackLocationForm}>
      <form onSubmit={handleSubmit(addSnackLocation)} className="space-y-6">
        {headerSlot}
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
        {footerSlot}
      </form>
    </Form>
  );
};

export default SnackLocationForm;
