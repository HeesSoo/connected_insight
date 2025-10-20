import { Suspense } from "react";
import ProductDetail from "./_component/ProductDetail";

export default async function ProductDetailPage({ params }: { params: Promise<{ productId: string }> }) {
    const { productId } = await params;

    return (
        <Suspense fallback={<div className="w-full h-screen"></div>}>
            <ProductDetail productId={productId} />
        </Suspense>
    );
}
