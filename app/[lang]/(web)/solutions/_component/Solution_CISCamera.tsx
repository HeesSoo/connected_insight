"use client";

import Card from "@/components/Card";
import MotionWrapper from "@/components/MotionWrapper";
import { useTranslationStore } from "@/stores/translationStore";
import { Solution, SolutionItem } from "@/types/solution";
import { getYouTubeEmbedUrl } from "@/lib/youtube";
import Image from "next/image";

export default function SolutionCISCamera({ data }: { data: Solution }) {
    const { currentLanguage } = useTranslationStore();
    const safeEmbedUrl = getYouTubeEmbedUrl(data.link || "");

    console.log("cis data:::", data);

    return (
        <div className="mt-20 max-md:mt-14">
            <div className="w-full flex gap-4 mb-20 max-md:block">
                <div className="w-[470px] max-md:w-full max-md:mb-6">
                    <div className="mb-2 text-ePrimary font-semibold text-titleSmall max-md:mb-1 max-md:text-base">
                        {data.caption}
                    </div>
                    <h2 className="text-h3 text-g950 font-bold max-md:text-large">
                        {data[`name${currentLanguage === "ko" ? "" : "_en"}`]}
                        {/* Introducing the CIS Cameras
                        <br />
                        and Applications. */}
                    </h2>
                </div>

                <div className="flex-1 max-md:w-[calc(100%+32px)] max-md:-ml-4">
                    {safeEmbedUrl ? (
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
                    )}

                    {data.file && data.file.s3_url && (
                        <div className="w-full h-[590px] text-white flex justify-center items-center max-md:h-[212px] mt-6">
                            <Image
                                src="https://eyeon-bucket-pjt.s3.ap-northeast-2.amazonaws.com/solution/Solution-Lingchen_1.png"
                                alt={data.name}
                                width={1920}
                                height={400}
                                className="w-full h-[590px] max-md:h-[212px] object-cover"
                            />
                        </div>
                    )}
                </div>
            </div>

            {data?.solutions?.length > 0 ? (
                <MotionWrapper
                    delay={200}
                    duration={0.8}
                    direction="up"
                    amount={0}
                >
                    <div className="grid grid-cols-3 gap-x-4 gap-y-20 max-md:grid-cols-1 max-md:gap-y-12">
                        {data?.solutions?.map((item, index) => (
                            <Card
                                key={index}
                                item={{
                                    ...item,
                                    name: item?.[`name_${currentLanguage}`],
                                }}
                            />
                        ))}
                    </div>
                </MotionWrapper>
            ) : (
                <div className="w-full h-[300px] text-gray-500 text-center flex flex-col justify-center">
                    CIS Application이 존재하지 않습니다.
                </div>
            )}
        </div>
    );
}
