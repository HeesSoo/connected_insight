"use client";

import { Solution, SolutionItem } from "@/types/solution";
import SolutionCISCamera from "./Solution_CISCamera";
import Tab from "@/components/Tab";
import SolutionLingchen from "./Solution_Lingchen";
import { useState } from "react";

export default function SolutionComponent({ data }: { data: Solution }) {
  const [tab, setTab] = useState<"cis" | "lingchen">("cis");
  const [currentData, setCurrentData] = useState<Solution>(() => {
    if (tab === "lingchen") return data[tab] || [];
    return data[tab] || [];
  });

  const handleTabChange = (newTab: "cis" | "lingchen") => {
    setTab(newTab);
    setCurrentData(data[newTab]);
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
            value: "lingchen",
            label: "LINGCHEN",
            children: <SolutionLingchen data={currentData} />,
          },
        ]}
        onChange={handleTabChange}
        defaultTab="cis"
      />
    </div>
  );
}
