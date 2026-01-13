import CisFilesClient from "./_component/CisFilesClient";
import Apis from "@/hooks/api";

async function getCisFile() {
    try {
        // const response = await Apis.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/cis/files?type=plus`);
        const response = await Apis.get(`http://localhost:8080/api/cis/files?type=plus`);
        return response.data?.data || response.data;
    } catch (error) {
        console.error("Failed to fetch enum data:", error);
        return null;
    }
}

export default async function CisFiles() {
    const cisData = await getCisFile();

    return <CisFilesClient data={cisData} />;
}