"use client";

import { startTransition, useEffect, useId, useState } from "react";
import { useSearchParams } from "next/navigation";
import { IconBrandTelegram, IconLoader2, IconSend } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { ruPhoneFormatInput } from "@/lib/ru-phone";

type Props = {
  recipientEmail: string;
  siteUrl: string;
};

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-300 focus:ring-2 focus:ring-slate-300/40 aria-invalid:border-red-400 aria-invalid:ring-red-200/50";

function prefillLineFromPackageQuery(raw: string): string {
  let label: string;
  try {
    label = decodeURIComponent(raw);
  } catch {
    label = raw;
  }
  const trimmed = label.trim();
  if (/^enterprise$/i.test(trimmed)) {
    return `Enterprise внедрение, Битрикс24.\n`;
  }
  return `пакет «${label}»\n`;
}

export function ContactRequestForm({ recipientEmail, siteUrl }: Props) {
  const formId = useId();
  const searchParams = useSearchParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [showMailFallback, setShowMailFallback] = useState(false);

  const packageFromUrl = searchParams.get("package");
  useEffect(() => {
    if (!packageFromUrl) return;
    const line = prefillLineFromPackageQuery(packageFromUrl);
    startTransition(() => {
      setMessage(line);
    });
  }, [packageFromUrl]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setShowMailFallback(false);
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          message,
          _honeypot: (e.currentTarget.elements.namedItem("_honeypot") as HTMLInputElement)?.value,
        }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        errors?: Record<string, string>;
        error?: string;
      };

      if (res.status === 422 && data.errors) {
        setErrors(data.errors);
        return;
      }

      if (!res.ok || !data.ok) {
        setShowMailFallback(true);
        return;
      }

      setDone(true);
    } catch {
      setShowMailFallback(true);
    } finally {
      setSubmitting(false);
    }
  }

  const mailtoFallback = `mailto:${recipientEmail}?subject=${encodeURIComponent(`Заявка с ${siteUrl}`)}&body=${encodeURIComponent(
    [
      `Имя: ${name}`,
      `Email: ${email.trim() || "—"}`,
      `Телефон: ${phone.trim() || "—"}`,
      "",
      "Комментарий:",
      message.trim() || "—",
    ].join("\n"),
  )}`;

  if (done) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-medium text-slate-900">
          Заявку получили — наши менеджеры уже взяли её в работу и скоро свяжутся с
          Вами.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-slate-600">
          Подписывайтесь на наш Telegram-канал, чтобы быть в курсе новостей: там мы
          рассказываем про бизнес, автоматизации, нейросети, тренды и многое другое.
        </p>
        <Button
          render={
            <a
              href="https://t.me/moduleteam"
              target="_blank"
              rel="noopener noreferrer"
            />
          }
          nativeButton={false}
          size="lg"
          className="mt-5 w-full"
        >
          <IconBrandTelegram className="size-4" data-icon="inline-start" />
          module.team в Telegram
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <form id={formId} className="space-y-4" onSubmit={onSubmit} noValidate>
        {/* Honeypot: скрыто от людей, боты часто заполняют */}
        <input
          type="text"
          name="_honeypot"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          className="sr-only"
          defaultValue=""
        />

        <div>
          <label htmlFor={`${formId}-name`} className="sr-only">
            Имя (обязательно)
          </label>
          <input
            id={`${formId}-name`}
            name="name"
            className={inputClass}
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            maxLength={120}
            placeholder="Имя"
            required
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? `${formId}-err-name` : undefined}
          />
          {errors.name ? (
            <p id={`${formId}-err-name`} className="mt-1 text-xs text-red-600">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div className="space-y-1">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor={`${formId}-email`} className="sr-only">
              Email
            </label>
            <input
              id={`${formId}-email`}
              name="email"
              type="email"
              className={inputClass}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              placeholder="Email"
              aria-invalid={
                errors.contact || errors.email ? true : undefined
              }
              aria-describedby={
                [errors.contact && `${formId}-err-contact`, errors.email && `${formId}-err-email`]
                  .filter(Boolean)
                  .join(" ") || undefined
              }
            />
            {errors.email ? (
              <p id={`${formId}-err-email`} className="mt-1 text-xs text-red-600">
                {errors.email}
              </p>
            ) : null}
          </div>
          <div>
            <label htmlFor={`${formId}-phone`} className="sr-only">
              Телефон
            </label>
            <input
              id={`${formId}-phone`}
              name="phone"
              type="tel"
              inputMode="tel"
              className={inputClass}
              value={phone}
              onChange={(e) => setPhone(ruPhoneFormatInput(e.target.value))}
              autoComplete="tel"
              maxLength={22}
              placeholder="+7 (___) ___-__-__"
              aria-invalid={
                errors.contact || errors.phone ? true : undefined
              }
              aria-describedby={
                [errors.contact && `${formId}-err-contact`, errors.phone && `${formId}-err-phone`]
                  .filter(Boolean)
                  .join(" ") || undefined
              }
            />
            {errors.phone ? (
              <p id={`${formId}-err-phone`} className="mt-1 text-xs text-red-600">
                {errors.phone}
              </p>
            ) : null}
          </div>
        </div>
        {errors.contact ? (
          <p
            id={`${formId}-err-contact`}
            className="text-xs text-red-600"
            role="alert"
          >
            {errors.contact}
          </p>
        ) : null}
        </div>

        <div>
          <label htmlFor={`${formId}-message`} className="sr-only">
            Комментарий (необязательно)
          </label>
          <textarea
            id={`${formId}-message`}
            name="message"
            rows={5}
            className={`${inputClass} min-h-[120px] resize-y`}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Кратко опишите задачу или вопрос (по желанию)"
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? `${formId}-err-message` : undefined}
          />
          {errors.message ? (
            <p id={`${formId}-err-message`} className="mt-1 text-xs text-red-600">
              {errors.message}
            </p>
          ) : null}
        </div>

        {showMailFallback ? (
          <p className="text-sm text-slate-600" role="alert">
            Не удалось отправить заявку через форму. Напишите на{" "}
            <a className="font-medium text-brand underline" href={mailtoFallback}>
              {recipientEmail}
            </a>
            .
          </p>
        ) : null}

        <div className="mt-2 flex w-full justify-center">
          <Button
            type="submit"
            disabled={submitting}
            size="lg"
            className="w-1/2"
          >
            {submitting ? (
              <IconLoader2
                className="size-4 animate-spin"
                data-icon="inline-start"
              />
            ) : (
              <IconSend className="size-4" data-icon="inline-start" />
            )}
            Отправить заявку
          </Button>
        </div>
      </form>
    </div>
  );
}
