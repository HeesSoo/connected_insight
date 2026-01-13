import { Solution, SolutionItem } from "@/types/solution";
import axios from "axios";
import SolutionComponent from "./SolutionComponent";

async function getApplications(): Promise<Solution> {
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/solution/with-category`
        );
        if (response.status === 200) {
            return response.data.data || [];
        }
    } catch (error) {
        console.error("Error fetching tokk:", error);
    }
    return undefined;
}

const SolutionPage: React.FC = async ({}) => {
    const [applications] = await Promise.all([getApplications()]);

    return (
        <div className="w-full max-w-[1440px] mx-auto pt-[120px] pb-[160px] max-md:pt-8 max-md:pb-24">
            <SolutionComponent data={applications} />
        </div>
    );
};

export default SolutionPage;
