import { Hero } from "../components/blocks/hero";
import { Layout } from "../components/layout";
import React from "react";
import { useRouter } from 'next/router'

export default function FourOhFour() {
  if (window.location.href === '/') {
    const router = useRouter();
    React.useEffect(()=>{
      router.push(window.location.href)
    },[])
  }
  return (
    <Layout>
      <Hero
        data={{
          color: "default",
          headline: "404 – Page Not Found",
          text: "Oops! It seems there's nothing here, how embarrassing.",
          actions: [
            {
              label: "Return Home",
              type: "button",
              icon: true,
              link: "/",
            },
          ],
        }}
      />
    </Layout>
  );
}
