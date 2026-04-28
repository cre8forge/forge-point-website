import Script from "next/script";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

/**
 * Placed inside <head> in layout.tsx.
 * 1. Initialises dataLayer + Google Consent Mode v2 synchronously.
 *    Consent defaults to "denied" until the user accepts the cookie banner.
 *    If the user previously accepted, consent is restored from localStorage.
 * 2. Loads the GTM container script asynchronously (afterInteractive).
 */
export function GTMHead() {
  if (!GTM_ID) return null;

  return (
    <>
      {/* Consent Mode v2 — must run before GTM */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent','default',{
              ad_storage:'denied',
              ad_user_data:'denied',
              ad_personalization:'denied',
              analytics_storage:'denied',
              wait_for_update:500
            });
            (function(){
              var c = localStorage.getItem('fp_consent');
              if(c==='all'){
                gtag('consent','update',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'granted'});
              } else if(c==='analytics'){
                gtag('consent','update',{analytics_storage:'granted'});
              }
            })();
          `,
        }}
      />

      {/* GTM loader */}
      <Script
        id="gtm"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`,
        }}
      />
    </>
  );
}

/**
 * Placed immediately after <body> opening tag in layout.tsx.
 * Fallback for browsers with JavaScript disabled.
 */
export function GTMBody() {
  if (!GTM_ID) return null;
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  );
}
