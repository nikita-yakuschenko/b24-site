import {
  IconExternalLink,
  IconRocket,
  IconSparkles,
} from "@tabler/icons-react";
import { Bitrix24Logo } from "@/components/bitrix24-logo";
import { ContactRequestForm } from "@/components/contact-request-form";
import { Button } from "@/components/ui/button";
import { bitrix24RuUrl, contacts, siteUrl } from "@/lib/site";

const pillars = [
  {
    title: "Облачный стек",
    text: "Партнёрские компетенции по Bitrix24, Google Workspace, Asana, Freshworks и смежным B2B SaaS — единая точка ответственности.",
  },
  {
    title: "Инженерия процессов",
    text: "Сначала модель данных и роли, потом роботы и интеграции. Без «красивых слайдов» вместо работающей CRM.",
  },
  {
    title: "Продакшн-культура",
    text: "Документируем решения, версионируем настройки, передаём знания команде — чтобы платформа жила после запуска.",
  },
] as const;

const productBlocks: {
  id: string;
  title: string;
  lead: string;
  items: { h: string; p: string }[];
}[] = [
  {
    id: "collab",
    title: "Совместная работа",
    lead: "Коммуникации, документы и процессы в одном контуре — полноценный онлайн-офис.",
    items: [
      {
        h: "Видеозвонки HD",
        p: "Качество видео и аудио, групповые звонки до 48 человек. Старт из задачи, календаря или ленты.",
      },
      {
        h: "Мессенджер",
        p: "Чаты, открытые линии, внешние пользователи, файлы и уведомления без разрозненных мессенджеров.",
      },
      {
        h: "Учёт времени",
        p: "Рабочий день и отчёты в один клик — прозрачная загрузка команды без Excel-таблиц.",
      },
    ],
  },
  {
    id: "crm",
    title: "CRM",
    lead: "Телефония, почта, соцсети, реклама, склад, оплата и доставка — в одной карточке сделки.",
    items: [
      {
        h: "Воронка и сущности",
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
        h: "Методологии",
        p: "Канбан, диаграмма Ганта, списки и календарь — под разные типы работ.",
      },
      {
        h: "Роли и доступ",
        p: "Постановщик, исполнитель, соисполнитель, наблюдатель — гранулярные права.",
      },
      {
        h: "Автоматизация",
        p: "Шаблоны задач и проектов, роботы на события — меньше ручных повторов.",
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

const partnerPlans = [
  {
    price: "1 999 ₽",
    period: "/ мес.",
    name: "Внедрение «Базовый»",
    desc: "До 5 пользователей, 24 ГБ, базовая CRM, задачи и онлайн-офис.",
  },
  {
    price: "4 999 ₽",
    period: "/ мес.",
    name: "Внедрение «Стандартный»",
    desc: "До 50 пользователей, 100 ГБ, полный CRM-стек и управление.",
    featured: true,
  },
  {
    price: "9 999 ₽",
    period: "/ мес.",
    name: "Внедрение «Профессиональный»",
    desc: "До 100 пользователей, 1 ТБ, продвинутая автоматизация и крупные воронки.",
  },
] as const;

const specialization = [
  {
    title: "Инфраструктура",
    text: "10+ лет в веб и облаках: сотни проектов от лендингов до распределённых сервисов.",
  },
  {
    title: "1С и учёт",
    text: "Обмен с ERP, номенклатура, заказы — стыкуем Bitrix24 с привычным контуром 1С.",
  },
  {
    title: "Отраслевые сценарии",
    text: "Подбираем архитектуру под масштаб, регуляторику и бюджет — без лишней кастомизации.",
  },
  {
    title: "Автоматизация",
    text: "От простых роботов до цепочек согласований и интеграций с внешними API.",
  },
  {
    title: "Маркировка и compliance",
    text: "Учитываем требования к данным, ролям и журналированию при внедрении.",
  },
  {
    title: "Enterprise",
    text: "Права, отделы, интеграции и отказоустойчивые сценарии для крупных команд.",
  },
] as const;

const advantages = [
  {
    title: "Внедрение как продукт",
    text: "Чёткий бэклог, демо-итерации, приёмка по метрикам — не бесконечный проект «когда-нибудь».",
  },
  {
    title: "Архитекторы Bitrix24",
    text: "Знаем ограничения платформы и обходим типовые ловушки до того, как они встанут в проде.",
  },
  {
    title: "Сопровождение",
    text: "После запуска — доработки, обучение, разбор инцидентов и эволюция воронок.",
  },
] as const;

const steps = [
  {
    n: "01",
    title: "Discovery",
    text: "Интервью, карта процессов, гипотезы ROI и рисков.",
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
    title: "Delivery",
    text: "Настройка, миграция, пилот, обучение, go-live и гиперкара после запуска.",
  },
] as const;

const card =
  "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-300 hover:shadow-md";
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
        className="inline-flex items-center gap-1.5 font-medium text-brand hover:underline"
      >
        Подробное описание возможностей на bitrix24.ru
        <IconExternalLink className="size-4 shrink-0" aria-hidden />
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
          <div className="mt-20 grid gap-5 sm:grid-cols-3">
            {pillars.map((p) => (
              <article key={p.title} className={card}>
                <div className="mb-3 h-px w-8 bg-lime-500" aria-hidden />
                <h2 className="text-base font-semibold text-slate-900">{p.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{p.text}</p>
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
            Лицензия + настройка под ваш сценарий. Условия и сроки — в договоре после
            discovery-фазы.
          </p>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {partnerPlans.map((plan) => (
              <article
                key={plan.name}
                className={`flex flex-col rounded-2xl border p-6 shadow-sm ${
                  "featured" in plan && plan.featured
                    ? "border-lime-400/80 bg-lime-50/60 ring-2 ring-lime-400/25"
                    : "border-slate-200 bg-white"
                }`}
              >
                <p className="font-sans text-3xl font-bold text-slate-900">
                  {plan.price}
                  <span className="text-base font-normal text-slate-500">
                    {plan.period}
                  </span>
                </p>
                <h4 className="mt-4 text-lg font-semibold text-slate-900">{plan.name}</h4>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                  {plan.desc}
                </p>
                <Button
                  render={<a href="#contacts" />}
                  nativeButton={false}
                  variant={
                    "featured" in plan && plan.featured ? "default" : "outline"
                  }
                  size="lg"
                  className="mt-6 w-full"
                >
                  <IconRocket className="size-4" data-icon="inline-start" />
                  Заказать
                </Button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="specialization"
        className="scroll-mt-20 border-b border-slate-200 bg-white"
      >
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
          <p className="font-sans text-xs uppercase tracking-[0.25em] text-brand">
            Стек
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
            Специализация
          </h2>
          <p className="mt-5 max-w-3xl text-lg text-slate-600">
            От аудита до сопровождения — закрываем полный цикл вокруг Bitrix24 и смежных
            систем.
          </p>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {specialization.map((item) => (
              <li key={item.title} className={cardSm}>
                <h3 className="font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="advantages"
        className="scroll-mt-20 border-b border-slate-200 bg-slate-50"
      >
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
          <p className="font-sans text-xs uppercase tracking-[0.25em] text-brand">
            Подход
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
            Почему мы
          </h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {advantages.map((a) => (
              <div key={a.title}>
                <div className="mb-4 font-sans text-xs text-brand">{`//`}</div>
                <h3 className="text-lg font-semibold text-slate-900">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{a.text}</p>
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
          <ol className="mt-12 grid gap-5 md:grid-cols-2">
            {steps.map((s) => (
              <li
                key={s.n}
                className="flex gap-5 rounded-2xl border border-slate-200 bg-slate-50/80 p-6 shadow-sm"
              >
                <span className="font-sans text-2xl font-bold text-brand">{s.n}</span>
                <div>
                  <h3 className="font-semibold text-slate-900">{s.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{s.text}</p>
                </div>
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
            <ContactRequestForm
              recipientEmail={contacts.email}
              siteUrl={siteUrl}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
