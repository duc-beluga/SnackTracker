"use client";

import SnackLocationSearch from "@/components/snack-location-search";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getSnackNameLocationForm } from "@/utils/zod/forms/SnackNameLocationForm";
import React from "react";
import { onSnackNameLocationSubmit } from "../actions";

const NewSnack = () => {
  const reactHookSnackNameLocationForm = getSnackNameLocationForm();

  return (
    <div>
      <Form {...reactHookSnackNameLocationForm}>
        <form
          onSubmit={reactHookSnackNameLocationForm.handleSubmit(
            onSnackNameLocationSubmit
          )}
          className="space-y-6"
        >
          <FormField
            control={reactHookSnackNameLocationForm.control}
            name="snackName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Snack name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={reactHookSnackNameLocationForm.control}
            name="snackLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Search location</FormLabel>
                <FormControl>
                  <SnackLocationSearch field={field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={reactHookSnackNameLocationForm.control}
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
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default NewSnack;
