import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { siteName, siteUrl } from "@/lib/site";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — внедрение и интеграции Bitrix24`,
    template: `%s · ${siteName}`,
  },
  description:
    "module.team: проектирование и внедрение Bitrix24, интеграции с 1С и внешними сервисами, роботы, воронки, обучение команды.",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: siteUrl,
    siteName,
    title: `${siteName} — Bitrix24`,
    description:
      "Инженерный подход к CRM: от аудита процессов до запуска, метрик и сопровождения.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${geist.variable} h-full font-sans antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
