import React from "react";
import "../styles.css";
import { useRouter } from "next/router";
import Script from "next/script";

const App = ({ Component, pageProps }) => {
  const router = useRouter();
  React.useEffect(() => {
    router.push(window.location.href);
  }, []);
  return (
    <>
      {/* Hotjar Tracking Code for Kingdom blo */}
      <Script
        dangerouslySetInnerHTML={{
          __html: `(function(h,o,t,j,a,r){ h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)}; h._hjSettings={hjid:3527485,hjsv:6}; a=o.getElementsByTagName('head')[0]; r=o.createElement('script');r.async=1; r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv; a.appendChild(r); })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
        }}
      ></Script>
      {/* Google tag (gtag.js) */}
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-L36PLLSPZ9"
      ></Script>
      <Script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-L36PLLSPZ9');`,
        }}
      ></Script>
      <Component {...pageProps} />
    </>
  );
};

export default App;
