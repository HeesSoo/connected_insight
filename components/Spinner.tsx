"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface SpinnerContextType {
    open: (options?: SpinnerOptions) => void;
    close: () => void;
}

interface SpinnerOptions {
    targetElement?: HTMLElement | React.RefObject<HTMLElement>;
    size?: "sm" | "md" | "lg";
    overlay?: boolean;
    className?: string;
    fullScreen?: boolean;
}

const SpinnerContext = createContext<SpinnerContextType | null>(null);

export const useSpinner = () => {
    const context = useContext(SpinnerContext);
    if (!context) {
        throw new Error("useSpinner must be used within SpinnerProvider");
    }
    return context;
};

export function SpinnerProvider({ children }: { children: ReactNode }) {
    const [spinnerState, setSpinnerState] = useState<SpinnerOptions | null>(null);

    const open = (options: SpinnerOptions = {}) => {
        setSpinnerState({
            fullScreen: true,
            size: "md",
            overlay: true,
            className: "",
            ...options,
        });
    };

    const close = () => setSpinnerState(null);

    return (
        <SpinnerContext.Provider value={{ open, close }}>
            {spinnerState && (spinnerState.fullScreen ? <Spinner /> : <ContainerSpinner {...spinnerState} />)}
            {children}
        </SpinnerContext.Provider>
    );
}

// 전체 화면을 덮는 Spinner (기존 방식)
function Spinner() {
    return (
        <div className="w-screen h-screen bg-gray-500 bg-opacity-40 z-[9999] flex justify-center items-center fixed top-0 left-0">
            <SpinnerIcon />
        </div>
    );
}

// 특정 영역 안에서 사용할 수 있는 ContainerSpinner
export function ContainerSpinner({ className = "", size = "md", overlay = true }: { className?: string; size?: "sm" | "md" | "lg"; overlay?: boolean }) {
    if (overlay) {
        return (
            <div className={`absolute inset-0 bg-white bg-opacity-80 flex justify-center items-center z-10 ${className}`}>
                <SpinnerIcon size={getIconSize(size)} />
            </div>
        );
    }

    return (
        <div className={`flex justify-center items-center ${className}`}>
            <SpinnerIcon size={getIconSize(size)} />
        </div>
    );
}

// 특정 element 안에 spinner를 렌더링하는 함수
export function renderSpinnerInElement(
    targetElement: HTMLElement | React.RefObject<HTMLElement>,
    options: {
        size?: "sm" | "md" | "lg";
        overlay?: boolean;
        className?: string;
        hideContent?: boolean; // 원본 내용을 숨길지 여부
    } = {}
) {
    const element = targetElement instanceof HTMLElement ? targetElement : targetElement.current;
    if (!element) return null;

    const spinnerElement = document.createElement("div");
    spinnerElement.className = `spinner-container ${options.overlay ? "absolute inset-0 bg-white bg-opacity-80 flex justify-center items-center z-10" : "flex justify-center items-center"} ${
        options.className || ""
    }`;

    // 원본 내용을 숨기고 spinner만 보여주기
    if (options.hideContent) {
        // 원본 내용을 백업하고 숨기기
        const originalContent = element.innerHTML;
        element.setAttribute("data-original-content", originalContent);
        element.style.position = "relative";

        // 원본 내용을 숨기고 spinner만 표시
        element.innerHTML = "";
        element.appendChild(spinnerElement);
    } else {
        // 기존 방식: overlay로 spinner 표시
        element.appendChild(spinnerElement);
    }

    // SpinnerIcon을 HTML로 변환
    const iconSize = getIconSize(options.size);
    spinnerElement.innerHTML = `
        <div class="animate-spin" style="width: ${iconSize}px; height: ${iconSize}px;">
            <svg width="${iconSize}" height="${iconSize}" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="30" cy="6.25" r="6.25" fill="#FF6363" />
                <circle cx="30" cy="53.75" r="6.25" fill="#D9D9D9" />
                <circle cx="6.25" cy="30" r="6.25" transform="rotate(-90 6.25 30)" fill="#D9D9D9" />
                <circle cx="53.75" cy="30" r="6.25" transform="rotate(-90 53.75 30)" fill="#D9D9D9" />
                <circle cx="13.2063" cy="13.2063" r="6.25" transform="rotate(-45 13.2063 13.2063)" fill="#D9D9D9" />
                <circle cx="46.7939" cy="46.7938" r="6.25" transform="rotate(-45 46.7939 46.7938)" fill="#D9D9D9" />
                <circle cx="46.7939" cy="13.2063" r="6.25" transform="rotate(45 46.7939 13.2063)" fill="#D9D9D9" />
                <circle cx="13.2063" cy="46.7938" r="6.25" transform="rotate(45 13.2063 46.7938)" fill="#D9D9D9" />
            </svg>
        </div>
    `;

    return spinnerElement;
}

// 특정 element에서 spinner를 제거하는 함수
export function removeSpinnerFromElement(
    targetElement: HTMLElement | React.RefObject<HTMLElement>,
    restoreContent: boolean = false // 원본 내용을 복원할지 여부
) {
    const element = targetElement instanceof HTMLElement ? targetElement : targetElement.current;
    if (!element) return;

    if (restoreContent) {
        // 원본 내용 복원
        const originalContent = element.getAttribute("data-original-content");
        if (originalContent) {
            element.innerHTML = originalContent;
            element.removeAttribute("data-original-content");
            element.style.position = "";
        }
    } else {
        // spinner만 제거
        const spinnerContainer = element.querySelector(".spinner-container");
        if (spinnerContainer) {
            spinnerContainer.remove();
        }
    }
}

// Spinner 아이콘 컴포넌트 (재사용 가능)
function SpinnerIcon({ size = 60 }: { size?: number }) {
    return (
        <div className={`animate-spin`} style={{ width: size, height: size }}>
            <svg width={size} height={size} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="30" cy="6.25" r="6.25" fill="#FF6363" />
                <circle cx="30" cy="53.75" r="6.25" fill="#D9D9D9" />
                <circle cx="6.25" cy="30" r="6.25" transform="rotate(-90 6.25 30)" fill="#D9D9D9" />
                <circle cx="53.75" cy="30" r="6.25" transform="rotate(-90 53.75 30)" fill="#D9D9D9" />
                <circle cx="13.2063" cy="13.2063" r="6.25" transform="rotate(-45 13.2063 13.2063)" fill="#D9D9D9" />
                <circle cx="46.7939" cy="46.7938" r="6.25" transform="rotate(-45 46.7939 46.7938)" fill="#D9D9D9" />
                <circle cx="46.7939" cy="13.2063" r="6.25" transform="rotate(45 46.7939 13.2063)" fill="#D9D9D9" />
                <circle cx="13.2063" cy="46.7938" r="6.25" transform="rotate(45 13.2063 46.7938)" fill="#D9D9D9" />
            </svg>
        </div>
    );
}

// 헬퍼 함수
function getIconSize(size?: "sm" | "md" | "lg"): number {
    const sizeMap = {
        sm: 24,
        md: 32,
        lg: 48,
    };
    return sizeMap[size || "md"];
}

export default Spinner;
