import React from "react";
import Link from "next/link";
import { Container } from "../util/container";
import KingdomLogo from '../../assets/icons/kingdom-logo.svg'


export const Footer = ({ rawData }) => {

  return (
    <footer className={`bg-gradient-to-br footer-main`}>
      <Container className="relative flex items-center h-screen" size="small">
        <div className="w-full -mt-20">
          <div className="flex justify-center">
            <div className="flex items-center">
              <KingdomLogo className="h-6"></KingdomLogo>
              <div className="font-sans ml-2">
                © All Rights Reserved 2022
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center mt-10 flex-wrap">
            <a href="https://the-kingdom.world/terms" className="font-sans mx-10 mt-4">Terms & Conditions</a>
            <a href="https://the-kingdom.world/privacy" className="font-sans mx-10 mt-4">Privacy policy</a>
          </div>
          
        </div>
      </Container>
    </footer>
  );
};
