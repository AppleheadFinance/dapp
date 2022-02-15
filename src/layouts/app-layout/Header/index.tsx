import React from "react";
//  to import views
import { Navbar } from "views";

const Header = () => {
  return (
    <div
      className={``} style={{backgroundColor: '#36414f'}}
    >
      <div className="max-w-[1440px] m-auto ">
        <Navbar />
      </div>
    </div>
  );
};

export default Header;
