import SolutionClient from "./_component/SolutionClient";
import Apis from "@/hooks/api";

export const dynamic = 'force-dynamic';

async function getSolutions() {
    try {
        const response = await Apis.get(`/solution/category`);
        return response.data?.data || response.data;
    } catch (error) {
        console.error("Failed to fetch solutions:", error);
        return [];
    }
}

export default async function Solution() {
    const solutions = await getSolutions();

    return <SolutionClient data={solutions} />;
}
