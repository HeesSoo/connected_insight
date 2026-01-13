"use client";

import { useState, useEffect } from "react";
import { useEnumStore } from "@/store/enumStore";
import Selectbox from "@/components/SelectBox";
import ThumbnailManager, { ThumbnailItem } from "@/components/ThumbnailManager";
import Button from "@/components/Button";
import Apis from "@/hooks/api";

export default function ThumbnailManagementClient() {
    const enumData = useEnumStore((state) => state.data);
    const cisEnum = enumData?.cis || [];

    const [selectedType, setSelectedType] = useState<string>("");
    const [thumbnails, setThumbnails] = useState<ThumbnailItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // CIS 타입에 따른 model enum 값 반환 (CisProductEnum - 공백 포함)
    const getModelEnumValue = (cisType: string): string => {
        const modelMap: Record<string, string> = {
            "LineX Plus": "plus",
            "LineX Max": "max",
            "LineX MAX PRO": "maxpro", // 공백 포함
            "LineX COLOR": "color",
        };
        return modelMap[cisType] || "plus";
    };

    // CIS 타입에 따른 type enum 값 반환 (CisFileType - 공백 없음)
    const getFileTypeEnumValue = (cisType: string): string => {
        const typeMap: Record<string, string> = {
            "LineX Plus": "plus",
            "LineX Max": "max",
            "LineX MAX PRO": "maxpro", // 공백 없음
            "LineX COLOR": "color",
        };
        return typeMap[cisType] || "plus";
    };

    // 선택된 타입의 썸네일 불러오기
    useEffect(() => {
        if (!selectedType) return;

        const fetchThumbnails = async () => {
            setIsLoading(true);
            try {
                // selectedType을 CisFileType enum 값으로 변환
                const fileType = encodeURIComponent(selectedType);

                const response = await Apis.get(
                    `/cis/thumbnail?type=${fileType}`
                );

                const cisProducts = response.data.data || [];

                // 백엔드 데이터를 ThumbnailItem 형식으로 변환
                const thumbnailData: ThumbnailItem[] = cisProducts.map((item: any) => ({
                    uuid: item.uuid,
                    order: item.order,
                    s3_url: item.file?.s3_url,
                }));

                setThumbnails(thumbnailData);
            } catch (error) {
                console.error("Failed to fetch thumbnails:", error);
                alert("썸네일을 불러오는데 실패했습니다.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchThumbnails();
    }, [selectedType]);

    const handleSave = async () => {
        if (!selectedType) {
            alert("제품 타입을 선택해주세요.");
            return;
        }

        setIsSaving(true);
        try {
            // FormData 생성
            const formData = new FormData();

            // 새 파일들만 별도로 수집
            const newFiles: File[] = [];
            let fileIndexCounter = 0;

            // 백엔드가 요구하는 형식으로 데이터 구성
            const thumbnailsData = thumbnails.map((item, index) => {
                let file_index = undefined;

                if (item.file) {
                    file_index = fileIndexCounter;
                    newFiles.push(item.file);
                    fileIndexCounter++;
                }

                // uuid가 'new-'로 시작하면 새 항목이므로 uuid를 보내지 않음
                return {
                    ...(item.uuid && !item.uuid.startsWith('new-') && { uuid: item.uuid }),
                    order: index,
                    ...(file_index !== undefined && { file_index }),
                };
            });

            formData.append("model", getModelEnumValue(selectedType));
            formData.append("type", getFileTypeEnumValue(selectedType));
            formData.append("thumbnails", JSON.stringify(thumbnailsData));

            // 새 파일들 추가
            newFiles.forEach((file) => {
                formData.append("files", file);
            });

            // API 호출
            await Apis.patch(
                `/cis/thumbnail`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            alert("썸네일이 성공적으로 저장되었습니다.");
        } catch (error: any) {
            console.error("Failed to save thumbnails:", error);
            alert("썸네일 저장에 실패했습니다.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="min-h-screen">
            <div className="max-w-[1440px] mx-auto p-8">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-title font-semibold text-g950 mb-2">
                        제품 썸네일 관리
                    </h1>
                    <p className="text-base text-g400">
                        제품 타입별 썸네일 이미지를 관리하세요
                    </p>
                </div>

                {/* Form Container */}
                <div className="bg-white rounded-lg shadow-sm p-12">
                    {/* 제품 타입 선택 */}
                    <div className="mb-12">
                        <h3 className="text-titleSmall text-ePrimary font-semibold mb-2">
                            제품 타입 선택
                        </h3>
                        <hr className="mb-6 bg-g200" />

                        <div className="max-w-md">
                            <Selectbox
                                label="제품 타입"
                                placeholder="타입을 선택하세요"
                                options={cisEnum}
                                initialValue={selectedType}
                                onChange={(value) => setSelectedType(value.toString())}
                                isRequired={true}
                            />
                        </div>
                    </div>

                    {/* 썸네일 관리 영역 */}
                    {selectedType && (
                        <div className="mb-12">
                            <hr className="mb-6 bg-g200" />

                            {isLoading ? (
                                <div className="flex items-center justify-center py-12">
                                    <div className="text-base text-g400">
                                        썸네일을 불러오는 중...
                                    </div>
                                </div>
                            ) : (
                                <ThumbnailManager
                                    thumbnails={thumbnails}
                                    onChange={setThumbnails}
                                    maxCount={6}
                                />
                            )}
                        </div>
                    )}

                    {/* Action Buttons */}
                    {selectedType && (
                        <div className="flex justify-end gap-4 pt-6 border-t border-g200">
                            <Button
                                label="취소"
                                onClick={() => {
                                    setSelectedType("");
                                    setThumbnails([]);
                                }}
                                btnType="primary"
                                size="medium"
                                className="w-[140px]"
                            />
                            <Button
                                label={isSaving ? "저장 중..." : "저장"}
                                onClick={handleSave}
                                disabled={isSaving || thumbnails.length === 0}
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
