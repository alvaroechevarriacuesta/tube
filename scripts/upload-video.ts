import fs from 'fs';
import path from 'path';
import { put } from '@vercel/blob';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const folder = path.resolve('./output');
const videoId = 'test';

// Get the token from environment variable
const token = process.env.TUBE_READ_WRITE_TOKEN;

if (!token) {
  console.error('Error: TUBE_READ_WRITE_TOKEN environment variable is not set');
  process.exit(1);
}

async function main() {
  for (const file of fs.readdirSync(folder)) {
    const filePath = path.join(folder, file);
    const data = fs.readFileSync(filePath);
    const contentType = file.endsWith('.m3u8')
      ? 'application/vnd.apple.mpegurl'
      : 'video/MP2T';

    const { url } = await put(`videos/${videoId}/${file}`, data, {
      access: 'public',
      addRandomSuffix: false,
      contentType,
      token, // Pass the token to authenticate with Vercel Blob
    });
    console.log(`Uploaded: ${url}`);
  }
}

main().catch(console.error);
