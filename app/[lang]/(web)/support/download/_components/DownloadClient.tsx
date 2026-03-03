"use client";

import Image from "next/image";
import { DownloadData } from "../page";
import DownloadCISCamera from "./Download_CISCamera";
import DownloadIndustrialControlDevices from "./Download_IndustrialControlDevices";
import DownloadLinearActuator from "./Download_LinearActuator";
import SupportDownloadBanner from "@/public/support/download/support_download_banner.png";
import Tab from "@/components/Tab";

interface DownloadClientProps {
    initialData: DownloadData;
}

export default function DownloadClient({ initialData }: DownloadClientProps) {
    return (
        <div className="w-full">
            <div className="flex items-end justify-start w-full h-[400px] bg-g950 bg-download-banner max-md:h-[300px]">
                <h2 className="text-white text-[32px] font-bold leading-[48px] pb-[80px] pl-[240px] max-md:pb-6 max-md:pl-6 max-md:leading-9">
                    Downloads
                </h2>
                <Image
                    src={SupportDownloadBanner}
                    alt="EYEON"
                    width={1000}
                    height={400}
                    className="w-full h-[400px] absolute z-[-1]"
                ></Image>
            </div>
            <div className="w-full max-w-[1440px] flex mx-auto pt-[120px] pb-[160px] max-md:pt-8 max-md:pb-24 max-md:px-4">
                <Tab
                    items={[
                        {
                            value: "cis",
                            label: "CIS Camera",
                            children: (
                                <DownloadCISCamera data={initialData.cis} />
                            ),
                        },
                        {
                            value: "icd",
                            label: "Control Devices",
                            children: (
                                <DownloadIndustrialControlDevices
                                    data={initialData.lingchen}
                                />
                            ),
                        },
                        {
                            value: "linear",
                            label: "Linear Actuator",
                            children: (
                                <DownloadLinearActuator
                                    data={initialData.tokk}
                                />
                            ),
                        },
                    ]}
                    defaultTab="cis"
                />
            </div>
        </div>
    );
}
