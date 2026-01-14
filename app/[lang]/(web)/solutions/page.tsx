import { Suspense } from "react";
import SolutionPage from "./_component/SolutionPage";

export const dynamic = 'force-dynamic';

export default function Page() {
    return (
        <Suspense fallback={<div className="w-full h-screen"></div>}>
            <SolutionPage />
        </Suspense>
    );
}
