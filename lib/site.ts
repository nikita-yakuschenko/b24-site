import { ruPhoneFormatFromCanonical } from "@/lib/ru-phone";

/** Публичный URL сайта (продакшен). Для превью задайте в .env NEXT_PUBLIC_SITE_URL */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://b24.module.team";

/** Отображаемое имя компании */
export const siteName = "module.team";

/** Партнёрский код Bitrix24 — ко всем ссылкам на www.bitrix24.ru добавляется ?p=… */
const BITRIX24_PARTNER_ID = "16972552";

/** Ссылка на bitrix24.ru с партнёрским параметром (path: «/», «/prices/», «/create.php» и т.д.). */
export function bitrix24RuUrl(path: string = "/"): string {
  const normalized =
    path === "" || path === "/"
      ? "/"
      : path.startsWith("/")
        ? path
        : `/${path}`;
  const url = new URL(normalized, "https://www.bitrix24.ru");
  url.searchParams.set("p", BITRIX24_PARTNER_ID);
  return url.href;
}

const ADDRESS_MAPS_QUERY = "Нижний Новгород, улица Маршала Баграмяна, 1";
const PHONE_CANON = "79306705970";

export const contacts = {
  /** Две строки: город и улица (разделитель \n — в разметке нужен whitespace-pre-line). */
  address: "город Нижний Новгород\nулица Маршала Баграмяна, 1",
  mapsUrl: `https://yandex.ru/maps/?text=${encodeURIComponent(ADDRESS_MAPS_QUERY)}`,
  phone: `+${PHONE_CANON}`,
  phoneDisplay: ruPhoneFormatFromCanonical(PHONE_CANON),
  email: "sales@module.team",
} as const;
