"use client";

import { useState } from "react";

import AlternativeImg from "@/public/common/alternativeImg.png";
import { useTranslationStore } from "@/stores/translationStore";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { LingchenItem } from "@/types/lingchen";

interface LingchenProps {
    data: LingchenItem[];
}

export default function Tokk({ data }: LingchenProps) {
    const { currentLanguage } = useTranslationStore();
    console.log(data)

    const [swiper, setSwiper] = useState<SwiperClass>();

    return (
        <div>
            {(!data || data.length === 0) ? (
                <div className="w-full flex">
                    <div className="w-[712px] h-[474px] flex justify-center items-center bg-[#EFEFEF]">
                        <Image src={AlternativeImg} alt="Alternative Image" width={849} height={474} className="w-[444px] h-[auto] object-cover" />
                    </div>
                    <div className="flex-1 pt-12 pb-20 px-[136px]">
                        <h3 className="text-ePrimary font-[700] text-xl mb-20">Linear Actuator</h3>
                        <div>
                            <h4 className="mb-2 font-[700] text-h3 text-g950">-</h4>
                            <h4 className="text-large font-[500] text-g950">-</h4>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="relative">
                    <Swiper
                        modules={[Pagination]}
                        onSwiper={(e) => {
                            setSwiper(e);
                        }}
                        pagination={{
                            clickable: true,
                            renderBullet: (index, className) => {
                                return `<span class="${className} font-semibold text-large text-white bg-g200 px-5 py-2">${data[index].name}</span>`;
                            },
                        }}
                        className="mainTokkSwiper"
                    >
                        {data.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className="w-full h-[474px] flex">
                                    <div className="w-[712px]">
                                        <Image src={item.image || AlternativeImg} alt="Alternative Image" width={849} height={474} className="w-full h-[474px] object-cover" />
                                    </div>
                                    <div className="flex-1 pt-12 pb-20 px-[136px]">
                                        <h3 className="text-ePrimary font-[700] text-xl mb-20">Linear Actuator</h3>
                                        <div>
                                            <h4 className="mb-2 font-[700] text-h3 text-g950">{item.name}</h4>
                                            <h4 className="text-large font-[500] text-g950">{item?.[`description_${currentLanguage}`]}</h4>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}
        </div>
    );
}
