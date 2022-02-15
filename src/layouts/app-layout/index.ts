//  to import from next
import dynamic from "next/dynamic";
//  to import from component
export { default as Header } from "./Header";
export const Footer = dynamic(() => import("./Footer"));