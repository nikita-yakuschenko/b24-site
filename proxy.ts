import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * В проекте нет "use server" / Server Actions (форма → POST /api/contact).
 * Боты шлют POST с заголовком next-action и мусорными id ("x", "z", хеши) —
 * Next.js логирует "Failed to find Server Action". Отвечаем 404 до обработчика.
 */
export function proxy(request: NextRequest) {
  if (request.method === "POST" && request.headers.has("next-action")) {
    return new NextResponse(null, { status: 404 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|icon.svg|.*\\.(?:svg|png|ico)$).*)"],
};
