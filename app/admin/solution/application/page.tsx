import SolutionApplicationClient from "./_component/SolutionApplicationClient";
import Apis from "@/hooks/api";

export const dynamic = 'force-dynamic';

async function getSolutionApplications() {
    try {
        const response = await Apis.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/solution`);
        // const response = await Apis.get(`http://localhost:8080/api/solution`);
        return response.data?.data || response.data;
    } catch (error) {
        console.error("Failed to fetch solution applications:", error);
        return [];
    }
}

export default async function SolutionApplication() {
    const applications = await getSolutionApplications();

    return <SolutionApplicationClient data={applications} />;
}
