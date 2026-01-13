"use client";

import { useState } from "react";
import { useInput } from "@/hooks/hooks";
import Button from "@/components/Button";
import Upload from "@/public/svgs/upload.svg";
import Input from "@/components/Input";
import Selectbox from "@/components/SelectBox";
import { useEnumStore } from "@/store/enumStore";
import { convertToCisWrap } from "../util/ProductUtil";
import Apis from "@/hooks/api";
import { useRouter } from "next/navigation";

export default function AdminCisDetailClient({ data }: { data: Record<string, any> }) {
    const router = useRouter();

    const cisData = useEnumStore((state) => state.data)?.cis;
    const wrap = convertToCisWrap(data);

    // const isFormComplete =
    //     productName.value && category.value && shortDescription.value;

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
            // wrap 객체에서 실제 값만 추출
            const formData: Record<string, any> = {};
            Object.keys(wrap).forEach((key) => {
                const field = wrap[key];
                // useInput의 반환값인 경우 value 추출
                if (field && typeof field === 'object' && 'value' in field) {
                    formData[key] = field.value;
                } else {
                    formData[key] = field;
                }
            });

            const response = await Apis.patch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/cis`, formData);
            alert("제품 정보가 성공적으로 수정되었습니다.");
        } catch(err) {
            console.error("Update Product Error >>>> ", err);
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
                            {/* Product Name */}
                            <Input {...wrap.name} label="제품명" isRequired={true}></Input>
                            {/* Category */}
                            <Selectbox initialValue={wrap.type.value} label="제품 타입" onChange={(v:string) => wrap.type.resetValue(v)} options={cisData}></Selectbox>
                            {/* <Selectbox initialValue={wrap.type} onChange={wrap.} options={cisData}></Selectbox> */}
                        </div>
                    </div>

                    {/* Specifications */}
                    <div className="mb-12">
                        <h3 className="text-titleSmall text-ePrimary font-semibold mb-2">
                            스펙
                        </h3>
                        <hr className="mb-6 bg-g200" />
                        <div className="grid grid-cols-2 gap-x-[15px] gap-y-[24px]">
                            <Input {...wrap.mono_or_color} label="Mono or Color" isRequired={true}></Input>
                            <Input {...wrap.interface} label="Interface" isRequired={true}></Input>
                            <Input {...wrap.fov} type="number" label="FOV (mm)" isRequired={true}></Input>
                            <Input {...wrap.accuracy} label="Accuracy (μm)" isRequired={true}></Input>
                            <Input {...wrap.dof} type="number" label="DOF (mm)" isRequired={true}></Input>
                            <Input {...wrap.wd} type="number" label="WD (mm)" isRequired={true}></Input>
                            <Input {...wrap.line_rate} type="number" label="Line Rate (kHz)" isRequired={true}></Input>
                            <Input {...wrap.ws} type="number" label="WS (m/s)" isRequired={true}></Input>
                            <Input {...wrap.ethernet_port} type="number" label="Ethernet Port" isRequired={true}></Input>
                            <Input {...wrap.pixel} type="number" label="Pixel (k)" isRequired={true}></Input>
                            <Input {...wrap.size_width} type="number" label="Size (Width)" isRequired={true}></Input>
                            <Input {...wrap.size_height} type="number" label="Size (Height)" isRequired={true}></Input>
                            <Input {...wrap.size_length} type="number" label="Size (Length)" isRequired={true}></Input>
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
