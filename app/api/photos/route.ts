import { prisma } from "@/app/_lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const photos = await prisma.photo.findMany({});

  return NextResponse.json(photos);
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("files");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const storagePath = `/uploads/${Date.now()}-${file.name.replace(/\s+/g, "-")}`;

    const photo = await prisma.photo.create({
      data: {
        storagePath,
        label: null,
        ground: "training",
      },
    });

    return NextResponse.json({ success: true, photo });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const body = await request.json();
  console.log("PATCH body:", body);
  return new Response("Hello, this is the photos PATCH route!", {
    status: 200,
  });
}

export async function DELETE(request: Request) {
  const body = await request.json();
  console.log("DELETE body:", body);
  return new Response("Hello, this is the photos DELETE route!", {
    status: 200,
  });
}
