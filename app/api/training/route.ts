export async function GET() {
  return new Response("Hello, this is the TRAINING GET route!");
}

export async function POST(request: Request) {
  const body = await request.json();
  console.log(" POST body:", body);
  return new Response("Hello, this is the TRAINING POST route!", {
    status: 200,
  });
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
