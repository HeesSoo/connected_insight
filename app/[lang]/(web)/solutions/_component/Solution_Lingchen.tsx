"use client";

import { useTranslationStore } from "@/stores/translationStore";
import Image from "next/image";
import { Solution } from "@/types/solution";
import { getYouTubeEmbedUrl } from "@/lib/youtube";

export default function SolutionLingchen({ data }: { data: Solution }) {
    const { currentLanguage } = useTranslationStore();

    const safeEmbedUrl = getYouTubeEmbedUrl(data.link || "");

    return (
        <div className="mt-20 flex gap-[200px] max-md:flex-col max-md:gap-6 max-md:mt-14">
            <div>
                <div className="mt-[43px] max-w-[283px] max-md:mt-0 max-md:max-w-full">
                    <h2 className="mb-2 text-ePrimary text-titleSmall font-semibold max-md:text-base max-md:mb-1">
                        {data.caption}
                    </h2>
                    <h3 className="text-g950 text-h3 font-bold max-md:text-large">
                        {data[`name${currentLanguage === "ko" ? "" : "_en"}`]}
                    </h3>
                </div>
            </div>

            <div className="flex-1">
                {data.link !== "" ? (
                    safeEmbedUrl ? (
                        <div className="relative w-full aspect-video">
                            <iframe
                                className="absolute top-0 left-0 w-full h-full"
                                src={safeEmbedUrl}
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            />
                        </div>
                    ) : (
                        <div className="w-full aspect-video flex items-center justify-center bg-gray-100 text-gray-500">
                            유효하지 않은 YouTube URL입니다.
                        </div>
                    )
                ) : null}
                <div className="w-full h-[590px] text-white flex justify-center items-center max-md:h-[212px]">
                    <Image
                        src={data.file_url}
                        alt={data.name}
                        width={1920}
                        height={400}
                        className="w-full h-[590px] max-md:h-[212px] object-cover"
                    />
                </div>

                <div className="h-0.5 w-full bg-g200 my-6"></div>

                <div className="text-g950 font-semibold text-titleSmall mb-6 max-md:text-base max-md:leading-5 max-md:mb-5">
                    {data[`title${currentLanguage === "ko" ? "" : "_en"}`]}
                    {/* 4 Control Solution Frameworks for Industrial Automation */}
                </div>

                <div className="text-g950 font-[500] text-large whitespace-pre-wrap max-md:text-base max-md:leading-5">
                    {
                        data[
                            `description${
                                currentLanguage === "ko" ? "" : "_en"
                            }`
                        ]
                    }
                </div>
            </div>
        </div>
    );
}
