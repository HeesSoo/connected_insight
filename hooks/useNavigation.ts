"use client";

import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { NavigationItem } from "@/types/navigation";
import { usePathWithoutLang } from "@/hooks/useLocalizedPath";

export const useNavigation = (navigationItems: NavigationItem[]) => {
    const pathname = usePathWithoutLang();
    const [dropdownStates, setDropdownStates] = useState<Record<string, boolean>>({});

    // 현재 활성화된 아이템들 찾기 (자식 + 부모 모두 포함)
    const activeItems = useMemo(() => {
        const activeSet = new Set<string>();

        const findActiveItem = (items: NavigationItem[], parentIds: string[] = []): boolean => {
            for (const item of items) {
                // 현재 아이템이 활성화되어 있는지 확인
                const isCurrentActive = item.href && (item.href === pathname || (pathname.startsWith(item.href) && item.href !== "/"));

                if (isCurrentActive) {
                    // 현재 아이템과 모든 부모 아이템을 활성화
                    activeSet.add(item.id);
                    parentIds.forEach(parentId => activeSet.add(parentId));
                    return true;
                }

                // 자식 메뉴가 있으면 재귀적으로 확인
                if (item.children) {
                    const childActive = findActiveItem(item.children, [...parentIds, item.id]);
                    if (childActive) {
                        activeSet.add(item.id);
                        parentIds.forEach(parentId => activeSet.add(parentId));
                        return true;
                    }
                }
            }
            return false;
        };

        findActiveItem(navigationItems);
        return activeSet;
    }, [pathname, navigationItems]);

    // 드롭다운 열림 상태 (클릭)
    const isDropdownOpen = (itemId: string): boolean => {
        return dropdownStates[itemId] || false;
    };

    // 아이템 활성화 상태 (자식이 활성화되어 있으면 부모도 활성화)
    const isItemActive = (itemId: string): boolean => {
        return activeItems.has(itemId);
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
        const activeClasses = isActive ? "text-primary-600 font-semibold" : "text-g950";
        return `${baseClasses} ${activeClasses} transition-colors duration-200`;
    };

    return {
        activeItem: activeItems,
        isItemActive,
        isDropdownOpen,
        toggleDropdown,
        handleKeyDown,
        getItemClasses,
    };
};
