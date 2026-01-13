"use client";

import AdminCisDetailClient from "./AdminCisDetail";
import AdminExternalProductDetailClient from "./AdminExternalProductDetail";

export default function AdminProductDetailClient({ data }: { data: Record<string, any> }) {
    const isExternalProduct = data?.type === 'tokk' || data?.type === 'lingchen';

    return isExternalProduct ? (
        <AdminExternalProductDetailClient data={data} />
    ) : (
        <AdminCisDetailClient data={data} />
    );
}
