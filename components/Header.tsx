"use client";

import Link from "next/link";
import React, { useState } from "react";
import Logo from "@/public/svgs/logo.svg";
import { navigationConfig } from "@/data/navigation";
import { useNavigation } from "@/hooks/useNavigation";
import { NavigationItem } from "@/types/navigation";
import { ArrowIco } from "@/icons/icons";

const renderNavigationItem = (
    item: NavigationItem,
    isActive: boolean,
    isOpen: boolean,
    onToggle: () => void,
    onKeyDown: (event: React.KeyboardEvent, itemId: string) => void,
    level: number = 0
): React.ReactNode => {
    const hasLink = item.href && item.href !== "#";
    const [external, setExternal] = useState<NavigationItem[]>([]);

    const commonProps = {
        onKeyDown: (e: React.KeyboardEvent) => onKeyDown(e, item.id),
        className: `flex gap-x-2 text-large text-medium text-g950 ${isActive ? "text-ePrimary" : ""}`,
    };

    return (
        <>
            {hasLink ? (
                <Link href={item.href} {...commonProps}>
                    <span>{item.label}</span>
                    {item?.children && item?.children?.length && (
                        <span
                            className={`inline-flex items-center transition-transform duration-200 ${isActive ? "text-ePrimary" : ""} ${
                                isOpen ? "rotate-180" : ""
                            }`}
                        >
                            <ArrowIco />
                        </span>
                    )}
                </Link>
            ) : (
                // 링크가 없는 경우: Button 사용
                <button onClick={onToggle} {...commonProps}>
                    <span>{item.label}</span>
                    {item?.children && item?.children?.length && (
                        <span
                            className={`inline-flex items-center transition-transform duration-200 ${isActive ? "text-ePrimary" : ""} ${
                                isOpen ? "rotate-180" : ""
                            }`}
                        >
                            <ArrowIco />
                        </span>
                    )}
                </button>
            )}

            {/* 드롭다운 메뉴 */}
            {item?.children && item?.children?.length && (
                <div
                    className="absolute top-[calc(100%+1px)] left-[-22px] flex p-6 
                        bg-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200
                        border border-g200 rounded border-t-0 rounded-t-none"
                    // className="absolute top-[calc(100%+1px)] left-[-22px]
                    //     transform -translate-y-2 scale-95 -translate-x-2
                    //     group-hover:translate-y-0 group-hover:scale-100 group-hover:translate-x-0
                    //     transition-all duration-200 ease-out"
                    onMouseLeave={() => {
                        setExternal([]);
                    }}
                    // onMouseLeave={() => setExternal([])}
                >
                    <ul id={`submenu-${item.id}`} role="menu" className={`flex flex-col gap-y-6 w-max`}>
                        {item.children &&
                            item.children.length > 0 &&
                            item.children.map((child, childIndex) => (
                                <div key={child.id}>
                                    <li
                                        role="none"
                                        className="relative min-w-[120px] flex group"
                                        onMouseEnter={() => {
                                            setExternal(child.external);
                                        }}
                                        // onMouseLeave={() => setExternal([])}
                                    >
                                        <Link href={child.href || "#"} className="relative min-w-[120px] group-hover:block">
                                            {child.label}
                                        </Link>
                                    </li>
                                </div>
                            ))}
                    </ul>
                    <div
                        className={`flex transition-all duration-200 ease-out ${
                            external && external.length > 0
                                ? "transform scale-100 translate-x-0 opacity-100 visible"
                                : "transform scale-95 -translate-x-2 opacity-0 invisible"
                        }`}
                        style={{ height: external && external.length > 0 ? `${external.length * 48}px` : "0px" }}
                    >
                        {external && external.length > 0 && (
                            <>
                                <div className="w-[1px] h-full bg-g200 mx-6"></div>
                                <ul className={`flex flex-col gap-y-6`}>
                                    {external.map((external) => (
                                        <li key={external.id} role="none" className="min-w-[120px] w-max">
                                            <Link href={external.href} className="min-w-[120px]" target="_blank" rel="noopener noreferrer">
                                                {external.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>
                    {/* {external && external.length > 0 && (
                        // <div className="flex" style={{ height: `${external.length * 48}px` }}>
                        <div className="flex animate-in slide-in-from-top-2 fade-in duration-200" style={{ height: `${external.length * 48}px` }}>
                            <div className="w-[1px] h-full bg-g200 mx-6"></div>
                            <ul className={`flex flex-col gap-y-6`}>
                                {external.map((external) => (
                                    <li key={external.id} role="none" className="min-w-[120px] w-max">
                                        <Link href={external.href} className="min-w-[120px]" target="_blank" rel="noopener noreferrer">
                                            {external.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )} */}
                </div>
            )}
        </>
    );
};

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isItemActive, isDropdownOpen, toggleDropdown, handleKeyDown, getItemClasses } = useNavigation(navigationConfig.items);

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-g200" role="banner">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-center">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center">
                            <Logo width={116} height={40} />
                        </Link>
                    </div>

                    {/* Main Navigation */}
                    <nav className="ml-[80px]" role="navigation">
                        <ul role="menubar" className="flex gap-6 ">
                            {navigationConfig.items.map((item) => (
                                <li key={item.id} role="none" className="py-[15px] px-2 relative group">
                                    {renderNavigationItem(item, isItemActive(item.id), isDropdownOpen(item.id), () => toggleDropdown(item.id), handleKeyDown)}
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}
