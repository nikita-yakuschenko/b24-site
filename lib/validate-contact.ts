import {
  ruPhoneToCanonicalDigits,
  ruPhoneToPayload,
} from "@/lib/ru-phone";

export type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactPayload(
  b: Partial<ContactPayload>,
): { ok: true; data: ContactPayload } | { ok: false; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  const name = (b.name ?? "").trim();
  if (name.length < 2) errors.name = "Укажите имя (от 2 символов).";
  else if (name.length > 120) errors.name = "Слишком длинное имя.";

  const email = (b.email ?? "").trim();
  const phoneRaw = (b.phone ?? "").trim();
  const phoneCanon = ruPhoneToCanonicalDigits(phoneRaw);

  const emailOk = email.length > 0 && EMAIL_RE.test(email);
  const phoneOk = /^79\d{9}$/.test(phoneCanon);

  if (!emailOk && !phoneOk) {
    if (email.length === 0 && phoneCanon.length === 0) {
      errors.contact = "Укажите email или телефон.";
    } else {
      if (email.length > 0 && !EMAIL_RE.test(email)) {
        errors.email = "Похоже, в email опечатка — проверьте адрес.";
      }
      if (phoneCanon.length > 0 && !phoneOk) {
        errors.phone = "Телефон введён не полностью — дозаполните или укажите email.";
      }
      if (!errors.email && !errors.phone) {
        errors.contact = "Укажите корректный email или телефон.";
      }
    }
  } else {
    if (email.length > 0 && !EMAIL_RE.test(email)) {
      errors.email = "Похоже, в email опечатка — проверьте адрес.";
    }
    if (phoneCanon.length > 0 && !phoneOk) {
      errors.phone = "Телефон введён не полностью.";
    }
  }

  const message = (b.message ?? "").trim();
  if (message.length > 8000) errors.message = "Слишком длинный текст.";

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    data: {
      name,
      email: emailOk ? email : "",
      phone: phoneOk ? ruPhoneToPayload(phoneRaw) : "",
      message,
    },
  };
}
