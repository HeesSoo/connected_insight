"use client";

import Tab from "@/components/Tab";
import axios from "axios";
import { StaticImageData } from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Filter from "./_component/Filter";
import ProductItems from "./_component/ProductItems";

export interface CisData {
    fov: number;
    line_rate: number;
    name: string;
    resolution: 300 | 600 | 900 | 1200 | 1800 | 3600;
    thumbnail: string | StaticImageData;
    type: "plus" | "max" | "max pro" | "color";
    uuid: string;
    wd: number;
}

export interface LingchenData {
    uuid: string;
    url: string;
    type: string;
    name: string;
    image: string;
    file: {
        s3_url: string;
    };
}
export interface TokkData {
    uuid: string;
    url: string;
    type: string;
    name: string;
    image: string;
    file: {
        s3_url: string;
    };
}

export interface Filter {
    type: ("plus" | "max" | "max pro" | "color")[];
    resolution: (300 | 600 | 900 | 1200 | 1800 | 3600)[];
    line_rate_min: number | null;
    line_rate_max: number | null;
    fov_min: number | null;
    fov_max: number | null;
    wd_min: number | null;
    wd_max: number | null;
}

function ProductListContent() {
    const searchParams = useSearchParams();
    const category = searchParams.get("t") || "cis";

    const [loading, setLoading] = useState<boolean>(true);
    const [tab, setTab] = useState<"cis" | "lingchen" | "tokk">(category as "cis" | "lingchen" | "tokk");
    const [filter, setFilter] = useState<Filter>({
        type: ["plus", "max", "max pro", "color"],
        resolution: [300, 600, 900, 1200, 1800, 3600],
        line_rate_min: 10,
        line_rate_max: 160,
        fov_min: 90,
        fov_max: 1937,
        wd_min: 7,
        wd_max: 48,
    });

    const [allCisData, setAllCisData] = useState<CisData[]>([]);
    const [lingchenData, setLingchenData] = useState<LingchenData[]>([]);
    const [tokkData, setTokkData] = useState<TokkData[]>([]);

    const [data, setData] = useState<CisData[] | LingchenData[] | TokkData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/cis`);

                if (response.status === 200) {
                    if (tab === "cis") {
                        setData(response.data.data.cis);
                    } else if (tab === "lingchen") {
                        setData(response.data.data.lingchen);
                    } else if (tab === "tokk") {
                        setData(response.data.data.tokk);
                    }

                    setAllCisData(response.data.data.cis);
                    setLingchenData(response.data.data.lingchen);
                    setTokkData(response.data.data.tokk);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (loading) return;

        // 필터 또는 탭이 변경될 때마다 데이터 다시 불러오기
        let filteredData = [];

        // 탭에 따른 필터링
        if (tab === "cis") {
            filteredData = [...allCisData];

            // 상세 필터링
            if (filter.type && filter.type.length >= 0) {
                filteredData = filteredData.filter((item) => filter.type.includes(item.type));
            }
            if (filter.resolution && filter.resolution.length >= 0) {
                filteredData = filteredData.filter((item) => filter.resolution.includes(item.resolution));
            }
            if (filter.line_rate_min !== null) {
                filteredData = filteredData.filter((item) => item.line_rate >= filter.line_rate_min!);
            }
            if (filter.line_rate_max !== null) {
                filteredData = filteredData.filter((item) => item.line_rate <= filter.line_rate_max!);
            }
            if (filter.fov_min !== null) {
                filteredData = filteredData.filter((item) => item.fov >= filter.fov_min!);
            }
            if (filter.fov_max !== null) {
                filteredData = filteredData.filter((item) => item.fov <= filter.fov_max!);
            }
            if (filter.wd_min !== null) {
                filteredData = filteredData.filter((item) => item.wd >= filter.wd_min!);
            }
            if (filter.wd_max !== null) {
                filteredData = filteredData.filter((item) => item.wd <= filter.wd_max!);
            }
        } else if (tab === "lingchen") {
            filteredData = [...lingchenData];
        } else if (tab === "tokk") {
            filteredData = [...tokkData];
        }

        setData(filteredData);
    }, [tab, filter]);

    // 탭 변경 시 URL 업데이트
    const handleTabChange = (newTab: "cis" | "lingchen" | "tokk") => {
        setTab(newTab);
    };

    return (
        <div className="max-w-[1872px] min-w-[1248px] px-6 w-full mx-auto pt-[120px] pb-[160px]">
            <Tab
                items={[
                    { value: "cis", label: "CIS Camera" },
                    { value: "lingchen", label: "INDUSTRIAL CONTROL DEVICES" },
                    { value: "tokk", label: "LINEAR ACTUATOR" },
                ]}
                defaultTab={tab}
                onChange={handleTabChange}
            />

            <div className={`${tab === "cis" ? "mt-[40px]" : "mt-[80px]"} w-full flex gap-[131px]`}>
                {tab === "cis" && <Filter filter={filter} setFilter={setFilter} />}
                <ProductItems tab={tab} data={data} loading={loading} hasFilter={tab === "cis"} />
            </div>
        </div>
    );
}

// 로딩 컴포넌트
function ProductListLoading() {
    return (
        <div className="max-w-[1872px] min-w-[1248px] px-6 w-full mx-auto pt-[120px] pb-[160px]">
            <div className="animate-pulse">
                <div className="h-12 bg-g200 rounded mb-8"></div>
                <div className="mt-[80px] w-full flex gap-[131px]">
                    <div className="w-1/4 h-96 bg-g200 rounded"></div>
                    <div className="w-3/4 h-96 bg-g200 rounded"></div>
                </div>
            </div>
        </div>
    );
}

export default function ProductList() {
    return (
        <Suspense fallback={<ProductListLoading />}>
            <ProductListContent />
        </Suspense>
    );
}
