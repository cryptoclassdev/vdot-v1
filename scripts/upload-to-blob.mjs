/**
 * One-time script to upload compressed assets to Vercel Blob Storage.
 *
 * Prerequisites:
 *   1. Create a Blob store in Vercel Dashboard → Storage → Create → Blob
 *   2. Copy the BLOB_READ_WRITE_TOKEN and add it to .env.local
 *   3. Run: node scripts/upload-to-blob.mjs
 *
 * The script outputs the Blob URLs to paste into lib/assets.ts
 */

import { put } from "@vercel/blob"
import { readFileSync } from "fs"
import { resolve, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))

const ASSETS_DIR = resolve(__dirname, "cloudinary-assets")

const assets = [
  { file: "phantom-video-compressed.mp4", name: "phantom-video.mp4", contentType: "video/mp4" },
  { file: "solflare-video-compressed.mp4", name: "solflare-video.mp4", contentType: "video/mp4" },
  { file: "backpack-video-compressed.mp4", name: "backpack-video.mp4", contentType: "video/mp4" },
  { file: "phantom-ss.png", name: "phantom-ss.png", contentType: "image/png" },
]

async function main() {
  const token = process.env.BLOB_READ_WRITE_TOKEN
  if (!token) {
    console.error("Error: BLOB_READ_WRITE_TOKEN not set. Add it to .env.local first.")
    process.exit(1)
  }

  console.log("Uploading assets to Vercel Blob...\n")

  const results = {}

  for (const asset of assets) {
    const filePath = resolve(ASSETS_DIR, asset.file)
    const buffer = readFileSync(filePath)
    const sizeMB = (buffer.length / 1024 / 1024).toFixed(2)

    console.log(`Uploading ${asset.name} (${sizeMB} MB)...`)

    const blob = await put(asset.name, buffer, {
      access: "public",
      contentType: asset.contentType,
      token,
    })

    results[asset.name] = blob.url
    console.log(`  -> ${blob.url}\n`)
  }

  console.log("---\nAll uploads complete! Update lib/assets.ts with these URLs:\n")
  console.log("export const blobAssets = {")
  console.log(`  phantomVideo: "${results["phantom-video.mp4"]}",`)
  console.log(`  solflareVideo: "${results["solflare-video.mp4"]}",`)
  console.log(`  backpackVideo: "${results["backpack-video.mp4"]}",`)
  console.log(`  phantomScreenshot: "${results["phantom-ss.png"]}",`)
  console.log("}")
}

main().catch(console.error)
