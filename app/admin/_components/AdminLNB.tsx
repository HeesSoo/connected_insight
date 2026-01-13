"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuthStore } from "@/store/authStore";

interface MenuItem {
    id: string;
    label: string;
    href?: string;
    icon?: React.ReactNode;
    children?: MenuItem[];
}

const menuItems: MenuItem[] = [
    // {
    //     id: "dashboard",
    //     label: "대시보드",
    //     href: "/admin",
    // },
    {
        id: 'user',
        label: '유저',
        children: [
            { id: 'user-create', label: '유저 생성', href: '/admin/user' }
        ]
    },
    {
        id: "solution",
        label: "솔루션 관리",
        children: [
            { id: "product-list", label: "솔루션", href: "/admin/solution" },
            { id: "product-application", label: "솔루션 Application", href: "/admin/solution/application" },
        ]
    },
    {
        id: "products",
        label: "제품 관리",
        children: [
            { id: "product-list", label: "제품 목록", href: "/admin/products" },
            {
                id: "product-create",
                label: "제품 생성",
                href: "/admin/products/create",
            },
            {
                id: "product-thumbnail",
                label: "제품 썸네일 관리",
                href: "/admin/products/thumbnail",
            },
            {
                id: "product-file",
                label: "Cis 파일 관리",
                href: "/admin/products/file",
            },
        ],
    },
    {
        id: "contact",
        label: "Contact Us",
        href: "/admin/contact",
    },
];

export default function AdminLNB() {
    const pathname = usePathname();
    const user = useAuthStore((state) => state.user);
    const [openMenus, setOpenMenus] = useState<string[]>([
        "solution",
        "products",
        "contact",
    ]);

    // Admin 권한 체크 - role이 'Admin'인 경우에만 true
    const isAdmin = user?.role === 'Admin';

    const toggleMenu = (menuId: string) => {
        setOpenMenus((prev) =>
            prev.includes(menuId)
                ? prev.filter((id) => id !== menuId)
                : [...prev, menuId]
        );
    };

    const isActive = (href?: string) => {
        if (!href) return false;
        if (href === "/admin") return pathname === "/admin";
        return pathname === href;
    };

    const renderMenuItem = (item: MenuItem, level: number = 0) => {
        const hasChildren = item.children && item.children.length > 0;
        const isOpen = openMenus.includes(item.id);
        const active = isActive(item.href);

        return (
            <div key={item.id} className="mb-1">
                {hasChildren ? (
                    <div>
                        <button
                            onClick={() => toggleMenu(item.id)}
                            className={`w-full flex items-center justify-between px-4 py-3 text-base font-medium rounded-[2px] transition-colors ${
                                active
                                    ? "bg-ePrimary text-white"
                                    : "text-g700 hover:bg-g50"
                            }`}
                        >
                            <span>{item.label}</span>
                            <svg
                                className={`w-4 h-4 transition-transform ${
                                    isOpen ? "rotate-180" : ""
                                }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </button>
                        {isOpen && (
                            <div className="mt-1 ml-4 border-l-2 border-g200 pl-2">
                                {item.children?.map((child) =>
                                    renderMenuItem(child, level + 1)
                                )}
                            </div>
                        )}
                    </div>
                ) : (
                    <Link
                        href={item.href || "#"}
                        className={`block px-4 py-3 text-base font-medium rounded-[2px] transition-colors ${
                            level > 0 ? "text-small" : ""
                        } ${
                            active
                                ? "bg-ePrimary text-white"
                                : "text-g700 hover:bg-g50"
                        }`}
                    >
                        {item.label}
                    </Link>
                )}
            </div>
        );
    };

    return (
        <aside className="w-[260px] bg-white border-r border-g200 h-[calc(100vh-72px)] sticky top-[72px] overflow-y-auto">
            <nav className="p-4">
                <div className="mb-6">
                    <h2 className="text-small font-semibold text-g400 uppercase tracking-wider px-4 mb-2">
                        메뉴
                    </h2>
                </div>
                {menuItems
                    .filter((item) => {
                        // 'user' 메뉴는 Admin일 때만 표시
                        if (item.id === 'user') {
                            return isAdmin;
                        }
                        return true;
                    })
                    .map((item) => renderMenuItem(item))}
            </nav>
        </aside>
    );
}
