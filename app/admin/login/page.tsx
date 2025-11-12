"use client";

import { useRouter } from "next/navigation";
import { useInput } from "@/hooks/hooks";
import Button from "@/components/Button";
import Logo from "@/public/svgs/logo.svg";
import Apis from "@/hooks/api";

export default function AdminLogin() {
    const router = useRouter();
    const id = useInput("");
    const password = useInput("");

    const isFormComplete = id.value && password.value;

    const handleLogin = async () => {
        try {
            const loginResponse = await Apis.post('/auth/login', { id: id.value, password: password.value });
            console.log('Login Response >>>> ', loginResponse?.data);

            // 로그인 성공 시 /admin으로 리다이렉트
            if (loginResponse?.data?.accessToken) {
                router.push("/admin");
            }
        } catch (err) {
            console.error('Login Error >>>> ', err);
            // TODO: 에러 메시지 표시
        }
    };

    return (
        <div className="min-h-screen bg-g50 flex items-center justify-center">
            <div className="w-full max-w-[480px] bg-white rounded-lg shadow-lg p-12">
                {/* Logo */}
                <div className="flex justify-center mb-8">
                    <Logo width={120} height={40} />
                </div>

                {/* Title */}
                <h1 className="text-title font-semibold text-g950 text-center mb-2">Admin Login</h1>
                <p className="text-base text-g400 text-center mb-12">관리자 페이지에 로그인하세요</p>

                {/* Login Form */}
                <div className="space-y-6">
                    {/* Id Input */}
                    <div className="relative">
                        {!id.value && (
                            <div className="text-base text-g400 absolute top-[50%] left-[4px] translate-y-[-50%] pointer-events-none">
                                이메일 <span className="text-ePrimary">*</span>
                            </div>
                        )}
                        <input
                            className="w-full h-[46px] border-0 border-b border-g200 pl-[4px] text-base focus:outline-none focus:border-ePrimary transition-colors"
                            value={id.value}
                            onChange={id.onChange}
                        />
                    </div>

                    {/* Password Input */}
                    <div className="relative">
                        {!password.value && (
                            <div className="text-base text-g400 absolute top-[50%] left-[4px] translate-y-[-50%] pointer-events-none">
                                비밀번호 <span className="text-ePrimary">*</span>
                            </div>
                        )}
                        <input
                            className="w-full h-[46px] border-0 border-b border-g200 pl-[4px] text-base focus:outline-none focus:border-ePrimary transition-colors"
                            type="password"
                            value={password.value}
                            onChange={password.onChange}
                        />
                    </div>

                    {/* Login Button */}
                    <div className="pt-4">
                        <Button
                            label="로그인"
                            onClick={handleLogin}
                            disabled={!isFormComplete}
                            btnType="secondary"
                            size="large"
                            className="w-full text-large"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
