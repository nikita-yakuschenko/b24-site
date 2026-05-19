import { Suspense } from "react";
import {
  IconExternalLink,
  IconRocket,
  IconSparkles,
} from "@tabler/icons-react";
import { Bitrix24Logo } from "@/components/bitrix24-logo";
import { ContactRequestForm } from "@/components/contact-request-form";
import { Button } from "@/components/ui/button";
import { bitrix24RuUrl, contacts, siteUrl } from "@/lib/site";
import { cn } from "@/lib/utils";

const pillars = [
  {
    title: "Внедрение Битрикс24 под ваш бизнес",
    text: "Настраиваем CRM не по шаблону, а под реальные процессы компании: воронки, сделки, задачи, права доступа, автоматизацию и контроль работы команды.",
  },
  {
    title: "Все заявки — в одной системе",
    text: "Подключаем сайт, телефонию, почту, мессенджеры и рекламные каналы, чтобы обращения не терялись, а менеджеры видели всю историю клиента.",
  },
  {
    title: "Поддержка и развитие после запуска",
    text: "Обучаем сотрудников, дорабатываем сценарии, настраиваем отчёты и помогаем развивать Битрикс24 вместе с ростом компании.",
  },
] as const;

const productBlocks: {
  id: string;
  title: string;
  lead: string;
  items: { h: string; p: string }[];
}[] = [
  {
    id: "crm",
    title: "CRM",
    lead: "Телефония, почта, соцсети, реклама, склад, оплата и доставка — в одной карточке сделки.",
    items: [
      {
        h: "Воронки продаж",
        p: "Лиды, сделки, КП, история касаний — всё, что нужно отделу продаж и сервису.",
      },
      {
        h: "Маркетинг",
        p: "Рассылки, кампании, сквозная аналитика — измеряем каналы, а не гадаем.",
      },
      {
        h: "Коммерция",
        p: "Остатки, счета, оплата из диалога — меньше ручных переключений между системами.",
      },
    ],
  },
  {
    id: "tasks",
    title: "Задачи и проекты",
    lead: "Канбан, Гант, скрам, шаблоны и роботы — чтобы проекты не «терялись в чатах».",
    items: [
      {
        h: "Таск-менеджер",
        p: "Задачи, сроки, статусы и канбан в одном окне — команда видит прогресс без таблиц и лишних созвонов.",
      },
      {
        h: "Роли и права доступа",
        p: "Кто ставит задачи, кто видит поля, сделки и отчёты: права по ролям и отделам, без режима «все видят всё».",
      },
      {
        h: "Шаблоны задач",
        p: "Типовые процессы описываете один раз — дальше копируете в проект и запускаете роботов на события, без ручного копипаста.",
      },
    ],
  },
  {
    id: "collab",
    title: "Совместная работа",
    lead: "Коммуникации, документы и процессы в одном контуре — полноценный онлайн-офис.",
    items: [
      {
        h: "Мессенджер",
        p: "Чаты, открытые линии, внешние пользователи, файлы и уведомления без разрозненных мессенджеров.",
      },
      {
        h: "Видеозвонки HD",
        p: "Качество видео и аудио, групповые звонки до 48 человек. Старт из задачи, календаря или ленты.",
      },
      {
        h: "Учёт времени",
        p: "Рабочий день и отчёты в один клик — прозрачная загрузка команды без Excel-таблиц.",
      },
    ],
  },
  {
    id: "sites",
    title: "Сайты и лидогенерация",
    lead: "Конструктор внутри CRM: посетитель → лид → ответственный без ручного переноса.",
    items: [
      {
        h: "Связка с CRM",
        p: "Заявки сразу в очереди менеджеров, со сквозной аналитикой.",
      },
      {
        h: "Скорость и SEO",
        p: "Структура и Core Web Vitals — база для органического трафика.",
      },
      {
        h: "Адаптив",
        p: "Один контур для десктопа, планшета и мобильных клиентов.",
      },
    ],
  },
  {
    id: "auto",
    title: "Автоматизация",
    lead: "Роботы, бизнес-процессы и RPA — согласования и рутина без кастомного бэкенда.",
    items: [
      {
        h: "Роботы и триггеры",
        p: "Смена стадий, задачи, письма, SMS, напоминания — по событиям CRM и задач.",
      },
      {
        h: "Бизнес-процессы",
        p: "Отпуска, договоры, счета — визуальные цепочки согласований.",
      },
      {
        h: "RPA / канбан-согласования",
        p: "Документ проходит по ролям с уведомлениями и SLA.",
      },
    ],
  },
];

