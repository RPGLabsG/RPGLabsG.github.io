import KingdomLogo from '../../assets/icons/thekingdom-white.svg';
import { Container } from "../util/container";


export const Footer = ({ rawData }) => {

  return (
    <footer className={`bg-gradient-to-br footer-main relative flex min-h-[240px] flex-col items-center justify-end`}>
          <div className="flex justify-center pb-4">
          <a href="https://the-kingdom.world/terms" className="font-sans sm:mx-6 mt-4 text-[10px] sm:text-xs text-white">Terms & Conditions</a>
              <KingdomLogo className="scale-50 sm:scale-75"></KingdomLogo>
            <a href="https://the-kingdom.world/privacy" className="font-sans sm:mx-6 mt-4 text-[10px] sm:text-xs text-white">Privacy policy</a>

          </div>
    </footer>
  );
};
