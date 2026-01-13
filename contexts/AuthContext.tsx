"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import Apis from "@/hooks/api";

interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    accessToken: string | null;
    login: (token: string) => void;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = "accessToken";

// 쿠키에서 토큰 읽기
const getTokenFromCookie = (): string | null => {
    if (typeof window === "undefined") return null;

    const name = `${TOKEN_KEY}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(";");

    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return null;
};

// 쿠키에 토큰 저장
const setTokenToCookie = (token: string) => {
    if (typeof window === "undefined") return;

    // 9시간 후 만료 (백엔드 accessToken 만료시간과 동일)
    const maxAge = 9 * 60 * 60; // 9 hours in seconds
    document.cookie = `${TOKEN_KEY}=${token}; path=/; max-age=${maxAge}; SameSite=Strict`;
};

// 쿠키에서 토큰 삭제
const removeTokenFromCookie = () => {
    if (typeof window === "undefined") return;
    document.cookie = `${TOKEN_KEY}=; path=/; max-age=0`;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    // 초기 로드시 쿠키에서 토큰 확인
    useEffect(() => {
        const token = getTokenFromCookie();
        if (token) {
            setAccessToken(token);
        }
        setIsLoading(false);
    }, []);

    const login = (token: string) => {
        setTokenToCookie(token);
        setAccessToken(token);
    };

    const logout = async () => {
        try {
            // 백엔드에 로그아웃 요청 (refreshToken 쿠키 삭제)
            await Apis.post("/auth/logout");
        } catch (error) {
            console.error("Logout API failed:", error);
        } finally {
            // 쿠키에서 토큰 삭제
            removeTokenFromCookie();
            setAccessToken(null);
            router.push("/admin/login");
        }
    };

    const value = {
        isAuthenticated: !!accessToken,
        isLoading,
        accessToken,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

// accessToken을 가져오는 유틸 함수 (API 인터셉터에서 사용)
export const getAccessToken = (): string | null => {
    if (typeof window === "undefined") return null;

    const name = "accessToken=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(";");

    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return null;
};