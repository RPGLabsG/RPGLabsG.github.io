import React from "react";
import Head from "next/head";
import { Header } from "./header";
import { Footer } from "./footer";
import { Theme } from "./theme";
import layoutData from "../../content/global/index.json";
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
          {`// If you're creating a Project Pages site and NOT using a custom domain,
          // then set pathSegmentsToKeep to 1 (enterprise users may need to set it to > 1).
          // This way the code will only replace the route part of the path, and not
          // the real directory in which the app resides, for example:
          // https://username.github.io/repo-name/one/two?a=b&c=d#qwe becomes
          // https://username.github.io/repo-name/?/one/two&a=b~and~c=d#qwe
          // Otherwise, leave pathSegmentsToKeep as 0.
          var pathSegmentsToKeep = 0;
    
          var l = window.location;
          l.replace(
            l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
            l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
            l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
            (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
            l.hash
          );`}
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
