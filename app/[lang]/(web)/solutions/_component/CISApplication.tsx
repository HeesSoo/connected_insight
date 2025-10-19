import { SolutionItem } from "@/types/solution";
import axios from "axios";
import SolutionItems from "./SolutionItems";

async function getApplications(): Promise<SolutionItem[]> {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/solution`);
        if (response.status === 200) {
            return response.data.data || [];
        }
    } catch (error) {
        console.error("Error fetching tokk:", error);
    }
    return [];
}

const CISApplication: React.FC = async ({}) => {
    const [applications] = await Promise.all([getApplications()]);

    return (
        <div className="w-full max-w-[1440px] mx-auto pt-[80px] pb-[160px]">
            <h3 className="title text-title mb-[48px] font-semibold">CIS Application</h3>
            <SolutionItems data={applications} />
        </div>
    );
};

export default CISApplication;
