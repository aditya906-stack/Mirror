import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Returns the full behavioral instrument, grouped by category.
// These are the observable behaviors a person can be assessed on.
// Each behavior carries a `format` (frequency | agreement | scenario)
// and, for scenarios, a `prompt` (with {subject}) and `options`.
export async function GET() {
  const behaviors = await db.behavior.findMany({
    orderBy: [{ category: "asc" }, { text: "asc" }],
  });

  const grouped: Record<
    string,
    {
      id: string;
      text: string;
      format: string;
      prompt: string | null;
      options: string[] | null;
    }[]
  > = {};
  for (const b of behaviors) {
    if (!grouped[b.category]) grouped[b.category] = [];
    grouped[b.category].push({
      id: b.id,
      text: b.text,
      format: b.format,
      prompt: b.prompt,
      options: b.options ? (JSON.parse(b.options) as string[]) : null,
    });
  }

  return NextResponse.json({ grouped });
}
