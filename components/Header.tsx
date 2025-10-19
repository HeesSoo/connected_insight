"use client";

import { navigationConfig } from "@/data/navigation";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import { useNavigation } from "@/hooks/useNavigation";
import { useTranslation } from "@/hooks/useTranslation";
import { ArrowIco } from "@/icons/icons";
import Logo from "@/public/svgs/logo.svg";
import { NavigationItem } from "@/types/navigation";
import axios from "axios";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

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
        className: `flex gap-x-2 text-large text-medium text-g950 ${isActive ? "text-ePrimary" : ""}`,
    };

    return (
        <>
            {hasLink ? (
                <Link href={localizedPath(item.href)} {...commonProps}>
                    <span>{item.label}</span>
                    {item?.children && item?.children?.length && (
                        <span className={`inline-flex items-center transition-transform duration-200 ${isActive ? "text-ePrimary" : ""} ${isOpen ? "rotate-180" : ""}`}>
                            <ArrowIco />
                        </span>
                    )}
                </Link>
            ) : (
                // 링크가 없는 경우: Button 사용
                <button onClick={onToggle} {...commonProps}>
                    <span>{item.label}</span>
                    {item?.children && item?.children?.length && (
                        <span className={`inline-flex items-center transition-transform duration-200 ${isActive ? "text-ePrimary" : ""} ${isOpen ? "rotate-180" : ""}`}>
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
                                        <Link href={child.href ? localizedPath(child.href) : "#"} className="relative min-w-[120px] group-hover:block">
                                            {child.label}
                                        </Link>
                                    </li>
                                </div>
                            ))}
                    </ul>
                    <div
                        className={`flex transition-all duration-200 ease-out ${
                            external && external.length > 0 ? "transform scale-100 translate-x-0 opacity-100 visible" : "transform scale-95 -translate-x-2 opacity-0 invisible"
                        }`}
                        style={{ height: external && external.length > 0 ? `${external.length * 48}px` : "0px" }}
                    >
                        {external && external.length > 0 && (
                            <>
                                <div className="w-[1px] h-full bg-g200 mx-6"></div>
                                <ul className={`flex flex-col gap-y-6`}>
                                    {external.map((external) => (
                                        <li key={external.id} role="none" className="min-w-[120px] w-max">
                                            <Link href={external.href} className="min-w-[248px] flex justify-between items-center" target="_blank" rel="noopener noreferrer">
                                                {external.label}
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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

export default function Header() {
    const router = useRouter();
    const pathname = usePathname();
    const { currentLanguage, setLanguage } = useTranslation();

    const replaceLangInPath = (lang: "ko" | "en") => {
        const currentPath = pathname ?? (typeof window !== "undefined" ? window.location.pathname : "/");
        const newPathname = currentPath.replace(/^\/(en|ko)(\/|$)/, `/${lang}$2`);
        router.replace(newPathname);
    };

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [gnbData, setGnbData] = useState(navigationConfig);
    const { isItemActive, isDropdownOpen, toggleDropdown, handleKeyDown, getItemClasses } = useNavigation(gnbData.items);
    const localizedPath = useLocalizedPath();

    useEffect(() => {
        const fetchGnbData = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/cis`);

                if (response.status === 200) {
                    const fetched = response.data.data;

                    // deep copy base navigation and inject lingchen & tokk externals from backend
                    const newNav = JSON.parse(JSON.stringify(navigationConfig));
                    const productsItem = newNav.items?.find((i: any) => i.id === "products");
                    if (productsItem && Array.isArray(productsItem.children)) {
                        const lingchenChild = productsItem.children.find((c: any) => c.id === "lingchen");
                        if (lingchenChild) {
                            lingchenChild.external = (fetched.lingchen || []).map((p: any) => ({
                                id: p.uuid,
                                label: p.name,
                                href: p.url,
                                isExternal: true,
                            }));
                        }

                        const tokkChild = productsItem.children.find((c: any) => c.id === "tokk");
                        if (tokkChild) {
                            tokkChild.external = (fetched.tokk || []).map((p: any) => ({
                                id: p.uuid,
                                label: p.name,
                                href: p.url,
                                isExternal: true,
                            }));
                        }
                    }

                    setGnbData(newNav);
                }
            } catch (error) {
                console.error("Error fetching GNB data:", error);
            }
        };

        fetchGnbData();
    }, []);

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-g200" role="banner">
            <div className="max-w-[1440px] mx-auto">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href={localizedPath("/")} className="flex items-center">
                            <Logo width={116} height={40} />
                        </Link>
                    </div>

                    {/* Main Navigation */}
                    <nav className="ml-[80px]" role="navigation">
                        <ul role="menubar" className="flex gap-6 ">
                            {gnbData.items.map((item) => (
                                <li key={item.id} role="none" className="py-[15px] px-2 relative group">
                                    {renderNavigationItem(item, isItemActive(item.id), isDropdownOpen(item.id), () => toggleDropdown(item.id), handleKeyDown, localizedPath)}
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="w-fit flex items-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                            <path
                                d="M12 21.5C10.6975 21.5 9.46833 21.2503 8.3125 20.751C7.15667 20.2517 6.14867 19.5718 5.2885 18.7115C4.42817 17.8513 3.74833 16.8433 3.249 15.6875C2.74967 14.5317 2.5 13.3025 2.5 12C2.5 10.6872 2.74967 9.45542 3.249 8.30475C3.74833 7.15408 4.42817 6.14867 5.2885 5.2885C6.14867 4.42817 7.15667 3.74833 8.3125 3.249C9.46833 2.74967 10.6975 2.5 12 2.5C13.3128 2.5 14.5446 2.74967 15.6953 3.249C16.8459 3.74833 17.8513 4.42817 18.7115 5.2885C19.5718 6.14867 20.2517 7.15408 20.751 8.30475C21.2503 9.45542 21.5 10.6872 21.5 12C21.5 13.3025 21.2503 14.5317 20.751 15.6875C20.2517 16.8433 19.5718 17.8513 18.7115 18.7115C17.8513 19.5718 16.8459 20.2517 15.6953 20.751C14.5446 21.2503 13.3128 21.5 12 21.5ZM12 19.9788C12.5103 19.3019 12.9398 18.6192 13.2885 17.9307C13.6372 17.2422 13.9212 16.4897 14.1405 15.673H9.8595C10.0917 16.5153 10.3789 17.2808 10.7213 17.9693C11.0634 18.6578 11.4897 19.3276 12 19.9788ZM10.0635 19.7038C9.68017 19.1538 9.33592 18.5285 9.03075 17.828C8.72558 17.1273 8.48842 16.409 8.31925 15.673H4.927C5.45517 16.7115 6.1635 17.584 7.052 18.2905C7.9405 18.9968 8.94433 19.4679 10.0635 19.7038ZM13.9365 19.7038C15.0557 19.4679 16.0595 18.9968 16.948 18.2905C17.8365 17.584 18.5448 16.7115 19.073 15.673H15.6807C15.4794 16.4153 15.2262 17.1368 14.921 17.8375C14.616 18.5382 14.2878 19.1602 13.9365 19.7038ZM4.298 14.173H8.0155C7.95267 13.8013 7.90708 13.4369 7.87875 13.0798C7.85058 12.7227 7.8365 12.3628 7.8365 12C7.8365 11.6372 7.85058 11.2773 7.87875 10.9202C7.90708 10.5631 7.95267 10.1987 8.0155 9.827H4.298C4.20183 10.1667 4.12817 10.5198 4.077 10.8865C4.02567 11.2532 4 11.6243 4 12C4 12.3757 4.02567 12.7468 4.077 13.1135C4.12817 13.4802 4.20183 13.8333 4.298 14.173ZM9.51525 14.173H14.4848C14.5474 13.8013 14.5929 13.4402 14.6212 13.0895C14.6494 12.7388 14.6635 12.3757 14.6635 12C14.6635 11.6243 14.6494 11.2612 14.6212 10.9105C14.5929 10.5598 14.5474 10.1987 14.4848 9.827H9.51525C9.45258 10.1987 9.40708 10.5598 9.37875 10.9105C9.35058 11.2612 9.3365 11.6243 9.3365 12C9.3365 12.3757 9.35058 12.7388 9.37875 13.0895C9.40708 13.4402 9.45258 13.8013 9.51525 14.173ZM15.9845 14.173H19.702C19.7982 13.8333 19.8718 13.4802 19.923 13.1135C19.9743 12.7468 20 12.3757 20 12C20 11.6243 19.9743 11.2532 19.923 10.8865C19.8718 10.5198 19.7982 10.1667 19.702 9.827H15.9845C16.0473 10.1987 16.0929 10.5631 16.1212 10.9202C16.1494 11.2773 16.1635 11.6372 16.1635 12C16.1635 12.3628 16.1494 12.7227 16.1212 13.0798C16.0929 13.4369 16.0473 13.8013 15.9845 14.173ZM15.6807 8.327H19.073C18.5385 7.27567 17.835 6.40317 16.9625 5.7095C16.09 5.016 15.0813 4.54167 13.9365 4.2865C14.3198 4.8685 14.6608 5.50508 14.9595 6.19625C15.2583 6.88725 15.4987 7.5975 15.6807 8.327ZM9.8595 8.327H14.1405C13.9083 7.491 13.6163 6.72075 13.2645 6.01625C12.9125 5.31175 12.491 4.64675 12 4.02125C11.509 4.64675 11.0875 5.31175 10.7355 6.01625C10.3837 6.72075 10.0917 7.491 9.8595 8.327ZM4.927 8.327H8.31925C8.50125 7.5975 8.74167 6.88725 9.0405 6.19625C9.33917 5.50508 9.68017 4.8685 10.0635 4.2865C8.91217 4.54167 7.90192 5.01767 7.03275 5.7145C6.16342 6.41117 5.4615 7.282 4.927 8.327Z"
                                fill="#161616"
                            />
                        </svg>

                        <button
                            className={`mr-1 h-6 ${currentLanguage === "ko" ? "bg-g950" : "bg-g200"} text-white px-3 text-small leading-5 rounded-xl`}
                            onClick={() => {
                                setLanguage("ko");
                                replaceLangInPath("ko");
                            }}
                        >
                            KR
                        </button>
                        <button
                            className={`mr-1 h-6 ${currentLanguage === "en" ? "bg-g950" : "bg-g200"} text-white px-3 text-small leading-5 rounded-xl`}
                            onClick={() => {
                                setLanguage("en");
                                replaceLangInPath("en");
                            }}
                        >
                            EN
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
