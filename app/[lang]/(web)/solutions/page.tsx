import { Suspense } from "react";
import CISApplication from "./_component/CISApplication";

export default function Page() {
    return (
        <Suspense fallback={<div className="w-full h-screen"></div>}>
            <CISApplication />
        </Suspense>
    );
}
