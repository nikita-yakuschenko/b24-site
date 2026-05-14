import { NextResponse } from "next/server";

import { contacts } from "@/lib/site";
import { sendLeadEmail } from "@/lib/send-lead-email";
import { validateContactPayload } from "@/lib/validate-contact";

function leadInbox(): string {
  return process.env.CONTACT_TO?.trim() || contacts.email;
}

function leadBodyText(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}): string {
  return [
    `Имя: ${data.name}`,
    `Email: ${data.email || "—"}`,
    `Телефон: ${data.phone || "—"}`,
    "",
    "Комментарий:",
    data.message.trim() ? data.message.trim() : "—",
  ].join("\n");
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false as const, error: "invalid_json" },
      { status: 400 },
    );
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json(
      { ok: false as const, error: "invalid_body" },
      { status: 400 },
    );
  }

  const raw = body as Record<string, unknown>;
  if (typeof raw._honeypot === "string" && raw._honeypot.trim() !== "") {
    return NextResponse.json({ ok: true as const });
  }

  const parsed = validateContactPayload({
    name: typeof raw.name === "string" ? raw.name : "",
    email: typeof raw.email === "string" ? raw.email : "",
    phone: typeof raw.phone === "string" ? raw.phone : "",
    message: typeof raw.message === "string" ? raw.message : "",
  });

  if (!parsed.ok) {
    return NextResponse.json(
      { ok: false as const, errors: parsed.errors },
      { status: 422 },
    );
  }

  const { data } = parsed;
  const site =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://b24.module.team";
  const to = leadInbox();

  const sent = await sendLeadEmail({
    to,
    replyTo: data.email.trim() ? data.email.trim() : undefined,
    subject: `Заявка с сайта (${site})`,
    text: leadBodyText(data),
  });

  if (!sent.ok) {
    if (sent.reason === "not_configured") {
      return NextResponse.json(
        { ok: false as const, error: "unavailable" as const },
        { status: 503 },
      );
    }
    return NextResponse.json(
      { ok: false as const, error: "unavailable" as const },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true as const });
}
