import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const photos = await prisma.photo.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextRequest.json(photos);
}

export async function POST(request: Request) {
  const body = await request.json();
  console.log("POST body:", body);

  const photo = await prisma.photo.create({
    data: {
      url: body.url,
      label: body.label,
    },
  });
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
