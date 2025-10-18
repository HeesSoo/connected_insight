"use client";

import Card from "@/components/Card";
import AlternativeImg from "@/public/common/alternativeImg.png";
import { SolutionItem } from "@/types/solution";
import axios from "axios";
import { useEffect, useState } from "react";

const AlternativeData: SolutionItem = {
    uuid: "alternative-uuid",
    name: "Alternative Solution",
    core_inspector_target_ko: "대체 핵심 검사 대상",
    core_inspector_target_en: "Alternative Core Inspector Target",
    core_value_ko: "대체 주요 가치",
    core_value_en: "Alternative Core Value",
    index: 0,
    image: AlternativeImg,
};

const CISApplication: React.FC = ({}) => {
    const [data, setData] = useState<SolutionItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getApplications = async () => {
            try {
                // const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/solution`);
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/solution`);

                if (response.status === 200) {
                    setData(response.data.data);
                }
            } catch (err: unknown) {
                console.error("Error fetching solutions:", err);
            } finally {
                setLoading(false);
            }
        };

        getApplications();
    }, []);

    return (
        <div className="w-full max-w-[1440px] mx-auto pt-[80px] pb-[160px]">
            <h3 className="title text-title mb-[48px] font-semibold">CIS Application</h3>
            {loading ? (
                <div className="grid grid-cols-3 gap-x-4 gap-y-20">
                    {[1, 2, 3, 4, 5, 6].map((item) => {
                        return <Card key={item} item={AlternativeData} />;
                    })}
                </div>
            ) : data.length > 0 ? (
                <div className="grid grid-cols-3 gap-x-4 gap-y-20">
                    {data.map((item, index) => (
                        <Card key={index} item={item} />
                    ))}
                </div>
            ) : (
                <div className="w-full h-[300px] text-gray-500 text-center flex flex-col justify-center">CIS Application이 존재하지 않습니다.</div>
            )}
        </div>
    );
};

export default CISApplication;
