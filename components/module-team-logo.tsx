import Image from "next/image";

type Props = {
  className?: string;
  priority?: boolean;
};

/** Логотип module.team (тёмная версия для светлого интерфейса) */
export function ModuleTeamLogo({ className, priority }: Props) {
  return (
    <Image
      src="/module_team_dark.svg"
      alt="module.team"
      width={300}
      height={287}
      priority={priority}
      className={className ?? "h-8 w-auto"}
    />
  );
}
