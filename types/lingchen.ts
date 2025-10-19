import { StaticImageData } from "next/image";

export interface LingchenItem {
  uuid: string;
  name: string;
  description_ko: string;
  description_en: string;
  index: number;
  image: string | StaticImageData;
}
