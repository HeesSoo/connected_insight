"use client";

import Tab from "@/components/Tab";
import { StaticImageData } from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Filter from "./Filter";
import ProductItems from "./ProductItems";

export interface CisData {
    fov: number;
    line_rate: number;
    name: string;
    resolution: 300 | 600 | 900 | 1200 | 1800 | 3600;
    thumbnail: string | StaticImageData;
    type: "plus" | "max" | "maxpro" | "color" | "-";
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

export interface LMS_UV_Data {
    uuid: string;
    name: string;
    fov: number | null;
    resolution: number | null;
    wd: number | null;
    line_rate: number | null;
    type: string | null;
    category: "LMS" | "UV";
    thumbnail: string;
    thumb_file: {
        s3_url: string;
    } | null;
}

export interface Filter {
    type: ("plus" | "max" | "maxpro" | "color")[];
    resolution: (300 | 600 | 900 | 1200 | 1800 | 3600)[];
    line_rate_min: number | null;
    line_rate_max: number | null;
    fov_min: number | null;
    fov_max: number | null;
    wd_min: number | null;
    wd_max: number | null;
}

export default function ProductListClient({
    initialData,
}: {
    initialData: {
        cis?: CisData[];
        lingchen?: LingchenData[];
        tokk?: TokkData[];
        lms?: LMS_UV_Data[];
        uv?: LMS_UV_Data[];
    };
}) {
    const searchParams = useSearchParams();
    const category =
        (searchParams?.get("t") as
            | "cis"
            | "lingchen"
            | "tokk"
            | "lms"
            | "uv") || "cis";

    const [tab, setTab] = useState<"cis" | "lingchen" | "tokk" | "lms" | "uv">(
        category
    );
    const [filter, setFilter] = useState<Filter>({
        type: ["plus", "max", "maxpro", "color"],
        resolution: [300, 600, 900, 1200, 1800, 3600],
        line_rate_min: 10,
        line_rate_max: 160,
        fov_min: 90,
        fov_max: 1937,
        wd_min: 7,
        wd_max: 48,
    });

    const [allCisData, setAllCisData] = useState<CisData[]>(
        initialData.cis || []
    );
    const [lingchenData, setLingchenData] = useState<LingchenData[]>(
        initialData.lingchen || []
    );
    const [tokkData, setTokkData] = useState<TokkData[]>(
        initialData.tokk || []
    );
    const [lmsData, setLmsData] = useState<LMS_UV_Data[]>(
        initialData.lms || []
    );
    const [uvData, setUvData] = useState<LMS_UV_Data[]>(initialData.uv || []);

    const [data, setData] = useState<
        CisData[] | LingchenData[] | TokkData[] | LMS_UV_Data[]
    >(() => {
        if (category === "cis") return initialData.cis || [];
        if (category === "lingchen") return initialData.lingchen || [];
        if (category === "tokk") return initialData.tokk || [];
        if (category === "lms") return initialData.lms || [];
        if (category === "uv") return initialData.uv || [];
        return [];
    });

    useEffect(() => {
        setAllCisData(initialData.cis || []);
        setLingchenData(initialData.lingchen || []);
        setTokkData(initialData.tokk || []);
        setLmsData(initialData.lms || []);
        setUvData(initialData.uv || []);
        // 현재 탭에 맞춰 데이터 업데이트
        if (tab === "cis") setData(initialData.cis || []);
        if (tab === "lingchen") setData(initialData.lingchen || []);
        if (tab === "tokk") setData(initialData.tokk || []);
        if (tab === "lms") setData(initialData.lms || []);
        if (tab === "uv") setData(initialData.uv || []);
    }, [tab, initialData]);

    useEffect(() => {
        const category =
            (searchParams?.get("t") as "cis" | "lingchen" | "tokk") || "cis";
        setTab(category);
    }, [searchParams]);

    useEffect(() => {
        let filteredData: any[] = [];

        if (tab === "cis") {
            filteredData = [...allCisData];
            if (filter.type && filter.type.length >= 0)
                filteredData = filteredData.filter((item) =>
                    filter.type.includes(item.type)
                );
            if (filter.resolution && filter.resolution.length >= 0)
                filteredData = filteredData.filter((item) =>
                    filter.resolution.includes(item.resolution)
                );
            if (filter.line_rate_min !== null)
                filteredData = filteredData.filter(
                    (item) => item.line_rate >= filter.line_rate_min!
                );
            if (filter.line_rate_max !== null)
                filteredData = filteredData.filter(
                    (item) => item.line_rate <= filter.line_rate_max!
                );
            if (filter.fov_min !== null)
                filteredData = filteredData.filter(
                    (item) => item.fov >= filter.fov_min!
                );
            if (filter.fov_max !== null)
                filteredData = filteredData.filter(
                    (item) => item.fov <= filter.fov_max!
                );
            if (filter.wd_min !== null)
                filteredData = filteredData.filter(
                    (item) => item.wd >= filter.wd_min!
                );
            if (filter.wd_max !== null)
                filteredData = filteredData.filter(
                    (item) => item.wd <= filter.wd_max!
                );
        } else if (tab === "lingchen") {
            filteredData = [...lingchenData];
        } else if (tab === "tokk") {
            filteredData = [...tokkData];
        } else if (tab === "lms") {
            filteredData = [...lmsData];
        } else if (tab === "uv") {
            filteredData = [...uvData];
        }

        setData(filteredData);
    }, [tab, filter]);

    const handleTabChange = (
        newTab: "cis" | "lingchen" | "tokk" | "lms" | "uv"
    ) => {
        setTab(newTab);
    };

    return (
        <div className="max-w-[1872px] min-w-[1248px] px-6 w-full mx-auto pt-[120px] pb-[160px] max-md:min-w-0 max-md:px-4 max-md:pt-8 max-md:pb-24">
            <Tab
                items={[
                    { value: "cis", label: "CIS Camera" },
                    { value: "lingchen", label: "CONTROL DEVICES" },
                    { value: "tokk", label: "LINEAR ACTUATOR" },
                    { value: "lms", label: "LMS" },
                    { value: "uv", label: "UV CURING SYSTEM" },
                ]}
                defaultTab={tab}
                onChange={handleTabChange}
            />

            <div
                className={`${
                    tab === "cis" ? "mt-[40px]" : "mt-[80px]"
                } w-full flex gap-[131px] max-md:mt-14 max-md:block max-md:gap-0`}
            >
                {tab === "cis" && (
                    <Filter filter={filter} setFilter={setFilter} />
                )}
                <ProductItems tab={tab} data={data} hasFilter={tab === "cis"} />
            </div>
        </div>
    );
}
