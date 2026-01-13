"use client";

import { useState } from "react";
// import { useInput } from "@/hooks/hooks";
import Button from "@/components/Button";
import Upload from "@/public/svgs/upload.svg";
import Input from "@/components/Input";
// import { useEnumStore } from "@/store/enumStore";
import { convertToExternalWrap } from "../util/ProductUtil";
import Textarea from "@/app/[lang]/(web)/contact/_component/Textarea";
import Apis from "@/hooks/api";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Files extends File {
    uuid?: string;
    s3_url?: string;
    [key: string]: any;
}

export default function AdminExternalProductDetailClient({ data }: { data: Record<string, any> }) {
    const router = useRouter();
    // wrap은 컴포넌트 최상위에서 생성
    const wrap = convertToExternalWrap(data);
    const [images, setImages] = useState<Files>(data?.file || undefined);


    // const isFormComplete =
    //     productName.value && category.value && shortDescription.value;

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        // 기존 이미지가 있으면 업로드 불가
        if (images) {
            alert("이미지는 최대 1개만 업로드할 수 있습니다. 기존 이미지를 삭제한 후 다시 시도해주세요.");
            e.target.value = "";
            return;
        }

        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImages(file as Files);
        }
    };

    const handleImageRemove = () => {
        setImages(undefined);
    };

    // const validateForm = () => {
    //     if (productName.value === "") {
    //         alert("제품명을 입력해 주세요.");
    //         return false;
    //     } else if (category.value === "") {
    //         alert("카테고리를 입력해 주세요.");
    //         return false;
    //     } else if (shortDescription.value === "") {
    //         alert("간단한 설명을 입력해 주세요.");
    //         return false;
    //     }
    //     return true;
    // };

    const handleSave = async () => {
        // if (!validateForm()) {
        //     return;
        // }
        try {
            // FormData 생성 (파일 업로드를 위해)
            const formData = new FormData();

            // wrap 객체에서 값 추출
            Object.keys(wrap).forEach((key) => {
                const field = wrap[key];
                // useInput의 반환값인 경우 value 추출
                if (field && typeof field === 'object' && 'value' in field) {
                    formData.append(key, field.value);
                } else if (field !== undefined && field !== null) {
                    formData.append(key, field);
                }
            });

            // 이미지 처리
            if (images) {
                // 새로 업로드한 파일인 경우 (uuid가 없거나 File 객체인 경우)
                if (!images.uuid || images instanceof File) {
                    formData.append("file", images);
                }
                // 기존 파일이 있고 uuid가 있으면 아무것도 하지 않음 (변경 없음)
            } else {
                // 이미지가 없으면 기존 파일을 삭제해야 함
                // 원래 데이터에 파일이 있었는지 확인
                if (data?.file?.uuid) {
                    // file_uuid를 빈 문자열로 설정하여 삭제 표시
                    formData.append("file_uuid", "");
                }
            }

            const response = await Apis.patch(
                // `${process.env.NEXT_PUBLIC_SERVER_URL}/api/cis/external`,
                `http://localhost:8080/api/cis/external`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            alert("제품 정보가 성공적으로 수정되었습니다.");
        } catch (err) {
            console.error("Update error:", err);
            alert("제품 정보 수정에 실패했습니다.");
        }
    };

    const handleCancel = () => {
        router.push('/admin/products');
    };

    return (
        <div className="min-h-screen">
            <div className="max-w-[1440px] mx-auto p-8">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-title font-semibold text-g950 mb-2">
                        제품 수정
                    </h1>
                    <p className="text-base text-g400">
                        기존 제품을 수정하세요
                    </p>
                </div>

                {/* Form Container */}
                <div className="bg-white rounded-lg shadow-sm p-12">
                    {/* Basic Information */}
                    <div className="mb-12">
                        <h3 className="text-titleSmall text-ePrimary font-semibold mb-2">
                            기본 정보
                        </h3>
                        <hr className="mb-6 bg-g200" />

                        <div className="grid grid-cols-2 gap-x-[15px] gap-y-[24px]">
                            <Input {...wrap.name} label="제품 이름" isRequired={true}></Input>
                            <Input {...wrap.url} label="URL" isRequired={true}></Input>
                            <Input {...wrap.index} label="순서" isRequired={true}></Input>
                            <Textarea label="설명 (한국어)" {...wrap.description_ko}></Textarea>
                            <Textarea label="설명 (영어)" {...wrap.description_en}></Textarea>
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div className="mb-12">
                        <h3 className="text-titleSmall text-ePrimary font-semibold mb-2">
                            제품 이미지
                        </h3>
                        <hr className="mb-6 bg-g200" />

                        {images && (
                            <div className="mb-6">
                                <div className="relative inline-block">
                                    <Image
                                        src={images.s3_url || URL.createObjectURL(images)}
                                        alt={images.name || "제품 이미지"}
                                        width={200}
                                        height={200}
                                        className="rounded-lg border border-g200"
                                    />
                                    <button
                                        onClick={handleImageRemove}
                                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors"
                                        type="button"
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="flex items-center gap-4">
                            <label
                                htmlFor="product-images"
                                className="flex gap-2 items-center px-6 py-3 border border-g200 rounded-[2px] cursor-pointer hover:border-ePrimary transition-colors"
                            >
                                <Upload width={24} height={24} />
                                <span className="text-base font-semibold text-g900">
                                    이미지 업로드
                                </span>
                            </label>
                            <input
                                type="file"
                                id="product-images"
                                accept="image/*"
                                multiple
                                onChange={handleImageUpload}
                                className="w-0 h-0"
                            />
                            <span className="text-small text-g400">
                                이미지 파일을 업로드해 주세요 (JPG, PNG, 최대
                                10MB)
                            </span>
                        </div>
                    </div>

                    {/* Action Buttons */}
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
                            // disabled={!isFormComplete}
                            btnType="secondary"
                            size="medium"
                            className="w-[140px]"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
