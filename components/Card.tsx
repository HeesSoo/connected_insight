import Image from "next/image";

/**
 * Card 컴포넌트 - 3가지 형태 지원
 * variant: "default" | "product" | "case" - 카드 형태
 * image: 이미지 URL
 * caption: 이미지 캡션
 * category: 카테고리/태그
 * title: 제목
 * subtitle: 부제목
 * description: 설명
 * detail: 상세 정보
 * onClick: 클릭 이벤트
 */
interface PropsType {
    variant?: "default" | "product" | "case";
    image: string;
    caption?: string;
    category?: string;
    title: string;
    description?: string;
    detail?: string;
    width?: number;
    height?: number;
}

// 카드 variant별 설정
const cardConfig = {
    default: {
        imageWrapper: "relative mb-5",
        categorySpacing: "",
        titleSpacing: "text-titleSmall",
        detailClasses: "text-small text-gray-600 border-t border-gray-100 pt-3",
    },
    product: {
        imageWrapper: "relative mb-5",
        categorySpacing: "mb-2",
        titleSpacing: "text-titleSmall",
        detailClasses: "text-small text-gray-600 border-t border-gray-100 pt-3",
    },
    case: {
        imageWrapper: "relative mb-5",
        categorySpacing: "",
        titleSpacing: "text-titleSmall",
        detailClasses: "text-small text-gray-700 bg-gray-50 p-3 rounded-md",
    },
};

export default function Card({ variant = "default", image, caption, category, title, description, detail, width, height }: PropsType) {
    const baseClasses = "";
    // const clickableClasses = onClick ? "cursor-pointer hover:shadow-lg hover:scale-[1.02]" : "";
    const config = cardConfig[variant];

    return (
        <div className={`${baseClasses}`}>
            <div className="w-full">
                {/* 이미지 영역 */}
                <div className={config.imageWrapper}>
                    <Image src={image} alt={title} width={width} height={height} className="w-auto h-[296px] object-cover" />
                </div>

                {/* 콘텐츠 영역 */}
                <div className="">
                    {caption && variant === "case" && <div className="text-brand-primary text-base mb-1">{caption}</div>}

                    {category && <div className={`text-xs text-gray-500 uppercase tracking-wide ${config.categorySpacing}`}>{category}</div>}

                    <h3 className={`font-semibold text-primary-950 ${config.titleSpacing}`}>{title}</h3>

                    {description && <p className="text-small text-gray-700 leading-relaxed">{description}</p>}

                    {detail && <div className={config.detailClasses}>{detail}</div>}
                </div>
            </div>
        </div>
    );
}
