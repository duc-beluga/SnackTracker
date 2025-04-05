"use client";

// React and external libraries
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { PackagePlus } from "lucide-react";

// Type imports
import { SnackNameLocationSchemaType } from "@/utils/zod/schemas/SnackNameLocationSchema";
import { SnackLocationSchemaType } from "@/utils/zod/schemas/SnackLocationSchema";

// Utility functions
import { getSnackNameLocationForm } from "@/utils/zod/forms/SnackNameLocationForm";
import {
  onSnackLocationSubmit,
  onSnackNameLocationSubmit,
} from "@/app/server-actions/snacks/actions";

// UI Components - shadcn
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

// Custom components
import Stepper from "./ui/stepper";
import SnackSearchInput from "./snack-search-input";
import SnackLocationSearch from "./snack-location-search";
import FormNavigation from "./form-navigation";
import { useNewSnackForm } from "@/app/hooks/useMultistepSnackForm";

const TOTAL_STEPS = 2;

export const NewSnackForm = () => {
  const {
    steps: { currentStep, setCurrentStep },
    snack: { isNewSnack, setIsNewSnack, setSelectedSnackId },
    typing: { isTyping, setIsTyping },
    form: {
      control,
      nameLocationImageForm,
      handleSnackNameLocationImageSubmit,
    },
  } = useNewSnackForm();

  return (
    <div className="space-y-4">
      <Stepper totalSteps={TOTAL_STEPS} currentStep={currentStep} />
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">
            {!isNewSnack && currentStep === 1
              ? "Adding existing snack"
              : "Adding new snack"}
          </CardTitle>
          <CardDescription>Current step {currentStep + 1}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...nameLocationImageForm}>
            <form
              onSubmit={handleSnackNameLocationImageSubmit}
              className="grid gap-y-4"
            >
              {currentStep === 0 ? (
                <FormField
                  control={control}
                  name="snackName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <div className="flex justify-between">
                          <span>Snack name</span>
                          {isNewSnack && (
                            <PackagePlus
                              className="mr-2 h-4 w-4 shrink-0 opacity-50"
                              color="#28a745"
                            />
                          )}
                        </div>
                      </FormLabel>
                      <FormControl>
                        <SnackSearchInput<
                          z.infer<typeof SnackNameLocationSchemaType>,
                          "snackName"
                        >
                          field={field}
                          setIsNewSnack={setIsNewSnack}
                          setIsTyping={setIsTyping}
                          setSnackSelected={setSelectedSnackId}
                          isTyping={isTyping}
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

              <FormNavigation
                totalSteps={TOTAL_STEPS}
                step={currentStep}
                setStep={setCurrentStep}
              />
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
