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
      errors.email = "Укажите email или полный мобильный телефон.";
      errors.phone = "Укажите email или полный мобильный телефон.";
    } else {
      if (email.length > 0 && !EMAIL_RE.test(email)) {
        errors.email = "Некорректный email. Укажите корректный email или телефон.";
      }
      if (phoneCanon.length > 0 && !phoneOk) {
        errors.phone =
          "Неполный номер. Введите все цифры мобильного или укажите email.";
      }
      if (!errors.email && !errors.phone) {
        errors.email = "Нужен корректный email или полный телефон.";
        errors.phone = "Нужен корректный email или полный телефон.";
      }
    }
  } else {
    if (email.length > 0 && !EMAIL_RE.test(email)) {
      errors.email = "Некорректный email.";
    }
    if (phoneCanon.length > 0 && !phoneOk) {
      errors.phone = "Укажите полный мобильный номер.";
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
