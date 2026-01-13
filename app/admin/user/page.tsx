"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Selectbox from "@/components/SelectBox";
import Input from "@/components/Input";
import Apis from "@/hooks/api";

export default function UserCreate() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        role: "",
        id: "",
        password: "",
    });

    const roleOptions = [
        { label: "Admin", value: "Admin" },
        { label: "Sub Admin", value: "SubAdmin" },
    ];

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleCancel = () => {
        router.push("/admin");
    };

    const handleSubmit = async () => {
        try {
            // 유효성 검사
            if (!formData.role || !formData.id || !formData.password) {
                alert("모든 필드를 입력해주세요.");
                return;
            }

            const response = await Apis.post(
                `/user/create`,
                formData
            );

            if (response.data) {
                alert("유저가 성공적으로 생성되었습니다.");
                router.push("/admin");
            }
        } catch (err) {
            console.error("User creation error:", err);
            alert("유저 생성에 실패했습니다.");
        }
    };

    const isFormComplete = formData.role && formData.id && formData.password;

    return (
        <div className="min-h-screen">
            <div className="max-w-[1440px] mx-auto p-8">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-title font-semibold text-g950 mb-2">
                        유저 생성
                    </h1>
                    <p className="text-base text-g400">
                        새로운 유저를 등록하세요
                    </p>
                </div>

                {/* Form Container */}
                <div className="bg-white rounded-lg shadow-sm p-12">
                    <div className="mb-12">
                        <h3 className="text-titleSmall text-ePrimary font-semibold mb-2">
                            유저 정보
                        </h3>
                        <hr className="mb-6 bg-g200" />

                        <div className="grid grid-cols-2 gap-x-[15px] gap-y-[24px]">
                            <Selectbox
                                label="권한"
                                placeholder="권한을 선택하세요"
                                options={roleOptions}
                                initialValue={formData.role}
                                onChange={(value) =>
                                    handleInputChange("role", value.toString())
                                }
                                isRequired={true}
                            />

                            <Input
                                label="아이디"
                                value={formData.id}
                                onChange={(e) =>
                                    handleInputChange("id", e.target.value)
                                }
                                placeholder="아이디를 입력하세요"
                                isRequired={true}
                            />

                            <Input
                                label="비밀번호"
                                type="password"
                                value={formData.password}
                                onChange={(e) =>
                                    handleInputChange("password", e.target.value)
                                }
                                placeholder="비밀번호를 입력하세요"
                                isRequired={true}
                            />
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
                            label="생성"
                            onClick={handleSubmit}
                            disabled={!isFormComplete}
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
