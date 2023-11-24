import React from "react";
import "../styles.css";
import { useRouter } from "next/router";
import Script from "next/script";
import Head from 'next/head';

const App = ({ Component, pageProps }) => {
  const router = useRouter();
  React.useEffect(() => {
    router.push(window.location.href);
  }, []);
  return (
    <>
      {/* Google Tag manager */}
      <Head>
      <script dangerouslySetInnerHTML={{
        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-NQCZZRWJ');`,
        
      }} />
    </Head>
      <div
      dangerouslySetInnerHTML={{
        __html: `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NQCZZRWJ"
                  height="0" width="0" style="display:none;visibility:hidden"></iframe>
                </noscript>`,
      }}
      />
      
      <Component {...pageProps} />
    </>
  );
};

export default App;
