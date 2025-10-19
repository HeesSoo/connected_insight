"use client";

import { SolutionItem } from "@/types/solution";
import { useState } from "react";

import AlternativeImg from "@/public/common/alternativeImg.png";
import { useTranslationStore } from "@/stores/translationStore";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

interface MainSolutionProps {
    data: SolutionItem[];
}

export default function MainSolution({ data }: MainSolutionProps) {
    const { currentLanguage } = useTranslationStore();

    const [swiper, setSwiper] = useState<SwiperClass>();

    const handlePrev = () => {
        swiper?.slidePrev();
    };
    const handleNext = () => {
        swiper?.slideNext();
    };

    return (
        <div>
            <h2 className="font-bold text-xl text-g950 mb-[58px]">CIS Application</h2>

            {(!data || data.length === 0) ? (
                <div className="w-full flex">
                    <div className="flex justify-center items-center flex-1 bg-[#EFEFEF] w-full h-[474px]">
                        <Image src={AlternativeImg} alt="Alternative Image" width={849} height={474} className="w-[444px] h-[auto] object-cover" />
                    </div>
                    <div className="w-[591px] bg-g50 px-12 py-20 flex flex-col justify-between">
                        <h3 className="g-950 text-[32px] leading-[48px] tracking-[-0.2px] font-bold">Alternative</h3>
                        <div>
                            <div className="mb-6">
                                <div className="text-ePrimary text-base mb-1 font-[500]">핵심 검사 대상</div>
                                <div className={`text-large text-g950 font-[600]`}>Alternative</div>
                            </div>
                            <div>
                                <div className="text-ePrimary text-base mb-1 font-[500]">주요 가치</div>
                                <div className={`text-large text-g950 font-[600]`}>Alternative</div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="relative h-[474px]">
                    <Swiper
                        modules={[Navigation]}
                        onSwiper={(e) => {
                            setSwiper(e);
                        }}
                        className="mainCisSwiper"
                    >
                        {data.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className="w-full flex">
                                    <div className="flex-1">
                                        <Image src={item.image} alt={item.name} width={849} height={474} className="w-full h-[474px] object-cover" />
                                    </div>
                                    <div className="w-[591px] bg-g50 px-12 py-20 flex flex-col justify-between">
                                        <h3 className="g-950 text-[32px] leading-[48px] tracking-[-0.2px] font-bold">{item.name}</h3>

                                        <div>
                                            {item.core_inspector_target_ko && (
                                                <div className="mb-6">
                                                    <div className="text-ePrimary text-base mb-1 font-[500]">핵심 검사 대상</div>
                                                    <div className={`text-large text-g950 font-[600]`}>{item?.[`core_inspector_target_${currentLanguage}`]}</div>
                                                </div>
                                            )}
                                            {item.core_value_ko && (
                                                <div>
                                                    <div className="text-ePrimary text-base mb-1 font-[500]">주요 가치</div>
                                                    <div className={`text-large text-g950 font-[600]`}>{item?.[`core_value_${currentLanguage}`]}</div>
                                                </div>
                                            )}
                                        </div>
                                        {/* {currentLanguage === "ko" && (
                                            <div>
                                                {item.core_inspector_target_ko && (
                                                    <div className="mb-6">
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
                                            <div>
                                                {item.core_inspector_target_en && (
                                                    <div className="mb-6">
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
                                        )} */}
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <button className="absolute top-1/2 -translate-y-[50%] -left-24 w-12 h-12 rounded-full bg-ePrimary flex justify-center items-center cursor-pointer" onClick={handlePrev}>
                        <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.23063 17.4808L10.8116 15.854L5.08275 10.1252H23.25V7.87516H5.08275L10.8116 2.14628L9.23063 0.519531L0.75 9.00016L9.23063 17.4808Z" fill="white" />
                        </svg>
                    </button>
                    <button className="absolute top-1/2 -translate-y-[50%] -right-24 w-12 h-12 rounded-full bg-ePrimary flex justify-center items-center cursor-pointer" onClick={handleNext}>
                        <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.7694 17.4808L13.1884 15.854L18.9173 10.1252H0.75V7.87516H18.9173L13.1884 2.14628L14.7694 0.519531L23.25 9.00016L14.7694 17.4808Z" fill="white" />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
}
