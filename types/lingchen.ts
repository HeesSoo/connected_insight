import { StaticImageData } from "next/image";

export interface LingchenItem {
  uuid: string;
  name: string;
  image: string | StaticImageData;
  description_ko?: string;
  description_en?: string;
  index?: number;
  [key: string]: any;
}
