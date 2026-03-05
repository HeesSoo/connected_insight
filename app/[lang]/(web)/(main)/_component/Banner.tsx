"use client";

import { Swiper, SwiperSlide, SwiperClass } from "swiper/react";
import { Autoplay } from "swiper/modules";

import Button from "@/components/Button";
import AlternativeImg from "@/public/common/alternativeImg.png";
import ProductFindBanner from "@/public/main/product_finder_banner.png";
import { MainBanner } from "@/types/banner";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { useState } from "react";

interface BannerProps {
    banners: MainBanner[];
}

export default function Banner({ banners }: BannerProps) {
    const [swiper, setSwiper] = useState<SwiperClass>();
    const [activeIndex, setActiveIndex] = useState(0);

    const handleSlideChange = (swiper: SwiperClass) => {
        setActiveIndex(swiper.activeIndex);
    };

    const goToSlide = (index: number) => {
        swiper?.slideTo(index);
    };

    // Total slides count (banners + Product Finder slide)
    const totalSlides = banners && banners.length > 0 ? banners.length + 1 : 0;
    return (
        <div className="max-w-full">
            {(!banners || banners.length === 0) && (
                <div className="flex bg-[#EFEFEF] justify-center items-center h-[640px]">
                    <Image
                        src={AlternativeImg}
                        alt="Loading..."
                        width={1920}
                        height={640}
                        className="w-[444px] h-auto max-h-[640px] object-cover"
                    />
                </div>
            )}
            {banners && banners.length > 0 && (
                <div className="relative">
                    <Swiper
                        modules={[Pagination, Autoplay]}
                        onSwiper={(e) => {
                            setSwiper(e);
                        }}
                        onSlideChange={handleSlideChange}
                        pagination={{
                            clickable: true,
                            renderBullet: (index, className) => {
                                // index가 banners 범위를 벗어나면 커스텀 슬라이드용 라벨 사용
                                if (index < banners.length) {
                                    return `<span class="${className} font-semibold text-large text-white bg-g200 px-5 py-2 select-none max-md:hidden">${banners[index].name}</span>`;
                                }
                                return `<span class="${className} font-semibold text-large text-white bg-g200 px-5 py-2 select-none max-md:hidden">Product Finder</span>`;
                            },
                        }}
                        autoplay={{
                            delay: 4000,
                        }}
                        className="mySwiper"
                    >
                        {banners.map((item, index) => (
                            <SwiperSlide key={index}>
                                {/* Desktop image */}
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    width={1920}
                                    height={640}
                                    className="w-full h-[640px] mx-auto max-md:h-auto aspect-[1920/640] max-md:hidden !max-w-[1080px] max-md:!max-w-full"
                                />
                                {/* Mobile image */}
                                <Image
                                    src={item.mobile_image || item.image}
                                    alt={item.name}
                                    width={768}
                                    height={300}
                                    className="w-full aspect-[375/300] hidden max-md:block mobile"
                                />
                            </SwiperSlide>
                        ))}

                        <SwiperSlide key="custom-banner" className="relative custom-banner">
                            <Image
                                src={ProductFindBanner}
                                alt="Product Finder Banner"
                                width={1920}
                                height={640}
                                className="w-full h-auto aspect-[1920/640] max-md:aspect-[375/300]"
                            />
                            <div className="w-full h-full absolute top-0 left-0 z-20 pr-[80px] flex justify-end items-center max-md:p-5 max-md:justify-start max-md:items-start">
                                <div className="text-white max-md:hidden">
                                    <div className="mb-2 text-[32px] leading-[48px] tracking-[-0.2px] font-bold max-md:text-large">
                                        Find the Perfect
                                        <br className="max-md:hidden" />
                                        TOKK Solution
                                    </div>
                                    <div className="mb-12 text-2xl leading-9 tracking-[-0.2px] font-medium max-md:text-base max-md:mb-6">
                                        for Every Requeirement
                                    </div>
                                    <a
                                        href="http://tokk.comp.yunqi3d.com/#/selection/params"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Button
                                            label="Product Finder"
                                            btnType="secondary"
                                            icRight={
                                                <svg
                                                    width="36"
                                                    height="36"
                                                    viewBox="0 0 36 36"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="max-md:w-6 max-md:h-6"
                                                >
                                                    <path
                                                        d="M7.96163 30.75C7.20387 30.75 6.5625 30.4875 6.0375 29.9625C5.5125 29.4375 5.25 28.7961 5.25 28.0384V7.96163C5.25 7.20387 5.5125 6.5625 6.0375 6.0375C6.5625 5.5125 7.20387 5.25 7.96163 5.25H17.4229V7.5H7.96163C7.84613 7.5 7.74038 7.54812 7.64438 7.64437C7.54813 7.74037 7.5 7.84613 7.5 7.96163V28.0384C7.5 28.1539 7.54813 28.2596 7.64438 28.3556C7.74038 28.4519 7.84613 28.5 7.96163 28.5H28.0384C28.1539 28.5 28.2596 28.4519 28.3556 28.3556C28.4519 28.2596 28.5 28.1539 28.5 28.0384V18.5771H30.75V28.0384C30.75 28.7961 30.4875 29.4375 29.9625 29.9625C29.4375 30.4875 28.7961 30.75 28.0384 30.75H7.96163ZM14.5789 23.0018L12.9983 21.4211L26.9194 7.5H21V5.25H30.75V15H28.5V9.08063L14.5789 23.0018Z"
                                                        fill="white"
                                                    />
                                                </svg>
                                            }
                                            onClick={() => {}}
                                            size="large"
                                            className="text-titleSmall max-md:text-base"
                                        />
                                    </a>
                                </div>

                                <div className="text-white hidden max-md:flex max-md:flex-col max-md:justify-between max-md:h-full">
                                    <div>
                                        <div className="mb-1 text-[32px] leading-[48px] tracking-[-0.2px] font-bold max-md:text-large">
                                            Find the Perfect
                                            <br className="max-md:hidden" />
                                            TOKK Solution
                                        </div>
                                        <div className="mb-12 text-2xl leading-9 tracking-[-0.2px] font-medium max-md:text-base max-md:mb-6">
                                            for Every Requeirement
                                        </div>
                                    </div>

                                    <a
                                        href="http://tokk.comp.yunqi3d.com/#/selection/params"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Button
                                            label="Product Finder"
                                            btnType="secondary"
                                            icRight={
                                                <svg
                                                    width="36"
                                                    height="36"
                                                    viewBox="0 0 36 36"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="max-md:w-6 max-md:h-6"
                                                >
                                                    <path
                                                        d="M7.96163 30.75C7.20387 30.75 6.5625 30.4875 6.0375 29.9625C5.5125 29.4375 5.25 28.7961 5.25 28.0384V7.96163C5.25 7.20387 5.5125 6.5625 6.0375 6.0375C6.5625 5.5125 7.20387 5.25 7.96163 5.25H17.4229V7.5H7.96163C7.84613 7.5 7.74038 7.54812 7.64438 7.64437C7.54813 7.74037 7.5 7.84613 7.5 7.96163V28.0384C7.5 28.1539 7.54813 28.2596 7.64438 28.3556C7.74038 28.4519 7.84613 28.5 7.96163 28.5H28.0384C28.1539 28.5 28.2596 28.4519 28.3556 28.3556C28.4519 28.2596 28.5 28.1539 28.5 28.0384V18.5771H30.75V28.0384C30.75 28.7961 30.4875 29.4375 29.9625 29.9625C29.4375 30.4875 28.7961 30.75 28.0384 30.75H7.96163ZM14.5789 23.0018L12.9983 21.4211L26.9194 7.5H21V5.25H30.75V15H28.5V9.08063L14.5789 23.0018Z"
                                                        fill="white"
                                                    />
                                                </svg>
                                            }
                                            onClick={() => {}}
                                            size="large"
                                            className="text-titleSmall max-md:text-base"
                                        />
                                    </a>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>

                    {/* Custom Pagination for Mobile */}
                    {totalSlides > 1 && (
                        <div className="hidden justify-center items-center gap-3 mt-3 max-md:flex">
                            {Array.from({ length: totalSlides }).map(
                                (_, index) => (
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
                                )
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
