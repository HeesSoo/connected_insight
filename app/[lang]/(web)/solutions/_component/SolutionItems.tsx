"use client";

import Card from "@/components/Card";
import { useTranslationStore } from "@/stores/translationStore";
import { SolutionItem } from "@/types/solution";

export default function SolutionItems({ data }: { data: SolutionItem[] }) {
    const { currentLanguage } = useTranslationStore();

    return data.length > 0 ? (
        <div className="grid grid-cols-3 gap-x-4 gap-y-20">
            {data.map((item, index) => (
                <Card 
                    key={index} 
                    item={{
                        ...item,
                        name: item?.[`name_${currentLanguage}`]
                    }} 
                />
            ))}
        </div>
    ) : (
        <div className="w-full h-[300px] text-gray-500 text-center flex flex-col justify-center">CIS Application이 존재하지 않습니다.</div>
    );
}
