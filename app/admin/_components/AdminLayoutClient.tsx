"use client";

import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";
import AdminGNB from "./AdminGNB";
import AdminLNB from "./AdminLNB";

interface AdminLayoutClientProps {
    children: React.ReactNode;
}

export default function AdminLayoutClient({ children }: AdminLayoutClientProps) {
    const router = useRouter();
    const pathname = usePathname();
    const { initialize, logout, isAuthenticated, isLoading } = useAuthStore();

    const isLoginPage = pathname === "/admin/login";

    // 클라이언트에서 Zustand 초기화
    useEffect(() => {
        initialize();
    }, [initialize]);

    // 인증 체크 (로그인 페이지가 아닐 때만)
    useEffect(() => {
        if (!isLoginPage && !isLoading && !isAuthenticated) {
            router.push("/admin/login");
        }
    }, [isLoginPage, isLoading, isAuthenticated, router]);

    const handleLogout = async () => {
        await logout();
        router.push("/admin/login");
    };

    // 로그인 페이지는 레이아웃 없이 렌더링
    if (isLoginPage) {
        return <>{children}</>;
    }

    // 로딩 중
    if (isLoading) {
        return (
            <div className="min-h-screen bg-g50 flex items-center justify-center">
                <div className="text-g400">Loading...</div>
            </div>
        );
    }

    // 인증되지 않았으면 null (리다이렉트 중)
    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="min-h-screen bg-g50">
            <AdminGNB onLogout={handleLogout} />
            <div className="flex">
                <AdminLNB />
                <main className="flex-1 overflow-x-hidden">{children}</main>
            </div>
        </div>
    );
}