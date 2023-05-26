import React from "react";
import Head from "next/head";
import { Header } from "./header";
import { Footer } from "./footer";
import layoutData from "../../content/global/index.json";
import { Theme } from "./theme";

export const Layout = ({ rawData = {}, data = layoutData, children }) => {
  return (
    <>
      <Head>
        <title>The Kingdom Blog</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=""></link>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet"></link>
        <link rel="icon" type="image/png" href="/favicon.png"></link>
      </Head>
      <Theme >
        <div
          className={`min-h-screen flex flex-col font-serif`}
        >
          <Header  />
          <div className="flex-1 text-gray-800 bg-trasnparent flex flex-row">
            {children}
          </div>
          <Footer
            rawData={rawData}
          />
        </div>
      </Theme>
    </>
  );
};
