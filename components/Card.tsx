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
 *
 */
interface PropsType {
    variant?: "default" | "product" | "case";
    image: string;
    caption?: string;
    category?: string;
    title: string;
    description?: string;
    inpectorTarget?: string;
    core?: string;
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

export default function Card({ variant = "default", image, caption, category, title, description, detail, width, height, core, inpectorTarget }: PropsType) {
    const baseClasses = "";
    // const clickableClasses = onClick ? "cursor-pointer hover:shadow-lg hover:scale-[1.02]" : "";
    const config = cardConfig[variant];

    return (
        <div className={`${baseClasses}`}>
            <div className="w-full">
                {/* 이미지 영역 */}
                <div className={`${config.imageWrapper} relative`}>
                    <Image src={image} alt={title} width={width} height={height} className="w-auto h-[296px] object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-6 left-6">
                        {caption && variant === "case" && <div className="text-g200 text-base mb-1">{caption}</div>}
                        <h3 className={`font-[600] text-white text-primary-950 ${config.titleSpacing}`}>{title}</h3>
                    </div>
                </div>

                {/* 콘텐츠 영역 */}
                <div className="">
                    {category && <div className={`text-xs text-gray-500 uppercase tracking-wide ${config.categorySpacing}`}>{category}</div>}
                    {description && <p className="text-small text-gray-700 leading-relaxed">{description}</p>}

                    {inpectorTarget && (
                        <div className="mb-6">
                            <div className="text-brand-primary text-base mb-1 text-[500]">주요 가치</div>
                            <div className={`text-large text-g950 leading-relaxed text-[600] h-[60px]`}>{inpectorTarget}</div>
                        </div>
                    )}
                    {core && (
                        <div>
                            <div className="text-brand-primary text-base mb-1 text-[500]">핵심 검사 대상</div>
                            <div className={`text-large text-g950 leading-relaxed text-[600]`}>{core}</div>
                        </div>
                    )}
                    {detail && <div className={config.detailClasses}>{detail}</div>}
                </div>
            </div>
        </div>
    );
}
