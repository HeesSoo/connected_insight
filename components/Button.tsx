/**
 * label: 버튼 라벨
 * onClick: 버튼 클릭 이벤트
 * type: 버튼 타입
 * btnType: 버튼 스타일 타입
 * size: 버튼 크기
 * icLeft: 왼쪽 아이콘
 * icRight: 오른쪽 아이콘
 * disabled: 버튼 비활성화 여부
 * className: 버튼 추가 className
 */
interface ButtonProps {
    label: React.ReactNode;
    onClick: (
        e:
            | React.FormEvent<HTMLFormElement>
            | React.MouseEvent<HTMLButtonElement>
    ) => void;
    type?: "submit" | "button" | "reset" | undefined;
    btnType?: "primary" | "secondary";
    size?: "large" | "medium";
    icLeft?: React.ReactNode;
    icRight?: React.ReactNode;
    disabled?: boolean;
    className?: string;
}

export default function Button({
    label,
    onClick,
    type = "button",
    btnType = "primary",
    size = "large",
    icLeft,
    icRight,
    disabled = false,
    className = "",
}: ButtonProps) {
    const baseClass = `
        flex items-center gap-3 justify-center text-white 
        rounded-[2px] transition-colors flex items-center justify-center gap-1 font-[600] disabled:bg-g200
    `;
    const buttonStyles = {
        primary: "bg-g950 hover:bg-ePrimary",
        secondary: "bg-ePrimary hover:bg-ePrimary/90",
    };

    const buttonSizeStyles = {
        large: "text-titleSmall h-[60px] px-12 py-3",
        medium: "text-base h-[48px] px-6 px-3",
    };

    return (
        <button
            className={`${baseClass} ${buttonStyles[btnType]} ${buttonSizeStyles[size]} ${className}`}
            onClick={onClick}
            type={type}
            disabled={disabled}
        >
            {icLeft}
            {label}
            {icRight}
        </button>
    );
}
