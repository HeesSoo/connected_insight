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
    type: "plus" | "max" | "max pro" | "color" | "-";
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

export default function ProductListClient({ initialData }: { initialData: { cis?: CisData[]; lingchen?: LingchenData[]; tokk?: TokkData[] } }) {
    console.log("Initial data received in ProductListClient:", initialData);
    const searchParams = useSearchParams();
    const category = (searchParams?.get("t") as "cis" | "lingchen" | "tokk") || "cis";

    const [tab, setTab] = useState<"cis" | "lingchen" | "tokk">(category);
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

    const [allCisData, setAllCisData] = useState<CisData[]>(initialData.cis || []);
    const [lingchenData, setLingchenData] = useState<LingchenData[]>(initialData.lingchen || []);
    const [tokkData, setTokkData] = useState<TokkData[]>(initialData.tokk || []);

    const [data, setData] = useState<CisData[] | LingchenData[] | TokkData[]>(() => {
        if (category === "cis") return initialData.cis || [];
        if (category === "lingchen") return initialData.lingchen || [];
        return initialData.tokk || [];
    });

    useEffect(() => {
        setAllCisData(initialData.cis || []);
        setLingchenData(initialData.lingchen || []);
        setTokkData(initialData.tokk || []);
        // 현재 탭에 맞춰 데이터 업데이트
        if (tab === "cis") setData(initialData.cis || []);
        if (tab === "lingchen") setData(initialData.lingchen || []);
        if (tab === "tokk") setData(initialData.tokk || []);
    }, [tab, initialData]);

    useEffect(() => {
        let filteredData: any[] = [];

        if (tab === "cis") {
            filteredData = [...allCisData];
            if (filter.type && filter.type.length >= 0) filteredData = filteredData.filter((item) => filter.type.includes(item.type));
            if (filter.resolution && filter.resolution.length >= 0) filteredData = filteredData.filter((item) => filter.resolution.includes(item.resolution));
            if (filter.line_rate_min !== null) filteredData = filteredData.filter((item) => item.line_rate >= filter.line_rate_min!);
            if (filter.line_rate_max !== null) filteredData = filteredData.filter((item) => item.line_rate <= filter.line_rate_max!);
            if (filter.fov_min !== null) filteredData = filteredData.filter((item) => item.fov >= filter.fov_min!);
            if (filter.fov_max !== null) filteredData = filteredData.filter((item) => item.fov <= filter.fov_max!);
            if (filter.wd_min !== null) filteredData = filteredData.filter((item) => item.wd >= filter.wd_min!);
            if (filter.wd_max !== null) filteredData = filteredData.filter((item) => item.wd <= filter.wd_max!);
        } else if (tab === "lingchen") {
            filteredData = [...lingchenData];
        } else if (tab === "tokk") {
            filteredData = [...tokkData];
        }

        setData(filteredData);
    }, [tab, filter, allCisData, lingchenData, tokkData]);

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
                <ProductItems tab={tab} data={data} hasFilter={tab === "cis"} />
            </div>
        </div>
    );
}
