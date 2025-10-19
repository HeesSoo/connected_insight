"use client";

import Tab from "@/components/Tab";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import DummyImage from "../_dummys/DummyProductImg.png";
import ProductDrawing from "./_component/ProductDrawing";
import ProductSpecifications from "./_component/ProductSpecifications";

export interface MediaItem {
    order: number;
    s3_url: string;
    name: string;
}

export interface ProductDetail {
    created_at: string;
    updated_at: string;
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
    manual?: MediaItem[];
    catalog?: MediaItem[];
    sdk?: MediaItem[];
    etc?: MediaItem[];
    // allow additional unknown fields from backend
    [key: string]: any;
}

export default function ProductDetail() {
    const { productId } = useParams();

    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<ProductDetail | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (productId) {
                    const response = await axios(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/cis/detail/${productId}`);
                    if (response.status === 200) {
                        const productData: ProductDetail = response.data.data;
                        setData(productData);
                        console.log("data:::", productData);
                    }
                }
            } catch (err) {
                console.error("Error fetching product data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    } else if (!data) {
        return <div>No product data available.</div>;
    }
    return (
        <div className="max-w-[1488px] min-w-[1248px] px-6 w-full mx-auto my-[80px]">
            <section className="w-full flex gap-[137px]">
                <div className="w-[712px]">
                    <Image src={DummyImage} alt="product" height={476} className="w-full mb-1" />
                    <div className="w-full grid grid-cols-3 gap-1">
                        {[1, 2, 3].map((v) => {
                            return <Image key={v} src={DummyImage} alt="product" height={158} className="w-full" />;
                        })}
                    </div>
                </div>

                <section className="flex flex-col gap-12 flex-1">
                    <div>
                        <div className="text-g950 font-semibold text-base mb-2">LineX CIS Plus</div>
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
                        // { value: "downloads", label: "Downloads", children: <ProductDownloads /> },
                        { value: "drawing", label: "Drawing", children: <ProductDrawing data={data} /> },
                    ]}
                    defaultTab="specifications"
                />
            </section>
        </div>
    );
}
