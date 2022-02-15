import React from "react";

const Footer = () => {
  return (
    <div className="mt-[20px] tablet:mt-[30px] mobile:mt-[30px] py-5 mobile:py-[20px] tablet:px-8 tablet:pb-8 " style={{backgroundColor: '#36414f'}}>
      <div style={{textAlign: 'center', color: 'white', paddingBottom: 20}}>
        <a href="https://www.youtube.com/channel/UCh6IHH7uhYIwBj5nENSh_uw" target="_blank" rel="noopener" title="YouTube" style={{color: 'white', textDecorationLine: 'none'}}>YouTube</a> | <a href="https://twitter.com/Applehead_token" target="_blank" rel="noopener" title="Twitter" style={{color: 'white', textDecorationLine: 'none'}}>Twitter</a> | <a href="https://discord.gg/f9yG6Pgk" target="_blank" rel="noopener" title="Discord" style={{color: 'white', textDecorationLine: 'none'}}>Discord</a> | <a href="https://linkedin.com/company/applehead-finance" target="_blank" rel="noopener" title="LinkedIn" style={{color: 'white', textDecorationLine: 'none'}}>LinkedIn</a> | <a href="mailto:info@applehead.finance" target="_blank" rel="noopener" title="E-mail" style={{color: 'white', textDecorationLine: 'none'}}>E-mail</a> | <a href="https://t.me/applehead_token" target="_blank" rel="noopener" title="Telegram" style={{color: 'white', textDecorationLine: 'none'}}>Telegram</a> | <a href="https://explorer.solana.com/address/9BYwEQ3aEDmnXaF8t4mPLCfRCiGzBBVPWcZAL6KYJxRx" target="_blank" rel="noopener" title="Solana Explorer" style={{color: 'white', textDecorationLine: 'none'}}>Solana Explorer</a>
      </div>
      <div className="tablet:text-normalmobile text-white" style={{textAlign: 'center', fontSize: 12}}>
        Copyright &copy; {new Date().getFullYear()} Applehead Limited<br />All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
