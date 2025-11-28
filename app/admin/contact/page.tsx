import axios from "axios";
import { Suspense } from "react";
import ContactUsList from "./_component/ContactUsList";

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
        const sampleAccessToken =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE3NjQyMDY5MzAsImV4cCI6MTc2NDIzOTMzMH0.2L5g2d4ymPyCAxnk0KRJfx1HW8zqMd1V1k2lwAIVdho";
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/contactus`,
            {
                headers: {
                    Authorization: `Bearer ${sampleAccessToken}`,
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
