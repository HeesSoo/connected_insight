import AlternativeImg from "@/public/common/alternativeImg.png";
import { useTranslationStore } from "@/stores/translationStore";
import { SolutionItem } from "@/types/solution";
import Image from "next/image";

export default function Card({ item }: { item: SolutionItem }) {
    const { currentLanguage } = useTranslationStore();

    return (
        <div>
            <div className="w-full">
                {/* 이미지 영역 */}
                <div className={`relative mb-5`}>
                    <Image src={item.image || AlternativeImg} alt={item.name} width={469} height={352} className="w-auto h-[352px] object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-6 left-6">
                        <div className="text-g200 text-base mb-1">Case 0{item.index + 1}</div>
                        <h3 className={`font-[600] text-white text-titleSmall`}>{item.name}</h3>
                    </div>
                </div>

                {/* 콘텐츠 영역 */}
                {currentLanguage === "ko" && (
                    <div className="flex flex-col h-[170px] justify-between">
                        {item.core_inspector_target_ko && (
                            <div>
                                <div className="text-ePrimary text-base mb-1 font-[500]">핵심 검사 대상</div>
                                <div className={`text-large text-g950 font-[600]`}>{item.core_inspector_target_ko}</div>
                            </div>
                        )}
                        {item.core_value_ko && (
                            <div>
                                <div className="text-ePrimary text-base mb-1 font-[500]">주요 가치</div>
                                <div className={`text-large text-g950 font-[600]`}>{item.core_value_ko}</div>
                            </div>
                        )}
                    </div>
                )}

                {currentLanguage === "en" && (
                    <div className="flex flex-col h-[170px] justify-between">
                        {item.core_inspector_target_en && (
                            <div>
                                <div className="text-ePrimary text-base mb-1 font-[500]">핵심 검사 대상</div>
                                <div className={`text-large text-g950 font-[600]`}>{item.core_inspector_target_en}</div>
                            </div>
                        )}
                        {item.core_value_en && (
                            <div>
                                <div className="text-ePrimary text-base mb-1 font-[500]">주요 가치</div>
                                <div className={`text-large text-g950 font-[600]`}>{item.core_value_en}</div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
