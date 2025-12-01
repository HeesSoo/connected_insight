"use client";

import { useTranslationStore } from "@/stores/translationStore";
import Image from "next/image";
import { Solution } from "@/types/solution";

export default function SolutionLingchen({ data }: { data: Solution }) {
  console.log(data);
  const { currentLanguage } = useTranslationStore();

  return (
    <div className="mt-20 flex gap-[200px]">
      <div>
        <div className="mt-[43px] max-w-[283px]">
          <h2 className="mb-2 text-ePrimary text-titleSmall font-semibold">{data.caption}</h2>
          <h3 className="text-g950 text-h3 font-bold">
            {data[`name${currentLanguage === "ko" ? "" : "_en"}`]}
            {/* Technology’s
            <br />
            Smart Manufacturing
            <br />
            Control Solutions */}
          </h3>
        </div>
      </div>

      <div className="flex-1">
        <div className="w-full h-[590px] text-white flex justify-center items-center">
          <Image src={data.file_url} alt={data.name} width={1920} height={400} className="w-full h-[590px] object-cover" />
        </div>

        <div className="h-0.5 w-full bg-g200 my-6"></div>

        <div className="text-g950 font-semibold text-titleSmall mb-6">
          {data[`title${currentLanguage === "ko" ? "" : "_en"}`]}
          {/* 4 Control Solution Frameworks for Industrial Automation */}
        </div>

        <div className="text-g950 font-[500] text-large whitespace-pre-wrap">
          {data[`description${currentLanguage === "ko" ? "" : "_en"}`]}
          {/* Lingchen Technology offers four industrial control solutions designed for smart manufacturing environments. From PC-based motion control and PC-based
          PLCs to dedicated motion controllers and third-party controller solutions, we provide a wide range of options.
          <br />
          <br />
          Each solution seamlessly integrates from the device layer to the information layer, maximizing both productivity and flexibility. With these
          solutions, enterprises can easily build optimized automation systems tailored to diverse manufacturing needs. */}
        </div>
      </div>
    </div>
  );
}
