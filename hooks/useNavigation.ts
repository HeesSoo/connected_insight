"use client";

import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { NavigationItem } from "@/types/navigation";

export const useNavigation = (navigationItems: NavigationItem[]) => {
    const pathname = usePathname();
    const [dropdownStates, setDropdownStates] = useState<Record<string, boolean>>({});

    // 현재 활성화된 아이템 찾기
    const activeItem = useMemo(() => {
        const findActiveItem = (items: NavigationItem[]): string | null => {
            for (const item of items) {
                if (item.href === pathname || (pathname.startsWith(item.href) && item.href !== "/")) {
                    return item.id;
                }
                if (item.children) {
                    const childActive = findActiveItem(item.children);
                    if (childActive) return item.id;
                }
            }
            return null;
        };
        return findActiveItem(navigationItems);
    }, [pathname, navigationItems]);

    // 드롭다운 열림 상태 (클릭)
    const isDropdownOpen = (itemId: string): boolean => {
        return dropdownStates[itemId] || false;
    };

    // 아이템 활성화 상태
    const isItemActive = (itemId: string): boolean => {
        return activeItem === itemId;
    };

    // 드롭다운 토글
    const toggleDropdown = (itemId: string) => {
        setDropdownStates((prev) => ({ ...prev, [itemId]: !prev[itemId] }));
    };

    // 키보드 이벤트 핸들러
    const handleKeyDown = (event: React.KeyboardEvent, itemId: string) => {
        switch (event.key) {
            case "Enter":
            case " ":
                event.preventDefault();
                toggleDropdown(itemId);
                break;
            case "Escape":
                setDropdownStates((prev) => ({ ...prev, [itemId]: false }));
                break;
        }
    };

    // CSS 클래스 생성
    const getItemClasses = (itemId: string, baseClasses: string = ""): string => {
        const isActive = isItemActive(itemId);
        const activeClasses = isActive ? "text-primary-600 font-semibold" : "text-primary-950";
        return `${baseClasses} ${activeClasses} transition-colors duration-200`;
    };

    return {
        activeItem,
        isItemActive,
        isDropdownOpen,
        toggleDropdown,
        handleKeyDown,
        getItemClasses,
    };
};
