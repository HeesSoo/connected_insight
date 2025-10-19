import { Suspense } from "react";
import ProductDetail from "./_component/ProductDetail";

export default function ProductDetailPage({ params }: { params: { productId: string } }) {
    return (
        <Suspense fallback={<div className="w-full h-screen"></div>}>
            <ProductDetail productId={params.productId} />
        </Suspense>
    );
}
