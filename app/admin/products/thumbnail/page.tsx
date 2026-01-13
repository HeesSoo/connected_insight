import { Suspense } from "react";
import ThumbnailManagementClient from "./_component/ThumbnailManagementClient";

export default async function ThumbnailManagementPage() {
    return (
        <Suspense fallback={<div className="w-full h-screen"></div>}>
            <ThumbnailManagementClient />
        </Suspense>
    );
}
