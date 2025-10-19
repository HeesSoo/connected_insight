import Image from "next/image";
import { ProductDetail } from "../page";

export default function ProductDrawing({ data }: { data: ProductDetail }) {
    return (
        <div className="w-full flex mt-[80px]">
            <h2 className="flex-1 pl-9 text-title font-bold text-g950">Drawing</h2>
            <div className="w-[955px]">
                <Image src={data.drawing_img[0].s3_url} alt={data.drawing_img[0].name} width={955} height={2400} className="object-cover" />
            </div>
        </div>
    );
}
