"use client";

import Tab from "@/components/Tab";
import { useEffect, useState } from "react";
import Filter from "./_component/Filter";
import ProductItems from "./_component/ProductItems";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function ProductList() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const [tab, setTab] = useState<string>("cis-camera");

    // URL 파라미터 업데이트 함수
    const updateUrlParams = (newParams: Record<string, string | null>) => {
        const params = new URLSearchParams(searchParams.toString());

        Object.entries(newParams).forEach(([key, value]) => {
            if (value === null || value === "") {
                params.delete(key);
            } else {
                params.set(key, value);
            }
        });

        const newUrl = `${pathname}?${params.toString()}`;
        router.push(newUrl);
    };

    // 탭 변경 시 URL 업데이트
    const handleTabChange = (newTab: string) => {
        setTab(newTab);
        updateUrlParams({ tab: newTab });
    };

    useEffect(() => {
        const tabParam = searchParams.get("tab");
        if (tabParam) {
            setTab(tabParam);
        }
    }, [searchParams]);

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

            <div className="mt-[80px] w-full flex gap-[131px]">
                <Filter />
                <ProductItems />
            </div>
        </div>
    );
}
