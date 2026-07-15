import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Returns the full behavioral instrument, grouped by category.
// These are the observable behaviors a person can be assessed on.
export async function GET() {
  const behaviors = await db.behavior.findMany({
    orderBy: [{ category: "asc" }, { text: "asc" }],
  });

  const grouped: Record<string, { id: string; text: string }[]> = {};
  for (const b of behaviors) {
    if (!grouped[b.category]) grouped[b.category] = [];
    grouped[b.category].push({ id: b.id, text: b.text });
  }

  return NextResponse.json({ grouped });
}
