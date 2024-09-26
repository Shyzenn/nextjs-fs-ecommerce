import { UseFormClearErrors, UseFormSetError } from "react-hook-form";
import { TProductSchema } from "../types";

export const handleImagePreview = (
  event: React.ChangeEvent<HTMLInputElement>,
  setPreview: (url: string) => void,
  setError?: UseFormSetError<TProductSchema>,
  clearError?: UseFormClearErrors<TProductSchema>
) => {
  const file = event.target.files?.[0];

  if (file) {
    // Check if the uploaded file is an image
    if (!file.type.startsWith("image/")) {
      if (setError) {
        setError("mainImageUrl", {
          type: "manual",
          message: "Please upload a valid image file",
        });
      }
      return;
    }

    if (clearError) {
      clearError("mainImageUrl");
    }

    // Create a local preview URL and set the state
    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  }
};
