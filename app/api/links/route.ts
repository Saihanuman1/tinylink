import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const rows = await db`SELECT * FROM links ORDER BY created_at DESC`;
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  try {
    const { url, code } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const shortCode =
      code?.trim() || Math.random().toString(36).substring(2, 8);

    const exists = await db`
      SELECT * FROM links WHERE code = ${shortCode}
    `;

    if (exists.length > 0) {
      return NextResponse.json(
        { error: "Code already exists" },
        { status: 409 }
      );
    }

    const result = await db`
      INSERT INTO links (code, target_url)
      VALUES (${shortCode}, ${url})
      RETURNING *
    `;

    return NextResponse.json(result[0]);
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
