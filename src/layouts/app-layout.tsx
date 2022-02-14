import React, { useState, useEffect, useMemo } from "react";
//  to support from next
import { useRouter } from "next/router";
//  to import layouts
import { Header, Footer} from "./app-layout/index";
//  to import contexts
import FlagContext from "context/FlagContext";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();

  const [flag, setFlag] = useState(true);

  useEffect(() => {
    if (router.route === "/ico-sale") setFlag(false);
    else setFlag(true);
  }, [router.route]);

  const [visible, setVisible] = useState(false);
  const visibleVal = useMemo(() => ({ visible, setVisible }), [visible]);

  return (
    <div>
      <FlagContext.Provider value={visibleVal}>
        <Header />
        <div className="custom">{children}</div>
        <Footer />
      </FlagContext.Provider>
    </div>
  );
};

export default Layout;
