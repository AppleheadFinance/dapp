// -----------------------------------------------
export interface ImageProps {
  src?: StaticImageData | string;
  alt?: string;
  width?: number;
  height?: number;
  mode?: "intrinsic" | "fill";
  oFit?: "cover" | "contain" | "none" | "fill";
  quality?: string | number;
  loadOption?: "lazy" | "eager" | undefined;
  oPosition?: "top" | "bottom" | "right" | "left" | "initial";
  priority?: boolean;
  [key: string]: any;
}
export interface ImagePlaceholderProps {
  placeholder?: "empty" | "blur";
  blurDataURL?: string;
}
