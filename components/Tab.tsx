"use client";

import { useEffect, useState } from "react";

/**
 * items: 탭 아이템 배열
 * defaultTab: 기본 탭
 * onChange: 탭 변경 이벤트
 */
interface TabProps {
    items: {
        value: string;
        label: React.ReactNode;
        children?: React.ReactNode;
    }[];
    defaultTab?: string;
    onChange?: (value: string) => void;
}

export default function Tab({ items, defaultTab, onChange }: TabProps) {
    const [tab, setTab] = useState(defaultTab || items[0]?.value);
    const [isOpen, setIsOpen] = useState(false);

    // defaultTab이 변경될 때 내부 상태도 업데이트
    useEffect(() => {
        if (defaultTab) {
            setTab(defaultTab);
        }
    }, [defaultTab]);

    const handleTabChange = (value: string) => {
        setTab(value);
        setIsOpen(false);
        onChange?.(value);
    };

    return (
        <div className="w-full select-none">
            {/* Desktop 탭 */}
            <div className="max-md:hidden">
                <div className="flex border-b-2 border-g200">
                    {items.map((item) => (
                        <div
                            key={item.value}
                            className={`w-fit cursor-pointer px-9 pb-4 text-[24px] leading-[36px] transition-all duration-150 ${
                                tab === item.value
                                    ? "border-b-4 border-ePrimary text-ePrimary font-semibold mb-[-2px]"
                                    : "border-none text-g400 font-medium"
                            }`}
                            onClick={() => handleTabChange(item.value)}
                        >
                            {item.label}
                        </div>
                    ))}
                </div>
                {items.find((item) => item.value === tab)?.children && (
                    <div>
                        {items.find((item) => item.value === tab)?.children}
                    </div>
                )}
            </div>

            {/* Mobile SelectBox */}
            <div className="md:hidden">
                <div className="relative mb-4 px-4">
                    <div
                        className="w-full cursor-pointer px-4 py-2.5 bg-g50 rounded-full flex justify-between items-center border border-g200"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <span className="text-base leading-5 font-medium text-g950">
                            {items.find((item) => item.value === tab)?.label}
                        </span>
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={`transition-transform duration-200 ${
                                isOpen ? "rotate-180" : ""
                            }`}
                        >
                            <path
                                d="M11.5198 13.7912L8.36852 10.6402C8.32518 10.5967 8.29102 10.5481 8.26602 10.4944C8.24102 10.4409 8.22852 10.3835 8.22852 10.3222C8.22852 10.1997 8.26993 10.0932 8.35277 10.0027C8.4356 9.91235 8.54477 9.86719 8.68027 9.86719H15.3188C15.4543 9.86719 15.5634 9.91285 15.6463 10.0042C15.7291 10.0954 15.7705 10.2018 15.7705 10.3234C15.7705 10.3539 15.7238 10.4595 15.6303 10.6402L12.4793 13.7912C12.4069 13.8637 12.3321 13.9166 12.2548 13.9499C12.1774 13.9833 12.0923 13.9999 11.9995 13.9999C11.9067 13.9999 11.8216 13.9833 11.7443 13.9499C11.6669 13.9166 11.5921 13.8637 11.5198 13.7912Z"
                                fill="#111111"
                            />
                        </svg>
                    </div>

                    {isOpen && (
                        <div className="absolute w-[calc(100%-32px)] mt-1 bg-white border border-g200 rounded-lg shadow-lg z-10 max-h-[300px] overflow-y-auto">
                            {items.map((item) => (
                                <div
                                    key={item.value}
                                    className={`px-4 py-3 cursor-pointer hover:bg-g50 transition-colors ${
                                        tab === item.value
                                            ? "bg-g50 text-ePrimary font-semibold"
                                            : "text-g950"
                                    }`}
                                    onClick={() => handleTabChange(item.value)}
                                >
                                    {item.label}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {items.find((item) => item.value === tab)?.children && (
                    <div>
                        {items.find((item) => item.value === tab)?.children}
                    </div>
                )}
            </div>
        </div>
    );
}
