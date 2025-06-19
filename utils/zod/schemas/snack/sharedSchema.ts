import { z } from "zod";

// ================================================
// 🔒 MAX FILE SIZE LIMIT (IMPORTANT)
// Controls the maximum file size allowed for uploads.
// This value is used in schema validation and client-side checks.
// Update with caution — affects storage, bandwidth, and UX.
// ================================================
const MAX_MB_SIZE = 3;
const MAX_FILE_SIZE = MAX_MB_SIZE * 1024 * 1024;
const MIN_DIMENSIONS = { width: 200, height: 200 };
const MAX_DIMENSIONS = { width: 4096, height: 4096 };
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const validateImageDimensions = (file: File | Blob): Promise<boolean> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const valid =
          img.width >= MIN_DIMENSIONS.width &&
          img.height >= MIN_DIMENSIONS.height &&
          img.width <= MAX_DIMENSIONS.width &&
          img.height <= MAX_DIMENSIONS.height;
        resolve(valid);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
};

export const snackImageSchema = z
  .custom<Blob>((file) => file instanceof Blob, {
    message: "Please select an image file.",
  })
  .refine((file) => file.size <= MAX_FILE_SIZE, {
    message: `The image is too large. Please choose an image smaller than ${MAX_MB_SIZE} MB.`,
  })
  .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
    message: "Please upload a valid image file (JPEG, PNG, or WebP).",
  })
  .refine((file) => validateImageDimensions(file), {
    message: `The image dimensions are invalid. Please upload an image between ${MIN_DIMENSIONS.width}x${MIN_DIMENSIONS.height} and ${MAX_DIMENSIONS.width}x${MAX_DIMENSIONS.height} pixels.`,
  });

export const snackLocationSchema = z.object({
  address: z.string().min(1, "Address is required"),
  place_id: z.string().min(1, "Place_id is required"),
});
