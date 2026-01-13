"use client";

import { useState } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Selectbox from "@/components/SelectBox";
import Textarea from "@/app/[lang]/(web)/contact/_component/Textarea";
import Upload from "@/public/svgs/upload.svg";
import Image from "next/image";
import { useEnumStore } from "@/store/enumStore";
import { convertToExternalWrap } from "../../[productId]/util/ProductUtil";
import Apis from "@/hooks/api";
import { useRouter } from "next/navigation";

interface Files extends File {
    uuid?: string;
    s3_url?: string;
    [key: string]: any;
}

interface AdminExternalCreateFormProps {
    onCancel: () => void;
}

export default function AdminExternalCreateForm({ onCancel }: AdminExternalCreateFormProps) {
    const router = useRouter();
    const externalData = useEnumStore((state) => state.data)?.external_product;
    const wrap = convertToExternalWrap(null);
    const [image, setImage] = useState<Files | undefined>(undefined);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        // 기존 이미지가 있으면 업로드 불가
        if (image) {
            alert("이미지는 최대 1개만 업로드할 수 있습니다. 기존 이미지를 삭제한 후 다시 시도해주세요.");
            e.target.value = "";
            return;
        }

        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file as Files);
        }
    };

    const handleImageRemove = () => {
        setImage(undefined);
    };

    const handleSave = async () => {
        try {
            // FormData 생성 (파일 업로드를 위해)
            const formData = new FormData();

            // wrap 객체에서 값 추출 (uuid 제외)
            Object.keys(wrap).forEach((key) => {
                // uuid는 생성 시 필요없으므로 제외
                if (key === 'uuid') return;

                const field = wrap[key];
                // useInput의 반환값인 경우 value 추출
                if (field && typeof field === 'object' && 'value' in field) {
                    formData.append(key, field.value);
                } else if (field !== undefined && field !== null) {
                    formData.append(key, field);
                }
            });

            // 이미지 추가
            if (image) {
                formData.append("file", image);
            }


            const response = await Apis.post(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/cis/external`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            alert("제품이 성공적으로 생성되었습니다.");
            router.push('/admin/products');
        } catch (err) {
            console.error("Create error:", err);
            alert("제품 생성에 실패했습니다.");
        }
    };

    return (
        <>
            {/* Basic Information */}
            <div className="mb-12">
                <h3 className="text-titleSmall text-ePrimary font-semibold mb-2">
                    기본 정보
                </h3>
                <hr className="mb-6 bg-g200" />

                <div className="grid grid-cols-2 gap-x-[15px] gap-y-[24px]">
                    <Selectbox
                        initialValue={wrap.type?.value}
                        label="제품 타입"
                        onChange={(v: string) => wrap.type?.resetValue(v)}
                        options={externalData}
                        isRequired={true}
                    ></Selectbox>
                    <Input {...wrap.name} label="제품 이름" isRequired={true}></Input>
                    <Input {...wrap.url} label="URL" isRequired={true}></Input>
                    <Input {...wrap.index} type="number" label="순서" isRequired={true}></Input>
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

                {image && (
                    <div className="mb-6">
                        <div className="relative inline-block">
                            <Image
                                src={URL.createObjectURL(image)}
                                alt={image.name || "제품 이미지"}
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
                        htmlFor="product-image"
                        className="flex gap-2 items-center px-6 py-3 border border-g200 rounded-[2px] cursor-pointer hover:border-ePrimary transition-colors"
                    >
                        <Upload width={24} height={24} />
                        <span className="text-base font-semibold text-g900">
                            이미지 업로드
                        </span>
                    </label>
                    <input
                        type="file"
                        id="product-image"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="w-0 h-0"
                    />
                    <span className="text-small text-g400">
                        이미지 파일을 업로드해 주세요 (JPG, PNG, 최대 10MB)
                    </span>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-6 border-t border-g200">
                <Button
                    label="취소"
                    onClick={onCancel}
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
        </>
    );
}
