"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Selectbox from "@/components/SelectBox";
import Upload from "@/public/svgs/upload.svg";
import Apis from "@/hooks/api";
import { useEnumStore } from "@/store/enumStore";

interface FileIfc {
    uuid: string;
    type: string;
    model: string;
    order: number;
    name: string;
    s3_url: string;
    label: string;
    file: FileWithPreview;
}

interface FileWithPreview extends File {
    uuid?: string;
    s3_url?: string;
    updated_at?: Date;
    name: string;
}

export default function CisFilesClient({ data }: { data: FileIfc[] }) {
    const router = useRouter();
    const cisEnum = useEnumStore(state => state.data)?.cis;
    const [selectedType, setSelectedType] = useState<string>("plus");
    // 백엔드에서 이미 정렬된 데이터를 그대로 사용
    const [files, setFiles] = useState<(FileIfc | FileWithPreview | undefined)[]>(data || []);

    useEffect(() => {
        const fetchCisDocument = async () => {
            const response = await Apis.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/cis/files?type={selectedType}`);
            setFiles(response.data?.data || response.data);
        }

        fetchCisDocument();
    }, [selectedType])

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        if (e.target.files && e.target.files[0]) {
            const uploadedFile = e.target.files[0] as FileWithPreview;
            const newFiles = [...files];
            const currentFile = newFiles[index] as FileIfc;

            newFiles[index] = {
                ...currentFile,
                file: uploadedFile
            };
            setFiles(newFiles);
        }
    };

    const handleFileRemove = (index: number, inputId: string) => {
        const newFiles = [...files];
        const currentFile = newFiles[index];

        // file relation만 삭제 (FileIfc 객체는 유지, file만 undefined)
        if (currentFile && 'file' in currentFile) {
            newFiles[index] = {
                ...currentFile as FileIfc,
                file: undefined as any
            };
        }

        setFiles(newFiles);

        // 파일 인풋 초기화
        const input = document.getElementById(inputId) as HTMLInputElement;
        if (input) input.value = "";
    };

    const handleSave = async () => {
        try {
            if (!selectedType) {
                alert("CIS 타입을 선택해주세요.");
                return;
            }

            const formData = new FormData();
            const items: any[] = [];
            let fileIndex = 0;

            // 파일 처리
            files.forEach((file) => {
                if (!file) {
                    return;
                }

                // 모든 파일은 FileIfc 객체
                if ('uuid' in file && file.uuid) {
                    const fileIfc = file as FileIfc;

                    // 기존 파일 데이터를 그대로 포함
                    const item: any = {
                        uuid: fileIfc.uuid,
                        type: fileIfc.type,
                        model: fileIfc.model,
                        order: fileIfc.order,
                        name: fileIfc.name,
                        s3_url: fileIfc.s3_url,
                        label: fileIfc.label,
                    };

                    // 새로 업로드한 파일인지 확인 (File 객체이면서 s3_url이 없는 경우)
                    if (fileIfc.file instanceof File && !fileIfc.file.s3_url) {
                        item.file_index = fileIndex;
                        formData.append("files", fileIfc.file);
                        fileIndex++;
                    }
                    // file relation이 있으면 그대로 포함
                    else if (fileIfc.file?.s3_url) {
                        item.file = fileIfc.file;
                    }
                    // file relation이 없으면 null
                    else {
                        item.file = null;
                    }

                    items.push(item);
                }
            });

            formData.append("items", JSON.stringify(items));

            const response = await Apis.patch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/cis/files`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            alert("파일이 성공적으로 업로드되었습니다.");
            router.refresh();
        } catch (err) {
            console.error("Upload error:", err);
            alert("파일 업로드에 실패했습니다.");
        }
    };

    const handleCancel = () => {
        router.push('/admin/products');
    };

    const renderFileUpload = (
        file: FileIfc | FileWithPreview | undefined,
        index: number,
        inputId: string,
        label: string
    ) => {
        // 파일이 있는지 확인 (file relation이 있는 경우)
        const fileIfc = file as FileIfc;
        const hasFile = fileIfc?.file && (fileIfc.file.s3_url || fileIfc.file instanceof File);

        return (
            <div className="space-y-4">
                <label className="text-base font-semibold text-g900">
                    {label}
                </label>

                <div className="flex gap-2">
                    {/* 파일 표시 영역 - 항상 표시 */}
                    <div className="flex items-center gap-4 p-2 bg-g50 rounded border border-g200 w-[500px]">
                        <div className="flex-1">
                            {hasFile ? (
                                file instanceof File ? (
                                    <span className="text-sm font-medium text-g900">
                                        {file.name}
                                    </span>
                                ) : (
                                    <a
                                        href={(file as FileIfc).file.s3_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm hover:underline"
                                    >
                                        {(file as FileIfc).file.name}
                                    </a>
                                )
                            ) : (
                                <></>
                            )}
                        </div>
                        {hasFile && (
                            <button
                                onClick={() => handleFileRemove(index, inputId)}
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
                            htmlFor={inputId}
                            className="flex gap-2 items-center px-3 py-2 border border-g200 rounded-[2px] cursor-pointer hover:border-ePrimary transition-colors"
                        >
                            <Upload width={24} height={24} />
                            <span className="text-base font-semibold text-g900">
                                파일 업로드
                            </span>
                        </label>
                        <input
                            type="file"
                            id={inputId}
                            onChange={(e) => handleFileUpload(e, index)}
                            className="w-0 h-0"
                        />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen">
            <div className="max-w-[1440px] mx-auto p-8">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-title font-semibold text-g950 mb-2">
                        제품 파일 업로드
                    </h1>
                    <p className="text-base text-g400">
                        CIS 제품의 문서 파일을 업로드하세요
                    </p>
                </div>

                {/* Form Container */}
                <div className="bg-white rounded-lg shadow-sm p-12">
                    {/* CIS Type Selection */}
                    <div className="mb-12">
                        <h3 className="text-titleSmall text-ePrimary font-semibold mb-2">
                            CIS 타입 선택
                        </h3>
                        <hr className="mb-6 bg-g200" />

                        <div className="max-w-md">
                            <Selectbox
                                label="CIS 타입"
                                placeholder="타입을 선택하세요"
                                options={cisEnum || []}
                                initialValue={selectedType}
                                onChange={(value) => setSelectedType(value.toString())}
                                isRequired={true}
                            />
                        </div>
                    </div>

                    {/* File Upload Section */}
                    {selectedType && (
                        <div className="mb-12">
                            <h3 className="text-titleSmall text-ePrimary font-semibold mb-2">
                                파일 업로드
                            </h3>
                            <hr className="mb-6 bg-g200" />

                            <div className="space-y-6">
                                {files.map((file, index) => {
                                    let label = '';
                                    if (file.type === 'drawing') label = 'Drawing';
                                    if (file.type === 'specification') label = 'Specification';
                                    if (file.type === 'manual') label = 'Manual';
                                    if (file.type === 'catalog') label = 'Catalog';
                                    if (file.type === 'sdk') label = 'SDK';
                                    if (file.type.indexOf('drawing_img') >= 0) label = 'Drawing Image';

                                    return renderFileUpload(file, index, `file-${index}`, label);
                                })}
                            </div>
                        </div>
                    )}

                    {!selectedType && (
                        <div className="text-center py-12 text-g400">
                            CIS 타입을 선택하면 파일 업로드 폼이 나타납니다.
                        </div>
                    )}

                    {/* Action Buttons */}
                    {selectedType && (
                        <div className="flex justify-end gap-4 pt-6 border-t border-g200">
                            <Button
                                label="취소"
                                onClick={handleCancel}
                                btnType="primary"
                                size="medium"
                                className="w-[140px]"
                            />
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
