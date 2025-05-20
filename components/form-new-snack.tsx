"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Form,
  Stepper,
} from "@/components/ui";

// Custom components
import { FormNavigation } from "./form-navigation";
import { SnackNameFormField } from "./snack-name-form-field";

//Custom hooks
import { useNewSnackForm } from "@/app/hooks/useMultistepSnackForm";
import { SnackLocationFormField } from "./snack-location-form-field";
import { SnackImageFormField } from "./snack-image-form-field";

const TOTAL_STEPS = 2;

export function FormNewSnack() {
  const multipleStepSnackFormState = useNewSnackForm();
  const {
    steps: { currentStep, setCurrentStep },
    snack: { isNewSnack },
    form: {
      control,
      nameLocationImageForm,
      handleSnackNameLocationImageSubmit,
    },
  } = multipleStepSnackFormState;

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
                <SnackNameFormField
                  multipleStepSnackFormState={multipleStepSnackFormState}
                />
              ) : (
                <>
                  <SnackLocationFormField control={control} />

                  <SnackImageFormField control={control} />
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
}
