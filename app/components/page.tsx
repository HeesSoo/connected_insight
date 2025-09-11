"use client";

import Tab from "@/components/Tab";
import DownloadButtonExample from "./_component/DownloadButtonExample";
import RangebarExample from "./_component/RangebarExample";
import TabExample from "./_component/TabExample";

export default function Components() {
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-8">공통 컴포넌트 목록</h1>

            <Tab
                items={[
                    { value: "tab", label: "TAB", children: <TabExample /> },
                    { value: "downloadButton", label: "DOWNLOAD BUTTON", children: <DownloadButtonExample /> },
                    { value: "rangebar", label: "RANGEBAR", children: <RangebarExample /> },
                ]}
                defaultTab="tab"
            />
        </div>
    );
}
