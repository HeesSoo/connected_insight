"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Selectbox from "@/components/SelectBox";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Upload from "@/public/svgs/upload.svg";
import Apis from "@/hooks/api";

interface Solution {
    uuid: string;
    name: string;
    name_en?: string;
    title?: string;
    title_en?: string;
    description?: string;
    description_en?: string;
    link?: string;
    index: number;
    caption?: string;
    created_at?: string;
    updated_at?: string;
    category?: string;
    file?: File & { uuid: string; s3_url: string; [key: string]: any };
}

export default function SolutionClient({ data }: { data: Solution[] }) {
    const router = useRouter();
    const [applicationDetail, setApplicationDetail] = useState<Solution | null>(data[0] || null);
    const [selectedApplication, setSelectedApplication] = useState<string>(data[0]?.uuid || '');
    const [formData, setFormData] = useState({
        uuid: data[0]?.uuid || '',
        name: data[0]?.name || '',
        name_en: data[0]?.name_en || '',
        title: data[0]?.title || '',
        title_en: data[0]?.title_en || '',
        description: data[0]?.description || '',
        description_en: data[0]?.description_en || '',
        link: data[0]?.link || '',
        index: data[0]?.index || 0,
        caption: data[0]?.caption || '',
        file: data[0]?.file || null,
    });
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

    // SelectBox용 옵션 변환
    const applicationOptions = data?.map((app) => ({
        value: app.uuid,
        label: app.name,
    })) || [];

    const handleSelectChange = (value: string | number) => {
        const uuid = value.toString();
        setSelectedApplication(uuid);

        const application = data.find((app) => app.uuid === uuid);
        if (application) {
            setApplicationDetail(application);
            setFormData({
                uuid: application.uuid || '',
                name: application.name || '',
                name_en: application.name_en || '',
                title: application.title || '',
                title_en: application.title_en || '',
                description: application.description || '',
                description_en: application.description_en || '',
                link: application.link || '',
                index: application.index || 0,
                caption: application.caption || '',
                file: application.file || null,
            });
        }
    };

    const handleInputChange = (field: string, value: string | number) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setUploadedFile(e.target.files[0]);
        }
    };

    const handleFileRemove = () => {
        setUploadedFile(null);
        setFormData((prev) => ({
            ...prev,
            file: null,
        }))
        setApplicationDetail((prev) => ({
            ...prev,
            file: null,
        }))
        const input = document.getElementById('file-upload') as HTMLInputElement;
        if (input) input.value = "";
    };

    const handleSave = async () => {
        try {
            if (!selectedApplication) {
                alert("솔루션을 선택해주세요.");
                return;
            }

            // category가 cis가 아니고 파일이 업로드된 경우 FormData 사용
            const formDataRequest = new FormData();

            // formData의 모든 필드를 FormData에 추가
            Object.entries(formData).forEach(([key, value]) => {
                if (key !== 'file' && value !== null && value !== undefined) {
                    formDataRequest.append(key, value.toString());
                }
            });

            if (formData.file) {
                formDataRequest.append('file_uuid', formData.file.uuid);
            }
            // 새로 업로드한 파일 추가
            formDataRequest.append('file', uploadedFile);

            const response = await Apis.patch(
                `http://localhost:8080/api/solution/category/${selectedApplication}`,
                formDataRequest,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            alert("솔루션이 성공적으로 수정되었습니다.");
            setUploadedFile(null);
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
                    {/* Application Selection */}
                    <div className="mb-12">
                        <h3 className="text-titleSmall text-ePrimary font-semibold mb-2">
                            솔루션 선택
                        </h3>
                        <hr className="mb-6 bg-g200" />

                        <div className="max-w-md">
                            <Selectbox
                                label="솔루션"
                                placeholder="솔루션을 선택하세요"
                                options={applicationOptions}
                                initialValue={selectedApplication}
                                onChange={handleSelectChange}
                                isRequired={true}
                            />
                        </div>
                    </div>

                    {/* Application Detail Form */}
                    {selectedApplication && applicationDetail && (
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
                                    onChange={(e) => handleInputChange("name", e.target.value)}
                                    placeholder="솔루션 이름을 입력하세요"
                                    isRequired={true}
                                />

                                <Input
                                    label="제목"
                                    value={formData.title}
                                    onChange={(e) => handleInputChange("title", e.target.value)}
                                    placeholder="솔루션 제목을 입력하세요"
                                />
                                <Input
                                    label="제목 영문"
                                    value={formData.title_en}
                                    onChange={(e) => handleInputChange("title_en", e.target.value)}
                                    placeholder="솔루션 제목을 입력하세요"
                                />

                                <Input
                                    label="설명"
                                    value={formData.description}
                                    onChange={(e) => handleInputChange("description", e.target.value)}
                                    placeholder="솔루션 설명을 입력하세요"
                                />
                                <Input
                                    label="설명 영문"
                                    value={formData.description_en}
                                    onChange={(e) => handleInputChange("description_en", e.target.value)}
                                    placeholder="솔루션 설명을 입력하세요"
                                />

                                <Input
                                    label="Caption"
                                    value={formData.caption}
                                    onChange={(e) => handleInputChange("caption", e.target.value)}
                                    placeholder="caption을 입력하세요"
                                />

                                <Input
                                    label="순서"
                                    type="number"
                                    value={formData.index.toString()}
                                    onChange={(e) => handleInputChange("index", parseInt(e.target.value) || 0)}
                                    placeholder="순서를 입력하세요"
                                />

                                {
                                    applicationDetail?.category === 'cis' ? (
                                        <Input
                                            label="URL"
                                            value={formData.link}
                                            onChange={(e) => handleInputChange("link", e.target.value)}
                                            placeholder="유튜브 링크를 입력하세요"
                                        />
                                    ) : (
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
                                                        ) : applicationDetail?.file ? (
                                                            <a
                                                                href={applicationDetail.file as any}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-sm hover:underline"
                                                            >
                                                                {applicationDetail.file.name}
                                                            </a>
                                                        ) : (
                                                            <></>
                                                        )}
                                                    </div>
                                                    {(uploadedFile || applicationDetail?.file) && (
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
                                    )
                                }
                            </div>
                        </div>
                    )}

                    {!selectedApplication && (
                        <div className="text-center py-12 text-g400">
                            솔루션을 선택하면 상세 정보가 나타납니다.
                        </div>
                    )}

                    {/* Action Buttons */}
                    {selectedApplication && (
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
