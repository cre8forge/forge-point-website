import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

/**
 * POST /api/upload
 *
 * Accepts a multipart form-data request with a single "file" field (image).
 * Uploads to Cloudinary and returns the public URL + metadata.
 *
 * Used by the admin CMS for service images, university article headers, etc.
 *
 * Required Vercel env vars:
 *   CLOUDINARY_CLOUD_NAME
 *   CLOUDINARY_API_KEY
 *   CLOUDINARY_API_SECRET
 */

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  if (
    !process.env.CLOUDINARY_CLOUD_NAME ||
    !process.env.CLOUDINARY_API_KEY    ||
    !process.env.CLOUDINARY_API_SECRET
  ) {
    return NextResponse.json(
      { error: "Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET." },
      { status: 503 }
    );
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const file = formData.get("file") as File | null;
  const folder = (formData.get("folder") as string | null) ?? "forge-point";

  if (!file || file.size === 0) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  // 10 MB hard limit (Cloudinary free tier is generous, but protect the route)
  if (file.size > 10 * 1024 * 1024) {
    return NextResponse.json({ error: "File too large (max 10 MB)" }, { status: 413 });
  }

  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ error: "Only JPEG, PNG, WebP, GIF, and AVIF images are allowed" }, { status: 415 });
  }

  try {
    const bytes  = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise<{
      public_id:   string;
      secure_url:  string;
      width:       number;
      height:      number;
      format:      string;
      bytes:       number;
    }>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder,
            resource_type: "image",
            // Auto-generate a unique public_id
            use_filename:  false,
            unique_filename: true,
            // Serve modern formats automatically
            fetch_format:  "auto",
            quality:       "auto",
          },
          (error, result) => {
            if (error || !result) reject(error ?? new Error("Upload failed"));
            else resolve(result as typeof result & { bytes: number });
          }
        )
        .end(buffer);
    });

    return NextResponse.json({
      url:       result.secure_url,
      publicId:  result.public_id,
      width:     result.width,
      height:    result.height,
      format:    result.format,
      bytes:     result.bytes,
    });
  } catch (err) {
    console.error("[upload] Cloudinary error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
