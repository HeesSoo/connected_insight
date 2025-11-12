"use client";

import AdminGNB from "./_components/AdminGNB";
import AdminLNB from "./_components/AdminLNB";
import { usePathname, useRouter } from "next/navigation";
import Apis from "@/hooks/api";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const isLoginPage = pathname === "/admin/login";

    const handleLogout = async () => {
        try {
            // 로그아웃 API 호출 (쿠키 삭제)
            await Apis.post('/auth/logout');

            // 로그인 페이지로 리다이렉트
            router.push("/admin/login");
        } catch (error) {
            console.error('Logout failed:', error);
            // 에러가 발생해도 로그인 페이지로 이동
            router.push("/admin/login");
        }
    };

    if (isLoginPage) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-g50">
            <AdminGNB userId="admin@example.com" onLogout={handleLogout} />
            <div className="flex">
                <AdminLNB />
                <main className="flex-1 overflow-x-hidden">{children}</main>
            </div>
        </div>
    );
}
