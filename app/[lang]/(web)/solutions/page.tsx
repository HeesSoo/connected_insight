import Image from "next/image";
import Card from "@/components/Card";
import image1 from "@/public/solutions/cis-application/cis_case_1.png";
import image2 from "@/public/solutions/cis-application/cis_case_2.png";
import image3 from "@/public/solutions/cis-application/cis_case_3.png";
import image4 from "@/public/solutions/cis-application/cis_case_4.png";
import image5 from "@/public/solutions/cis-application/cis_case_5.png";

const tempData = [
    {
        image: image1,
        caption: "Case 01",
        title: "배터리 산업",
        inpectorTarget: "용접, 전극 정렬, 이물질, 표면 손상 (핀홀, 스크래치)",
        core: "안전성 확보, 화재 및 리콜 위험 최소화",
    },
    {
        image: image2,
        caption: "Case 02",
        title: "반도체 산업",
        inpectorTarget: "웨이퍼 패턴, 미세 크랙, 범프 높이/형상, 이물질 (나노/마이크로 단위)",
        core: "신뢰성 및 수율 극대화, 초고집적화 대응",
    },
    {
        image: image3,
        caption: "Case 03",
        title: "PCB 산업",
        inpectorTarget: "도선 단선/합선, 솔더링(납땜) 불량, 부품 정렬/삽입 오류",
        core: "기능적 안정성 보장, 생산성 및 품질 관리 향상",
    },
    {
        image: image4,
        caption: "Case 04",
        title: "인쇄 산업",
        inpectorTarget: "색상 불일치, 잉크 번짐, 미인쇄/오인쇄, 이물질 혼입",
        core: "심미적 품질 확보, 브랜드 이미지 손상 방지",
    },
    {
        image: image5,
        caption: "Case 05",
        title: "디스플레이 산업",
        inpectorTarget: "라인 결함, 미세 스크래치, 화소 불량 (Pixel Defect), 무라 (Mura)",
        core: "시각적 품질 및 완성도 향상",
    },
];

const CISApplication: React.FC = ({}) => {
    return (
        <div className="w-full max-w-[1440px] mx-auto pt-[80px] pb-[160px]">
            <h3 className="title text-title mb-[48px] font-semibold">CIS Application</h3>
            <div className="grid grid-cols-3 gap-x-4 gap-y-20">
                {tempData.map((item, index) => (
                    <Card key={index} variant="case" {...item} image={item.image.src} width={469} height={352} />
                ))}
            </div>
        </div>
    );
};

export default CISApplication;
