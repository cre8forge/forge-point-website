import Script from "next/script";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

/**
 * GTMHead — placed inside <head> in layout.tsx.
 *
 * Execution order (all synchronous before GTM loads):
 *  1. Initialize window.dataLayer and gtag()
 *  2. Set Consent Mode v2 defaults (all denied)
 *  3. Restore prior consent from localStorage
 *  4. Capture GCLID / GBRAID / WBRAID from URL and persist 90 days
 *  5. Load GTM container (async, afterInteractive)
 */
export function GTMHead() {
  if (!GTM_ID) return null;

  return (
    <>
      {/* ── Synchronous init — must run before GTM ── */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
(function(){
  /* 1 — dataLayer + gtag shim */
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  window.gtag = gtag;

  /* 2 — Consent Mode v2 defaults (all denied) */
  gtag('consent','default',{
    ad_storage:'denied',
    ad_user_data:'denied',
    ad_personalization:'denied',
    analytics_storage:'denied',
    wait_for_update:500
  });

  /* 3 — Restore prior consent */
  try {
    var c = localStorage.getItem('fp_consent');
    if(c==='all'){
      gtag('consent','update',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'granted'});
    } else if(c==='analytics'){
      gtag('consent','update',{analytics_storage:'granted'});
    }
  } catch(e){}

  /* 4 — GCLID / GBRAID / WBRAID capture (Google Ads attribution) */
  try {
    var p = new URLSearchParams(window.location.search);
    var gclidVal  = p.get('gclid');
    var gbraidVal = p.get('gbraid');
    var wbraidVal = p.get('wbraid');
    var clickId   = gclidVal || gbraidVal || wbraidVal;
    var clickType = gclidVal ? 'gclid' : (gbraidVal ? 'gbraid' : (wbraidVal ? 'wbraid' : null));
    if(clickId && clickType){
      var exp = Date.now() + 90*24*60*60*1000;
      localStorage.setItem('fp_gclid', JSON.stringify({value:clickId, type:clickType, expires:exp}));
      dataLayer.push({event:'gclid_captured', gclid_type:clickType, gclid_value:clickId});
    }
    /* Restore expired-check on existing stored GCLID */
    var stored = localStorage.getItem('fp_gclid');
    if(stored){
      var obj = JSON.parse(stored);
      if(obj.expires < Date.now()){
        localStorage.removeItem('fp_gclid');
      } else {
        dataLayer.push({gclid_type:obj.type, gclid_value:obj.value});
      }
    }
  } catch(e){}
})();
          `,
        }}
      />

      {/* ── GTM container (async) ── */}
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

/** GTMBody — immediately after <body> open tag. Fallback for no-JS environments. */
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
