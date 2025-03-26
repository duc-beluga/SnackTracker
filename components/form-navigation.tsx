import React, { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";

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

  return (
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
  );
};

export default FormNavigation;
