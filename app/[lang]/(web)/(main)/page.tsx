import Banner from "./_component/Banner";
import Contactus from "./_component/ContactUs";
import Linchen from "./_component/Lingchen";
import MainSolution from "./_component/Solution";
import Tokk from "./_component/Tokk";

export default function Home() {
    return (
        <main className="min-h-screen">
            <Banner />

            <section className="w-full max-w-[1440px] mx-auto mt-[120px] mb-[160px] flex flex-col gap-[120px]">
                <MainSolution />
                <Linchen />
                <Tokk />
                <Contactus />
            </section>
        </main>
    );
}
