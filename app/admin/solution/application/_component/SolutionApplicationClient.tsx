"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Selectbox from "@/components/SelectBox";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Apis from "@/hooks/api";
import Upload from "@/public/svgs/upload.svg";

interface SolutionApplication {
    uuid: string;
    name: string;
    name_en?: string;
    core_inspector_target_ko: string;
    core_inspector_target_en: string;
    core_value_ko: string;
    core_value_en: string;
    index: number;
    created_at?: string;
    updated_at?: string;
    file_uuid?: string;
    s3_url?: string;
    file?: File & { uuid?: string; s3_url?: string; }
}

export default function SolutionApplicationClient({ data }: { data: SolutionApplication[] }) {
    const router = useRouter();
    const [selectedSolution, setSelectedSolution] = useState<string>(data[0]?.uuid || "");
    const [solutionDetail, setSolutionDetail] = useState<SolutionApplication | null>(data[0] || null);
    const [formData, setFormData] = useState({
        uuid: solutionDetail?.uuid || '',
        name: solutionDetail?.name || '',
        name_en: solutionDetail?.name_en || '',
        core_inspector_target_ko: solutionDetail?.core_inspector_target_ko || '',
        core_inspector_target_en: solutionDetail?.core_inspector_target_en || '',
        core_value_ko: solutionDetail?.core_value_ko || '',
        core_value_en: solutionDetail?.core_value_en || '',
        index: solutionDetail?.index || 0,
    });

    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

    // SelectBox용 옵션 변환
    const solutionOptions = data?.map((solution) => ({
        value: solution.uuid,
        label: solution.name,
    })) || [];

    const handleSelectChange = (value: string | number) => {
        const uuid = value.toString();
        setSelectedSolution(uuid);

        const solution = data.find((s) => s.uuid === uuid);
        if (solution) {
            setSolutionDetail(solution);
            setFormData({
                uuid: solution.uuid || '',
                name: solution.name || '',
                name_en: solution.name_en || '',
                core_inspector_target_ko: solution.core_inspector_target_ko || '',
                core_inspector_target_en: solution.core_inspector_target_en || '',
                core_value_ko: solution.core_value_ko || '',
                core_value_en: solution.core_value_en || '',
                index: solution.index || 0,
            });

            // 이미지 업데이트
            setUploadedFile(null);
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setUploadedFile(file);
        }
    };

    const handleFileRemove = () => {
        setUploadedFile(null);
        setFormData((prev) => ({
            ...prev,
            file: null,
        }))
        setSolutionDetail((prev) => ({
            ...prev,
            file: null,
        }))
        const input = document.getElementById('file-upload') as HTMLInputElement;
        if (input) input.value = "";
    };

    const handleInputChange = (field: string, value: string | number) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSave = async () => {
        try {
            if (!selectedSolution) {
                alert("솔루션을 선택해주세요.");
                return;
            }

            const formDataRequest = new FormData();

            // formData의 모든 필드를 FormData에 추가
            Object.entries(formData).forEach(([key, value]) => {
                if (value !== null && value !== undefined) {
                    formDataRequest.append(key, value.toString());
                }
            });

            // 파일 처리
            if (uploadedFile) {
                // 새로운 파일이 업로드된 경우
                formDataRequest.append('file', uploadedFile);
            } else if (solutionDetail?.file_uuid) {
                // 기존 파일을 유지하는 경우
                formDataRequest.append('file_uuid', solutionDetail.file_uuid);
            } else {
                // 이미지가 삭제된 경우
                formDataRequest.append('file_uuid', '');
            }

            const response = await Apis.patch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/solution`,
                formDataRequest,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            alert("솔루션이 성공적으로 수정되었습니다.");
            router.refresh();
        } catch (err) {
            console.error("Update error:", err);
            alert("솔루션 수정에 실패했습니다.");
        }
    };

    return (
        <div className="min-h-screen">
            <div className="max-w-[1440px] mx-auto p-8">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-title font-semibold text-g950 mb-2">
                        솔루션 관리
                    </h1>
                    <p className="text-base text-g400">
                        솔루션 정보를 조회하고 수정하세요
                    </p>
                </div>

                {/* Form Container */}
                <div className="bg-white rounded-lg shadow-sm p-12">
                    {/* Solution Selection */}
                    <div className="mb-12">
                        <h3 className="text-titleSmall text-ePrimary font-semibold mb-2">
                            솔루션 선택
                        </h3>
                        <hr className="mb-6 bg-g200" />

                        <div className="max-w-md">
                            <Selectbox
                                label="솔루션"
                                placeholder="솔루션을 선택하세요"
                                options={solutionOptions}
                                initialValue={selectedSolution}
                                onChange={handleSelectChange}
                                isRequired={true}
                            />
                        </div>
                    </div>

                    {/* Solution Detail Form */}
                    {selectedSolution && solutionDetail && (
                        <div className="mb-12">
                            <h3 className="text-titleSmall text-ePrimary font-semibold mb-2">
                                솔루션 정보
                            </h3>
                            <hr className="mb-6 bg-g200" />

                            <div className="grid grid-cols-2 gap-x-[15px] gap-y-[24px]">
                                <Input
                                    label="이름"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange("name", e.target.value)}
                                    placeholder="솔루션 이름을 입력하세요"
                                    isRequired={true}
                                />
                                <Input
                                    label="이름 (영문)"
                                    value={formData.name_en}
                                    onChange={(e) => handleInputChange("name_en", e.target.value)}
                                    placeholder="솔루션 이름을 입력하세요"
                                    isRequired={true}
                                />
                                
                                <Input
                                    label="핵심 검사 대상"
                                    value={formData.core_inspector_target_ko}
                                    onChange={(e) => handleInputChange("core_inspector_target_ko", e.target.value)}
                                    placeholder="핵심 검사 대상을 입력하세요"
                                    isRequired={true}
                                />

                                <Input
                                    label="핵심 검사 대상 (영문)"
                                    value={formData.core_inspector_target_en}
                                    onChange={(e) => handleInputChange("core_inspector_target_en", e.target.value)}
                                    placeholder="핵심 검사 대상을 입력하세요"
                                    isRequired={true}
                                />

                                <Input
                                    label="핵심 가치"
                                    value={formData.core_value_ko}
                                    onChange={(e) => handleInputChange("core_value_ko", e.target.value)}
                                    placeholder="핵심 가치을 입력하세요"
                                />

                                <Input
                                    label="핵심 가치 (영문)"
                                    value={formData.core_value_en}
                                    onChange={(e) => handleInputChange("core_value_en", e.target.value)}
                                    placeholder="핵심 가치을 입력하세요"
                                />

                                <Input
                                    label="순서"
                                    type="number"
                                    value={formData.index.toString()}
                                    onChange={(e) => handleInputChange("index", parseInt(e.target.value) || 0)}
                                    placeholder="순서를 입력하세요"
                                />
                                {/* 이미지 업로드 섹션 */}
                                {
                                    <div className="space-y-4 col-span-2">
                                        <label className="text-base font-semibold text-g900">
                                            파일
                                        </label>

                                        <div className="flex gap-2">
                                            {/* 파일 표시 영역 */}
                                            <div className="flex items-center gap-4 p-2 bg-g50 rounded border border-g200 w-[500px]">
                                                <div className="flex-1">
                                                    {uploadedFile ? (
                                                        <span className="text-sm font-medium text-g900">
                                                            {uploadedFile.name}
                                                        </span>
                                                    ) : solutionDetail?.file ? (
                                                        <a
                                                            href={solutionDetail.file.s3_url as any}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-sm hover:underline"
                                                        >
                                                            {solutionDetail.file.name}
                                                        </a>
                                                    ) : (
                                                        <></>
                                                    )}
                                                </div>
                                                {(uploadedFile || solutionDetail?.file) && (
                                                    <button
                                                        onClick={handleFileRemove}
                                                        className="bg-red-500 text-xs text-white rounded w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                                                        type="button"
                                                    >
                                                        ✕
                                                    </button>
                                                )}
                                            </div>

                                            {/* 파일 업로드 버튼 */}
                                            <div className="flex items-center gap-4">
                                                <label
                                                    htmlFor="file-upload"
                                                    className="flex gap-2 items-center px-3 py-2 border border-g200 rounded-[2px] cursor-pointer hover:border-ePrimary transition-colors"
                                                >
                                                    <Upload width={24} height={24} />
                                                    <span className="text-base font-semibold text-g900">
                                                        파일 업로드
                                                    </span>
                                                </label>
                                                <input
                                                    type="file"
                                                    id="file-upload"
                                                    onChange={handleFileUpload}
                                                    className="w-0 h-0"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>

                        </div>
                    )}

                    {!selectedSolution && (
                        <div className="text-center py-12 text-g400">
                            솔루션을 선택하면 상세 정보가 나타납니다.
                        </div>
                    )}

                    {/* Action Buttons */}
                    {selectedSolution && (
                        <div className="flex justify-end gap-4 pt-6 bindex-t bindex-g200">
                            <Button
                                label="저장"
                                onClick={handleSave}
                                btnType="secondary"
                                size="medium"
                                className="w-[140px]"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}