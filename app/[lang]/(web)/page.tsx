"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import Image from "next/image";
import ContactUs from "@/public/main/contact_us.png";
import ArrowRight from "@/public/svgs/arrow-right.svg";
import Tab from "@/components/Tab";
import EVBattery from "@/public/main/evbattery.png";
import ElectronicDevices from "@/public/main/electronic_device.png";
import SmartLogistics from "@/public/main/smart_logistics.png";
import AutomativeAutomation from "@/public/main/automotive.png";
import Button from "@/components/Button";
import router from "next/router";
import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";

const tempData = [
    {
        title: "Hero Banner Title",
        subDescription: "Sub Description",
        pageName: "CIS Camera",
    },
    {
        title: "Vision Software",
        subDescription: "Sub Description",
        pageName: "Vision Software",
    },
    {
        title: "Industry Control Devices",
        subDescription: "Sub Description",
        pageName: "Industry Control Devices",
    },
];

const tabData = [
    {
        value: "ev_battery",
        label: "EV Battery",
        image: EVBattery,
        title: "EV Battery",
        description: `최신 비주얼 AI 알고리즘 소프트웨어로 리튬 이온 배터리 제조 전 과정을 실시간으로 모니터링하고 분석합니다. 
        이를 통해 리튬 배터리 산업에서 탁월한 생산 효율성과 정밀도를 달성할 수 있습니다.`,
    },
    {
        value: "electronic_devices",
        label: "Electronic Devices",
        image: ElectronicDevices,
        title: "Electronic Devices",
        description: `가전산업의 지능형 제조를 목표로, 생산 효율성, 가공 정확도, 제품 품질을 높이는 혁신적인 비전 솔루션을 제공합니다.`,
    },
    {
        value: "smart_logistics",
        label: "Smart Logistics",
        image: SmartLogistics,
        title: "Smart Logistics",
        description: `빠르고 정확한 진으형 제조 비전 솔루션을 통해, 생산 과정의 효율을 높이고 낭비를 줄이는 린 생산을 지원하여 스마트 물류 운영을 할 수 있도록 돕습니다.`,
    },
    {
        value: "automative_automation",
        label: "Automative&Automation",
        image: AutomativeAutomation,
        title: "Automotive&Automation",
        description: `맞춤형 비전 솔루션을 제공하여 생산 효율성과 품질 안전성을 높여, 제조업의 새로운 패러다임을 제시합니다.`,
    },
];

export default function Home() {
    const { t } = useTranslation();
    const tabComponents = (image: any, title: string, description: string) => {
        return (
            <div className="w-full mt-[80px] flex gap-[138px]">
                <Image src={image.src} alt={title} width={1440} height={400} className="w-[833px] h-[416px]" />
                <div>
                    <h3 className="text-title font-semibold mb-6">{title}</h3>
                    <p className="text-large font-medium">{description}</p>
                </div>
            </div>
        );
    };

    console.log(t?.title, " : title")

    return (
        <main className="min-h-screen">
            <div className="max-w-full">
                <Swiper
                    modules={[Pagination]}
                    pagination={{
                        clickable: true,
                        renderBullet: (index, className) => {
                            return `<span class="${className} text-white font-medium text-titleSmall">${tempData[index].pageName}</span>`;
                        },
                    }}
                    className="mySwiper"
                >
                    {tempData.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="h-[640px] bg-g950 pt-[120px] pl-[239px]">
                                <h2 className="text-titleXl font-semibold text-white mb-3">{item.title}</h2>
                                <p className="text-xl font-medium text-white">{item.subDescription}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className="w-full max-w-[1440px] mx-auto pt-[120px] pb-[80px]">
                <div className="mb-[160px]">
                    <Tab
                        items={tabData.map((item) => ({
                            value: item.value,
                            label: item.label,
                            children: tabComponents(item.image, item.title, item.description),
                        }))}
                        defaultTab="ev_battery"
                    />
                </div>
                <div className="w-full max-w-[1440px] h-[360px] mx-auto relative">
                    <div className="absolute w-full h-[360px] p-[60px]">
                        <h3 className="text-title font-semibold text-white mb-6">Contact Us</h3>
                        <div className="text-large text-white mb-12">
                            정밀 머신비전 솔루션에 대한 궁금한 점이 있나요?
                            <br />
                            EYEON이 도와드리겠습니다.
                        </div>
                        <Link href="/contact">
                            <Button
                                // label={t.contactUs}
                                label="문의하기"
                                btnType="secondary"
                                icRight={<ArrowRight />}
                                onClick={() => {
                                    router.push("/contact");
                                }}
                                size="large"
                                className="text-titleSmall"
                            />
                        </Link>
                    </div>
                    <Image src={ContactUs.src} alt="Contact Us" width={1440} height={400} className="w-full h-[360px]" />
                </div>
            </div>
        </main>
    );
}
