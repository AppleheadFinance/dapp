//  to import from next
import dynamic from "next/dynamic";

// landingpage
export const Navbar = dynamic(() => import("./Navbar"));

// ico-sale
export const Sale = dynamic(() => import("./IcoSale/Sale"));
