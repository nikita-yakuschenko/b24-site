import { contacts } from "@/lib/site";
import { ModuleTeamLogo } from "@/components/module-team-logo";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:flex-row sm:items-start sm:justify-between sm:px-6">
        <div>
          <ModuleTeamLogo className="h-8 w-auto" />
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-600">
            Внедрение Bitrix24, интеграции и сопровождение · {year}
          </p>
        </div>
        <div className="flex flex-col gap-3 text-sm sm:text-right">
          <a
            className="whitespace-pre-line font-medium text-slate-700 transition hover:text-brand"
            href={contacts.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {contacts.address}
          </a>
          <a
            className="font-medium text-brand hover:underline"
            href={`mailto:${contacts.email}`}
          >
            {contacts.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
