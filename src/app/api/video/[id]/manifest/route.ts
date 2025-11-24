import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // For now, using a hardcoded manifest path since we're not querying the database
  // The manifest path should match what was uploaded (e.g., videos/test/playlist.m3u8)
  // Update this to match your actual manifest filename
//   const manifestPath = `videos/${id}/playlist.m3u8`;
const manifestPath = `videos/test/playlist.m3u8`;

  // Get the blob store base URL from environment variable
  const blobStoreBaseUrl = process.env.BLOB_URL;

  if (!blobStoreBaseUrl) {
    return NextResponse.json(
      { error: "BLOB_URL environment variable is not set" },
      { status: 500 }
    );
  }

  const url = `${blobStoreBaseUrl}/${manifestPath}`;

  return NextResponse.json({ url });
}

