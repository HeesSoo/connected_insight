"use client";

import { useEffect } from "react";
import { useEnumStore } from "@/store/enumStore";

export default function EnumProvider({ children }: { children: React.ReactNode }) {
    const fetchEnum = useEnumStore((state) => state.fetchEnum);
    const data = useEnumStore((state) => state.data);

    useEffect(() => {
        // 데이터가 없으면 앱 시작시 한 번만 호출
        if (!data) {
            fetchEnum();
        }
    }, [data, fetchEnum]);

    return <>{children}</>;
}