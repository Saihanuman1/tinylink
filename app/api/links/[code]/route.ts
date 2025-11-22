import { db } from "@/lib/db";

export async function GET(req: Request, { params }: any) {
  const code = params.code;

  const rows = await db`SELECT * FROM links WHERE code = ${code}`;
  if (rows.length === 0) return new Response("Not found", { status: 404 });

  return Response.json(rows[0]);
}

export async function DELETE(req: Request, { params }: any) {
  const code = params.code;
  await db`DELETE FROM links WHERE code = ${code}`;
  return Response.json({ ok: true });
}
