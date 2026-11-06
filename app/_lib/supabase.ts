import { createClient } from "@supabase/supabase-js";

// Server-only Supabase client used for Storage uploads.
// Requires in .env:
//   NEXT_PUBLIC_SUPABASE_URL=https://<project>.supabase.co
//   SUPABASE_SERVICE_ROLE_KEY=<service role key>   (or NEXT_PUBLIC_SUPABASE_ANON_KEY)
//   SUPABASE_BUCKET=photos                          (optional, defaults to "photos")
export const PHOTO_BUCKET = process.env.SUPABASE_BUCKET ?? "photos";

export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.SUPABASE_SECRET_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (url?.includes("<") || key?.includes("<")) {
    throw new Error(
      "Supabase values in .env are still placeholders — paste your real Project URL and service_role key, then restart npm run dev",
    );
  }

  if (!url || !key) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env",
    );
  }

  return createClient(url, key, { auth: { persistSession: false } });
}

// storagePath holds the public URL ".../object/public/<bucket>/<path>";
// pull out the object path inside the bucket.
export function objectPathFromUrl(storagePath: string) {
  const marker = `/object/public/${PHOTO_BUCKET}/`;
  const i = storagePath.indexOf(marker);
  return i === -1 ? storagePath : storagePath.slice(i + marker.length);
}

// Signed URLs work whether the bucket is public or private.
export async function withImageUrls<T extends { storagePath: string }>(
  supabase: ReturnType<typeof getSupabaseAdmin>,
  photos: T[],
): Promise<(T & { imageUrl: string })[]> {
  if (photos.length === 0) return [];
  const { data } = await supabase.storage
    .from(PHOTO_BUCKET)
    .createSignedUrls(
      photos.map((p) => objectPathFromUrl(p.storagePath)),
      60 * 60, // 1 hour
    );
  return photos.map((p, i) => ({
    ...p,
    imageUrl: data?.[i]?.signedUrl ?? p.storagePath,
  }));
}

let bucketReady = false;

// Creates the public storage bucket if it doesn't exist yet
// (needs the service role key; with the anon key, create it in the dashboard).
export async function ensureBucket(
  supabase: ReturnType<typeof getSupabaseAdmin>,
) {
  if (bucketReady) return;
  const { data } = await supabase.storage.getBucket(PHOTO_BUCKET);
  if (!data) {
    const { error } = await supabase.storage.createBucket(PHOTO_BUCKET, {
      public: true,
    });
    if (error && !/already exists/i.test(error.message)) {
      throw new Error(
        `Could not create bucket "${PHOTO_BUCKET}": ${error.message}`,
      );
    }
  }
  bucketReady = true;
}
