"use client";

import Rangebar from "@/components/Rangebar";
import { Arrow2UpIco } from "@/icons/icons";
import { useState } from "react";

export default function Filter() {
    // Type 체크박스 상태
    const [typeFilters, setTypeFilters] = useState({
        PLUS: true,
        MAX: true,
        MAX_PRO: true,
        COLOR: true,
    });

    // Resolution 체크박스 상태
    const [resolutionFilters, setResolutionFilters] = useState({
        "300DPI": false,
        "600DPI": true,
        "1200DPI": true,
        "1800DPI": false,
        "3600DPI": false,
    });

    // Frame Rate 범위 상태
    const [frameRate, setFrameRate] = useState<[number, number]>([11, 160]);

    // FOV 범위 상태
    const [fov, setFov] = useState<[number, number]>([165, 1600]);

    // WD 범위 상태
    const [wd, setWd] = useState<[number, number]>([7, 11]);

    // Type 체크박스 핸들러
    const handleTypeChange = (type: keyof typeof typeFilters) => {
        setTypeFilters((prev) => ({
            ...prev,
            [type]: !prev[type],
        }));
    };

    // Resolution 체크박스 핸들러
    const handleResolutionChange = (resolution: keyof typeof resolutionFilters) => {
        setResolutionFilters((prev) => ({
            ...prev,
            [resolution]: !prev[resolution],
        }));
    };

    // 체크박스 컴포넌트
    const CheckboxItem = ({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) => (
        <div className="flex items-center gap-2 py-1">
            <div className="w-3 h-3 border border-gray-300"></div>
            <button onClick={onChange} className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900">
                <div
                    className={`w-4 h-4 border-2 rounded flex items-center justify-center ${
                        checked ? "border-red-500 bg-red-500" : "border-gray-300 bg-white"
                    }`}
                >
                    {checked && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    )}
                </div>
                <span>{label}</span>
            </button>
        </div>
    );

    // 섹션 헤더 컴포넌트
    const SectionHeader = ({ title, isExpanded, onToggle }: { title: string; isExpanded: boolean; onToggle: () => void }) => (
        <button onClick={onToggle} className="w-full flex items-center justify-between text-left">
            <div className="flex items-center gap-2">
                <div
                    className={`w-4 h-4 border-2 rounded flex items-center justify-center ${
                        isExpanded ? "border-red-500 bg-red-500" : "border-gray-300 bg-white"
                    }`}
                >
                    {isExpanded && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    )}
                </div>
                <span className="text-base font-semibold text-gray-900">{title}</span>
            </div>

            <div className={`transition-transform duration-200 ${isExpanded ? "" : "rotate-180"}`}>
                <Arrow2UpIco />
            </div>
        </button>
    );

    return (
        <div className="w-[329px] bg-white">
            {/* Type 섹션 */}
            <div className="border-b border-gray-200 pb-4">
                <SectionHeader title="Type" isExpanded={true} onToggle={() => {}} />
                <div className="mt-3 space-y-1">
                    <CheckboxItem checked={typeFilters.PLUS} onChange={() => handleTypeChange("PLUS")} label="PLUS" />
                    <CheckboxItem checked={typeFilters.MAX} onChange={() => handleTypeChange("MAX")} label="MAX" />
                    <CheckboxItem checked={typeFilters.MAX_PRO} onChange={() => handleTypeChange("MAX_PRO")} label="MAX PRO" />
                    <CheckboxItem checked={typeFilters.COLOR} onChange={() => handleTypeChange("COLOR")} label="COLOR" />
                </div>
            </div>

            {/* Resolution 섹션 */}
            <div className="border-b border-gray-200 py-4">
                <SectionHeader title="Resolution (DPI)" isExpanded={true} onToggle={() => {}} />
                <div className="mt-3 space-y-1">
                    <CheckboxItem checked={resolutionFilters["300DPI"]} onChange={() => handleResolutionChange("300DPI")} label="300DPI" />
                    <CheckboxItem checked={resolutionFilters["600DPI"]} onChange={() => handleResolutionChange("600DPI")} label="600DPI" />
                    <CheckboxItem checked={resolutionFilters["1200DPI"]} onChange={() => handleResolutionChange("1200DPI")} label="1200DPI" />
                    <CheckboxItem checked={resolutionFilters["1800DPI"]} onChange={() => handleResolutionChange("1800DPI")} label="1800DPI" />
                    <CheckboxItem checked={resolutionFilters["3600DPI"]} onChange={() => handleResolutionChange("3600DPI")} label="3600DPI" />
                </div>
            </div>

            <div className="flex flex-col gap-6 mt-6">
                {/* Frame Rate 섹션 */}
                <Rangebar
                    label="Frame Rate"
                    min={11}
                    max={160}
                    value={frameRate}
                    onChange={setFrameRate}
                    unit="kHz"
                    parseValue={(text) => {
                        const cleaned = text.replace(/[^0-9.-]/g, "");
                        return Number.isFinite(Number(cleaned)) ? Number(cleaned) : 11;
                    }}
                />

                {/* FOV 섹션 */}
                <Rangebar
                    label="FOV"
                    min={165}
                    max={1600}
                    value={fov}
                    onChange={setFov}
                    unit="mm"
                    parseValue={(text) => {
                        const cleaned = text.replace(/[^0-9.-]/g, "");
                        return Number.isFinite(Number(cleaned)) ? Number(cleaned) : 165;
                    }}
                />

                {/* WD 섹션 */}
                <Rangebar
                    label="WD"
                    min={7}
                    max={11}
                    value={wd}
                    onChange={setWd}
                    unit="mm"
                    parseValue={(text) => {
                        const cleaned = text.replace(/[^0-9.-]/g, "");
                        return Number.isFinite(Number(cleaned)) ? Number(cleaned) : 7;
                    }}
                />
            </div>
        </div>
    );
}
