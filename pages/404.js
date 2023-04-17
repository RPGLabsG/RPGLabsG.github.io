import React from "react";
import Head from "next/head";
import { Header } from "../components/layout/header";
import { Footer } from "../components/layout/footer";
import { Theme } from "../components/layout/theme";
import layoutData from "../content/global/index.json";
const rawData = {};

export default function FourOhFour() {
  return (
    
    <>
      <Head>
        <title>The Kingdom Blog</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        {layoutData.theme.font === "nunito" && (
          <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
              href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400;0,700;0,800;1,400;1,700;1,800&display=swap"
              rel="stylesheet"
            />
          </>
        )}
        {layoutData.theme.font === "lato" && (
          <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
              href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&display=swap"
              rel="stylesheet"
            />
          </>
        )}
        <script type="text/javascript">
          {`    
          var l = window.location;
          l.replace(window.location.href);
        `}
        </script>
      </Head>
      <Theme data={layoutData?.theme}>
        <div
          className={`min-h-screen flex flex-col ${
            layoutData.theme.font === "nunito" && "font-nunito"
          } ${layoutData.theme.font === "lato" && "font-lato"} ${
            layoutData.theme.font === "sans" && "font-sans"
          }`}
        >
          <Header data={layoutData?.header} />
          <div className="flex-1 text-gray-800 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-1000 flex flex-col">
          </div>
          <Footer
            rawData={rawData}
            data={layoutData?.footer}
            icon={layoutData?.header.icon}
          />
        </div>
      </Theme>
    </>
  );
}
