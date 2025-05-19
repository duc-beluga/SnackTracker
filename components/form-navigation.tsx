import React, { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui";

interface FormNavigationProps {
  totalSteps: number;
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}

const FormNavigation = ({ totalSteps, step, setStep }: FormNavigationProps) => {
  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleNext = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    }
  };

  return (
    <div className="flex justify-between">
      <Button
        type="button"
        className="font-medium"
        size="sm"
        onClick={handleBack}
        disabled={step === 0}
        key="nextButton"
      >
        Back
      </Button>
      {step !== totalSteps - 1 ? (
        <Button
          type="button"
          className="font-medium"
          size="sm"
          onClick={handleNext}
          disabled={step === totalSteps - 1}
          key="submitButton"
        >
          Next
        </Button>
      ) : (
        <Button type="submit" size="sm" className="font-medium">
          Submit
        </Button>
      )}
    </div>
  );
};

export default FormNavigation;
