import axios from "axios";
import ProductDetailClient, {
    ProductDetail as ProductDetailType,
} from "./ProductDetailClient";

async function fetchProduct(
    productId: string
): Promise<ProductDetailType | null> {
    try {
        const res = await axios.get(
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
    productId,
}: {
    productId: string;
}) {
    const initialData = await fetchProduct(productId);

    return (
        <div>
            {/* server-side fetched initialData 전달 */}
            <ProductDetailClient data={initialData} />
        </div>
    );
}
