"use client";

import { useState } from "react";
import { useInput } from "@/hooks/hooks";
import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import Logo from "@/public/svgs/logo.svg";

export default function AdminLogin() {
    const email = useInput("");
    const password = useInput("");
    const [rememberMe, setRememberMe] = useState(false);

    const isFormComplete = email.value && password.value;

    const handleLogin = () => {
        // TODO: Implement login logic
        console.log("Login attempt:", { email: email.value, password: password.value, rememberMe });
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
                    {/* Email Input */}
                    <div className="relative">
                        {!email.value && (
                            <div className="text-base text-g400 absolute top-[50%] left-[4px] translate-y-[-50%] pointer-events-none">
                                이메일 <span className="text-ePrimary">*</span>
                            </div>
                        )}
                        <input
                            className="w-full h-[46px] border-0 border-b border-g200 pl-[4px] text-base focus:outline-none focus:border-ePrimary transition-colors"
                            type="email"
                            value={email.value}
                            onChange={email.onChange}
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

                    {/* Remember Me */}
                    <div className="flex items-center gap-2">
                        <Checkbox checked={rememberMe} value="remember" onChange={(value, checked) => setRememberMe(checked)} />
                        <label className="text-base text-g700 cursor-pointer" onClick={() => setRememberMe(!rememberMe)}>
                            로그인 상태 유지
                        </label>
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

                {/* Forgot Password Link */}
                <div className="mt-6 text-center">
                    <a href="#" className="text-small text-g400 hover:text-ePrimary transition-colors">
                        비밀번호를 잊으셨나요?
                    </a>
                </div>
            </div>
        </div>
    );
}
