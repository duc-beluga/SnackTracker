"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { getSnackNameLocationForm } from "@/utils/zod/forms/SnackNameLocationForm";
import SnackLocationSearch from "./snack-location-search";
import { z } from "zod";
import { SnackNameLocationSchemaType } from "@/utils/zod/schemas/SnackNameLocationSchema";
import { onSnackNameLocationSubmit } from "@/app/snacks/actions";

export const NewSnackForm = () => {
  const [step, setStep] = useState<number>(0);
  const totalSteps = 2;

  const form = getSnackNameLocationForm();

  const { handleSubmit, control, reset } = form;

  const onSubmit = async (
    values: z.infer<typeof SnackNameLocationSchemaType>
  ) => {
    onSnackNameLocationSubmit(values);

    setStep(0);
    reset();

    toast.success("Form successfully submitted");
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleFormSubmission = (event: React.FormEvent<HTMLFormElement>) => {
    if (step === 0) {
      event.preventDefault();
      setStep(step + 1);
    } else {
      handleSubmit(onSubmit)(event);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div key={index} className="flex items-center">
            <div
              className={cn(
                "w-4 h-4 rounded-full transition-all duration-300 ease-in-out",
                index <= step ? "bg-primary" : "bg-primary/30",
                index < step && "bg-primary"
              )}
            />
            {index < totalSteps - 1 && (
              <div
                className={cn(
                  "w-8 h-0.5",
                  index < step ? "bg-primary" : "bg-primary/30"
                )}
              />
            )}
          </div>
        ))}
      </div>
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Adding new snack</CardTitle>
          <CardDescription>Current step {step + 1}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={handleFormSubmission} className="grid gap-y-4">
              {step === 0 ? (
                <FormField
                  control={control}
                  name="snackName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Snack name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value || ""}
                          placeholder="Search a snack..."
                          autoComplete="off"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              ) : (
                <>
                  <FormField
                    control={control}
                    name="snackLocation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <SnackLocationSearch field={field} />
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
                </>
              )}

              <div className="flex justify-between">
                <Button
                  type="button"
                  className="font-medium"
                  size="sm"
                  onClick={handleBack}
                  disabled={step === 0}
                >
                  Back
                </Button>
                <Button type="submit" size="sm" className="font-medium">
                  {step === totalSteps - 1 ? "Submit" : "Next"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
