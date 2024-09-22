export const uploadSecondaryImages = async (
  rawImages: File[]
): Promise<string[]> => {
  const secondaryImageUrls: string[] = [];

  for (let i = 0; i < rawImages.length; i++) {
    const rawSecondaryImage = rawImages[i];
    const secondaryFormData = new FormData();
    secondaryFormData.append("file", rawSecondaryImage);
    secondaryFormData.append("upload_preset", "productPreset");

    const secondaryUploadResponse = await fetch(
      "https://api.cloudinary.com/v1_1/dn5vycly3/image/upload",
      {
        method: "POST",
        body: secondaryFormData,
      }
    );

    if (!secondaryUploadResponse.ok) {
      throw new Error("Failed to upload secondary image");
    }

    const secondaryUploadData = await secondaryUploadResponse.json();
    secondaryImageUrls.push(secondaryUploadData.secure_url);
  }

  return secondaryImageUrls;
};
