import dynamic from "next/dynamic";

// landingpage
export const Container = dynamic(() => import("./Container"));

//  ico-sale
export const Label = dynamic(() => import("./Label"));
