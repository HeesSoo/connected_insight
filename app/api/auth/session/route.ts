import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/app/api/session";

export async function GET(request: NextRequest) {
    try {
        const session = await getSession();

        // 세션이 있으면 토큰 반환
        if (session?.token) {
            return NextResponse.json({
                token: session.token,
                userId: session.userId,
            });
        }

        // 세션이 없으면 401 반환
        return NextResponse.json(
            { error: "No active session" },
            { status: 401 }
        );
    } catch (error) {
        console.error("Session fetch error:", error);
        return NextResponse.json(
            { error: "Failed to fetch session" },
            { status: 500 }
        );
    }
}
