import axios from "axios";
import { Suspense } from "react";
import ContactUsList from "./_component/ContactUsList";

// 빌드 타임이 아닌 요청 타임에 렌더링하도록 설정
export const dynamic = 'force-dynamic';

export interface ContactUs {
    uuid: string;
    name: string;
    email: string;
    contact: string;
    account: string;
    department: string;
    position: string;
    site_url: string;
    content: string;
    file_uuid: string;
    file: {
        created_at: string;
        updated_at: string;
        deleted_at: string;
        is_deleted: false;
        uuid: string;
        name: string;
        s3_key: string;
        s3_url: string;
        mime_type: string;
        size: 0;
        bucket: string;
    };
    created_at: string;
    updated_at: string;
    is_deleted: true;
}

async function fetchContacts(): Promise<ContactUs[] | null> {
    try {
        // 환경 변수에서 토큰을 가져오거나, 없으면 빌드 시 스킵
        const accessToken = process.env.ADMIN_ACCESS_TOKEN;

        if (!accessToken) {
            console.warn("ADMIN_ACCESS_TOKEN is not set. Skipping data fetch.");
            return null;
        }

        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/contactus`,
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
        console.error("Error fetching contacts:", {
            message: err.message,
            status: err.response?.status,
            data: err.response?.data,
            url: err.config?.url,
        });
    }
    return null;
}

export default async function ContactHistory() {
    const initialData = await fetchContacts();

    return (
        <Suspense fallback={<div className="w-full h-screen"></div>}>
            <ContactUsList data={initialData} />
        </Suspense>
    );
}
