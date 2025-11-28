"use client";

import Card from "@/components/Card";
import { useTranslationStore } from "@/stores/translationStore";
import { SolutionItem } from "@/types/solution";

export default function SolutionCISCamera({ data }: { data: SolutionItem[] }) {
    const { currentLanguage } = useTranslationStore();

    return (
        <div className="mt-20">
            <div className="w-full flex gap-4 mb-20">
                <div className="w-[470px]">
                    <div className="mb-2 text-ePrimary font-semibold text-titleSmall">
                        2025
                    </div>
                    <h2 className="text-h3 text-g950 font-bold">
                        Introducing the CIS Cameras
                        <br />
                        and Applications.
                    </h2>
                </div>

                <div className="flex-1 h-[538px]">
                    <iframe
                        className="w-full h-full"
                        src="https://www.youtube.com/embed/nuka-r5-fXQ"
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    />
                </div>
            </div>

            {data.length > 0 ? (
                <div className="grid grid-cols-3 gap-x-4 gap-y-20">
                    {data.map((item, index) => (
                        <Card
                            key={index}
                            item={{
                                ...item,
                                name: item?.[`name_${currentLanguage}`],
                            }}
                        />
                    ))}
                </div>
            ) : (
                <div className="w-full h-[300px] text-gray-500 text-center flex flex-col justify-center">
                    CIS Application이 존재하지 않습니다.
                </div>
            )}
        </div>
    );
}
