"use client";

import { useState } from "react";
import { useInput } from "@/hooks/hooks";
import Button from "@/components/Button";
import Upload from "@/public/svgs/upload.svg";

export default function ProductCreate() {
    const productName = useInput("");
    const category = useInput("");
    const shortDescription = useInput("");
    const detailDescription = useInput("");
    const price = useInput("");
    const stock = useInput("");
    const sku = useInput("");
    const specifications = useInput("");

    const [images, setImages] = useState<File[]>([]);

    const isFormComplete = productName.value && category.value && shortDescription.value;

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImages(Array.from(e.target.files));
        }
    };

    const handleSave = () => {
        // TODO: Implement save logic
        console.log("Product save:", {
            productName: productName.value,
            category: category.value,
            shortDescription: shortDescription.value,
            detailDescription: detailDescription.value,
            price: price.value,
            stock: stock.value,
            sku: sku.value,
            specifications: specifications.value,
            images,
        });
    };

    const handleCancel = () => {
        // TODO: Implement cancel logic (navigate back)
        console.log("Cancel");
    };

    return (
        <div className="min-h-screen">
            <div className="max-w-[1440px] mx-auto p-8">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-title font-semibold text-g950 mb-2">제품 생성</h1>
                    <p className="text-base text-g400">새로운 제품을 등록하세요</p>
                </div>

                {/* Form Container */}
                <div className="bg-white rounded-lg shadow-sm p-12">
                    {/* Basic Information */}
                    <div className="mb-12">
                        <h3 className="text-titleSmall text-ePrimary font-semibold mb-2">기본 정보</h3>
                        <hr className="mb-6 bg-g200" />

                        <div className="grid grid-cols-2 gap-x-[15px] gap-y-[24px]">
                            {/* Product Name */}
                            <div className="relative">
                                {!productName.value && (
                                    <div className="text-base text-g400 absolute top-[50%] left-[4px] translate-y-[-50%] pointer-events-none">
                                        제품명 <span className="text-ePrimary">*</span>
                                    </div>
                                )}
                                <input
                                    className="w-full h-[46px] border-0 border-b border-g200 pl-[4px] text-base focus:outline-none focus:border-ePrimary transition-colors"
                                    type="text"
                                    value={productName.value}
                                    onChange={productName.onChange}
                                />
                            </div>

                            {/* Category */}
                            <div className="relative">
                                {!category.value && (
                                    <div className="text-base text-g400 absolute top-[50%] left-[4px] translate-y-[-50%] pointer-events-none">
                                        카테고리 <span className="text-ePrimary">*</span>
                                    </div>
                                )}
                                <input
                                    className="w-full h-[46px] border-0 border-b border-g200 pl-[4px] text-base focus:outline-none focus:border-ePrimary transition-colors"
                                    type="text"
                                    value={category.value}
                                    onChange={category.onChange}
                                />
                            </div>

                            {/* SKU */}
                            <div className="relative">
                                {!sku.value && (
                                    <div className="text-base text-g400 absolute top-[50%] left-[4px] translate-y-[-50%] pointer-events-none">SKU</div>
                                )}
                                <input
                                    className="w-full h-[46px] border-0 border-b border-g200 pl-[4px] text-base focus:outline-none focus:border-ePrimary transition-colors"
                                    type="text"
                                    value={sku.value}
                                    onChange={sku.onChange}
                                />
                            </div>

                            {/* Price */}
                            <div className="relative">
                                {!price.value && (
                                    <div className="text-base text-g400 absolute top-[50%] left-[4px] translate-y-[-50%] pointer-events-none">가격</div>
                                )}
                                <input
                                    className="w-full h-[46px] border-0 border-b border-g200 pl-[4px] text-base focus:outline-none focus:border-ePrimary transition-colors"
                                    type="number"
                                    value={price.value}
                                    onChange={price.onChange}
                                />
                            </div>

                            {/* Stock */}
                            <div className="relative col-span-2">
                                {!stock.value && (
                                    <div className="text-base text-g400 absolute top-[50%] left-[4px] translate-y-[-50%] pointer-events-none">재고 수량</div>
                                )}
                                <input
                                    className="w-full h-[46px] border-0 border-b border-g200 pl-[4px] text-base focus:outline-none focus:border-ePrimary transition-colors"
                                    type="number"
                                    value={stock.value}
                                    onChange={stock.onChange}
                                />
                            </div>

                            {/* Short Description */}
                            <div className="col-span-2 relative">
                                {!shortDescription.value && (
                                    <div className="text-base text-g400 absolute top-[12px] left-[4px] pointer-events-none">
                                        간단한 설명 <span className="text-ePrimary">*</span>
                                    </div>
                                )}
                                <textarea
                                    className="w-full h-[120px] border-0 border-b border-g200 pl-[4px] pt-[12px] text-base resize-none focus:outline-none focus:border-ePrimary transition-colors"
                                    value={shortDescription.value}
                                    onChange={shortDescription.onChange}
                                />
                            </div>

                            {/* Detail Description */}
                            <div className="col-span-2 relative">
                                {!detailDescription.value && (
                                    <div className="text-base text-g400 absolute top-[12px] left-[4px] pointer-events-none">상세 설명</div>
                                )}
                                <textarea
                                    className="w-full h-[200px] border-0 border-b border-g200 pl-[4px] pt-[12px] text-base resize-none focus:outline-none focus:border-ePrimary transition-colors"
                                    value={detailDescription.value}
                                    onChange={detailDescription.onChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Specifications */}
                    <div className="mb-12">
                        <h3 className="text-titleSmall text-ePrimary font-semibold mb-2">스펙</h3>
                        <hr className="mb-6 bg-g200" />

                        <div className="relative">
                            {!specifications.value && (
                                <div className="text-base text-g400 absolute top-[12px] left-[4px] pointer-events-none">
                                    제품 스펙을 입력하세요 (예: 크기, 무게, 성능 등)
                                </div>
                            )}
                            <textarea
                                className="w-full h-[200px] border-0 border-b border-g200 pl-[4px] pt-[12px] text-base resize-none focus:outline-none focus:border-ePrimary transition-colors"
                                value={specifications.value}
                                onChange={specifications.onChange}
                            />
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div className="mb-12">
                        <h3 className="text-titleSmall text-ePrimary font-semibold mb-2">제품 이미지</h3>
                        <hr className="mb-6 bg-g200" />

                        <div className="flex items-center gap-4">
                            <label
                                htmlFor="product-images"
                                className="flex gap-2 items-center px-6 py-3 border border-g200 rounded-[2px] cursor-pointer hover:border-ePrimary transition-colors"
                            >
                                <Upload width={24} height={24} />
                                <span className="text-base font-semibold text-g900">이미지 업로드</span>
                            </label>
                            <input type="file" id="product-images" accept="image/*" multiple onChange={handleImageUpload} className="w-0 h-0" />
                            <span className="text-small text-g400">이미지 파일을 업로드해 주세요 (JPG, PNG, 최대 10MB)</span>
                        </div>

                        {images.length > 0 && (
                            <div className="mt-4">
                                <p className="text-base text-g700 mb-2">선택된 파일: {images.length}개</p>
                                <ul className="space-y-1">
                                    {images.map((file, index) => (
                                        <li key={index} className="text-small text-g500">
                                            {file.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-4 pt-6 border-t border-g200">
                        <Button label="취소" onClick={handleCancel} btnType="primary" size="medium" className="w-[140px]" />
                        <Button label="저장" onClick={handleSave} disabled={!isFormComplete} btnType="secondary" size="medium" className="w-[140px]" />
                    </div>
                </div>
            </div>
        </div>
    );
}
