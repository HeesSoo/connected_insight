import { Suspense } from "react";
import ProductList from "./_component/ProductList";

const ProductPage: React.FC = async () => {
    return (
        <Suspense fallback={<div className="w-full h-screen"></div>}>
            <ProductList />
        </Suspense>
    );
};

export default ProductPage;
