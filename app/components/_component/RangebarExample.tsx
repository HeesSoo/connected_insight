import Rangebar from "@/components/Rangebar";
import { useState } from "react";
import Content from "./Content";

const RangebarExample = () => {
    const [freq, setFreq] = useState<[number, number]>([11, 160]);

    return (
        <Content
            description="Rangebar 입니다."
            props={[
                { name: "label?", type: "string", description: "라벨 (default : Download)" },
                { name: "min", type: "number", description: "최소값" },
                { name: "max", type: "number", description: "최대값" },
                { name: "step", type: "number", description: "스텝" },
                { name: "value", type: "[number, number]", description: "값" },
                { name: "onChange", type: "(value: [number, number]) => void", description: "값 변경 이벤트" },
                { name: "unit?", type: "string", description: "단위 (default : kHz)" },
                { name: "disabled?", type: "boolean", description: "비활성화 여부 (default : false)" },
                { name: "smooth?", type: "boolean", description: "부드럽게 이동 여부 (default : true)" },
                { name: "className?", type: "string", description: "클래스명" },
                { name: "formatValue?", type: "(value: number) => string", description: "값 포맷팅" },
                { name: "parseValue?", type: "(text: string) => number", description: "값 파싱" },
            ]}
            examples={[
                {
                    description: "기본 사용",
                    code: (
                        <div className="w-[320px]">
                            <Rangebar label="FOV" min={0} max={200} step={5} value={freq} onChange={setFreq} unit="kHz" />
                        </div>
                    ),
                },
            ]}
        />
    );
};

export default RangebarExample;
