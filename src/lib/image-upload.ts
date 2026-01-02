import { getPublicImageUrl, uploadFile } from "@/lib/supabase";

export interface ImageUploadOptions {
	maxSizeMB?: number;
}

/**
 * Uploads an image file to Supabase Storage
 * @param imageFile - The image file to upload
 * @param userId - The user ID (used as folder in storage)
 * @param bucket - The bucket name (e.g., "avatars", "exercise-images")
 * @param options - Upload options
 * @returns The public URL of the uploaded image, or null if no file provided
 */
export async function uploadImage(
	imageFile: File | null,
	userId: string,
	bucket: string,
	options: ImageUploadOptions = {},
): Promise<string | null> {
	if (!imageFile || !(imageFile.size > 0)) {
		return null;
	}

	// Validate file type
	if (!imageFile.type.startsWith("image/")) {
		throw new Error("Only image files are allowed");
	}

	// Validate file size (max 5MB by default)
	const MAX_IMAGE_SIZE = (options.maxSizeMB || 5) * 1024 * 1024;
	if (imageFile.size > MAX_IMAGE_SIZE) {
		throw new Error(`Image must be smaller than ${options.maxSizeMB || 5}MB`);
	}

	const fileExtension = imageFile.name.split(".").pop();
	const imagePath = `${userId}/${crypto.randomUUID()}.${fileExtension}`;

	await uploadFile(imageFile, bucket, imagePath);

	return getPublicImageUrl(bucket, imagePath);
}