const partnerPlans: {
  price: string;
  period?: string;
  name: string;
  /** Описание одной строкой; если задан `descBullets`, в карточке показывается только список. */
  desc: string;
  /** Тезисы вместо абзаца `desc`. */
  descBullets?: readonly string[];
  featured?: boolean;
  /** Короткое имя тарифа лицензии (бейдж над ценой, справа). */
  bitrixTariff?: string;
  /** Одна строка про почасовую кастомизацию (между описанием и кнопкой). */
  customization?: string;
}[] = [
  {
    price: "19 999 руб.",
    name: "Базовое внедрение",
    desc: "",
    descBullets: [
      "Разворачивание портала.",
      "Добавление сотрудников.",
      "Настройка ролей и прав.",
      "Базовые настройки.",
    ],
    bitrixTariff: "Базовый",
    customization: "Кастомизация — 3 500 руб./час",
  },
  {
    price: "49 999 руб.",
    name: "Стандартное внедрение",
    desc: "",
    descBullets: [
      "Всё из базового внедрения.",
      "«Задачи и проекты» — настройка под процессы.",
      "«Автоматизация» — базовый уровень.",
      "Обучение команды.",
    ],
    bitrixTariff: "Стандартный",
    customization: "Кастомизация — 3 500 руб./час",
    featured: true,
  },
  {
    price: "99 999 руб.",
    name: "Профессиональное внедрение",
    desc: "",
    descBullets: [
      "Всё из стандартного внедрения.",
      "Цифровые рабочие места.",
      "Смарт-процессы.",
      "Базы знаний.",
      "Базовая BI-аналитика.",
    ],
    bitrixTariff: "Профессиональный",
    customization: "Кастомизация — 5 000 руб./час",
  },
];

const specialization = [
  {
    title: "Инфраструктура",
    text: "Хостинг, домены, почта. Обновления, базовый мониторинг.",
  },
  {
    title: "1С и учёт",
    text: "Управленческий и складской учёт. Контрагенты, номенклатура, заказы, оплаты — по типовым или доработанным конфигурациям.",
  },
  {
    title: "Ниши и процессы",
    text: "Торговля, услуги, производство — воронки, поля и статусы под ваши бизнес-процессы, с глубокой кастомизацией.",
  },
  {
    title: "Автоматизация",
    text: "Бизнес-процессы и смарт-процессы, роботы и триггеры в задачах, проектах и сделках. Существующие и кастомные интеграции с внешними сервисами.",
  },
] as const;

const advantages = [
  {
    title: "Порядок в проекте",
    text: "Состав работ и критерии приёмки фиксируем заранее: что делаем, в каком порядке, что считаем готово — без размытых «потом доделаем».",
  },
  {
    title: "Реалистично про Битрикс24",
    text: "Отделяем настройку из коробки от доработок и интеграций. Не обещаем то, что платформа не потянет или вылезет бюджетом в неожиданный момент.",
  },
  {
    title: "После запуска",
    text: "Доработки по согласованию, обучение, разбор сбоев и вопросов в работе CRM — не пропадаем после запуска.",
  },
] as const;

