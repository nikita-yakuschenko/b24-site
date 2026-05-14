import nodemailer from "nodemailer";
import { Resend } from "resend";

export type LeadEmailPayload = {
  to: string;
  /** Если пусто — письмо без reply-to (например, только телефон в заявке). */
  replyTo?: string;
  subject: string;
  text: string;
};

/** Отправка с сервера: SMTP (если задан полностью) → иначе Resend. */
export async function sendLeadEmail(
  payload: LeadEmailPayload,
): Promise<{ ok: true } | { ok: false; reason: "not_configured" | "send_failed" }> {
  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = (
    process.env.SMTP_PASS ??
    process.env.SMTP_PASSWORD ??
    ""
  ).trim();
  const from = process.env.SMTP_FROM?.trim() || user;
  const portRaw = process.env.SMTP_PORT?.trim();
  const portParsed = portRaw ? Number.parseInt(portRaw, 10) : 587;
  const effectivePort =
    Number.isFinite(portParsed) && portParsed > 0 ? portParsed : 587;

  if (host && user && pass && from) {
    try {
      const secure = effectivePort === 465;
      const requireTLS =
        !secure && (effectivePort === 587 || effectivePort === 2525);
      const transporter = nodemailer.createTransport({
        host,
        port: effectivePort,
        secure,
        requireTLS,
        auth: { user, pass },
      });
      await transporter.sendMail({
        from,
        to: payload.to,
        ...(payload.replyTo ? { replyTo: payload.replyTo } : {}),
        subject: payload.subject,
        text: payload.text,
      });
      return { ok: true };
    } catch {
      return { ok: false, reason: "send_failed" };
    }
  }

  const resendKey = process.env.RESEND_API_KEY?.trim();
  const resendFrom = process.env.RESEND_FROM?.trim();
  if (resendKey && resendFrom) {
    const resend = new Resend(resendKey);
    const { error } = await resend.emails.send({
      from: resendFrom,
      to: [payload.to],
      ...(payload.replyTo ? { replyTo: payload.replyTo } : {}),
      subject: payload.subject,
      text: payload.text,
    });
    if (error) return { ok: false, reason: "send_failed" };
    return { ok: true };
  }

  return { ok: false, reason: "not_configured" };
}
