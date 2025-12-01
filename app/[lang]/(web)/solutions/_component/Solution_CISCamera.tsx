"use client";

import Card from "@/components/Card";
import { useTranslationStore } from "@/stores/translationStore";
import { Solution, SolutionItem } from "@/types/solution";
import { getYouTubeEmbedUrl } from "@/utils/youtube";
import { Fade } from "react-awesome-reveal";

export default function SolutionCISCamera({ data }: { data: Solution }) {
  const { currentLanguage } = useTranslationStore();
  const safeEmbedUrl = getYouTubeEmbedUrl(data.link || "");

  console.log(data);

  return (
    <div className="mt-20">
      <div className="w-full flex gap-4 mb-20">
        <div className="w-[470px]">
          <div className="mb-2 text-ePrimary font-semibold text-titleSmall">{data.caption}</div>
          <h2 className="text-h3 text-g950 font-bold">
            {data[`name${currentLanguage === "ko" ? "" : "_en"}`]}
            {/* Introducing the CIS Cameras
                        <br />
                        and Applications. */}
          </h2>
        </div>

        <div className="flex-1 h-[538px]">
          {safeEmbedUrl ? (
            <iframe
              className="w-full h-full"
              src={safeEmbedUrl}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
              유효하지 않은 YouTube URL입니다.
            </div>
          )}
        </div>
      </div>

      {data?.solutions?.length > 0 ? (
        <div className="grid grid-cols-3 gap-x-4 gap-y-20">
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
      ) : (
        <div className="w-full h-[300px] text-gray-500 text-center flex flex-col justify-center">CIS Application이 존재하지 않습니다.</div>
      )}
    </div>
  );
}
