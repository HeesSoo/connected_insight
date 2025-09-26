import { useState } from "react";

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
    label?: string;
    onChange: (value: string, checked: boolean) => void;
    textCls?: string;
    className?: string;
}
export default function Checkbox({ checked = false, indeterminate = false, value, label, onChange, textCls }: CheckboxProps) {
    const [isChecked, setIsChecked] = useState(checked);

    const onClickCheckbox = () => {
        if (indeterminate) {
            return;
        }

        onChange(value, !isChecked);
        setIsChecked(!isChecked);
    };

    return (
        <div className={`w-fit bg-white cursor-pointer flex items-center gap-2`} onClick={onClickCheckbox}>
            {!isChecked && (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M4.91409 21C4.37921 21 3.92647 20.8147 3.55588 20.4441C3.18529 20.0735 3 19.6208 3 19.0859V4.91409C3 4.37921 3.18529 3.92647 3.55588 3.55588C3.92647 3.18529 4.37921 3 4.91409 3H19.0859C19.6208 3 20.0735 3.18529 20.4441 3.55588C20.8147 3.92647 21 4.37921 21 4.91409V19.0859C21 19.6208 20.8147 20.0735 20.4441 20.4441C20.0735 20.8147 19.6208 21 19.0859 21H4.91409ZM4.91409 19.4118H19.0859C19.1674 19.4118 19.2421 19.3778 19.3099 19.3099C19.3778 19.2421 19.4118 19.1674 19.4118 19.0859V4.91409C19.4118 4.83256 19.3778 4.75791 19.3099 4.69015C19.2421 4.62221 19.1674 4.58824 19.0859 4.58824H4.91409C4.83256 4.58824 4.75791 4.62221 4.69015 4.69015C4.62221 4.75791 4.58824 4.83256 4.58824 4.91409V19.0859C4.58824 19.1674 4.62221 19.2421 4.69015 19.3099C4.75791 19.3778 4.83256 19.4118 4.91409 19.4118Z"
                        fill="#E3E3E3"
                    />
                </svg>
            )}
            {indeterminate && isChecked && (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="3" width="18" height="18" rx="2" fill="#E83837" fillOpacity="0.5" />
                    <rect width="12" height="2" transform="translate(6 11)" fill="white" />
                </svg>
            )}
            {!indeterminate && isChecked && (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10.6 16.2L17.65 9.15L16.25 7.75L10.6 13.4L7.75 10.55L6.35 11.95L10.6 16.2ZM5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V5C3 4.45 3.19583 3.97917 3.5875 3.5875C3.97917 3.19583 4.45 3 5 3H19C19.55 3 20.0208 3.19583 20.4125 3.5875C20.8042 3.97917 21 4.45 21 5V19C21 19.55 20.8042 20.0208 20.4125 20.4125C20.0208 20.8042 19.55 21 19 21H5Z"
                        fill="#E83837"
                    />
                </svg>
            )}
            {label && <div className={`text-base font-semibold text-g950 ${textCls}`}>{label}</div>}
        </div>
    );
}
