import axios from "axios";
import { Suspense } from "react";
import Support_ReservationLab from "./_component/Support_ReservationLab";

interface File {
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    is_deleted: boolean;
    uuid: string;
    name: string;
    s3_key: string;
    s3_url: string;
    mime_type: string;
    size: string;
    bucket: string;
}

interface ReservationImage {
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    is_deleted: boolean;
    uuid: string;
    reservation_uuid: string;
    file_uuid: string;
    name: string;
    name_en: string;
    display_order: number;
    file: File;
}

interface ReservationFeature {
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    is_deleted: boolean;
    uuid: string;
    reservation_uuid: string;
    title: string;
    title_en: string;
    description: string;
    description_en: string;
    display_order: number;
    images: any[];
}

export interface ReservationItem {
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    is_deleted: boolean;
    uuid: string;
    name: string;
    name_en: string;
    description: string;
    description_en: string;
    button_text: string;
    button_text_en: string;
    button_url: string;
    display_order: number;
    is_active: boolean;
    images: ReservationImage[];
    features: ReservationFeature[];
}

async function getAllReservations(): Promise<ReservationItem[]> {
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/reservation`
        );
        if (response.status === 200) {
            return response.data.data || [];
        }
    } catch (error) {
        console.error("Error fetching reservations:", error);
    }
    return [];
}

const Support: React.FC = async () => {
    const [datas] = await Promise.all([getAllReservations()]);

    return (
        <Suspense fallback={<div className="w-full h-screen"></div>}>
            <Support_ReservationLab data={datas} />
        </Suspense>
    );
};

export default Support;
