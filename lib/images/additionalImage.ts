import { UseFormClearErrors, UseFormSetError } from "react-hook-form";
import { TProductSchema } from "../types";

export const handleAdditonalImage = (
  event: React.ChangeEvent<HTMLInputElement>,
  setError: UseFormSetError<TProductSchema>,
  clearErrors: UseFormClearErrors<TProductSchema>,
  setPreview: (url: string[]) => void
) => {
  const files = event.target.files;
  if (files) {
    const fileArray = Array.from(files);

    // **Limit to 4 images**: Stop if there are more than 4 images selected
    if (fileArray.length > 4) {
      setError("secondaryImages", {
        type: "manual",
        message: "You can only upload up to 4 images",
      });

      // **Clear any existing previews**
      setPreview([]);

      return; // Exit early to prevent further processing
    }

    // Clear any errors since the file count is valid
    clearErrors("secondaryImages");

    // **Generate preview URLs only for 4 or fewer images**
    const previewUrls = fileArray
      .filter((file) => file.type.startsWith("image/")) // Ensure it's an image file
      .map((file) => URL.createObjectURL(file)); // Create object URL for preview

    setPreview(previewUrls); // Set previews for valid images
  }
};
