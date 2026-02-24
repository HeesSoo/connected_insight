"use client";

import { Solution } from "@/types/solution";
import SolutionCISCamera from "./Solution_CISCamera";
import Tab from "@/components/Tab";
import SolutionLingchen from "./Solution_Lingchen";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function SolutionComponent({ data }: { data: Solution }) {
    const params = useSearchParams();

    const [tab, setTab] = useState<"cis" | "cd">("cis");
    const [currentData, setCurrentData] = useState<Solution>(() => {
        if (tab === "cd") return data["lingchen"] || [];
        return data[tab] || [];
    });

    useEffect(() => {
        const urlTab = params.get("tab");
        if (urlTab === "cd" || urlTab === "cis") {
            setTab(urlTab);
            setCurrentData(
                urlTab === "cd" ? data["lingchen"] || [] : data[urlTab] || []
            );
        }
    }, []);

    const handleTabChange = (newTab: "cis" | "cd") => {
        setTab(newTab);
        setCurrentData(
            newTab === "cd" ? data["lingchen"] || [] : data[newTab] || []
        );
    };

    return (
        <div>
            <Tab
                items={[
                    {
                        value: "cis",
                        label: "CIS Camera",
                        children: <SolutionCISCamera data={currentData} />,
                    },
                    {
                        value: "cd",
                        label: "Control Devices",
                        children: <SolutionLingchen data={currentData} />,
                    },
                ]}
                onChange={handleTabChange}
                defaultTab={tab}
            />
        </div>
    );
}
