"use client";

import { SolutionItem } from "@/types/solution";
import SolutionCISCamera from "./Solution_CISCamera";
import Tab from "@/components/Tab";
import SolutionLingchen from "./Solution_Lingchen";

export default function SolutionComponent({ data }: { data: SolutionItem[] }) {
    return (
        <div>
            <Tab
                items={[
                    {
                        value: "cis",
                        label: "CIS Camera",
                        children: <SolutionCISCamera data={data} />,
                    },
                    {
                        value: "lingchen",
                        label: "LINGCHEN",
                        children: <SolutionLingchen />,
                    },
                ]}
                defaultTab="cis"
            />
        </div>
    );
}
