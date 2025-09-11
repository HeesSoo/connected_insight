"use client";

import { useState } from "react";

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

    const handleTabChange = (value: string) => {
        setTab(value);
        onChange?.(value);
    };

    return (
        <div className="w-full">
            <div className="flex border-b-2 border-g200">
                {items.map((item) => (
                    <div
                        key={item.value}
                        className={`w-fit cursor-pointer px-12 pb-4 text-[24px] leading-[36px] ${
                            tab === item.value ? "border-b-4 border-ePrimary text-ePrimary font-semibold" : "border-none text-g400 font-medium"
                        }`}
                        onClick={() => handleTabChange(item.value)}
                    >
                        {item.label}
                    </div>
                ))}
            </div>
            {items.find((item) => item.value === tab)?.children && <div>{items.find((item) => item.value === tab)?.children}</div>}
        </div>
    );
}
