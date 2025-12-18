"use client";

import { SolutionItem } from "@/types/solution";
import { useState } from "react";

import { useTranslation } from "@/hooks/useTranslation";
import AlternativeImg from "@/public/common/alternativeImg.png";
import { useTranslationStore } from "@/stores/translationStore";
import Image from "next/image";
import "swiper/css";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import MotionWrapper from "@/components/MotionWrapper";

interface MainSolutionProps {
    data: SolutionItem[];
}

export default function MainSolution({ data }: MainSolutionProps) {
    const { t } = useTranslation();
    const { currentLanguage } = useTranslationStore();

    const [swiper, setSwiper] = useState<SwiperClass>();
    const [activeIndex, setActiveIndex] = useState(0);

    const handlePrev = () => {
        swiper?.slidePrev();
    };
    const handleNext = () => {
        swiper?.slideNext();
    };

    const handleSlideChange = (swiper: SwiperClass) => {
        setActiveIndex(swiper.activeIndex);
    };

    const goToSlide = (index: number) => {
        swiper?.slideTo(index);
    };

    return (
        <MotionWrapper delay={200} duration={0.8} direction="up" amount={0.05}>
            <h2 className="font-bold text-xl text-g950 mb-[58px] max-md:text-xl-mobile max-md:mb-6 ">
                CIS Application
            </h2>

            {!data || data.length === 0 ? (
                <div className="w-full flex">
                    <div className="flex justify-center items-center flex-1 bg-[#EFEFEF] w-full h-[474px]">
                        <Image
                            src={AlternativeImg}
                            alt="Alternative Image"
                            width={849}
                            height={474}
                            className="w-[444px] h-[auto] object-cover"
                        />
                    </div>
                    <div className="w-[591px] bg-g50 px-12 py-20 flex flex-col justify-between">
                        <h3 className="g-950 text-[32px] leading-[48px] tracking-[-0.2px] font-bold">
                            -
                        </h3>
                        <div>
                            <div className="mb-6">
                                <div className="text-ePrimary text-base mb-1 font-[500]">
                                    {t["solution-core-inspector-target"]}
                                </div>
                                <div
                                    className={`text-large text-g950 font-[600]`}
                                >
                                    -
                                </div>
                            </div>
                            <div>
                                <div className="text-ePrimary text-base mb-1 font-[500]">
                                    {t["solution-core-value"]}
                                </div>
                                <div
                                    className={`text-large text-g950 font-[600]`}
                                >
                                    -
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="relative h-[474px] max-md:h-auto">
                    <Swiper
                        modules={[Navigation]}
                        onSwiper={(e) => {
                            setSwiper(e);
                        }}
                        onSlideChange={handleSlideChange}
                        className="mainCisSwiper"
                    >
                        {data.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className="w-full flex max-md:flex-col">
                                    <div className="flex-1">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            width={849}
                                            height={474}
                                            className="w-full h-[474px] object-cover max-md:h-[192px]"
                                        />
                                    </div>
                                    <div className="w-[591px] bg-g50 px-12 pt-12 pb-20 flex flex-col justify-between select-none max-md:w-full max-md:h-[238px] max-md:py-8 max-md:px-3 ">
                                        <h3 className="g-950 text-[32px] leading-[48px] tracking-[-0.2px] font-bold max-md:text-lg max-md:mb-6">
                                            {item?.[`name_${currentLanguage}`]}
                                        </h3>

                                        <div>
                                            {item.core_inspector_target_ko && (
                                                <div className="mb-6">
                                                    <div className="text-ePrimary text-base mb-1 font-[500] max-md:text-small">
                                                        {
                                                            t[
                                                                "solution-core-inspector-target"
                                                            ]
                                                        }
                                                    </div>
                                                    <div
                                                        className={`text-large text-g950 font-[600] max-md:text-base`}
                                                    >
                                                        {
                                                            item?.[
                                                                `core_inspector_target_${currentLanguage}`
                                                            ]
                                                        }
                                                    </div>
                                                </div>
                                            )}
                                            {item.core_value_ko && (
                                                <div>
                                                    <div className="text-ePrimary text-base mb-1 font-[500] max-md:text-small">
                                                        {
                                                            t[
                                                                "solution-core-value"
                                                            ]
                                                        }
                                                    </div>
                                                    <div
                                                        className={`text-large text-g950 font-[600] max-md:text-base`}
                                                    >
                                                        {
                                                            item?.[
                                                                `core_value_${currentLanguage}`
                                                            ]
                                                        }
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Custom Pagination */}
                    {data.length > 1 && (
                        <div className="hidden justify-center items-center gap-2 max-md:mt-4 max-md:flex">
                            {data.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    className={`w-2 h-2 transition-colors cursor-pointer ${
                                        activeIndex === index
                                            ? "bg-ePrimary"
                                            : "bg-g300 hover:bg-g400"
                                    }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    )}

                    <button
                        className="absolute top-1/2 -translate-y-[50%] -left-24 [@media(max-width:1600px)]:-left-[2%] z-[1] w-12 h-12 rounded-full bg-ePrimary hover:bg-[#C92F2E] transition-colors flex justify-center items-center cursor-pointer max-md:hidden"
                        onClick={handlePrev}
                    >
                        <svg
                            width="24"
                            height="18"
                            viewBox="0 0 24 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M9.23063 17.4808L10.8116 15.854L5.08275 10.1252H23.25V7.87516H5.08275L10.8116 2.14628L9.23063 0.519531L0.75 9.00016L9.23063 17.4808Z"
                                fill="white"
                            />
                        </svg>
                    </button>
                    <button
                        className="absolute top-1/2 -translate-y-[50%] -right-24 [@media(max-width:1600px)]:-right-[2%] z-[1] w-12 h-12 rounded-full bg-ePrimary hover:bg-[#C92F2E] transition-colors flex justify-center items-center cursor-pointer max-md:hidden"
                        onClick={handleNext}
                    >
                        <svg
                            width="24"
                            height="18"
                            viewBox="0 0 24 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M14.7694 17.4808L13.1884 15.854L18.9173 10.1252H0.75V7.87516H18.9173L13.1884 2.14628L14.7694 0.519531L23.25 9.00016L14.7694 17.4808Z"
                                fill="white"
                            />
                        </svg>
                    </button>
                </div>
            )}
        </MotionWrapper>
    );
}