const steps = [
  {
    n: "01",
    title: "Предпроект",
    text: "Интервью, карта процессов, гипотезы по эффекту для бизнеса и по рискам.",
  },
  {
    n: "02",
    title: "Аудит",
    text: "Текущие системы, данные, интеграции — фиксируем базовую линию.",
  },
  {
    n: "03",
    title: "Проектирование",
    text: "Воронки, поля, роли, роботы, обучение — в спецификации и смете.",
  },
  {
    n: "04",
    title: "Внедрение и запуск",
    text: "Настройка, перенос данных, опытная эксплуатация, обучение, перевод в промышленную эксплуатацию и усиленная поддержка сразу после запуска.",
  },
] as const;

const card =
  "rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:border-slate-300 hover:shadow-md sm:p-9";
const cardSm =
  "rounded-xl border border-slate-200 bg-slate-50/90 p-5 transition hover:border-slate-300 hover:bg-white";

/** Ссылка на официальное описание возможностей (с партнёрским p=). */
function Bitrix24FeaturesDocLink({ className }: { className?: string }) {
  return (
    <p
      className={[
        "max-w-3xl text-base text-slate-600",
        className ?? "",
      ].join(" ")}
    >
      <a
        href={bitrix24RuUrl("/features/")}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-sky-800 no-underline hover:text-sky-950 hover:no-underline"
      >
        <span>Подробное описание возможностей </span>
        <span className="whitespace-nowrap">
          на{"\u00a0"}
          <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-300/80 bg-sky-100/90 px-2.5 py-0.5 align-middle text-base font-medium leading-snug text-sky-900 no-underline">
            bitrix24.ru
            <IconExternalLink
              className="size-4 shrink-0 text-sky-800"
              aria-hidden
            />
          </span>
        </span>
      </a>
    </p>
  );
}

