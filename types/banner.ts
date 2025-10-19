import { StaticImageData } from "next/image";

export interface MainBanner {
  image: string | StaticImageData;
  index: number;
  name: string;
  uuid: string;
}
