import axios from "axios";
import { ContactUs } from "../page";
import { Suspense } from "react";
import ContactUsDetail from "./_component/ContactUsDetail";

async function fetchContacts({
    contactusId,
}: {
    contactusId: string;
}): Promise<ContactUs | null> {
    try {
        const sampleAccessToken =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE3NjQyMDY5MzAsImV4cCI6MTc2NDIzOTMzMH0.2L5g2d4ymPyCAxnk0KRJfx1HW8zqMd1V1k2lwAIVdho";
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/contactus/${contactusId}`,
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
