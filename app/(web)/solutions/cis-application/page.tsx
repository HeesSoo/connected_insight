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
    },
    {
        image: image2,
        caption: "Case 02",
        title: "반도체 산업",
    },
    {
        image: image3,
        caption: "Case 03",
        title: "PCB 산업",
    },
    {
        image: image4,
        caption: "Case 04",
        title: "인쇄 산업",
    },
    {
        image: image5,
        caption: "Case 05",
        title: "디스플레이 산업",
    },
];

const CISApplication: React.FC = ({}) => {
    return (
        <div className="w-full max-w-[1440px] mx-auto pt-[80px] pb-[160px]">
            <h3 className="title text-title mb-[48px] font-semibold">CIS Application</h3>
            <div className="grid grid-cols-3 gap-x-4 gap-y-20">
                {tempData.map((item, index) => (
                    <Card key={index} variant="case" image={item.image.src} caption={item.caption} title={item.title} width={469} height={264} />
                ))}
            </div>
        </div>
    );
};

export default CISApplication;
