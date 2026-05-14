/** Только цифры из ввода. */
export function ruPhoneDigits(input: string): string {
  return input.replace(/\D/g, "");
}

/**
 * Канон: до 11 цифр, страна 7, мобильный 9XXXXXXXXX.
 * 8… → 7…; без кода и 10 цифр с 9 — добавляется 7.
 */
export function ruPhoneToCanonicalDigits(input: string): string {
  let d = ruPhoneDigits(input);
  if (d.length === 0) return "";
  if (d.startsWith("8")) d = "7" + d.slice(1);
  if (d.length > 0 && d.length <= 10 && d.startsWith("9")) d = "7" + d;
  d = d.slice(0, 11);
  return d;
}

/** Отображение +7 (XXX) XXX-XX-XX по канону 7 + 10 цифр (частичный ввод допускается). */
export function ruPhoneFormatFromCanonical(canonical: string): string {
  if (!canonical) return "";
  if (!canonical.startsWith("7")) return canonical;
  const n = canonical.slice(1);
  if (n.length === 0) return "+7";
  let o = "+7 (";
  o += n.slice(0, Math.min(3, n.length));
  if (n.length <= 3) return n.length === 3 ? `${o}) ` : o;
  o += ") " + n.slice(3, Math.min(6, n.length));
  if (n.length <= 6) return o;
  o += "-" + n.slice(6, Math.min(8, n.length));
  if (n.length <= 8) return o;
  return o + "-" + n.slice(8, 10);
}

/** Значение поля после ввода: нормализация + маска. */
export function ruPhoneFormatInput(raw: string): string {
  return ruPhoneFormatFromCanonical(ruPhoneToCanonicalDigits(raw));
}

const MOBILE_RE = /^79\d{9}$/;

/** Пусто или полный российский мобильный 79… */
export function ruPhoneIsValidOptional(formatted: string): boolean {
  const c = ruPhoneToCanonicalDigits(formatted);
  if (c.length === 0) return true;
  return MOBILE_RE.test(c);
}

/** Для письма / API: пусто или +7XXXXXXXXXX. */
export function ruPhoneToPayload(formatted: string): string {
  const c = ruPhoneToCanonicalDigits(formatted);
  if (!c) return "";
  if (!MOBILE_RE.test(c)) return formatted.trim();
  return `+${c}`;
}
