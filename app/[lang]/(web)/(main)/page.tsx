import { MainBanner } from "@/types/banner";
import { LingchenItem } from "@/types/lingchen";
import { SolutionItem } from "@/types/solution";
import axios from "axios";
import { Suspense } from "react";
import Banner from "./_component/Banner";
import Contactus from "./_component/ContactUs";
import Linchen from "./_component/Lingchen";
import RedirectAlert from "./_component/RedirectAlert";
import MainSolution from "./_component/Solution";
import Tokk from "./_component/Tokk";

async function getBanners(): Promise<MainBanner[]> {
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/main/banner`
        );
        if (response.status === 200) {
            return response.data.data || [];
        }
    } catch (error) {
        console.error("Error fetching banners:", error);
    }
    return [];
}

async function getSolutions(): Promise<SolutionItem[]> {
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/solution`
        );
        if (response.status === 200) {
            return response.data.data || [];
        }
    } catch (error) {
        console.error("Error fetching solutions:", error);
    }
    return [];
}

async function getLingchen(): Promise<LingchenItem[]> {
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/cis/lingchen`
        );
        if (response.status === 200) {
            return response.data.data || [];
        }
    } catch (error) {
        console.error("Error fetching lingchen:", error);
    }
    return [];
}

async function getTokk(): Promise<LingchenItem[]> {
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/cis/tokk`
        );
        if (response.status === 200) {
            return response.data.data || [];
        }
    } catch (error) {
        console.error("Error fetching tokk:", error);
    }
    return [];
}

export default async function Home() {
    // 서버에서 병렬로 데이터 fetch
    const [banners, solutions, lingchenData, tokkData] = await Promise.all([
        getBanners(),
        getSolutions(),
        getLingchen(),
        getTokk(),
    ]);

    return (
        <main className="min-h-screen">
            <Suspense fallback={null}>
                <RedirectAlert />
            </Suspense>
            <Banner banners={banners} />

            <section className="w-full max-w-[1504px] mx-auto mt-[120px] mb-[160px] flex flex-col gap-[120px] px-8">
                <MainSolution data={solutions} />
                <Linchen data={lingchenData} />
                <Tokk data={tokkData} />
                <Contactus />
            </section>
        </main>
    );
}
