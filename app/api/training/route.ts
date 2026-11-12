import { prisma } from "../../_lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  return new Response("Hello, this is the TRAINING GET route!");
}

export async function POST(request: Request) {
  const { rounds, accuracy } = await request.json();

  if (typeof rounds !== "number" || typeof accuracy !== "number") {
    return NextResponse.json(
      { error: "rounds and accuracy must be numbers" },
      { status: 400 },
    );
  }

  const run = await prisma.trainingRun.create({ data: { rounds, accuracy } });
  return NextResponse.json(run, { status: 201 });
}

export async function PATCH(request: Request) {
  const body = await request.json();
  console.log("PATCH body:", body);
  return new Response("Hello, this is the TRAINING PATCH route!", {
    status: 200,
  });
}

export async function DELETE(request: Request) {
  const body = await request.json();
  console.log("DELETE body:", body);
  return new Response("Hello, this is the TRAINING DELETE route!", {
    status: 200,
  });
}
