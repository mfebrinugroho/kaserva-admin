import axios from "axios";
import type { FieldValues, Path, UseFormSetError } from "react-hook-form";

export const handleFormError = <T extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<T>,
) => {
  if (axios.isAxiosError(error) && error.response?.status === 422) {
    const validationErrors = error.response.data.errors;

    Object.entries(validationErrors).forEach(([field, messages]) => {
      setError(field as Path<T>, {
        type: "server",
        message: (messages as string[])[0],
      });
    });

    return true;
  }

  return false;
};
