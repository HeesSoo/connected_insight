import Image from "next/image";
import case1 from "@/public/solutions/cis-application/cis_case_1.png";

const Support: React.FC = () => {
    return (
        <div className="w-full">
            <div className="flex align-center justify-center w-full bg-primary-950">
                <h2 className="text-white text-[32px] font-bold line-height-[48px]">Reservation Lab</h2>
            </div>
            <div className="w-full flex mx-auto pt-[80px] pb-[160px]">
                <div>
                    <Image src={case1.src} alt="Reservation Lab" width={560} height={560} />
                </div>
                <div>
                    <h3 className="text-h3 font-semibold">Reservation Lab</h3>
                    <div>
                        최신 비주얼 AI 알고리즘 소프트웨어로 리튬 이온 배터리 제조 전 과정을 실시간으로 모니터링하고 분석합니다. 이를 통해 리튬 배터리 산업에서
                        탁월한 생산 효율성과 정밀도를 달성할 수 있습니다.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Support;
