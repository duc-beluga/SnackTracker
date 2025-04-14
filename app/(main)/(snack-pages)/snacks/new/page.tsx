import { NewSnackForm } from "@/components/multi-step-form";
import React from "react";

const NewSnackPage = () => {
  return (
    <div className="flex justify-center m-16">
      <div className="w-1/2">
        <NewSnackForm />
      </div>
    </div>
  );
};

export default NewSnackPage;
