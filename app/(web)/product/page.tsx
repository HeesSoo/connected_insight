"use client";

import Tab from "@/components/Tab";
import { useState } from "react";
import Filter from "./_component/Filter";
import ProductItems from "./_component/ProductItems";

export default function ProductList() {
    const [tab, setTab] = useState<string>("cis_camera");

    return (
        <div className="max-w-[1824px] w-full mx-auto mt-[80px]">
            <Tab
                items={[
                    { value: "cis_camera", label: "CIS Camera" },
                    { value: "vision_library", label: "Vision Library" },
                    { value: "industry_control_devices", label: "Industry Control Devices" },
                    { value: "stage", label: "Stage" },
                ]}
                defaultTab={tab}
                onChange={setTab}
            />

            <div className="mt-[80px] w-full flex gap-[131px]">
                <Filter />
                <ProductItems />
            </div>
        </div>
    );
}
