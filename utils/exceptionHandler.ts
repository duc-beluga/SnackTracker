import { FieldError, FieldErrors } from "react-hook-form";
import { toast } from "sonner";

export async function catchError<T>(
  promise: Promise<T>
): Promise<[undefined, T] | [Error]> {
  return promise
    .then((data) => {
      return [undefined, data] as [undefined, T];
    })
    .catch((error) => {
      return [error];
    });
}

export const handleValidationError = (errors: FieldErrors) => {
  const firstError = Object.values(errors).find(
    (err): err is FieldError => typeof err?.message === "string"
  );
  if (firstError?.message) {
    toast.error(firstError.message);
    return;
  }

  const genericErrorMessage = "Please check your input and try again.";
  toast.error(genericErrorMessage);
  return;
};
