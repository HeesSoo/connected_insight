"use client";

import { useState } from "react";

import AlternativeImg from "@/public/common/alternativeImg.png";
import { useTranslationStore } from "@/stores/translationStore";
import axios from "axios";
import Image from "next/image";
import { useEffect } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { LingchenItem } from "@/types/lingchen";

export default function Tokk() {
    const { currentLanguage } = useTranslationStore();

    const [swiper, setSwiper] = useState<SwiperClass>();

    const [data, setData] = useState<LingchenItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/solution`);
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/cis/tokk`);

                console.log('response >>>> ', response);
                if (response.status === 200) {
                    setData(response.data.data);
                }
            } catch (err: unknown) {
                console.error("Error fetching solutions:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {loading ? (
                <div className="w-full flex">
                    <div className="w-[712px]">
                        <Image src={AlternativeImg} alt="Alternative Image" width={849} height={474} className="w-full h-[474px] object-cover" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-ePrimary font-[700] text-xl mb-20">TOKK</h3>
                        <div>
                            <h4 className="mb-2 font-[700] text-h3 text-g950">TOKK MODEL</h4>
                            <h4 className="text-large font-[500] text-g950">TOKK ALTANATIVE</h4>
                        </div>
                    </div>
                </div>
            ) : data.length > 0 ? (
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
                                    <div className="flex-1 py-20 px-[136px]">
                                        <h3 className="text-ePrimary font-[700] text-xl mb-20">TOKK</h3>
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
            ) : (
                <div>No solutions available.</div>
            )}
        </div>
    );
}
