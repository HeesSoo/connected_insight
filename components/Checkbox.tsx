import React, { useState } from "react";

/**
 * checked: 체크박스 체크 여부
 * indeterminate: 부분 선택 상태 (하위 항목이 일부 선택된 경우)
 * value: 체크박스 값
 * label: 체크박스 라벨
 * onClick: 체크박스 클릭 이벤트
 */
interface CheckboxProps {
    checked: boolean;
    indeterminate?: boolean;
    value: string;
    label?: string | React.ReactNode;
    onChange: (value: string, checked: boolean) => void;
    textCls?: string;
    className?: string;
}
export default function Checkbox({
    checked = false,
    indeterminate = false,
    value,
    label,
    onChange,
    textCls,
    className = "",
}: CheckboxProps) {
    const onClickCheckbox = () => {
        if (indeterminate) {
            return;
        }

        onChange(value, !checked);
    };

    return (
        <div
            className={`w-fit bg-white cursor-pointer flex items-center gap-2 ${className}`}
            onClick={onClickCheckbox}
        >
            <div className="w-6 h-6 flex justify-center items-center">
                <div className="w-[18px] h-[18px] bg-white">
                    {!checked && (
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M1.91409 18C1.37921 18 0.926471 17.8147 0.555882 17.4441C0.185294 17.0735 0 16.6208 0 16.0859V1.91409C0 1.37921 0.185294 0.926471 0.555882 0.555882C0.926471 0.185294 1.37921 0 1.91409 0H16.0859C16.6208 0 17.0735 0.185294 17.4441 0.555882C17.8147 0.926471 18 1.37921 18 1.91409V16.0859C18 16.6208 17.8147 17.0735 17.4441 17.4441C17.0735 17.8147 16.6208 18 16.0859 18H1.91409ZM1.91409 16.4118H16.0859C16.1674 16.4118 16.2421 16.3778 16.3099 16.3099C16.3778 16.2421 16.4118 16.1674 16.4118 16.0859V1.91409C16.4118 1.83256 16.3778 1.75791 16.3099 1.69015C16.2421 1.62221 16.1674 1.58824 16.0859 1.58824H1.91409C1.83256 1.58824 1.75791 1.62221 1.69015 1.69015C1.62221 1.75791 1.58824 1.83256 1.58824 1.91409V16.0859C1.58824 16.1674 1.62221 16.2421 1.69015 16.3099C1.75791 16.3778 1.83256 16.4118 1.91409 16.4118Z"
                                fill="#E3E3E3"
                            />
                        </svg>
                    )}
                    {indeterminate && checked && (
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect
                                width="18"
                                height="18"
                                rx="2"
                                fill="#E83837"
                                fill-opacity="0.5"
                            />
                            <rect
                                width="12"
                                height="2"
                                transform="translate(3 8)"
                                fill="white"
                            />
                        </svg>
                    )}
                    {!indeterminate && checked && (
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M7.6 13.2L14.65 6.15L13.25 4.75L7.6 10.4L4.75 7.55L3.35 8.95L7.6 13.2ZM2 18C1.45 18 0.979167 17.8042 0.5875 17.4125C0.195833 17.0208 0 16.55 0 16V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H16C16.55 0 17.0208 0.195833 17.4125 0.5875C17.8042 0.979167 18 1.45 18 2V16C18 16.55 17.8042 17.0208 17.4125 17.4125C17.0208 17.8042 16.55 18 16 18H2Z"
                                fill="#E83837"
                            />
                        </svg>
                    )}
                </div>
            </div>

            {label && (
                <div className={`text-base font-semibold text-g950 ${textCls}`}>
                    {label}
                </div>
            )}
        </div>
    );
}
