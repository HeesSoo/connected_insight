"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import AlternativeImg from "@/public/common/alternativeImg.png";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { MainBanner } from "@/types/banner";

interface BannerProps {
    banners: MainBanner[];
}

export default function Banner({ banners }: BannerProps) {

    return (
        <div className="max-w-full">
            {(!banners || banners.length === 0) && (<div className="flex bg-[#EFEFEF] justify-center items-center h-[640px]">
                <Image src={AlternativeImg} alt="Loading..." width={1920} height={640} className="w-[444px] h-auto max-h-[640px] object-cover" />
            </div>)}
            {banners && banners.length > 0 && (
                <Swiper
                    modules={[Pagination]}
                    pagination={{
                        clickable: true,
                        renderBullet: (index, className) => {
                            return `<span class="${className} font-semibold text-large text-white bg-g200 px-5 py-2">${banners[index].name}</span>`;
                        },
                    }}
                    className="mySwiper"
                >
                    {banners.map((item, index) => (
                        <SwiperSlide key={index}>
                            <Image src={item.image} alt={item.name} width={1920} height={640} className="w-full h-auto object-cover" />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    );
}
