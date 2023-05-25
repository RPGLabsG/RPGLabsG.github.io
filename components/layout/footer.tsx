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
              <KingdomLogo class="h-6"></KingdomLogo>
              <div className="font-sans ml-2">
                © All Rights Reserved 2022
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center mt-10">
            <a href="" className="font-sans mx-10">Terms & Conditions</a>
            <a href="" className="font-sans mx-10">Cookies</a>
            <a href="" className="font-sans mx-10">Privacy policy</a>
          </div>
          
        </div>
      </Container>
    </footer>
  );
};
