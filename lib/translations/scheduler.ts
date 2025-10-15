import { updateTranslations } from "./fetchTranslations";

let schedulerInterval: NodeJS.Timeout | null = null;

/**
 * 번역 데이터 자동 업데이트 스케줄러 시작
 * @param intervalMinutes - 업데이트 주기 (분 단위, 기본값: 5분)
 */
export function startTranslationScheduler(intervalMinutes: number = 5): void {
    if (schedulerInterval) {
        return;
    }

    const intervalMs = intervalMinutes * 60 * 1000;

    // 즉시 첫 업데이트 실행 (조건부)
    updateTranslations(false, intervalMinutes).catch((error) => {
        console.error("Init Translation Error: ", error);
    });

    // 주기적 업데이트 설정 (조건부)
    schedulerInterval = setInterval(() => {
        updateTranslations(false, intervalMinutes).catch((error) => {
            console.error("Translation Update Error: ", error);
        });
    }, intervalMs);

    // 프로세스 종료 시 스케줄러 정리
    process.on("SIGINT", () => {
        stopTranslationScheduler();
        process.exit(0);
    });

    process.on("SIGTERM", () => {
        stopTranslationScheduler();
        process.exit(0);
    });
}

/**
 * 번역 데이터 자동 업데이트 스케줄러 중지
 */
export function stopTranslationScheduler(): void {
    if (schedulerInterval) {
        clearInterval(schedulerInterval);
        schedulerInterval = null;
    }
}

/**
 * 스케줄러 실행 상태 확인
 */
export function isSchedulerRunning(): boolean {
    return schedulerInterval !== null;
}
