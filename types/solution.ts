import { StaticImageData } from "next/image";

export interface SolutionItem {
    uuid: string;
    name: string;
    core_inspector_target_ko: string;
    core_inspector_target_en: string;
    core_value_ko: string;
    core_value_en: string;
    index: number;
    image: string | StaticImageData;
}