export function LandingContent() {
  return (
    <main>
      <section
        id="hero"
        className="relative min-h-[min(85vh,920px)] overflow-hidden border-b border-slate-200"
      >
        {/* Фон без внешних URL — иначе Next тянет Unsplash и может дать timeout */}
        <div
          className="absolute inset-0 bg-linear-to-br from-slate-100 via-white to-slate-200/95"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_15%_-5%,rgba(2,132,199,0.1),transparent_50%),radial-gradient(ellipse_70%_45%_at_85%_5%,rgba(163,230,53,0.14),transparent_48%)]"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-white/82 backdrop-blur-[2px]"
          aria-hidden
        />
        <div className="bg-tech-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden />
        <div className="relative mx-auto flex max-w-6xl flex-col justify-center px-4 py-24 sm:min-h-[min(85vh,920px)] sm:px-6 sm:py-28">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Бизнес-партнёр
          </p>
          <h1 className="mt-4 flex max-w-4xl flex-col items-start gap-1.5">
            <Bitrix24Logo className="h-9 w-auto shrink-0 text-slate-900 sm:h-11 md:h-12" />
            <span className="text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl md:text-5xl md:leading-snug">
              помогает бизнесу работать
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Единый сервис со всем необходимым для организации работы компании, ведения
            продаж, работы с клиентами и маркетинга.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button
              render={<a href="#contacts" />}
              nativeButton={false}
              size="lg"
            >
              <IconRocket className="size-4" data-icon="inline-start" />
              Заказать внедрение
            </Button>
            <a
              href="#product"
              className="group text-sm font-semibold text-slate-700 transition-colors duration-300 ease-out hover:text-slate-900"
            >
              <span className="relative inline-block pb-0.5">
                Возможности платформы
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 rounded-full bg-current opacity-80 transition-transform duration-300 ease-out motion-reduce:scale-x-100 motion-reduce:transition-none group-hover:scale-x-100"
                />
              </span>
            </a>
          </div>
          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:grid-rows-[auto_auto_1fr] sm:gap-x-5 sm:items-stretch">
            {pillars.map((p) => (
              <article
                key={p.title}
                className={cn(
                  card,
                  "flex flex-col",
                  "sm:row-span-3 sm:grid sm:grid-rows-subgrid sm:gap-0",
                )}
              >
                <div className="mb-3 h-0.5 w-7 shrink-0 bg-lime-500" aria-hidden />
                <h2 className="text-balance text-base font-bold leading-snug text-slate-900">
                  {p.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:self-start">
                  {p.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="product"
        className="scroll-mt-20 border-b border-slate-200 bg-white"
      >
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
          <p className="font-sans text-xs uppercase tracking-[0.25em] text-brand">
            Платформа
          </p>
          <h2 className="mt-3 flex flex-wrap items-center gap-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            <Bitrix24Logo className="h-7 w-auto text-slate-900 sm:h-9" />
            <span>возможности платформы</span>
          </h2>
          <p className="mt-5 max-w-3xl text-lg text-slate-600">
            Один контур вместо десятка разрозненных сервисов: готовые модули, REST API,
            on-premise и облако — мы подбираем редакцию и топологию под нагрузку и
            отрасль.
          </p>
          <div className="mt-14 sm:mt-16">
            <Bitrix24FeaturesDocLink className="mb-10 sm:mb-12" />
            <div className="space-y-24">
              {productBlocks.map((block) => (
                <div key={block.id} id={block.id} className="scroll-mt-24">
                  <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">
                    {block.title}
                  </h3>
                  <p className="mt-2 max-w-3xl text-slate-600">{block.lead}</p>
                  <ul className="mt-8 grid gap-5 md:grid-cols-3">
                    {block.items.map((item) => (
                      <li key={item.h} className={cardSm}>
                        <h4 className="font-semibold text-slate-900">{item.h}</h4>
                        <p className="mt-2 text-sm leading-relaxed text-slate-600">
                          {item.p}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <Bitrix24FeaturesDocLink className="mt-10 sm:mt-12" />
          </div>
        </div>
      </section>

      <section
        id="tariffs"
        className="scroll-mt-20 border-b border-slate-200 bg-slate-50"
      >
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
          <p className="font-sans text-xs uppercase tracking-[0.25em] text-brand">
            Лицензирование
          </p>
          <h2 className="mt-3 flex flex-wrap items-center gap-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            <Bitrix24Logo className="h-7 w-auto text-slate-900 sm:h-9" />
            <span>тарифы</span>
          </h2>
          <p className="mt-5 max-w-3xl text-lg text-slate-600">
            Актуальная сетка и сравнение редакций — на стороне вендора. Мы помогаем
            выбрать тариф по числу пользователей, диску и нужным модулям.
          </p>
          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm leading-relaxed text-slate-600">
              После короткого созвона фиксируем состав лицензий и работ по внедрению —
              без скрытых опций и «обязательных» модулей.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Button
                render={
                  <a
                    href={bitrix24RuUrl("/prices/")}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
                nativeButton={false}
                size="lg"
              >
                <IconExternalLink className="size-4" data-icon="inline-start" />
                Сравнить тарифы на bitrix24.ru
              </Button>
              <Button
                variant="outline"
                render={
                  <a
                    href={bitrix24RuUrl("/create.php")}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
                nativeButton={false}
                size="lg"
              >
                <IconSparkles className="size-4" data-icon="inline-start" />
                Попробовать бесплатно
              </Button>
            </div>
          </div>

          <h3 className="mt-20 text-xl font-bold text-slate-900 sm:text-2xl">
            Пакеты внедрения
          </h3>
          <p className="mt-3 max-w-3xl text-slate-600">
            Лицензия + настройка под ваш сценарий. Условия и сроки — в договоре после этапа
            предпроекта.
          </p>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {partnerPlans.map((plan) => (
              <article
                key={plan.name}
                className={`relative flex flex-col rounded-2xl border p-6 shadow-sm ${
                  "featured" in plan && plan.featured
                    ? "border-lime-400/80 bg-lime-50/60 ring-2 ring-lime-400/25"
                    : "border-slate-200 bg-white"
                }`}
              >
                {plan.bitrixTariff ? (
                  <span className="absolute right-6 top-6 z-1 inline-flex max-w-[min(100%,14rem)] rounded-full border border-slate-200/90 bg-slate-100/90 px-2 py-0.5 text-xs font-medium text-slate-600">
                    Битрикс24: {plan.bitrixTariff}
                  </span>
                ) : null}
                <p
                  className={cn(
                    "font-sans text-3xl font-bold text-slate-900",
                    plan.bitrixTariff && "mt-7 sm:mt-8",
                  )}
                >
                  {plan.price}
                  {plan.period ? (
                    <span className="text-base font-normal text-slate-500">
                      {plan.period}
                    </span>
                  ) : null}
                </p>
                <h4 className="mt-4 text-lg font-semibold text-slate-900">{plan.name}</h4>
                {plan.descBullets?.length ? (
                  <ul className="mt-2 flex-1 list-disc space-y-2 pl-4 text-sm leading-snug text-slate-600 marker:text-slate-400">
                    {plan.descBullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                    {plan.desc}
                  </p>
                )}
                {plan.customization ? (
                  <div className="mt-8 rounded-lg border border-slate-200/90 bg-slate-50/90 px-4 py-3 text-center">
                    <p className="text-sm font-medium leading-snug text-slate-700">
                      {plan.customization}
                    </p>
                  </div>
                ) : null}
                <Button
                  render={
                    <a
                      href={`?package=${encodeURIComponent(plan.name)}#contacts`}
                      aria-label={`Заказать пакет «${plan.name}»`}
                    />
                  }
                  nativeButton={false}
                  variant={
                    "featured" in plan && plan.featured ? "default" : "outline"
                  }
                  size="lg"
                  className={cn(
                    "w-full",
                    plan.customization ? "mt-8" : "mt-10",
                  )}
                >
                  <IconRocket className="size-4" data-icon="inline-start" />
                  Заказать
                </Button>
              </article>
            ))}
          </div>

          <div className="mt-6 w-full lg:mt-8">
            <article className="flex w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:flex-row sm:items-stretch">
              <div className="flex w-full shrink-0 flex-col justify-center px-4 py-5 sm:w-fit sm:px-5 sm:py-5">
                <p className="text-left font-sans text-xl font-bold leading-tight text-slate-900 sm:text-2xl">
                  Стоимость: по запросу
                </p>
              </div>

              <div
                className="relative hidden shrink-0 self-stretch sm:block sm:w-px"
                aria-hidden
              >
                <div className="absolute left-0 top-5 bottom-5 w-px bg-slate-200" />
              </div>

              <div className="flex min-w-0 flex-1 flex-col gap-3 border-t border-slate-200 px-4 py-3 sm:border-t-0 sm:flex-row sm:items-center sm:justify-between sm:gap-5 sm:px-5 sm:py-4">
                <div className="min-w-0 sm:flex-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <p className="text-sm font-semibold leading-snug text-slate-900">
                      Enterprise внедрение
                    </p>
                    <span className="inline-flex max-w-full shrink-0 rounded-full border border-slate-200/90 bg-slate-100/90 px-2 py-0.5 text-xs font-medium leading-none text-slate-600">
                      Битрикс24: Enterprise
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-snug text-slate-600 sm:text-sm">
                    Для определения стоимости необходимо проведение стратегической сессии.
                  </p>
                </div>
                <Button
                  render={
                    <a
                      href={`?package=${encodeURIComponent("Enterprise")}#contacts`}
                      aria-label="Заказать Enterprise внедрение, тариф Битрикс24"
                    />
                  }
                  nativeButton={false}
                  variant="outline"
                  size="default"
                  className="w-full shrink-0 sm:w-auto"
                >
                  <IconRocket className="size-4" data-icon="inline-start" />
                  Заказать
                </Button>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section
        id="specialization"
        className="scroll-mt-20 border-b border-slate-200 bg-white"
      >
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Специализация
          </h2>
          <p className="mt-4 w-full max-w-none text-base leading-relaxed text-slate-600 sm:text-lg">
            Зоны, в которых чаще всего подключаемся. Периметр и смету всё равно фиксируем
            отдельно — здесь просто ориентир, с чем обычно приходят.
          </p>
          <div className="mt-10 w-full border-t border-slate-200">
            {specialization.map((item) => (
              <div
                key={item.title}
                className="grid grid-cols-1 gap-2 border-b border-slate-200 py-5 last:border-b-0 sm:grid-cols-[minmax(0,240px)_minmax(0,1fr)] sm:items-start sm:gap-x-10 sm:gap-y-0 sm:py-6 md:grid-cols-[minmax(0,260px)_minmax(0,1fr)] md:gap-x-12 lg:gap-x-16"
              >
                <h3 className="text-sm font-semibold text-slate-900 sm:pt-0.5 md:text-base">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600 md:text-base md:leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="advantages"
        className="scroll-mt-20 border-b border-slate-200 bg-slate-50"
      >
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Почему мы
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {advantages.map((a, i) => (
              <div
                key={a.title}
                className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
              >
                <span className="font-sans text-xs font-semibold tabular-nums text-slate-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-base font-semibold text-slate-900">{a.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="steps"
        className="scroll-mt-20 border-b border-slate-200 bg-white"
      >
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
          <p className="font-sans text-xs uppercase tracking-[0.25em] text-brand">
            Процесс
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
            Как выглядит внедрение
          </h2>

          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:items-stretch">
            {steps.map((s) => (
              <li
                key={s.n}
                className="flex h-full min-h-0 flex-col rounded-2xl border border-slate-200 bg-slate-50/80 p-6 shadow-sm transition hover:border-slate-300 hover:bg-white"
              >
                <span className="font-sans text-sm font-bold text-brand">{s.n}</span>
                <h3 className="mt-2 font-semibold text-slate-900">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        id="contacts"
        className="scroll-mt-20 relative overflow-hidden border-b border-slate-200 bg-slate-100"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(2,132,199,0.08),transparent)]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
          <p className="font-sans text-xs uppercase tracking-[0.25em] text-brand">
            Связь
          </p>
          <div className="mt-3 grid gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                Обсудим ваш проект
              </h2>
              <p className="mt-5 max-w-2xl text-lg text-slate-600">
                {"Расскажите кратко о\u00a0задаче — предложим формат созвона и\u00a0следующий шаг без\u00a0навязанных продаж."}
              </p>
              <div className="mt-10 space-y-5 text-sm">
                <p>
                  <span className="font-sans text-[10px] uppercase tracking-widest text-slate-500">
                    Адрес
                  </span>
                  <a
                    href={contacts.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block whitespace-pre-line text-base font-medium text-slate-900 transition hover:text-brand"
                  >
                    {contacts.address}
                  </a>
                </p>
                <p>
                  <span className="font-sans text-[10px] uppercase tracking-widest text-slate-500">
                    Телефон
                  </span>
                  <a
                    href={`tel:${contacts.phone}`}
                    className="mt-1 block text-base font-medium text-slate-900 transition hover:text-brand"
                  >
                    {contacts.phoneDisplay}
                  </a>
                </p>
                <p>
                  <span className="font-sans text-[10px] uppercase tracking-widest text-slate-500">
                    Email
                  </span>
                  <a
                    href={`mailto:${contacts.email}`}
                    className="mt-1 block text-base font-medium text-brand hover:underline"
                  >
                    {contacts.email}
                  </a>
                </p>
              </div>
            </div>
            <Suspense fallback={null}>
              <ContactRequestForm
                recipientEmail={contacts.email}
                siteUrl={siteUrl}
              />
            </Suspense>
          </div>
        </div>
      </section>
    </main>
  );
}
