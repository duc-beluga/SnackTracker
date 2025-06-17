import imageCompression from "browser-image-compression";

export async function optimizeImage(uploadImageFile: File): Promise<File> {
  const options = {
    maxSizeMB: 0.4,
    maxWidthOrHeight: 1024,
    useWebWorker: false,
  };

  return await imageCompression(uploadImageFile, options);
}
