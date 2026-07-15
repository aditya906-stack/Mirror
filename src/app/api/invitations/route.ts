import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET — all invitations the user has issued, with completion counts.
export async function GET(req: NextRequest) {
  const userId = req.headers.get("x-user-id");
  if (!userId) {
    return NextResponse.json({ invitations: [] });
  }

  const invitations = await db.invitation.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: {
      feedback: true,
    },
  });

  return NextResponse.json({
    invitations: invitations.map((inv) => ({
      id: inv.id,
      token: inv.token,
      providerName: inv.providerName,
      circle: inv.circle,
      status: inv.status,
      createdAt: inv.createdAt,
      completedAt: inv.completedAt,
      feedbackCount: inv.feedback.length,
    })),
  });
}

// POST — issue a new confidential invitation.
// Body: { providerName: string, circle: string }
export async function POST(req: NextRequest) {
  const userId = req.headers.get("x-user-id");
  if (!userId) {
    return NextResponse.json({ error: "No session." }, { status: 401 });
  }

  const body = await req.json();
  const { providerName, circle } = body as {
    providerName?: string;
    circle?: string;
  };

  if (!providerName || !circle) {
    return NextResponse.json(
      { error: "A name and a circle are required." },
      { status: 400 }
    );
  }

  // De-duplicate: if an open invitation already exists for this name+circle,
  // return it rather than creating a duplicate.
  const existing = await db.invitation.findFirst({
    where: { userId, providerName, circle, status: "pending" },
  });
  if (existing) {
    return NextResponse.json({ invitation: existing });
  }

  const invitation = await db.invitation.create({
    data: { userId, providerName, circle },
  });

  return NextResponse.json({ invitation });
}

// DELETE — withdraw an invitation.
export async function DELETE(req: NextRequest) {
  const userId = req.headers.get("x-user-id");
  if (!userId) {
    return NextResponse.json({ error: "No session." }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id." }, { status: 400 });
  }

  await db.invitation.deleteMany({ where: { id, userId } });
  return NextResponse.json({ ok: true });
}
