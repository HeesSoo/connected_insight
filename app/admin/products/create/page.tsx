"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Selectbox from "@/components/SelectBox";

// CIS 생성 폼 import
import AdminCisCreateForm from "./_component/AdminCisCreateForm";
// External 생성 폼 import
import AdminExternalCreateForm from "./_component/AdminExternalCreateForm";

export default function ProductCreate() {
    const router = useRouter();
    const [productCategory, setProductCategory] = useState<string>("");

    const productCategoryOptions = [
        { label: "CIS", value: "cis" },
        { label: "External (Lingchen/Tokk)", value: "external" },
    ];

    const handleCancel = () => {
        router.push('/admin/products');
    };

    return (
        <div className="min-h-screen">
            <div className="max-w-[1440px] mx-auto p-8">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-title font-semibold text-g950 mb-2">
                        제품 생성
                    </h1>
                    <p className="text-base text-g400">
                        새로운 제품을 등록하세요
                    </p>
                </div>

                {/* Form Container */}
                <div className="bg-white rounded-lg shadow-sm p-12">
                    {/* Product Category Selection */}
                    <div className="mb-12">
                        <h3 className="text-titleSmall text-ePrimary font-semibold mb-2">
                            제품 카테고리 선택
                        </h3>
                        <hr className="mb-6 bg-g200" />

                        <div className="max-w-md">
                            <Selectbox
                                label="제품 카테고리"
                                placeholder="카테고리를 선택하세요"
                                options={productCategoryOptions}
                                initialValue={productCategory}
                                onChange={(value) => setProductCategory(value.toString())}
                                isRequired={true}
                            />
                        </div>
                    </div>

                    {/* Conditional Form Rendering */}
                    {productCategory === "cis" && (
                        <AdminCisCreateForm onCancel={handleCancel} />
                    )}

                    {productCategory === "external" && (
                        <AdminExternalCreateForm onCancel={handleCancel} />
                    )}

                    {!productCategory && (
                        <div className="text-center py-12 text-g400">
                            제품 카테고리를 선택하면 입력 폼이 나타납니다.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
