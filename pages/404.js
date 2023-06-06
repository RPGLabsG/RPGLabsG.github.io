import { Hero } from "../components/blocks/hero";
import { Layout } from "../components/layout";

export default function FourOhFour() {
  return (
    <Layout>
      <Hero
        data={{
          color: "default",
          headline: "",
          text: "",
          actions: [
            {
              label: "",
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
