"use client";

import AdminGNB from "./_components/AdminGNB";
import AdminLNB from "./_components/AdminLNB";
import { usePathname, useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const isLoginPage = pathname === "/admin/login";

    const handleLogout = () => {
        // TODO: Implement actual logout logic (clear session, tokens, etc.)
        console.log("Logging out...");
        router.push("/admin/login");
    };

    // Login page doesn't need GNB/LNB
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
