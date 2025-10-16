"use client";

import Link from "next/link";
import Logo from "@/public/svgs/logo.svg";

interface AdminGNBProps {
    userId?: string;
    onLogout?: () => void;
}

export default function AdminGNB({ userId = "admin@example.com", onLogout }: AdminGNBProps) {
    const handleLogout = () => {
        if (onLogout) {
            onLogout();
        } else {
            // TODO: Implement logout logic
            console.log("Logout clicked");
        }
    };

    return (
        <header className="bg-white border-b border-g200 sticky top-0 z-50" role="banner">
            <div className="h-[72px] px-8 flex items-center justify-between">
                {/* Logo */}
                <div className="flex-shrink-0">
                    <Link href="/admin" className="flex items-center">
                        <Logo width={116} height={40} />
                    </Link>
                </div>

                {/* User Info & Logout */}
                <div className="flex items-center gap-6">
                    <span className="text-base text-g700">{userId}</span>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-g950 text-white text-base rounded-[2px] hover:bg-ePrimary transition-colors"
                    >
                        로그아웃
                    </button>
                </div>
            </div>
        </header>
    );
}
