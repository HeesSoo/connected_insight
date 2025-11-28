"use client";

import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import { useNavigation } from "@/hooks/useNavigation";
import { ArrowIco } from "@/icons/icons";
import Logo from "@/public/svgs/logo.svg";
import { NavigationItem } from "@/types/navigation";
import Link from "next/link";
import React, { useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";

const renderNavigationItem = (
    item: NavigationItem,
    isActive: boolean,
    isOpen: boolean,
    onToggle: () => void,
    onKeyDown: (event: React.KeyboardEvent, itemId: string) => void,
    localizedPath: (path: string) => string,
    level: number = 0
): React.ReactNode => {
    const hasLink = item.href && item.href !== "#";
    const [external, setExternal] = useState<NavigationItem[]>([]);

    const commonProps = {
        onKeyDown: (e: React.KeyboardEvent) => onKeyDown(e, item.id),
        className: `flex gap-x-2 text-large text-medium text-g950 ${
            isActive ? "text-ePrimary" : ""
        }`,
    };

    return (
        <>
            {hasLink ? (
                <Link href={localizedPath(item.href)} {...commonProps}>
                    <span className="select-none leading-[60px]">
                        {item.label}
                    </span>
                    {item?.children && item?.children?.length && (
                        <span
                            className={`inline-flex items-center transition-transform duration-200 ${
                                isActive ? "text-ePrimary" : ""
                            } ${isOpen ? "rotate-180" : ""}`}
                        >
                            <ArrowIco />
                        </span>
                    )}
                </Link>
            ) : (
                // 링크가 없는 경우: Button 사용
                <button onClick={onToggle} {...commonProps}>
                    <span className="select-none leading-[60px]">
                        {item.label}
                    </span>
                    {item?.children && item?.children?.length && (
                        <span
                            className={`inline-flex items-center transition-transform duration-200 ${
                                isActive ? "text-ePrimary" : ""
                            } ${isOpen ? "rotate-180" : ""}`}
                        >
                            <ArrowIco />
                        </span>
                    )}
                </button>
            )}

            {/* 드롭다운 메뉴 */}
            {item?.children && item?.children?.length && (
                <div
                    className="absolute top-[calc(100%+1px)] left-[-22px] flex py-3
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
                    <ul
                        id={`submenu-${item.id}`}
                        role="menu"
                        className={`flex flex-col w-max`}
                    >
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
                                        <Link
                                            href={
                                                child.href
                                                    ? localizedPath(child.href)
                                                    : "#"
                                            }
                                            className="relative min-w-[120px] group-hover:block hover:text-ePrimary select-none w-full px-6 py-3 hover:bg-g50"
                                        >
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
                        style={{
                            height:
                                external && external.length > 0
                                    ? `auto`
                                    : "0px",
                        }}
                    >
                        {external && external.length > 0 && (
                            <>
                                <div className="w-[1px] h-full bg-g200 ml-6"></div>
                                <ul className={`flex flex-col`}>
                                    {external.map((external) => (
                                        <li
                                            key={external.id}
                                            role="none"
                                            className="min-w-[120px] w-full"
                                        >
                                            <Link
                                                href={external.href}
                                                className="min-w-[280px] w-full flex justify-between items-center hover:text-ePrimary select-none hover:bg-g50 px-6 py-3"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {external.label}
                                                <svg
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M16.1442 7.80375L6.81144 17.127C6.67294 17.2653 6.49894 17.3329 6.28944 17.3298C6.07978 17.3266 5.90569 17.2558 5.76719 17.1173C5.62886 16.9788 5.55969 16.8063 5.55969 16.6C5.55969 16.3937 5.62886 16.2213 5.76719 16.0828L15.0904 6.75H6.89419C6.68169 6.75 6.50353 6.67808 6.35969 6.53425C6.21603 6.39042 6.14419 6.21225 6.14419 5.99975C6.14419 5.78708 6.21603 5.609 6.35969 5.4655C6.50353 5.32183 6.68169 5.25 6.89419 5.25H16.7402C16.9964 5.25 17.211 5.33658 17.3842 5.50975C17.5575 5.68308 17.6442 5.89775 17.6442 6.15375V16C17.6442 16.2125 17.5723 16.3906 17.4284 16.5343C17.2846 16.6781 17.1064 16.75 16.8939 16.75C16.6813 16.75 16.5031 16.6781 16.3594 16.5343C16.2159 16.3906 16.1442 16.2125 16.1442 16V7.80375Z"
                                                        fill="#5D5D5D"
                                                    />
                                                </svg>
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

interface HeaderProps {
    lang: string;
    gnbData: any;
}

export default function Header({ lang, gnbData }: HeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const {
        isItemActive,
        isDropdownOpen,
        toggleDropdown,
        handleKeyDown,
        getItemClasses,
    } = useNavigation(gnbData.items);
    const localizedPath = useLocalizedPath();

    console.log("gnbData in Header:", gnbData);

    return (
        <header
            className="bg-white shadow-sm sticky top-0 z-50 border-b border-g200"
            role="banner"
        >
            <div className="max-w-[1440px] mx-auto">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link
                            href={localizedPath("/")}
                            className="flex items-center"
                        >
                            <Logo width={116} height={40} />
                        </Link>
                    </div>

                    {/* Main Navigation */}
                    <nav className="ml-[80px]" role="navigation">
                        <ul role="menubar" className="flex gap-6 ">
                            {gnbData.items.map((item) => (
                                <li
                                    key={item.id}
                                    role="none"
                                    className="px-2 relative group"
                                >
                                    {renderNavigationItem(
                                        item,
                                        isItemActive(item.id),
                                        isDropdownOpen(item.id),
                                        () => toggleDropdown(item.id),
                                        handleKeyDown,
                                        localizedPath
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <LanguageSwitcher initialLang={lang} />
                </div>
            </div>
        </header>
    );
}
