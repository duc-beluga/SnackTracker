import { cn } from "@/lib/utils";
import React from "react";

const Stepper = ({
  totalSteps,
  currentStep,
}: {
  totalSteps: number;
  currentStep: number;
}) => {
  return (
    <div className="flex items-center justify-center">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div key={index} className="flex items-center">
          <div
            className={cn(
              "w-4 h-4 rounded-full transition-all duration-300 ease-in-out",
              index <= currentStep ? "bg-primary" : "bg-primary/30"
            )}
          />
          {index < totalSteps - 1 && (
            <div
              className={cn(
                "w-8 h-0.5",
                index < currentStep ? "bg-primary" : "bg-primary/30"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
