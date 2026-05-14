import Image from "next/image";
import Link from "next/link";
import { IconRocket } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/90 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-2.5 md:gap-4 md:px-6 md:py-3">
        <div className="flex min-h-0 min-w-0 justify-start pr-1">
          <Link
            href="/"
            className="relative block h-9 w-full max-w-none sm:h-10"
            aria-label="module.team — на главную"
          >
            <Image
              src="/logo_lg.svg"
              alt=""
              fill
              className="object-contain object-left"
              sizes="(max-width: 640px) 75vw, (max-width: 1152px) 70vw, 900px"
            />
          </Link>
        </div>
        <div className="flex justify-end">
          <Button
            render={<a href="#contacts" />}
            nativeButton={false}
            size="lg"
          >
            <IconRocket className="size-4" data-icon="inline-start" />
            Заказать внедрение
          </Button>
        </div>
      </div>
    </header>
  );
}
