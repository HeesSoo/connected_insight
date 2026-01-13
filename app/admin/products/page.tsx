import { Suspense } from "react";
import ProductList from "./_component/ProductList";
import Apis from "@/hooks/api";

// 빌드 타임이 아닌 요청 타임에 렌더링하도록 설정
export const dynamic = 'force-dynamic';

async function fetchProducts() {
    try {
        const res = await Apis.get(
            `/cis`
        );
        if (res.status === 200) {
            return res.data.data || { cis: [], lingchen: [], tokk: [] };
        }
    } catch (err) {
        console.error("Error fetching product list (server):", err);
    }
    return { cis: [], lingchen: [], tokk: [] };
}

export default async function CISProductList() {
    const initialData = await fetchProducts();

    return (
        <Suspense fallback={<div className="w-full h-screen"></div>}>
            <ProductList initialData={initialData} />
        </Suspense>
    );
}
