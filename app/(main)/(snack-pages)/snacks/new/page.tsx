import { NewSnackForm } from "@/components/multi-step-form";
import React from "react";

const NewSnackPage = () => {
  return (
    <div className="flex justify-center my-16 sm:m-16">
      <div className="w-2/3 md:w-1/2">
        <NewSnackForm />
      </div>
    </div>
  );
};

export default NewSnackPage;
