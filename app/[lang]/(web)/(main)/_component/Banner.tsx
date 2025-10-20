"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import Button from "@/components/Button";
import AlternativeImg from "@/public/common/alternativeImg.png";
import ProductFindBanner from "@/public/main/product_finder_banner.png";
import { MainBanner } from "@/types/banner";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

interface BannerProps {
    banners: MainBanner[];
}

export default function Banner({ banners }: BannerProps) {
    return (
        <div className="max-w-full">
            {(!banners || banners.length === 0) && (
                <div className="flex bg-[#EFEFEF] justify-center items-center h-[640px]">
                    <Image src={AlternativeImg} alt="Loading..." width={1920} height={640} className="w-[444px] h-auto max-h-[640px] object-cover" />
                </div>
            )}
            {banners && banners.length > 0 && (
                <Swiper
                    modules={[Pagination]}
                    pagination={{
                        clickable: true,
                        renderBullet: (index, className) => {
                            // index가 banners 범위를 벗어나면 커스텀 슬라이드용 라벨 사용
                            if (index < banners.length) {
                                return `<span class="${className} font-semibold text-large text-white bg-g200 px-5 py-2">${banners[index].name}</span>`;
                            }
                            return `<span class="${className} font-semibold text-large text-white bg-g200 px-5 py-2">Product Finder</span>`;
                        },
                    }}
                    className="mySwiper"
                >
                    {banners.map((item, index) => (
                        <SwiperSlide key={index}>
                            <Image src={item.image} alt={item.name} width={1920} height={640} className="w-full h-auto object-cover" />
                        </SwiperSlide>
                    ))}

                    <SwiperSlide key="custom-banner">
                        <div className="relative w-full h-[635px]">
                            <div className="w-full h-full absolute top-0 left-0 z-20 pr-[80px] flex justify-end items-center">
                                <div className="text-white">
                                    <div className="mb-2 text-[32px] leading-[48px] tracking-[-0.2px] font-bold">
                                        Find the Perfect
                                        <br />
                                        TOKK Solution
                                    </div>
                                    <div className="mb-12 text-2xl leading-9 tracking-[-0.2px] font-medium">for Every Requeirement</div>
                                    {/* <a href="http://tokk.comp.yunqi3d.com/#/" target="_blank" rel="noopener noreferrer"> */}
                                    <a href="http://tokk.comp.yunqi3d.com/#/selection/params" target="_blank" rel="noopener noreferrer">
                                        <Button
                                            label="Product Finder"
                                            btnType="secondary"
                                            icRight={
                                                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M7.96163 30.75C7.20387 30.75 6.5625 30.4875 6.0375 29.9625C5.5125 29.4375 5.25 28.7961 5.25 28.0384V7.96163C5.25 7.20387 5.5125 6.5625 6.0375 6.0375C6.5625 5.5125 7.20387 5.25 7.96163 5.25H17.4229V7.5H7.96163C7.84613 7.5 7.74038 7.54812 7.64438 7.64437C7.54813 7.74037 7.5 7.84613 7.5 7.96163V28.0384C7.5 28.1539 7.54813 28.2596 7.64438 28.3556C7.74038 28.4519 7.84613 28.5 7.96163 28.5H28.0384C28.1539 28.5 28.2596 28.4519 28.3556 28.3556C28.4519 28.2596 28.5 28.1539 28.5 28.0384V18.5771H30.75V28.0384C30.75 28.7961 30.4875 29.4375 29.9625 29.9625C29.4375 30.4875 28.7961 30.75 28.0384 30.75H7.96163ZM14.5789 23.0018L12.9983 21.4211L26.9194 7.5H21V5.25H30.75V15H28.5V9.08063L14.5789 23.0018Z"
                                                        fill="white"
                                                    />
                                                </svg>
                                            }
                                            onClick={() => {}}
                                            size="large"
                                            className="text-titleSmall"
                                        />
                                    </a>
                                </div>
                            </div>

                            <Image src={ProductFindBanner} alt="Product Finder Banner" width={1920} height={640} className="absolute right-0 bottom-0 w-full h-[635px] object-contain" />
                        </div>
                    </SwiperSlide>
                </Swiper>
            )}
        </div>
    );
}
