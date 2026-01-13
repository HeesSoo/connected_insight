import { create } from "zustand";
import Apis from "@/hooks/api";
import { EnumItem } from "@/lib/enumUtils";

// Enum 타입 정의 (실제 API 응답에 맞게 수정하세요)
export interface EnumData {
    [key: string]: EnumItem[];
}

interface EnumState {
    data: EnumData | null;
    isLoading: boolean;
    error: Error | null;
    fetchEnum: () => Promise<void>;
    clearEnum: () => void;
}

export const useEnumStore = create<EnumState>((set) => ({
    data: null,
    isLoading: false,
    error: null,

    // Enum 데이터 가져오기
    fetchEnum: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await Apis.get(`/main/enum`);
            // const response = await Apis.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/main/enum`);
            set({
                data: response.data.data || response.data,
                isLoading: false,
            });
        } catch (error: any) {
            console.error("Failed to fetch enum:", error);
            set({
                error,
                isLoading: false,
            });
        }
    },

    // Enum 데이터 초기화
    clearEnum: () => {
        set({ data: null, error: null });
    },
}));