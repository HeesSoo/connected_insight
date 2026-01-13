import { Suspense } from "react";
import ContactUsList from "./_component/ContactUsList";
import Apis from "@/hooks/api";

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
        // Apis는 서버/클라이언트 환경을 자동으로 감지하여 토큰 추가
        const res = await Apis.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/contactus`);

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
