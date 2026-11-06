import { prisma } from "@/app/_lib/prisma";
import {
  ensureBucket,
  getSupabaseAdmin,
  PHOTO_BUCKET,
  withImageUrls,
} from "@/app/_lib/supabase";
import { NextResponse } from "next/server";

// GET: list all photos
export async function GET() {
  try {
    const photos = await prisma.photo.findMany({
      orderBy: { creativeAt: "desc" },
    });
    return NextResponse.json(await withImageUrls(getSupabaseAdmin(), photos));
  } catch (error) {
    console.error("Photo list error:", error);
    return NextResponse.json(
      { error: "Could not load photos. Check the database connection." },
      { status: 500 },
    );
  }
}

// POST: multipart/form-data with a "file" field.
// 1. uploads the image to Supabase Storage
// 2. saves the public image URL in the Photo table

export async function POST(request: Request) {
  let file: FormDataEntryValue | null;
  try {
    const formData = await request.formData();
    file = formData.get("file");
  } catch {
    return NextResponse.json(
      { error: "Request must be multipart/form-data" },
      { status: 400 },
    );
  }

  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "file is required" }, { status: 400 });
  }
  if (!file.type.startsWith("image/")) {
    return NextResponse.json(
      { error: "Only image files are allowed" },
      { status: 400 },
    );
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const path = `uploads/${Date.now()}-${crypto.randomUUID()}-${safeName}`;

  let supabase;
  try {
    supabase = getSupabaseAdmin();
    await ensureBucket(supabase);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }

  const { error: uploadError } = await supabase.storage
    .from(PHOTO_BUCKET)
    .upload(path, file, { contentType: file.type, upsert: false });

  if (uploadError) {
    console.error("Supabase upload error:", uploadError);
    return NextResponse.json(
      { error: `Storage upload failed: ${uploadError.message}` },
      { status: 500 },
    );
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(PHOTO_BUCKET).getPublicUrl(path);

  try {
    const photo = await prisma.photo.create({
      data: { storagePath: publicUrl },
    });
    const [withUrl] = await withImageUrls(supabase, [photo]);
    return NextResponse.json({ photo: withUrl }, { status: 201 });
  } catch (error) {
    console.error("Photo database error:", error);
    // roll back the orphaned file
    await supabase.storage.from(PHOTO_BUCKET).remove([path]);
    return NextResponse.json(
      { error: "Could not save photo. Check the database connection." },
      { status: 500 },
    );
  }
}

// PATCH: set a photo's label. Body: { id: string, label: "CAT" | "NOT_CAT" | null }
const LABELS = ["CAT", "NOT_CAT"] as const;
type PhotoLabel = (typeof LABELS)[number];

export async function PATCH(request: Request) {
  let body: { id?: unknown; label?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body must be JSON" }, { status: 400 });
  }

  if (typeof body.id !== "string" || body.id === "") {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }
  if (body.label !== null && !LABELS.includes(body.label as PhotoLabel)) {
    return NextResponse.json(
      { error: "label must be CAT, NOT_CAT or null" },
      { status: 400 },
    );
  }

  try {
    const photo = await prisma.photo.update({
      where: { id: body.id },
      data: { label: body.label as PhotoLabel | null },
    });
    const [withUrl] = await withImageUrls(getSupabaseAdmin(), [photo]);
    return NextResponse.json({ photo: withUrl });
  } catch (error) {
    console.error("Photo label error:", error);
    return NextResponse.json(
      { error: "Could not update label (photo not found?)" },
      { status: 404 },
    );
  }
}

// DELETE REQUEST
export async function DELETE(request: Request) {
  const body = await request.json();
  console.log("DELETE body:", body);
  return new Response("Hello, this is the photos DELETE route!", {
    status: 200,
  });
}
