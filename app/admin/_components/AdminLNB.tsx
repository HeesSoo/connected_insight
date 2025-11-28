"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

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
        id: "products",
        label: "제품 관리",
        children: [
            { id: "product-list", label: "제품 목록", href: "/admin/products" },
            {
                id: "product-create",
                label: "제품 생성",
                href: "/admin/products/create",
            },
        ],
    },
    {
        id: "contact",
        label: "Contact Us",
        href: "/admin/contact",
        // children: [
        //     { id: "contact-history", label: "문의 내역", href: "/admin/contact/history" },
        //     { id: "contact-settings", label: "설정", href: "/admin/contact/settings" },
        // ],
    },
];

export default function AdminLNB() {
    const pathname = usePathname();
    const [openMenus, setOpenMenus] = useState<string[]>([
        "products",
        "contact",
    ]);

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
                {menuItems.map((item) => renderMenuItem(item))}
            </nav>
        </aside>
    );
}
