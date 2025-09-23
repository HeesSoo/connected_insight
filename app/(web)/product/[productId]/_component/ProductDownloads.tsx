"use client";

import DownloadButton from "@/components/DownloadButton";

export default function ProductDownloads() {
    return (
        <div className="w-full flex mt-[80px]">
            <h2 className="flex-1 pl-9 text-[32px] leading-48px font-bold text-g950">Documents</h2>
            <div className="w-[955px] flex flex-col gap-6">
                {[1, 2, 3, 4, 5].map((v) => {
                    return (
                        <div key={v} className="w-full flex justify-between items-center pb-6 border-b border-g200">
                            <div>
                                <div className="text-sm font-medium text-g400 mb-1">25.11.23 Updated</div>
                                <h3 className="text-xl leading-[30px] font-bold text-g950">Document Origin Name</h3>
                            </div>
                            <DownloadButton file={{ url: "url", name: "filename" }} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
