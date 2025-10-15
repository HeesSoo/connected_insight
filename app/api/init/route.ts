import { NextResponse } from "next/server";
import { startTranslationScheduler } from "@/lib/translations";

// 스케줄러가 이미 시작되었는지 추적하는 플래그 (모듈 레벨)
let schedulerInitialized = false;

/**
 * 서버 시작 시 번역 스케줄러를 초기화하는 API 엔드포인트
 * 이 엔드포인트는 서버가 시작될 때 자동으로 호출되어야 합니다.
 */
export async function GET() {
    if (schedulerInitialized) {
        return NextResponse.json({
            success: true,
            message: "번역 스케줄러가 이미 실행 중입니다.",
        });
    }

    try {
        // 5분마다 번역 데이터 업데이트
        startTranslationScheduler(5);
        schedulerInitialized = true;

        return NextResponse.json({
            success: true,
            message: "번역 스케줄러가 성공적으로 시작되었습니다.",
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: "번역 스케줄러 시작에 실패했습니다.",
                error: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}
