import axios from "axios";
import { ContactUs } from "../page";
import { Suspense } from "react";
import ContactUsDetail from "./_component/ContactUsDetail";

// 빌드 타임이 아닌 요청 타임에 렌더링하도록 설정
export const dynamic = 'force-dynamic';

async function fetchContacts({
    contactusId,
}: {
    contactusId: string;
}): Promise<ContactUs | null> {
    try {
        // 환경 변수에서 토큰을 가져오거나, 없으면 빌드 시 스킵
        const accessToken = process.env.ADMIN_ACCESS_TOKEN;

        if (!accessToken) {
            console.warn("ADMIN_ACCESS_TOKEN is not set. Skipping data fetch.");
            return null;
        }

        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/contactus/${contactusId}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        if (res.status === 200) {
            return res.data.data || null;
        }
    } catch (err: any) {
        console.error("Error fetching contact:", {
            message: err.message,
            status: err.response?.status,
            data: err.response?.data,
            url: err.config?.url,
        });
    }
    return null;
}

export default async function ContactUsPage({
    params,
}: {
    params: { contactusId: string };
}) {
    const { contactusId } = params;
    const contact = await fetchContacts({ contactusId });

    return (
        <Suspense fallback={<div className="w-full h-screen"></div>}>
            <ContactUsDetail data={contact} />
        </Suspense>
    );
}
