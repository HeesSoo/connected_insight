import { StaticImageData } from "next/image";

export interface Solution {
    uuid: string;
    name: string;
    name_en: string;
    caption?: string;
    image: string;
    title?: string;
    title_en?: string;
    description?: string;
    description_en?: string;
    category: string;
    link?: string;
    file_url?: string;
    file?: {
        s3_url?: string;
    };
    index: number;
    solutions?: SolutionItem[];
}

export interface SolutionItem {
    uuid: string;
    name: string;
    image: string;
    core_inspector_target_ko?: string;
    core_inspector_target_en?: string;
    core_value_ko?: string;
    core_value_en?: string;
    index: number;
    [key: string]: any;
}
