import axios from "axios";
import { Suspense } from "react";
import ProductListClient from "./ProductListClient";
import Apis from "@/hooks/api";

async function fetchProducts() {
    try {
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/cis`
        );
        if (res.status === 200) {
            return (
                res.data.data || {
                    cis: [],
                    lingchen: [],
                    tokk: [],
                    lms: [],
                    uv: [],
                }
            );
        }
    } catch (err) {
        console.error("Error fetching product list (server):", err);
    }
    return { cis: [], lingchen: [], tokk: [], lms: [], uv: [] };
}

const ProductList: React.FC = async () => {
    const initialData = await fetchProducts();

    return (
        <div>
            {/* server-side fetched initialData 전달 */}
            <Suspense fallback={<div className="w-full h-screen"></div>}>
                <ProductListClient initialData={initialData} />
            </Suspense>
        </div>
    );
};

export default ProductList;
