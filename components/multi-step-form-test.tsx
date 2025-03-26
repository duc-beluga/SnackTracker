"use client";

// React and external libraries
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { PackagePlus } from "lucide-react";

// Type imports
import { SnackNameLocationSchemaType } from "@/utils/zod/schemas/SnackNameLocationSchema";

// Utility functions
import { getSnackNameLocationForm } from "@/utils/zod/forms/SnackNameLocationForm";
import { onSnackNameLocationSubmit } from "@/app/snacks/actions";

// UI Components - shadcn
import { Button } from "@/components/ui/button";
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

const TOTAL_STEPS = 2;

export const NewSnackForm = () => {
  const [step, setStep] = useState<number>(0);
  const [isNewSnack, setIsNewSnack] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const nameLocationImageForm = getSnackNameLocationForm();

  const { handleSubmit, control, reset } = nameLocationImageForm;

  const onNameLocationImageSubmit = async (
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

  const handleNext = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setStep(step + 1);
  };

  const handleFormSubmission = (event: React.FormEvent<HTMLFormElement>) => {
    if (step !== TOTAL_STEPS - 1) {
      handleNext(event);
    } else {
      handleSubmit(onNameLocationImageSubmit)(event);
    }
  };

  return (
    <div className="space-y-4">
      <Stepper totalSteps={TOTAL_STEPS} currentStep={step} />
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">
            {!isNewSnack && step === 1
              ? "Adding existing snack"
              : "Adding new snack"}
          </CardTitle>
          <CardDescription>Current step {step + 1}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...nameLocationImageForm}>
            <form onSubmit={handleFormSubmission} className="grid gap-y-4">
              {step === 0 ? (
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
                step={step}
                setStep={setStep}
              />
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
