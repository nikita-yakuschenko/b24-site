import Script from "next/script";

// Публичный ID; переопределение: NEXT_PUBLIC_YM_ID в .env.local / на хостинге
const DEFAULT_COUNTER_ID = "109217108";

export function YandexMetrika() {
  const id = (process.env.NEXT_PUBLIC_YM_ID ?? DEFAULT_COUNTER_ID).trim();
  const idNum = Number.parseInt(id, 10);
  if (!Number.isFinite(idNum) || idNum <= 0) {
    return null;
  }

  const tagSrc = `https://mc.yandex.ru/metrika/tag.js?id=${idNum}`;

  return (
    <>
      <Script id="yandex-metrika" strategy="afterInteractive">
        {`(function(m,e,t,r,i,k,a){
          m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
        })(window, document,'script',${JSON.stringify(tagSrc)}, 'ym');

        ym(${idNum}, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
        `}
      </Script>
      <noscript>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element -- пиксель Метрики */}
          <img
            src={`https://mc.yandex.ru/watch/${idNum}`}
            style={{ position: "absolute", left: "-9999px" }}
            alt=""
          />
        </div>
      </noscript>
    </>
  );
}
