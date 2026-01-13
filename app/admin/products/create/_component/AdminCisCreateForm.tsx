"use client";

import { useState } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Selectbox from "@/components/SelectBox";
import { useEnumStore } from "@/store/enumStore";
import { convertToCisWrap } from "../../[productId]/util/ProductUtil";
import Apis from "@/hooks/api";
import { useRouter } from "next/navigation";

interface AdminCisCreateFormProps {
    onCancel: () => void;
}

export default function AdminCisCreateForm({ onCancel }: AdminCisCreateFormProps) {
    const router = useRouter();
    const cisData = useEnumStore((state) => state.data)?.cis;
    const wrap = convertToCisWrap(null);

    const handleSave = async () => {
        try {
            // wrap 객체에서 실제 값만 추출 (uuid 제외)
            const formData: Record<string, any> = {};
            Object.keys(wrap).forEach((key) => {
                // uuid는 생성 시 필요없으므로 제외
                if (key === 'uuid') return;

                const field = wrap[key];
                // useInput의 반환값인 경우 value 추출
                if (field && typeof field === 'object' && 'value' in field) {
                    formData[key] = field.value;
                } else {
                    formData[key] = field;
                }
            });


            const response = await Apis.post(
                `/cis/product`,
                formData
            );

            alert("제품이 성공적으로 생성되었습니다.");
            router.push('/admin/products');
        } catch (err) {
            console.error("Create Product Error >>>> ", err);
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
                    <Input {...wrap.name} label="제품명" isRequired={true}></Input>
                    <Selectbox
                        initialValue={wrap.type.value}
                        label="제품 타입"
                        onChange={(v: string) => wrap.type.resetValue(v)}
                        options={cisData}
                        isRequired={true}
                    ></Selectbox>
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
                    <Input {...wrap.resolution} type="number" label="Resolution" isRequired={true}></Input>
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
