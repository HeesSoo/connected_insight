import { Suspense } from "react";
import AdminProductDetailClient from "./_component/AdminProductDetailClient";
import Apis from "@/hooks/api";
import {
    ProductDetail as ProductDetailType,
} from "@/app/[lang]/(web)/product/[productId]/_component/ProductDetailClient";

export const dynamic = 'force-dynamic';

async function fetchProduct(
    productId: string
): Promise<ProductDetailType | null> {
    try {
        const res = await Apis.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/cis/detail/${productId}`
        );

        if (res.status === 200) {
            return res.data.data || null;
        }
    } catch (err: any) {
        console.error("Error fetching product:", {
            message: err.message,
            status: err.response?.status,
            data: err.response?.data,
            url: err.config?.url,
        });
    }
    return null;
}

export default async function ProductDetail({
    params,
}: {
    params: { productId: string };
}) {
    const { productId } = params;
    const initialData = await fetchProduct(productId);

    return (
        <Suspense fallback={<div className="w-full h-screen"></div>}>
            <AdminProductDetailClient data={initialData} />
        </Suspense>
    );
}