import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Container } from "../util/container";
import { Icon } from "../util/icon";

export const Header = () => {
  const router = useRouter();





  // If we're on an admin path, other links should also link to their admin paths
  const [prefix, setPrefix] = React.useState("");

  React.useEffect(() => {
    if (window && window.location.pathname.startsWith("/admin")) {
      setPrefix("/admin");
    }
  }, []);

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-b  bg-white `} // ${headerColorCss}
    >
      <Container size="custom" className="py-0 relative z-10 max-w-8xl">
      <img src="https://the-kingdom.world/_nuxt/logo_2x.b97e82d7.webp"  className="h-14" />
       Test header
      </Container>
    </div>
  );
};
