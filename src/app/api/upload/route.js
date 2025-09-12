import { v2 as cloudinary } from "cloudinary";
import {corsResponse} from "@/lib/cors" 

export const config = {
  api: {
    bodyParser: false,
  },
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("image");

    if (!file) {
      return corsResponse({ error: "No file provided" }, 400);
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream((err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
      uploadStream.end(buffer);
    });
    return corsResponse({ url: result.secure_url });
  } catch (err) {
    console.error("Upload error:", err);
    return corsResponse({ error: "Upload failed" }, 500);
  }
}
