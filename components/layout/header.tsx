import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import OrnamentLeft from '../../assets/icons/ornament-top-left.svg';
import OrnamentRight from '../../assets/icons/ornament-top-right.svg';
import { Container } from "../util/container";

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
    <div  className="sticky-position background-header" // ${headerColorCss}
    >
      <div className="mt-10">
      <OrnamentLeft className="absolute left-6"></OrnamentLeft>
      <OrnamentRight className="absolute right-6"></OrnamentRight>
      <div className="flex 3p-4 justify-between gap-10 items-center"> 
          <div className="flex-shrink ml-16 sm:ml-32 mt-2">
            <a href="https://the-kingdom.world/" target="_blank"><img src="https://the-kingdom.world/_nuxt/logo_2x.b97e82d7.webp"  className="h-16" /></a>
          </div>
          <div className="mr-16 sm:mr-32">
          <Link
            href={`/`}
            passHref
          >
            <div className="cursor-pointer">
              NEWS AND ARTICLES
            </div>

          </Link>
          </div>
          
        </div>
     <Container size="custom" className="py-0 relative z-10 max-w-8xl">
     </Container>
    </div>
  </div>
  );
};
