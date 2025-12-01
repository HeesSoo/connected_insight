// 콘솔 출력을 제어하는 유틸리티
const isDevelopment = process.env.NODE_ENV === 'development';
const isLocal = typeof window !== 'undefined' && window.location.hostname === 'localhost';

// 특정 환경에서만 콘솔 출력
export const devConsole = {
    log: (...args: any[]) => {
        if (isDevelopment || isLocal) {
            console.log(...args);
        }
    },
    warn: (...args: any[]) => {
        if (isDevelopment || isLocal) {
            console.warn(...args);
        }
    },
    error: (...args: any[]) => {
        // 에러는 항상 출력
        console.error(...args);
    },
    info: (...args: any[]) => {
        if (isDevelopment || isLocal) {
            console.info(...args);
        }
    },
};

// 전역 콘솔을 완전히 비활성화하는 함수 (프로덕션에서)
export const disableConsoleInProduction = () => {
    if (!isDevelopment && typeof window !== 'undefined') {
        console.log = () => {};
        console.warn = () => {};
        console.info = () => {};
        // console.error는 유지
    }
};
