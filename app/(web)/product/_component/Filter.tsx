"use client";

import Checkbox from "@/components/Checkbox";
import Rangebar from "@/components/Rangebar";
import { Arrow2UpIco } from "@/icons/icons";
import { useState } from "react";

export default function Filter() {
    // 섹션 확장/축소 상태
    const [sectionExpanded, setSectionExpanded] = useState({
        type: true,
        resolution: true,
    });

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

    // 섹션 토글 핸들러
    const handleSectionToggle = (section: keyof typeof sectionExpanded) => {
        setSectionExpanded((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    // 섹션 체크박스 상태 계산 함수
    const getSectionCheckboxState = (section: "type" | "resolution") => {
        if (section === "type") {
            const values = Object.values(typeFilters);
            const checkedCount = values.filter(Boolean).length;
            const totalCount = values.length;

            if (checkedCount === 0) {
                return { checked: false, indeterminate: false };
            } else if (checkedCount === totalCount) {
                return { checked: true, indeterminate: false };
            } else {
                return { checked: true, indeterminate: true };
            }
        } else if (section === "resolution") {
            const values = Object.values(resolutionFilters);
            const checkedCount = values.filter(Boolean).length;
            const totalCount = values.length;

            if (checkedCount === 0) {
                return { checked: false, indeterminate: false };
            } else if (checkedCount === totalCount) {
                return { checked: true, indeterminate: false };
            } else {
                return { checked: true, indeterminate: true };
            }
        }
        return { checked: false, indeterminate: false };
    };

    // 섹션 체크박스 클릭 핸들러
    const handleSectionCheckboxClick = (section: "type" | "resolution") => {
        if (section === "type") {
            const currentState = getSectionCheckboxState("type");
            const shouldSelectAll = !currentState.checked || currentState.indeterminate;

            setTypeFilters({
                PLUS: shouldSelectAll,
                MAX: shouldSelectAll,
                MAX_PRO: shouldSelectAll,
                COLOR: shouldSelectAll,
            });
        } else if (section === "resolution") {
            const currentState = getSectionCheckboxState("resolution");
            const shouldSelectAll = !currentState.checked || currentState.indeterminate;

            setResolutionFilters({
                "300DPI": shouldSelectAll,
                "600DPI": shouldSelectAll,
                "1200DPI": shouldSelectAll,
                "1800DPI": shouldSelectAll,
                "3600DPI": shouldSelectAll,
            });
        }
    };

    // 체크박스 컴포넌트
    const CheckboxItem = ({ checked, onChange, label, value }: { checked: boolean; onChange: () => void; label: string; value: string }) => (
        <div className="flex items-center gap-1">
            <div className="w-4 h-[1px] bg-g200"></div>
            <Checkbox checked={checked} onChange={onChange} label={label} value={value} textCls="text-sm !font-medium text-g500" />
        </div>
    );

    // 섹션 헤더 컴포넌트
    const SectionHeader = ({
        title,
        isExpanded,
        onToggle,
        section,
    }: {
        title: string;
        isExpanded: boolean;
        onToggle: () => void;
        section: "type" | "resolution";
    }) => {
        const checkboxState = getSectionCheckboxState(section);

        return (
            <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Checkbox
                        checked={checkboxState.checked}
                        indeterminate={checkboxState.indeterminate}
                        onChange={() => handleSectionCheckboxClick(section)}
                        label={title}
                        value={title}
                        textCls="text-base font-semibold text-g900"
                    />
                </div>

                <div className={`cursor-pointer ${isExpanded ? "rotate-0" : "rotate-180"} transition-transform duration-200`} onClick={onToggle}>
                    <Arrow2UpIco />
                </div>
            </div>
        );
    };

    return (
        <div className="w-[329px] bg-white mt-[46px]">
            {/* Type 섹션 */}
            <div className="border-b border-g200 pb-4">
                <SectionHeader title="Type" isExpanded={sectionExpanded.type} onToggle={() => handleSectionToggle("type")} section="type" />
                {sectionExpanded.type && (
                    <div className="mt-3 space-y-2">
                        <CheckboxItem checked={typeFilters.PLUS} onChange={() => handleTypeChange("PLUS")} label="PLUS" value="PLUS" />
                        <CheckboxItem checked={typeFilters.MAX} onChange={() => handleTypeChange("MAX")} label="MAX" value="MAX" />
                        <CheckboxItem checked={typeFilters.MAX_PRO} onChange={() => handleTypeChange("MAX_PRO")} label="MAX PRO" value="MAX_PRO" />
                        <CheckboxItem checked={typeFilters.COLOR} onChange={() => handleTypeChange("COLOR")} label="COLOR" value="COLOR" />
                    </div>
                )}
            </div>

            {/* Resolution 섹션 */}
            <div className="border-b border-g200 py-4">
                <SectionHeader
                    title="Resolution (DPI)"
                    isExpanded={sectionExpanded.resolution}
                    onToggle={() => handleSectionToggle("resolution")}
                    section="resolution"
                />
                {sectionExpanded.resolution && (
                    <div className="mt-3 space-y-1">
                        <CheckboxItem checked={resolutionFilters["300DPI"]} onChange={() => handleResolutionChange("300DPI")} label="300DPI" value="300DPI" />
                        <CheckboxItem checked={resolutionFilters["600DPI"]} onChange={() => handleResolutionChange("600DPI")} label="600DPI" value="600DPI" />
                        <CheckboxItem
                            checked={resolutionFilters["1200DPI"]}
                            onChange={() => handleResolutionChange("1200DPI")}
                            label="1200DPI"
                            value="1200DPI"
                        />
                        <CheckboxItem
                            checked={resolutionFilters["1800DPI"]}
                            onChange={() => handleResolutionChange("1800DPI")}
                            label="1800DPI"
                            value="1800DPI"
                        />
                        <CheckboxItem
                            checked={resolutionFilters["3600DPI"]}
                            onChange={() => handleResolutionChange("3600DPI")}
                            label="3600DPI"
                            value="3600DPI"
                        />
                    </div>
                )}
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
