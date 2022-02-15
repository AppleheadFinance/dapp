import React, { useContext } from "react";
//  to import from next
import { useRouter } from "next/router";
//  to import data
import { menuItem } from "utils/temp/menuItem";
//  to import images
import Logo from "assets/images/header/Applehead-logo.png";
import FlagContext from "context/FlagContext";
//  to import from module
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Image from "next/image";
import { IoIosMenu } from "react-icons/io";
import { FaTimes } from "react-icons/fa";

const Navbar = () => {
  const router = useRouter();
  const { visible, setVisible } = useContext<any>(FlagContext);

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
          <div
            className="tablet:w-[48px] tablet:h-[24px] first:flex hidden cursor-pointer"
            onClick={() => setVisible(!visible)}
          >
            {!visible && (
              <IoIosMenu fontSize={35} className="text-white" />
            )}
            {visible && <FaTimes fontSize={30} className="text-white" />}
          </div>
          <WalletMultiButton className="first:hidden walletbtn transition duration-500 ease-in-out btn-outline rounded-none px-8 ml-24 border border-secondary tablet:text-normal mobile:text-normalmobile tablet:leading-5 mobile:leading-3 font-bold tracking-widest" />
        </div>
      </div>
      {visible && (
        <div className="hidden first:flex flex-col w-full ">
          <div className="mobile:absolute mobile:top-[80px] self-end">
            <WalletMultiButton className="walletbtn transition duration-500 ease-in-out btn-outline rounded-none px-8 border border-secondary tablet:text-normal mobile:text-normalmobile font-bold tracking-widest" />
          </div>
          <div className="pb-[20px] flex flex-col space-y-[30px] mobile:space-y-[26px]">
            {menuItem.map((item, index) => (
              <div
                key={index}
                className={`text-white`}
                onClick={() => {
                  router.push(item.path);
                  setVisible(!visible);
                }}
              >
                {item.title}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
