export const uploadMainImage = async (rawImage: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", rawImage);
  formData.append("upload_preset", "productPreset");

  const uploadResponse = await fetch(
    "https://api.cloudinary.com/v1_1/dn5vycly3/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  if (!uploadResponse.ok) {
    throw new Error("Failed to upload main image");
  }

  const uploadData = await uploadResponse.json();
  return uploadData.secure_url;
};
