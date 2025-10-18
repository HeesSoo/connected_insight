"use client";

import Tab from "@/components/Tab";
import axios from "axios";
import { StaticImageData } from "next/image";
import { Suspense, useEffect, useState } from "react";
import Filter from "./_component/Filter";
import ProductItems from "./_component/ProductItems";

export interface ProductItem {
    fov: number;
    line_rate: number;
    name: string;
    resolution: 300 | 600 | 900 | 1200 | 1800 | 3600;
    thumbnail: string | StaticImageData;
    type: "plus" | "max" | "max pro" | "color";
    uuid: string;
    wd: number;
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
    const [loading, setLoading] = useState<boolean>(true);
    const [tab, setTab] = useState<string>("cis-camera");
    const [filter, setFilter] = useState<Filter>({
        type: ["plus", "max", "max pro", "color"],
        resolution: [300, 600, 1200, 1800, 3600],
        line_rate_min: 10,
        line_rate_max: 160,
        fov_min: 90,
        fov_max: 1937,
        wd_min: 7,
        wd_max: 48,
    });

    const [allData, setAllData] = useState<ProductItem[]>([]);
    const [data, setData] = useState<ProductItem[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/cis`);
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/cis`);

                if (response.status === 200) {
                    setData(response.data.data);
                    setAllData(response.data.data);
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
        // 필터 또는 탭이 변경될 때마다 데이터 다시 불러오기
        let filteredData = allData;

        // 탭에 따른 필터링
        // if (tab === "cis-camera") {
        //     filteredData = filteredData.filter((item) => item.type === "cis camera");
        // } else if (tab === "vision-software") {
        //     filteredData = filteredData.filter((item) => item.type === "vision software");
        // } else if (tab === "industry-control-devices") {
        //     filteredData = filteredData.filter((item) => item.type === "industry control devices");
        // } else if (tab === "stage") {
        //     filteredData = filteredData.filter((item) => item.type === "stage");
        // }

        // 상세 필터링
        if (filter.type && filter.type.length > 0) {
            filteredData = filteredData.filter((item) => filter.type.includes(item.type));
        }
        if (filter.resolution && filter.resolution.length > 0) {
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

        setData(filteredData);
    }, [tab, filter]);

    // 탭 변경 시 URL 업데이트
    const handleTabChange = (newTab: string) => {
        setTab(newTab);
    };

    return (
        <div className="max-w-[1872px] min-w-[1248px] px-6 w-full mx-auto pt-[120px] pb-[160px]">
            <Tab
                items={[
                    { value: "cis-camera", label: "CIS Camera" },
                    { value: "vision-software", label: "Vision Software" },
                    { value: "industry-control-devices", label: "Industry Control Devices" },
                    { value: "stage", label: "Stage" },
                ]}
                defaultTab={tab}
                onChange={handleTabChange}
            />

            <div className="mt-[40px] w-full flex gap-[131px]">
                <Filter setFilter={setFilter} />
                <ProductItems data={data} loading={loading} />
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
