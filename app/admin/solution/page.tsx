import SolutionClient from "./_component/SolutionClient";
import Apis from "@/hooks/api";

async function getSolutions() {
    try {
        // const response = await Apis.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/solution/category`);
        const response = await Apis.get(`http://localhost:8080/api/solution/category`);
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
