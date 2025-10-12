import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

// Google Sheets API 인증 설정
const auth = new google.auth.GoogleAuth({
    credentials: {
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    },
    scopes: "https://www.googleapis.com/auth/spreadsheets",
});

const sheets = google.sheets({ version: "v4", auth });

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const language = searchParams.get("lang") || "ko";

    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
            range: `'main'`,
        });

        const rows = response.data.values || [];
        const translations: Record<string, string> = {};

        const findLanguage =
            rows?.[0].findIndex((column) => {
                return column === language;
            }) - 1;

        rows.forEach(([key, ...values]) => {
            if (key && values[findLanguage]) {
                translations[key] = values[findLanguage];
            }
        });

        return NextResponse.json(translations);
    } catch (error) {
        return NextResponse.json(error);
    }
}
