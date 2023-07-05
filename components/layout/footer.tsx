import KingdomLogo from "../../assets/icons/thekingdom-white.svg";
import { Container } from "../util/container";

export const Footer = ({ rawData }) => {
  return (
    <footer
      className={`bg-gradient-to-br footer-main relative flex min-h-[240px] flex-col items-center justify-end `}
    >
      <div className="font-sans flex justify-center pb-4">
        <div className="flex">
        <KingdomLogo className="scale-75 sm:scale-100"></KingdomLogo>
        <small className="block self-center overflow-hidden pl-1 ml-2 text-sm text-white md:text-base">
          <span className="inline-block transform-gpu transition-transform delay-300 duration-500 ease-quart-out">
            &copy; All Rights Reserved 2023
          </span>
        </small>
        </div>
        
      </div>
      <div >
        <a
          href="https://the-kingdom.world/terms"
          className="font-sans sm:mx-6 mt-1 sm:mt-3 text-[10px] sm:text-xs text-white"
        >
          Terms & Conditions
        </a>
        <a
          href="https://the-kingdom.world/privacy"
          className="font-sans sm:mx-6 mt-1 mx-5 sm:mt-3 text-[10px] sm:text-xs text-white"
        >
          Privacy policy
        </a>
        </div>
    </footer>
  );
};
