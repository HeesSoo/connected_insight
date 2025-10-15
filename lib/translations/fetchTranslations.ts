import { google } from "googleapis";
import * as fs from "fs";
import * as path from "path";

// Google Sheets API 인증 설정
const auth = new google.auth.GoogleAuth({
    credentials: {
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    },
    scopes: "https://www.googleapis.com/auth/spreadsheets",
});

const sheets = google.sheets({ version: "v4", auth });

// 번역 데이터 타입
export interface TranslationData {
    [language: string]: {
        [key: string]: string;
    };
}

/**
 * 한국 시간을 반환하는 헬퍼 함수
 */
function getKoreaTime(): Date {
    const now = new Date();
    return new Date(now.getTime() + 9 * 60 * 60 * 1000); // UTC+9
}

/**
 * 한국 시간을 문자열로 반환 (YYYY-MM-DD HH:mm:ss 형식)
 */
function getKoreaTimeString(): string {
    const koreaTime = getKoreaTime();
    return koreaTime.toISOString().replace('T', ' ').substring(0, 19);
}

/**
 * 구글 스프레드시트에서 번역 데이터를 가져오는 함수
 */
export async function fetchTranslationsFromSheet(): Promise<TranslationData> {
    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
            range: `'main'`,
        });

        const rows = response.data.values || [];

        if (rows.length === 0) {
            return {};
        }

        // 첫 번째 행은 헤더 (key, language1, language2, ...)
        const [header, ...dataRows] = rows;
        const [, ...languages] = header; // 첫 컬럼은 'key'이므로 제외

        const translations: TranslationData = {};

        // 각 언어별로 객체 초기화
        languages.forEach((lang) => {
            if (lang) {
                translations[lang] = {};
            }
        });

        // 데이터 행을 순회하며 번역 데이터 구성
        dataRows.forEach((row) => {
            const [key, ...values] = row;

            if (key) {
                languages.forEach((lang, index) => {
                    if (lang && values[index]) {
                        translations[lang][key] = values[index];
                    }
                });
            }
        });

        return translations;
    } catch (error) {
        throw error;
    }
}

/**
 * 번역 데이터를 JSON 파일로 저장하는 함수
 */
export async function saveTranslationsToFile(translations: TranslationData): Promise<void> {
    try {
        const publicDir = path.join(process.cwd(), "public");
        const translationsDir = path.join(publicDir, "translations");

        // 디렉토리가 없으면 생성
        if (!fs.existsSync(translationsDir)) {
            fs.mkdirSync(translationsDir, { recursive: true });
        }

        // 각 언어별로 개별 JSON 파일 저장
        for (const [language, data] of Object.entries(translations)) {
            const filePath = path.join(translationsDir, `${language}.json`);
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
        }

        // 모든 번역 데이터를 하나의 파일로도 저장 (선택사항)
        const allTranslationsPath = path.join(translationsDir, "all.json");
        fs.writeFileSync(allTranslationsPath, JSON.stringify(translations, null, 2), "utf-8");

        // 마지막 업데이트 시간 저장 (한국 시간)
        const metaPath = path.join(translationsDir, "meta.json");
        const koreaTime = getKoreaTime();

        fs.writeFileSync(
            metaPath,
            JSON.stringify(
                {
                    lastUpdated: koreaTime.toISOString(),
                    lastUpdatedKST: getKoreaTimeString(),
                    languages: Object.keys(translations),
                },
                null,
                2
            ),
            "utf-8"
        );
    } catch (error) {
        console.error("Translation Save Error: ", error);
        throw error;
    }
}

/**
 * meta.json 파일을 확인하여 업데이트가 필요한지 판단
 * @param intervalMinutes - 업데이트 주기 (분 단위)
 * @returns 업데이트가 필요하면 true, 아니면 false
 */
export function shouldUpdateTranslations(intervalMinutes: number = 5): boolean {
    try {
        const translationsDir = path.join(process.cwd(), "public", "translations");
        const metaPath = path.join(translationsDir, "meta.json");

        // meta.json 파일이 없으면 업데이트 필요
        if (!fs.existsSync(metaPath)) {
            return true;
        }

        // meta.json 파일 읽기
        const metaContent = fs.readFileSync(metaPath, "utf-8");
        const meta = JSON.parse(metaContent);

        // lastUpdated가 없으면 업데이트 필요
        if (!meta.lastUpdated) {
            return true;
        }

        // 마지막 업데이트 시간과 현재 시간 비교 (한국 시간 기준)
        const lastUpdated = new Date(meta.lastUpdated);
        const now = getKoreaTime();
        const diffMinutes = (now.getTime() - lastUpdated.getTime()) / (1000 * 60);

        if (diffMinutes >= intervalMinutes) {
            return true;
        }

        return false;
    } catch (error) {
        console.error("meta.json Error: ", error);
        // 오류 발생 시 안전하게 업데이트 진행
        return true;
    }
}

/**
 * 번역 데이터를 가져와서 파일로 저장하는 통합 함수
 * @param force - true면 강제로 업데이트, false면 shouldUpdateTranslations 체크
 * @param intervalMinutes - 업데이트 주기 (분 단위)
 */
export async function updateTranslations(force: boolean = false, intervalMinutes: number = 5): Promise<void> {
    try {
        // 강제 업데이트가 아니면 업데이트 필요 여부 체크
        if (!force && !shouldUpdateTranslations(intervalMinutes)) {
            return;
        }

        const translations = await fetchTranslationsFromSheet();

        await saveTranslationsToFile(translations);
    } catch (error) {
        console.error(`Translation Update Error: `, error);
    }
}
