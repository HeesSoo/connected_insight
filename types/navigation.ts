export interface NavigationItem {
    id: string;
    label: string;
    href?: string;
    hasDropdown?: boolean;
    isExternal?: boolean;
    isTab?: boolean;
    children?: NavigationItem[];
    external?: NavigationItem[];
}

export interface NavigationConfig {
    items: NavigationItem[];
}

export type ActiveNavigationState = {
    activeItem: string | null;
    isDropdownOpen: boolean;
};

export type DropdownPosition = {
    x: number;
    y: number;
    width: number;
};
