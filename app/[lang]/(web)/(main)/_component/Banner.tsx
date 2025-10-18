"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import AlternativeImg from "@/public/common/alternativeImg.png";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

interface MainBanner {
    image: string;
    index: number;
    name: string;
    uuid: string;
}

export default function Banner() {
    const [loading, setLoading] = useState<boolean>(true);
    const [banners, setBanners] = useState<MainBanner[]>([]);

    useEffect(() => {
        const getBanners = async () => {
            try {
                // const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/main/banner`);
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/main/banner`);
                if (response.status === 200) {
                    setBanners(response.data.data);
                }
            } catch (err: any) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        getBanners();
    }, []);

    return (
        <div className="max-w-full">
            {loading && <Image src={AlternativeImg} alt="Loading..." width={1920} height={640} className="w-full h-auto max-h-[640px] object-cover" />}
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
