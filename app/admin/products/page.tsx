import axios from "axios";
import { Suspense } from "react";
import ProductList from "./_component/ProductList";

async function fetchProducts() {
    try {
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/cis`
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
