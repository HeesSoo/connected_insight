import DownloadClient from "./_components/DownloadClient";
import axios from "axios";

enum DownloadType {
    "CIS Camera" = "cis",
    "Industrial Control Devices" = "lingchen",
    "Linear Actuator" = "tokk",
}

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

export interface DownloadItem {
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    is_deleted: boolean;
    uuid: string;
    name: string;
    type: DownloadType;
    file: File;
}

export interface DownloadData {
    cis?: DownloadItem[];
    lingchen?: DownloadItem[];
    tokk?: DownloadItem[];
}

async function getAllDownload(): Promise<DownloadData> {
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/download`,
            {
                headers: {
                    "Cache-Control": "no-cache",
                },
            }
        );

        if (response.status === 200) {
            return response.data.data || {};
        }
    } catch (error) {
        console.error("Error fetching downloads:", error);
    }
    return {};
}

export default async function Download() {
    const data = await getAllDownload();

    return <DownloadClient initialData={data} />;
}
