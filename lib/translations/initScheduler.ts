import { startTranslationScheduler } from "./scheduler";

// 스케줄러가 이미 시작되었는지 추적하는 플래그
let initialized = false;

/**
 * 서버 사이드에서 번역 스케줄러를 초기화
 * 이 함수는 한 번만 실행되며, 중복 실행을 방지합니다.
 */
export function initializeTranslationScheduler() {
    // 클라이언트 사이드에서는 실행하지 않음
    if (typeof window !== "undefined") {
        return;
    }

    // 이미 초기화되었으면 중복 실행 방지
    if (initialized) {
        return;
    }

    try {
        // 5분마다 번역 데이터 업데이트
        startTranslationScheduler(5);
        initialized = true;
    } catch (error) {
        console.error("Translation Error: ", error);
    }
}
