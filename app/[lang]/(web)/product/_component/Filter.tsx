"use client";

import Checkbox from "@/components/Checkbox";
import Rangebar from "@/components/Rangebar";
import { Arrow2UpIco } from "@/icons/icons";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Filter as FilterType } from "./ProductListClient";
import Button from "@/components/Button";

export default function Filter({
    filter,
    setFilter,
}: {
    filter: FilterType;
    setFilter: Dispatch<SetStateAction<FilterType>>;
}) {
    return (
        <>
            <div className="w-[329px] bg-white mt-[46px] select-none max-md:hidden">
                <Filters filter={filter} setFilter={setFilter} />
            </div>

            <MobileFilter filter={filter} setFilter={setFilter} />
        </>
    );
}

const MobileFilter = ({
    filter,
    setFilter,
}: {
    filter: FilterType;
    setFilter: Dispatch<SetStateAction<FilterType>>;
}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="md:hidden w-full -mt-[44px] mb-14">
            <button
                className="w-full flex items-center justify-center gap-2 h-10 bg-ePrimary text-white rounded-full"
                onClick={() => setIsOpen(true)}
            >
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M17.6538 19.6552C16.7169 19.6552 15.925 19.3317 15.278 18.6849C14.6312 18.0379 14.3077 17.246 14.3077 16.3092C14.3077 15.3722 14.6312 14.5802 15.278 13.9334C15.925 13.2864 16.7169 12.9629 17.6538 12.9629C18.5908 12.9629 19.3827 13.2864 20.0295 13.9334C20.6765 14.5802 21 15.3722 21 16.3092C21 17.246 20.6765 18.0379 20.0295 18.6849C19.3827 19.3317 18.5908 19.6552 17.6538 19.6552ZM17.6528 18.1552C18.1624 18.1552 18.5977 17.9751 18.9587 17.6149C19.3196 17.2546 19.5 16.8197 19.5 16.3102C19.5 15.8005 19.3198 15.3652 18.9595 15.0042C18.5993 14.6433 18.1644 14.4629 17.6547 14.4629C17.1451 14.4629 16.7098 14.6431 16.349 15.0034C15.9882 15.3636 15.8077 15.7985 15.8077 16.3082C15.8077 16.8178 15.9878 17.2531 16.348 17.6139C16.7083 17.9747 17.1432 18.1552 17.6528 18.1552ZM4.5 17.0592V15.5592H12.1155V17.0592H4.5ZM6.34625 11.0399C5.40925 11.0399 4.61733 10.7164 3.9705 10.0694C3.3235 9.42257 3 8.63066 3 7.69366C3 6.75682 3.3235 5.96491 3.9705 5.31791C4.61733 4.67107 5.40925 4.34766 6.34625 4.34766C7.28308 4.34766 8.075 4.67107 8.722 5.31791C9.36883 5.96491 9.69225 6.75682 9.69225 7.69366C9.69225 8.63066 9.36883 9.42257 8.722 10.0694C8.075 10.7164 7.28308 11.0399 6.34625 11.0399ZM6.34525 9.53991C6.85492 9.53991 7.29017 9.35974 7.651 8.99941C8.01183 8.63924 8.19225 8.20432 8.19225 7.69466C8.19225 7.18499 8.01217 6.74974 7.652 6.38891C7.29167 6.02807 6.85675 5.84766 6.34725 5.84766C5.83758 5.84766 5.40225 6.02774 5.04125 6.38791C4.68042 6.74824 4.5 7.18316 4.5 7.69266C4.5 8.20232 4.68017 8.63766 5.0405 8.99866C5.40067 9.35949 5.83558 9.53991 6.34525 9.53991ZM11.8845 8.44366V6.94366H19.5V8.44366H11.8845Z"
                        fill="white"
                    />
                </svg>
                Filter
            </button>

            {/* 모달 백드롭 */}
            {isOpen && (
                <div className="fixed inset-0 bg-[#111111] bg-opacity-15 z-40 flex justify-end flex-col">
                    <div className="w-full h-4/5 bg-white flex flex-col">
                        <div className="w-full h-fit px-4 py-3 border-b border-g200 flex justify-end">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                onClick={() => setIsOpen(false)}
                            >
                                <path
                                    d="M11.9995 13.0543L6.92652 18.1275C6.78802 18.2658 6.61394 18.3367 6.40427 18.34C6.19477 18.3432 6.01752 18.2723 5.87252 18.1275C5.72769 17.9825 5.65527 17.8068 5.65527 17.6005C5.65527 17.3942 5.72769 17.2185 5.87252 17.0735L10.9458 12.0005L5.87252 6.9275C5.73419 6.789 5.66336 6.61492 5.66002 6.40525C5.65686 6.19575 5.72769 6.0185 5.87252 5.8735C6.01752 5.72867 6.19319 5.65625 6.39952 5.65625C6.60586 5.65625 6.78152 5.72867 6.92652 5.8735L11.9995 10.9468L17.0725 5.8735C17.211 5.73517 17.3851 5.66433 17.5948 5.661C17.8043 5.65783 17.9815 5.72867 18.1265 5.8735C18.2714 6.0185 18.3438 6.19417 18.3438 6.4005C18.3438 6.60683 18.2714 6.7825 18.1265 6.9275L13.0533 12.0005L18.1265 17.0735C18.2649 17.212 18.3357 17.3861 18.339 17.5958C18.3422 17.8053 18.2714 17.9825 18.1265 18.1275C17.9815 18.2723 17.8059 18.3448 17.5995 18.3448C17.3932 18.3448 17.2175 18.2723 17.0725 18.1275L11.9995 13.0543Z"
                                    fill="#161616"
                                />
                            </svg>
                        </div>

                        <div className="w-full flex-1 px-4 py-8 overflow-y-auto">
                            <Filters filter={filter} setFilter={setFilter} />
                        </div>

                        <div className="p-4 border-t border-g200">
                            <Button
                                label="Confirm"
                                btnType="secondary"
                                size="medium"
                                className="w-full"
                                onClick={() => setIsOpen(false)}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const Filters = ({
    filter,
    setFilter,
}: {
    filter: FilterType;
    setFilter: Dispatch<SetStateAction<FilterType>>;
}) => {
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
            MAX_PRO: filter.type.includes("maxpro"),
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
                    types.push(
                        key === "PLUS"
                            ? "plus"
                            : key === "MAX"
                            ? "max"
                            : key === "MAX_PRO"
                            ? "maxpro"
                            : "color"
                    );
                }
            } else if (value) {
                types.push(
                    key === "PLUS"
                        ? "plus"
                        : key === "MAX"
                        ? "max"
                        : key === "MAX_PRO"
                        ? "maxpro"
                        : "color"
                );
            }
        });

        setFilter((prev) => ({
            ...prev,
            type: [...types],
        }));
    };

    // Resolution 체크박스 핸들러
    const handleResolutionChange = (
        resolution: keyof typeof resolutionFilters
    ) => {
        setResolutionFilters((prev) => ({
            ...prev,
            [resolution]: !prev[resolution],
        }));

        let resolutions = [];
        Object.entries(resolutionFilters).forEach(([key, value]) => {
            if (key === resolution) {
                if (!value) {
                    resolutions.push(
                        key === "300DPI"
                            ? 300
                            : key === "600DPI"
                            ? 600
                            : key === "900DPI"
                            ? 900
                            : key === "1200DPI"
                            ? 1200
                            : key === "1800DPI"
                            ? 1800
                            : 3600
                    );
                }
            } else if (value) {
                resolutions.push(
                    key === "300DPI"
                        ? 300
                        : key === "600DPI"
                        ? 600
                        : key === "900DPI"
                        ? 900
                        : key === "1200DPI"
                        ? 1200
                        : key === "1800DPI"
                        ? 1800
                        : 3600
                );
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
            const shouldSelectAll =
                !currentState.checked || currentState.indeterminate;

            setTypeFilters({
                PLUS: shouldSelectAll,
                MAX: shouldSelectAll,
                MAX_PRO: shouldSelectAll,
                COLOR: shouldSelectAll,
            });

            if (shouldSelectAll) {
                setFilter((prev) => ({
                    ...prev,
                    type: ["plus", "max", "maxpro", "color"],
                }));
            } else {
                setFilter((prev) => ({
                    ...prev,
                    type: [],
                }));
            }
        } else if (section === "resolution") {
            const currentState = getSectionCheckboxState("resolution");
            const shouldSelectAll =
                !currentState.checked || currentState.indeterminate;

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
    const CheckboxItem = ({
        checked,
        onChange,
        label,
        value,
    }: {
        checked: boolean;
        onChange: () => void;
        label: string;
        value: string;
    }) => (
        <div className="flex items-center gap-1">
            <div className="w-4 h-[1px] bg-g200"></div>
            <Checkbox
                checked={checked}
                onChange={onChange}
                label={label}
                value={value}
                textCls="text-sm !font-medium text-g500"
            />
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

                <div
                    className={`cursor-pointer ${
                        isExpanded ? "rotate-0" : "rotate-180"
                    } transition-transform duration-200`}
                    onClick={onToggle}
                >
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

    const types = [
        {
            label: "PLUS (300dpi, 600dpi, 1200dpi)",
            value: "PLUS",
        },
        { label: "MAX (900dpi, 1800dpi)", value: "MAX" },
        { label: "MAX PRO (3600dpi)", value: "MAX_PRO" },
        { label: "COLOR (300dpi, 600dpi, 900dpi, 1800dpi)", value: "COLOR" },
    ];

    const resolutions = [
        "300DPI",
        "600DPI",
        "900DPI",
        "1200DPI",
        "1800DPI",
        "3600DPI",
    ];

    return (
        <>
            {/* Type 섹션 */}
            <div className="border-b border-g200 pb-4">
                <SectionHeader
                    title="Model"
                    isExpanded={sectionExpanded.type}
                    onToggle={() => handleSectionToggle("type")}
                    section="type"
                />
                {sectionExpanded.type && (
                    <div className="mt-3 space-y-2">
                        {types.map((type) => (
                            <CheckboxItem
                                key={type.value}
                                checked={
                                    typeFilters[
                                        type.value as keyof typeof typeFilters
                                    ]
                                }
                                onChange={() =>
                                    handleTypeChange(
                                        type.value as keyof typeof typeFilters
                                    )
                                }
                                label={type.label}
                                value={type.value}
                            />
                        ))}
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
                        {resolutions.map((resolution) => (
                            <CheckboxItem
                                checked={
                                    resolutionFilters[
                                        resolution as keyof typeof resolutionFilters
                                    ]
                                }
                                onChange={() =>
                                    handleResolutionChange(
                                        resolution as keyof typeof resolutionFilters
                                    )
                                }
                                label={resolution}
                                value={resolution}
                            />
                        ))}
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
                        return Number.isFinite(Number(cleaned))
                            ? Number(cleaned)
                            : 11;
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
                        return Number.isFinite(Number(cleaned))
                            ? Number(cleaned)
                            : 165;
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
                        return Number.isFinite(Number(cleaned))
                            ? Number(cleaned)
                            : 7;
                    }}
                />
            </div>
        </>
    );
};
