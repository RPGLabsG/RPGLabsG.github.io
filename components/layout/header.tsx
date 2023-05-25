import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Container } from "../util/container";
import { Icon } from "../util/icon";
import OrnamentLeft from '../../assets/icons/ornament-top-left.svg'
import OrnamentRight from '../../assets/icons/ornament-top-right.svg'

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
      className={`relative overflow-hidden `} // ${headerColorCss}
    >
      <OrnamentLeft class="absolute left-6 top-6"></OrnamentLeft>
      <OrnamentRight class="absolute right-6 top-6"></OrnamentRight>
      <Container size="custom" className="py-0 relative z-10 max-w-8xl">
        <div className="flex mt-2 p-4 justify-between items-center"> 
          <img src="https://the-kingdom.world/_nuxt/logo_2x.b97e82d7.webp"  className="h-20" />
          <div className="text-xs">
            NEWS AND ARTICLES
          </div>
        </div>
     
      </Container>
    </div>
  );
};
