"use client";

import Tab from "@/components/Tab";
import DummyImage from "@/public/common/alternativeImg.png";
import Image from "next/image";
import { useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import ProductDrawing from "./ProductDrawing";
import ProductSpecifications from "./ProductSpecifications";
import ProductDownloads from "./ProductDownloads";

export interface MediaItem {
    order: number;
    s3_url: string;
    name: string;
}

export interface ProductDetail {
    created_at: string;
    updated_at: string;
    thumbnail?: MediaItem[];
    deleted_at?: string | null;
    is_deleted: boolean;
    uuid: string;
    name: string;
    fov?: number;
    resolution?: number;
    dof?: number;
    wd?: number;
    line_rate?: number;
    ws?: number;
    ethernet_port?: number;
    pixel?: number;
    size_width?: number;
    size_length?: number;
    size_height?: number;
    mono_or_color?: string;
    interface?: string;
    accuracy?: number;
    type?: string;
    plus?: MediaItem[];
    max?: MediaItem[];
    maxpro?: MediaItem[];
    color?: MediaItem[];
    drawing?: MediaItem[];
    drawing_img?: MediaItem[];
    manual?: MediaItem[];
    catalog?: MediaItem[];
    sdk?: MediaItem[];
    etc?: MediaItem[];
    // allow additional unknown fields from backend
    [key: string]: any;
}

export default function ProductDetailClient({ data }: { data: ProductDetail }) {
    const [thumbnailIndex, setThumbnailIndex] = useState<number>(0);
    const [swiper, setSwiper] = useState<SwiperClass>();

    if (!data) {
        return <div>No product data available.</div>;
    }
    return (
        <div className="max-w-[1488px] min-w-[1248px] px-6 w-full mx-auto my-[80px]">
            <section className="w-full flex gap-[137px]">
                <div className="w-[712px]">
                    <div className="relative">
                        <Swiper
                            className="mb-6"
                            onSlideChange={(swiper) => {
                                setThumbnailIndex(swiper.activeIndex);
                            }}
                            onSwiper={(e) => {
                                setSwiper(e);
                            }}
                        >
                            {data.thumbnail.map((v) => (
                                <SwiperSlide key={v.order}>
                                    <div className="w-full h-[475px] bg-[#EFEFEF] flex justify-center items-center">
                                        <Image src={v.s3_url || DummyImage} alt="product" width={712} height={476} className="w-full" />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <button
                            className={`w-12 h-12 ${
                                thumbnailIndex === 0 ? "bg-g300 cursor-default" : "bg-g950 cursor-pointer"
                            } rounded-full flex justify-center items-center absolute top-1/2 left-4 transform -translate-y-1/2 z-10`}
                            onClick={() => {
                                if (thumbnailIndex === 0) {
                                    return;
                                }
                                swiper?.slidePrev();
                            }}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <mask id="mask0_2067_11491" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                    <rect width="24" height="24" transform="matrix(-1 0 0 1 24 0)" fill="#D9D9D9" />
                                </mask>
                                <g mask="url(#mask0_2067_11491)">
                                    <path
                                        d="M7.373 12.751H18.75C18.9628 12.751 19.141 12.6792 19.2845 12.5355C19.4282 12.392 19.5 12.2138 19.5 12.001C19.5 11.7881 19.4282 11.61 19.2845 11.4665C19.141 11.3228 18.9628 11.251 18.75 11.251H7.373L12.5423 6.08173C12.6909 5.93307 12.7643 5.75907 12.7625 5.55973C12.7605 5.3604 12.682 5.18315 12.527 5.02798C12.3718 4.88315 12.1962 4.80815 12 4.80298C11.8038 4.79782 11.6282 4.87282 11.473 5.02798L5.13275 11.3682C5.03908 11.4619 4.97308 11.5606 4.93475 11.6645C4.89625 11.7683 4.877 11.8805 4.877 12.001C4.877 12.1215 4.89625 12.2336 4.93475 12.3375C4.97308 12.4413 5.03908 12.5401 5.13275 12.6337L11.473 18.974C11.6115 19.1125 11.783 19.1833 11.9875 19.1865C12.192 19.1897 12.3718 19.1188 12.527 18.974C12.682 18.8188 12.7595 18.6406 12.7595 18.4395C12.7595 18.2381 12.682 18.0599 12.527 17.9047L7.373 12.751Z"
                                        fill="white"
                                    />
                                </g>
                            </svg>
                        </button>

                        <button
                            className={`w-12 h-12 ${
                                thumbnailIndex === data.thumbnail.length - 1 ? "bg-g300 cursor-default" : "bg-g950 cursor-pointer"
                            } rounded-full flex justify-center items-center absolute top-1/2 right-4 transform -translate-y-1/2 z-10`}
                            onClick={() => {
                                if (thumbnailIndex === data.thumbnail.length - 1) {
                                    return;
                                }
                                swiper?.slideNext();
                            }}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <mask id="mask0_2067_11487" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                    <rect width="24" height="24" fill="#D9D9D9" />
                                </mask>
                                <g mask="url(#mask0_2067_11487)">
                                    <path
                                        d="M16.627 12.751H5.25C5.03717 12.751 4.859 12.6792 4.7155 12.5355C4.57183 12.392 4.5 12.2138 4.5 12.001C4.5 11.7881 4.57183 11.61 4.7155 11.4665C4.859 11.3228 5.03717 11.251 5.25 11.251H16.627L11.4577 6.08173C11.3091 5.93307 11.2357 5.75907 11.2375 5.55973C11.2395 5.3604 11.318 5.18315 11.473 5.02798C11.6282 4.88315 11.8038 4.80815 12 4.80298C12.1962 4.79782 12.3718 4.87282 12.527 5.02798L18.8673 11.3682C18.9609 11.4619 19.0269 11.5606 19.0652 11.6645C19.1037 11.7683 19.123 11.8805 19.123 12.001C19.123 12.1215 19.1037 12.2336 19.0652 12.3375C19.0269 12.4413 18.9609 12.5401 18.8673 12.6337L12.527 18.974C12.3885 19.1125 12.217 19.1833 12.0125 19.1865C11.808 19.1897 11.6282 19.1188 11.473 18.974C11.318 18.8188 11.2405 18.6406 11.2405 18.4395C11.2405 18.2381 11.318 18.0599 11.473 17.9047L16.627 12.751Z"
                                        fill="white"
                                    />
                                </g>
                            </svg>
                        </button>
                    </div>

                    <div className="w-full grid grid-cols-6 gap-2">
                        {data.thumbnail.map((v, idx) => {
                            return (
                                <div
                                    key={v.order}
                                    className={`w-full aspect-square bg-[#EFEFEF] flex justify-center items-center cursor-pointer ${thumbnailIndex === idx ? "border border-ePrimary" : ""}`}
                                    style={{ aspectRatio: "1 / 1" }}
                                    onClick={() => {
                                        swiper?.slideTo(idx);
                                    }}
                                >
                                    <Image src={v.s3_url} alt={v.name} width={112} height={112} />
                                </div>
                            );
                        })}
                    </div>
                </div>

                <section className="flex flex-col gap-12 flex-1">
                    <div>
                        <div className="text-g950 font-semibold text-base mb-2">
                            {data.type === "plus" && "LineX Plus"}
                            {data.type === "max" && "LineX Max"}
                            {data.type === "max pro" && "LineX MAX PRO"}
                            {data.type === "color" && "LineX Color"}
                        </div>
                        <h1 className="text-[32px] font-bold text-g950">{data.name}</h1>
                    </div>

                    <div>
                        <h2 className="text-ePrimary text-large font-bold pb-2 border-b border-g200 mb-4">Key Feature</h2>

                        <div className="grid grid-cols-2 gap-y-9">
                            <div>
                                <div className="text-g400 font-medium text-sm mb-0.5">Resolution (DPI)</div>
                                <div className="text-g950 font-semibold text-large ">{data.resolution}</div>
                            </div>
                            <div>
                                <div className="text-g400 font-medium text-sm mb-0.5">Accuracy (μm)</div>
                                <div className="text-g950 font-semibold text-large ">{data.accuracy}</div>
                            </div>
                            <div>
                                <div className="text-g400 font-medium text-sm mb-0.5">Line Frequency (kHz)</div>
                                <div className="text-g950 font-semibold text-large ">{data.line_rate}</div>
                            </div>
                            <div>
                                <div className="text-g400 font-medium text-sm mb-0.5">Interface</div>
                                <div className="text-g950 font-semibold text-large ">{data.interface}</div>
                            </div>
                            <div>
                                <div className="text-g400 font-medium text-sm mb-0.5">FOV (mm)</div>
                                <div className="text-g950 font-semibold text-large ">{data.fov}</div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-ePrimary text-large font-bold pb-2 border-b border-g200 mb-4">Options</h2>

                        <div className="grid grid-cols-2 gap-y-9">
                            <div>
                                <div className="text-g400 font-medium text-sm mb-0.5">Mono or Color</div>
                                <div className="text-g950 font-semibold text-large">{data.mono_or_color}</div>
                            </div>
                            <div>
                                <div className="text-g400 font-medium text-sm mb-0.5">Ethernet Port</div>
                                <div className="text-g950 font-semibold text-large">{data.ethernet_port}</div>
                            </div>
                            <div>
                                <div className="text-g400 font-medium text-sm mb-0.5">WD (mm)</div>
                                <div className="text-g950 font-semibold text-large">{data.wd}</div>
                            </div>
                        </div>
                    </div>
                </section>
            </section>

            <section className="mt-[144px]">
                <Tab
                    items={[
                        { value: "specifications", label: "Specifications", children: <ProductSpecifications data={data} /> },
                        { value: "downloads", label: "Downloads", children: <ProductDownloads data={data} /> },
                        { value: "drawing", label: "Drawing", children: <ProductDrawing data={data} /> },
                    ]}
                    defaultTab="specifications"
                />
            </section>
        </div>
    );
}
