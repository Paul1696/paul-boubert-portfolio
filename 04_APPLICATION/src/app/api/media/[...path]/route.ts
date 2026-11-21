import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const MIME_TYPES: Record<string, string> = {
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".vcf": "text/vcard; charset=utf-8",
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path: segments } = await params;
    if (!segments || segments.length === 0) {
      return new NextResponse("Not found", { status: 404 });
    }

    const relativeSubPath = segments.join("/");
    const safeMediaRoot = path.resolve(process.cwd(), "src/assets/media");
    const filePath = path.resolve(safeMediaRoot, relativeSubPath);

    if (!filePath.startsWith(safeMediaRoot)) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || "application/octet-stream";
      const fileBuffer = fs.readFileSync(filePath);

      return new NextResponse(fileBuffer, {
        status: 200,
        headers: {
          "Content-Type": contentType,
          "Cache-Control": "public, max-age=31536000, immutable",
          "Content-Length": fileBuffer.length.toString(),
        },
      });
    }

    const placeholderPath = path.resolve(safeMediaRoot, "placeholders/project-placeholder.svg");
    if (fs.existsSync(placeholderPath)) {
      const svgBuffer = fs.readFileSync(placeholderPath);
      return new NextResponse(svgBuffer, {
        status: 200,
        headers: {
          "Content-Type": "image/svg+xml; charset=utf-8",
          "Cache-Control": "public, max-age=86400",
          "X-Media-Status": "fallback-placeholder",
        },
      });
    }

    return new NextResponse("Media not found", { status: 404 });
  } catch (error) {
    console.error("Error serving media file:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
