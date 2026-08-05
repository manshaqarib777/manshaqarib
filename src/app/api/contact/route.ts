import { NextResponse } from "next/server";
import { validateContact } from "@/lib/validation";

/**
 * Contact endpoint.
 *
 * IMPORTANT — this route validates and accepts the submission but does not yet
 * deliver it anywhere. Nothing is emailed or stored; the payload is logged
 * server-side only. Wire a provider where marked below before relying on this in
 * production, otherwise enquiries will be silently dropped.
 *
 * Runs on the default Node.js runtime (Fluid Compute), which is what you want for
 * an email SDK — no Edge-runtime compatibility constraints.
 */
export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Malformed request body." },
      { status: 400 },
    );
  }

  // Server-side re-validation: the client's check is a courtesy, not a guarantee.
  const { errors, isValid, value } = validateContact(
    (body ?? {}) as Record<string, string>,
  );

  if (!isValid) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  // ── TODO: deliver the enquiry ────────────────────────────────────────────
  // e.g. Resend:
  //   await resend.emails.send({ to: SITE.email, from: ..., subject: ..., text: ... })
  // Until this is wired up, submissions go no further than this log line.
  console.info("[contact] enquiry received", {
    name: value.name,
    email: value.email,
    budget: value.budget || "unspecified",
    messageLength: value.message.length,
  });

  return NextResponse.json({ ok: true });
}
