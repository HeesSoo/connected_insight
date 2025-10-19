"use client";

import Checkbox from "@/components/Checkbox";
import Rangebar from "@/components/Rangebar";
import { Arrow2UpIco } from "@/icons/icons";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Filter as FilterType } from "../page";

export default function Filter({ filter, setFilter }: { filter: FilterType; setFilter: Dispatch<SetStateAction<FilterType>> }) {
    // 섹션 확장/축소 상태
    const [sectionExpanded, setSectionExpanded] = useState({
        type: true,
        resolution: true,
    });

    // Type 체크박스 상태
    const [typeFilters, setTypeFilters] = useState({
        PLUS: false,
        MAX: false,
        MAX_PRO: false,
        COLOR: false,
    });

    // Resolution 체크박스 상태
    const [resolutionFilters, setResolutionFilters] = useState({
        "300DPI": false,
        "600DPI": false,
        "900DPI": false,
        "1200DPI": false,
        "1800DPI": false,
        "3600DPI": false,
    });

    // Frame Rate 범위 상태
    const [lineRate, setLineRate] = useState<[number, number]>([10, 160]);

    // FOV 범위 상태
    const [fov, setFov] = useState<[number, number]>([90, 1937]);

    // WD 범위 상태
    const [wd, setWd] = useState<[number, number]>([7, 48]);

    useEffect(() => {
        // 초기 필터 상태 설정
        setTypeFilters({
            PLUS: filter.type.includes("plus"),
            MAX: filter.type.includes("max"),
            MAX_PRO: filter.type.includes("max pro"),
            COLOR: filter.type.includes("color"),
        });

        setResolutionFilters({
            "300DPI": filter.resolution.includes(300),
            "600DPI": filter.resolution.includes(600),
            "900DPI": filter.resolution.includes(900),
            "1200DPI": filter.resolution.includes(1200),
            "1800DPI": filter.resolution.includes(1800),
            "3600DPI": filter.resolution.includes(3600),
        });

        setLineRate([filter.line_rate_min || 10, filter.line_rate_max || 160]);
        setFov([filter.fov_min || 90, filter.fov_max || 1937]);
        setWd([filter.wd_min || 7, filter.wd_max || 48]);
    }, []);

    // Type 체크박스 핸들러
    const handleTypeChange = (type: keyof typeof typeFilters) => {
        setTypeFilters((prev) => ({
            ...prev,
            [type]: !prev[type],
        }));

        let types = [];
        Object.entries(typeFilters).forEach(([key, value]) => {
            if (key === type) {
                if (!value) {
                    types.push(key === "PLUS" ? "plus" : key === "MAX" ? "max" : key === "MAX_PRO" ? "max pro" : "color");
                }
            } else if (value) {
                types.push(key === "PLUS" ? "plus" : key === "MAX" ? "max" : key === "MAX_PRO" ? "max pro" : "color");
            }
        });

        setFilter((prev) => ({
            ...prev,
            type: [...types],
        }));
    };

    // Resolution 체크박스 핸들러
    const handleResolutionChange = (resolution: keyof typeof resolutionFilters) => {
        setResolutionFilters((prev) => ({
            ...prev,
            [resolution]: !prev[resolution],
        }));

        let resolutions = [];
        Object.entries(resolutionFilters).forEach(([key, value]) => {
            if (key === resolution) {
                if (!value) {
                    resolutions.push(key === "300DPI" ? 300 : key === "600DPI" ? 600 : key === "900DPI" ? 900 : key === "1200DPI" ? 1200 : key === "1800DPI" ? 1800 : 3600);
                }
            } else if (value) {
                resolutions.push(key === "300DPI" ? 300 : key === "600DPI" ? 600 : key === "900DPI" ? 900 : key === "1200DPI" ? 1200 : key === "1800DPI" ? 1800 : 3600);
            }
        });

        setFilter((prev) => ({
            ...prev,
            resolution: [...resolutions],
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

            if (shouldSelectAll) {
                setFilter((prev) => ({
                    ...prev,
                    type: ["plus", "max", "max pro", "color"],
                }));
            } else {
                setFilter((prev) => ({
                    ...prev,
                    type: [],
                }));
            }
        } else if (section === "resolution") {
            const currentState = getSectionCheckboxState("resolution");
            const shouldSelectAll = !currentState.checked || currentState.indeterminate;

            setResolutionFilters({
                "300DPI": shouldSelectAll,
                "600DPI": shouldSelectAll,
                "900DPI": shouldSelectAll,
                "1200DPI": shouldSelectAll,
                "1800DPI": shouldSelectAll,
                "3600DPI": shouldSelectAll,
            });

            if (shouldSelectAll) {
                setFilter((prev) => ({
                    ...prev,
                    resolution: [300, 600, 900, 1200, 1800, 3600],
                }));
            } else {
                setFilter((prev) => ({
                    ...prev,
                    resolution: [],
                }));
            }
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
    const SectionHeader = ({ title, isExpanded, onToggle, section }: { title: string; isExpanded: boolean; onToggle: () => void; section: "type" | "resolution" }) => {
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

    const onChangeLineRate = (value: [number, number]) => {
        setLineRate(value);
        setFilter((prev) => ({
            ...prev,
            line_rate_min: value[0],
            line_rate_max: value[1],
        }));
    };

    const onChangeFov = (value: [number, number]) => {
        setFov(value);
        setFilter((prev) => ({
            ...prev,
            fov_min: value[0],
            fov_max: value[1],
        }));
    };
    const onChangeWd = (value: [number, number]) => {
        setWd(value);
        setFilter((prev) => ({
            ...prev,
            wd_min: value[0],
            wd_max: value[1],
        }));
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
                <SectionHeader title="Resolution (DPI)" isExpanded={sectionExpanded.resolution} onToggle={() => handleSectionToggle("resolution")} section="resolution" />
                {sectionExpanded.resolution && (
                    <div className="mt-3 space-y-1">
                        <CheckboxItem checked={resolutionFilters["300DPI"]} onChange={() => handleResolutionChange("300DPI")} label="300DPI" value="300DPI" />
                        <CheckboxItem checked={resolutionFilters["600DPI"]} onChange={() => handleResolutionChange("600DPI")} label="600DPI" value="600DPI" />
                        <CheckboxItem checked={resolutionFilters["900DPI"]} onChange={() => handleResolutionChange("900DPI")} label="900DPI" value="900DPI" />
                        <CheckboxItem checked={resolutionFilters["1200DPI"]} onChange={() => handleResolutionChange("1200DPI")} label="1200DPI" value="1200DPI" />
                        <CheckboxItem checked={resolutionFilters["1800DPI"]} onChange={() => handleResolutionChange("1800DPI")} label="1800DPI" value="1800DPI" />
                        <CheckboxItem checked={resolutionFilters["3600DPI"]} onChange={() => handleResolutionChange("3600DPI")} label="3600DPI" value="3600DPI" />
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-6 mt-6">
                {/* Line Rate 섹션 */}
                <Rangebar
                    label="Line Rate"
                    min={10}
                    max={160}
                    value={lineRate}
                    onChange={onChangeLineRate}
                    unit="kHz"
                    parseValue={(text) => {
                        const cleaned = text.replace(/[^0-9.-]/g, "");
                        return Number.isFinite(Number(cleaned)) ? Number(cleaned) : 11;
                    }}
                />

                {/* FOV 섹션 */}
                <Rangebar
                    label="FOV"
                    min={90}
                    max={1937}
                    value={fov}
                    onChange={onChangeFov}
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
                    max={48}
                    value={wd}
                    onChange={onChangeWd}
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
