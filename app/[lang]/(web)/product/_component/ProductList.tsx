import axios from "axios";
import ProductListClient from "./ProductListClient";

async function fetchProducts() {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/cis`);
        if (res.status === 200) {
            return res.data.data || { cis: [], lingchen: [], tokk: [] };
        }
    } catch (err) {
        console.error("Error fetching product list (server):", err);
    }
    return { cis: [], lingchen: [], tokk: [] };
}

const ProductList: React.FC = async () => {
    const initialData = await fetchProducts();

    return (
        <div>
            {/* server-side fetched initialData 전달 */}
            <ProductListClient initialData={initialData} />
        </div>
    );
};

export default ProductList;
