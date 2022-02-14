import React, { useContext } from "react";
//  to import from next
import { useRouter } from "next/router";
//  to import data
import { menuItem } from "utils/temp/menuItem";
//  to import images
import NanoLogo from "assets/images/header/nano-logo.avif";
import Logo from "assets/images/header/Applehead-logo.png";
//  to import from module
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Image from "next/image";

const Navbar = () => {
  const router = useRouter();

  return (
    <div className="px-20 tablet:px-8">
      <div className="flex items-center justify-between py-2">
        <div className="">
          <Image
            src={Logo}
            width={200}
            height={50}
            onClick={() => router.push("/")}
            className="cursor-pointer"
          /> 
        </div>
        <div className="flex items-center">
          <div className="first:hidden flex items-center space-x-14">
            {menuItem.map((item, index) => (
              <div
                key={index}
                className={`pt-2 transition-all cursor-pointer tracking-widest text-white dark:text-white`}
                onClick={() => router.push(item.path)}
              >
                {item.title}
              </div>
            ))}
          </div>
          <WalletMultiButton className="first:hidden walletbtn transition duration-500 ease-in-out btn-outline rounded-none px-8 ml-24 border border-secondary tablet:text-normal mobile:text-normalmobile tablet:leading-5 mobile:leading-3 font-bold tracking-widest" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
