import { prisma } from "@/app/_lib/prisma";
import {
  ensureBucket,
  getSupabaseAdmin,
  PHOTO_BUCKET,
  withImageUrls,
} from "@/app/_lib/supabase";
import { NextResponse } from "next/server";

const GROUNDS = ["training", "testing"] as const;
type Ground = (typeof GROUNDS)[number];

const isGround = (value: string): value is Ground =>
  (GROUNDS as readonly string[]).includes(value);

// About 1 in 5 uploads is kept back for testing; the model never trains on it.
const TEST_SHARE = 0.2;
const pickGround = (): Ground =>
  Math.random() < TEST_SHARE ? "testing" : "training";

// GET: list photos, optionally filtered with ?ground=training|testing
export async function GET(request: Request) {
  const ground = new URL(request.url).searchParams.get("ground");
  if (ground !== null && !isGround(ground)) {
    return NextResponse.json(
      { error: `ground must be one of: ${GROUNDS.join(", ")}` },
      { status: 400 },
    );
  }

  try {
    const photos = await prisma.photo.findMany({
      where: ground ? { ground } : undefined,
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

// Post: upload a new photo
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
      data: { storagePath: publicUrl, ground: pickGround() },
    });
    const [withUrl] = await withImageUrls(supabase, [photo]);
    return NextResponse.json({ photo: withUrl }, { status: 201 });
  } catch (error) {
    console.error("Photo database error:", error);

    await supabase.storage.from(PHOTO_BUCKET).remove([path]);
    return NextResponse.json(
      { error: "Could not save photo. Check the database connection." },
      { status: 500 },
    );
  }
}

const LABELS = ["CAT", "NOT_CAT"] as const;
type PhotoLabel = (typeof LABELS)[number];

// PATCH REQUEST

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
  console.log("DELETE body:   aaaaaaa", body);
  try {
    const deletedPhoto = await prisma.photo.delete({
      where: { id: body.id },
    });
    return NextResponse.json({
      message: "Photo deleted successfully",
      photo: deletedPhoto,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Could not delete photo (photo not found?)" },
      { status: 404 },
    );
  }
}
