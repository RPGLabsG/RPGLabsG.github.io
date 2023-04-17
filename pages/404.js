import { Hero } from "../components/blocks/hero";
import { Layout } from "../components/layout";

export default function FourOhFour(pageProps) {
  return (
    <Layout>
      <Hero
        data={{
          color: "default",
          headline: "404 – Page Not Found",
          text: "Oops! It seems there's nothing here, how embarrassing." + {pageProps},
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
