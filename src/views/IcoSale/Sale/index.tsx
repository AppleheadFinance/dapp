import React, { useState, useEffect } from "react";
//  to import components
import Image from "next/image";
//  to import images
import USDT from "assets/images/sale/usdt.png";
import PurchaseContext from "context/PurchaseContext";
import Label from "elements/Label";
import { BN } from "@project-serum/anchor";
import {
  useConnection,
  useWallet,
  WalletProviderProps,
} from "@solana/wallet-adapter-react";

type Event = "connect" | "disconnect";

interface Phantom {
  on: (event: Event, callback: () => void) => void;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}

const Sale = () => {
  
  const [depositValue, setDepositValue] = useState(100);
  const [tokenPrice, setTokenPrice] = useState(0.1);
  
  const { purchase } = React.useContext<any>(PurchaseContext);
  const typeDepositeValue = (value: any) => {
    setDepositValue(value);
  };

  const { wallet, publicKey, sendTransaction } = useWallet();

  useEffect(() => {
    const currentTimeInSeconds=Math.floor(Date.now()/1000);
    const march_day = 1646082000; // March 1, UTC+3
    const period = 1296000; //15days
    if(currentTimeInSeconds < march_day) {
      setTokenPrice(0.1);
    } else if(currentTimeInSeconds >= march_day) {
      let cur_price = 0.125 + (Math.floor((currentTimeInSeconds - march_day) / period )) * 0.025;
      setTokenPrice(cur_price);
    }

  }, []);

  return (
    <div className="max-w-[1440px] m-auto">
      <div className="mt-10 mobile:mt-8 rounded-[80px] tablet:rounded-[20px] shadow-[0_10px_40px_rgba(101,18,141,0.15)] dark:shadow-[0_10px_40px_#78717b26] bordertr">
        
        <div className="flex flex-col py-20 tablet:pt-20 tablet:pb-[88px] mobile:py-[51px] px-[76px] tokentemp:px-[40px] mobile:px-4">
          <div>
            <div className="px-6 mobile:px-3 flex laptop:flex-col justify-between items-center laptop:space-y-4">
              <div className="laptop:self-start text-[20px] tablet:text-[15px] tokentemp:text-[13px] font-bold leading-[18px] tracking-[1px] text-[#333333] dark:text-green-50">
                Token price
              </div>
            </div>
            <div className="mt-4 tablet:mt-[10px] mobile:mt-2 flex flex-col place-items-center outline outline-1 outline-secondary dark:outline-gray-400 rounded-[30px] tablet:rounded-[15px] mobile:rounded-[10px] box-border">
              <div className="pt-8 tablet:pt-[25px] mobile:pt-[14px] pb-4 tablet:pb-[18px] mobile:pb-[10px]">
                <Label title="Token price" />
              </div>
              <div className="pb-6 tablet:pb-[25px] mobile:pb-[14px] flex place-items-center">
                <div className="mr-4 tokentemp:mr-[7px] tablet:w-[25px] tablet:h-[25px] mobile:w-[19px] mobile:h-[19px]">
                  <Image src={USDT} alt="USDT" width={41} height={41} />
                </div>
                <div className="text-[25px] tablet:text-[20px] tokentemp:text-[18px] mobilemedium:text-[14px] font-medium leading-[18px] mobile:leading-[21px] tracking-[1px] mobile:tracking-normal">
                  {tokenPrice}
                </div>
              </div>
            </div>
          </div>
          <div className="pt-14 tablet:pt-10 mobile:pt-8">
            <div className="px-6 mobile:px-3 flex laptop:flex-col justify-between items-center laptop:space-y-4">
              <div className="laptop:self-start text-[20px] tablet:text-[15px] tokentemp:text-[13px] font-bold leading-[18px] tracking-[1px] text-[#333333] dark:text-green-50">
                I want to buy
              </div>
              <div className="laptop:self-end flex space-x-[30px] tablet:space-x-[15px] mobile:space-x-[10px]">
                <Label title="Min:$20" />
                <Label title="Max:$100,000" />
              </div>
            </div>
            <div className="relative mt-4 tablet:mt-[10px] mobile:mt-2 flex items-center outline outline-1 outline-secondary dark:outline-gray-400 rounded-[30px] tablet:rounded-[15px] mobile:rounded-[10px] box-border">
              <div className="py-14 tablet:py-[45px] mobile:py-6 mx-auto flex place-items-center w-full">
                <input
                  type="number"
                  disabled={publicKey ? false : true}
                  value={depositValue}
                  className="outline-none text-[25px] tablet:text-[20px] tokentemp:text-[18px] mobilemedium:text-[14px] text-center bg-transparent font-medium leading-[18px] mobile:leading-[21px] tracking-[1px] w-full"
                  onChange={(e) => typeDepositeValue(e.target.value)}
                />
              </div>
              <div className="absolute flex right-[42px] mobile:right-4 place-items-center space-x-4 mobile:space-x-[7px]">
                <div className="tablet:w-[25px] tablet:h-[25px] mobile:w-[19px] mobile:h-[19px]">
                  <Image src={USDT} alt="USDT" width={41} height={41} />
                </div>
                <Label title="USDT" />
              </div>
            </div>
          </div>
          
          <button
            disabled={publicKey ? false : true}
            className="self-center mt-12 tablet:mt-10 mobile:mt-8 btn btn-primary rounded-[32px] tablet:rounded-[20px] mobile:rounded-[13px] hover:opacity-80 text-[25px] tablet:text-[20px] mobile:text-[13px] text-white w-6/12 h-[98px] tablet:h-[76px] tokentemp:h-[70px] mobile:h-[50px]"
            onClick={() => purchase(depositValue)}
          >
            BUY
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sale;
