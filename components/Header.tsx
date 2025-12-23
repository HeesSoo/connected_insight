"use client";

import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import { useNavigation } from "@/hooks/useNavigation";
import { ArrowIco } from "@/icons/icons";
import Logo from "@/public/svgs/logo.svg";
import { NavigationItem } from "@/types/navigation";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
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
    const [isHovered, setIsHovered] = useState(false);

    const commonProps = {
        onKeyDown: (e: React.KeyboardEvent) => onKeyDown(e, item.id),
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
        className: `flex gap-x-2 text-large text-medium text-g950 hover:text-ePrimary ${
            isActive ? "text-ePrimary" : ""
        }`,
    };

    const arrowFill = isHovered || isActive ? "#E83837" : "#111111";

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
                                isOpen ? "rotate-180" : ""
                            }`}
                        >
                            <ArrowIco fill={arrowFill} />
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
                                isOpen ? "rotate-180" : ""
                            }`}
                        >
                            <ArrowIco fill={arrowFill} />
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
                                <div key={child.id} className="">
                                    <li
                                        role="none"
                                        className="relative min-w-[120px] flex group px-4"
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
                                            className="relative min-w-[120px] w-full rounded-lg group-hover:block hover:text-ePrimary select-none px-6 py-3 hover:bg-g50"
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
                                {/* <div className="w-[1px] h-full bg-g200 ml-6"></div> */}
                                <div className="w-[1px] h-full bg-g200"></div>
                                <ul className={`flex flex-col w-max`}>
                                    {external.map((external) => (
                                        <li
                                            key={external.id}
                                            role="none"
                                            className="w-full px-4"
                                        >
                                            <Link
                                                href={external.href}
                                                className="w-full flex justify-between items-center rounded-lg hover:text-ePrimary select-none hover:bg-g50 px-6 py-3 whitespace-nowrap gap-4"
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
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // console.log("gnbData in Header:", gnbData);

    // 모바일 메뉴 열릴 때 body overflow hidden
    useEffect(() => {
        if (isMenuOpen) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }

        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, [isMenuOpen]);

    // 현재 전체 URL (pathname + search params) 생성
    const currentFullPath = searchParams.toString()
        ? `${pathname}?${searchParams.toString()}`
        : pathname;

    // Check if current path matches item or its children
    const isItemOrChildActive = (item: NavigationItem): boolean => {
        const itemPath = item.href ? localizedPath(item.href) : "";

        // 전체 경로 비교 (쿼리 파라미터 포함)
        if (currentFullPath === itemPath) return true;

        if (item.children) {
            return item.children.some((child) => {
                const childPath = child.href ? localizedPath(child.href) : "";

                // /product 경로는 쿼리 파라미터까지 정확히 일치해야 함
                if (childPath.includes("/product")) {
                    return currentFullPath === childPath;
                }

                // 그 외 경로는 pathname만으로 startsWith로 체크
                return pathname === childPath || pathname.startsWith(childPath);
            });
        }

        return false;
    };

    return (
        <header
            className="bg-white shadow-sm sticky top-0 z-50 border-b border-g200 w-full"
            role="banner"
        >
            <div className="max-w-[1440px] mx-auto">
                <div className="flex items-center justify-between px-4 lg:px-0 max-md:h-[56px]">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link
                            href={localizedPath("/")}
                            className="flex items-center"
                        >
                            <Logo width={116} height={40} />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav
                        className="ml-[80px] hidden lg:block"
                        role="navigation"
                    >
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

                    <div className="hidden lg:block">
                        <LanguageSwitcher initialLang={lang} />
                    </div>

                    {/* Mobile Menu Button */}
                    <label className="hidden max-md:flex items-center justify-center w-10 h-10 cursor-pointer">
                        <input
                            type="checkbox"
                            className="peer hidden"
                            checked={isMenuOpen}
                            onChange={(e) => setIsMenuOpen(e.target.checked)}
                        />
                        <svg
                            className="peer-checked:hidden"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M3 12H21M3 6H21M3 18H21"
                                stroke="#111111"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                        <svg
                            className="hidden peer-checked:block"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M18 6L6 18M6 6L18 18"
                                stroke="#111111"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                    </label>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div
                className={`lg:hidden fixed inset-0 top-[57px] bg-white z-40 transform transition-transform duration-300 w-full ${
                    isMenuOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <nav className="h-full flex flex-col">
                    <div className="flex-1 overflow-y-auto py-4">
                        <ul className="max-md:flex max-md:gap-5 max-md:flex-col">
                            {gnbData.items.map((item) => {
                                const isParentActive =
                                    isItemOrChildActive(item);
                                const itemPath = item.href
                                    ? localizedPath(item.href)
                                    : "";
                                const isCurrentActive = pathname === itemPath;

                                return (
                                    <li
                                        key={item.id}
                                        className={`group/parent${
                                            isCurrentActive ? "is-active" : ""
                                        }`}
                                    >
                                        {item.children &&
                                        item.children.length > 0 ? (
                                            <details className="group/menu max-md:flex max-md:flex-col">
                                                <summary
                                                    className={`w-full flex items-center justify-between p-4 text-large cursor-pointer list-none transition-colors max-md:py-0 max-md:gap-5 max-md:align-center ${
                                                        isCurrentActive
                                                            ? "text-ePrimary"
                                                            : "text-g950"
                                                    }`}
                                                >
                                                    <span>{item.label}</span>
                                                    <svg
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        className="transition-transform duration-200 group-open/menu:rotate-180 m-0"
                                                    >
                                                        <path
                                                            d="M7 10L12 15L17 10"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                </summary>
                                                <ul className="max-md:flex max-md:gap-5 max-md:flex-col max-md:mt-5 bg-g50 p-4">
                                                    {item.children.map(
                                                        (child) => {
                                                            const childPath =
                                                                child.href
                                                                    ? localizedPath(
                                                                          child.href
                                                                      )
                                                                    : "";
                                                            // /product는 쿼리 파라미터까지 정확히 일치, 나머지는 startsWith
                                                            const isChildActive =
                                                                childPath.includes(
                                                                    "/product"
                                                                )
                                                                    ? currentFullPath ===
                                                                      childPath
                                                                    : pathname ===
                                                                          childPath ||
                                                                      pathname.startsWith(
                                                                          childPath
                                                                      );

                                                            return (
                                                                <li
                                                                    key={
                                                                        child.id
                                                                    }
                                                                >
                                                                    <Link
                                                                        href={localizedPath(
                                                                            child.href ||
                                                                                "#"
                                                                        )}
                                                                        className={`block py-2 transition-colors max-md:py-0 ${
                                                                            isChildActive
                                                                                ? "text-ePrimary font-medium"
                                                                                : "text-g700 hover:text-ePrimary"
                                                                        }`}
                                                                        onClick={() =>
                                                                            setIsMenuOpen(
                                                                                false
                                                                            )
                                                                        }
                                                                    >
                                                                        {
                                                                            child.label
                                                                        }
                                                                    </Link>
                                                                    {child.external &&
                                                                        child
                                                                            .external
                                                                            .length >
                                                                            0 && (
                                                                            <ul className="pl-6 mt-5 max-md:flex max-md:gap-5 max-md:flex-col">
                                                                                {child.external.map(
                                                                                    (
                                                                                        ext
                                                                                    ) => (
                                                                                        <li
                                                                                            key={
                                                                                                ext.id
                                                                                            }
                                                                                            className="list-disc text-g500"
                                                                                        >
                                                                                            <Link
                                                                                                href={
                                                                                                    ext.href
                                                                                                }
                                                                                                className="flex items-center gap-2 py-2 text-g600 hover:text-ePrimary transition-colors max-md:py-0"
                                                                                                target="_blank"
                                                                                                rel="noopener noreferrer"
                                                                                                onClick={() =>
                                                                                                    setIsMenuOpen(
                                                                                                        false
                                                                                                    )
                                                                                                }
                                                                                            >
                                                                                                {
                                                                                                    ext.label
                                                                                                }
                                                                                                <svg
                                                                                                    width="16"
                                                                                                    height="16"
                                                                                                    viewBox="0 0 24 24"
                                                                                                    fill="none"
                                                                                                >
                                                                                                    <path
                                                                                                        d="M16.1442 7.80375L6.81144 17.127C6.67294 17.2653 6.49894 17.3329 6.28944 17.3298C6.07978 17.3266 5.90569 17.2558 5.76719 17.1173C5.62886 16.9788 5.55969 16.8063 5.55969 16.6C5.55969 16.3937 5.62886 16.2213 5.76719 16.0828L15.0904 6.75H6.89419C6.68169 6.75 6.50353 6.67808 6.35969 6.53425C6.21603 6.39042 6.14419 6.21225 6.14419 5.99975C6.14419 5.78708 6.21603 5.609 6.35969 5.4655C6.50353 5.32183 6.68169 5.25 6.89419 5.25H16.7402C16.9964 5.25 17.211 5.33658 17.3842 5.50975C17.5575 5.68308 17.6442 5.89775 17.6442 6.15375V16C17.6442 16.2125 17.5723 16.3906 17.4284 16.5343C17.2846 16.6781 17.1064 16.75 16.8939 16.75C16.6813 16.75 16.5031 16.6781 16.3594 16.5343C16.2159 16.3906 16.1442 16.2125 16.1442 16V7.80375Z"
                                                                                                        fill="#5D5D5D"
                                                                                                    />
                                                                                                </svg>
                                                                                            </Link>
                                                                                        </li>
                                                                                    )
                                                                                )}
                                                                            </ul>
                                                                        )}
                                                                </li>
                                                            );
                                                        }
                                                    )}
                                                </ul>
                                            </details>
                                        ) : (
                                            <Link
                                                href={localizedPath(
                                                    item.href || "#"
                                                )}
                                                className={`block text-large transition-colors px-4 ${
                                                    isCurrentActive
                                                        ? "text-ePrimary font-medium"
                                                        : "text-g950 hover:text-ePrimary"
                                                }`}
                                                onClick={() =>
                                                    setIsMenuOpen(false)
                                                }
                                            >
                                                {item.label}
                                            </Link>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Mobile Footer */}
                    <div className="border-t border-g200 p-6">
                        <LanguageSwitcher initialLang={lang} />
                    </div>
                </nav>
            </div>
        </header>
    );
}
