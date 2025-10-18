import AlternativeImg from "@/public/common/alternativeImg.png";
import Image from "next/image";
import Link from "next/link";
import { ProductItem as ProductItemType } from "../page";

const dummyData: ProductItemType = {
    fov: 1937,
    line_rate: 160,
    name: "Dummy Name",
    resolution: 3600,
    thumbnail: AlternativeImg,
    type: "plus",
    uuid: "dummy-uuid-1",
    wd: 48,
};

export default function ProductItems({ data, loading }: { data: ProductItemType[]; loading: boolean }) {
    const hasFilter = true; // filter가 있을 때 없을 때 구분 필요 -> 추후 zustand로 상태관리 추가

    return (
        <div className="flex-1">
            <h3 className="text-large leading-[30px] font-semibold text-g950 mb-4">
                Total&nbsp;<span className="text-base leading-[30px] font-bold text-g400 ">({data.length})</span>
            </h3>

            {loading && (
                <section className={`grid ${hasFilter ? "grid-cols-3" : "grid-cols-4"} gap-x-4 gap-y-12`}>
                    {[1, 2, 3, 4, 5, 6].map((item, idx) => (
                        <ProductItem key={idx} item={dummyData} />
                    ))}
                </section>
            )}

            {!loading && data.length === 0 && <div className="w-full text-gray-500 text-center pt-[240px]">검색된 제품이 없습니다.</div>}
            {!loading && data.length > 0 && (
                <section className={`grid ${hasFilter ? "grid-cols-3" : "grid-cols-4"} gap-x-4 gap-y-12`}>
                    {data.map((item) => (
                        <ProductItem key={item.uuid} item={item} />
                    ))}
                </section>
            )}
        </div>
    );
}

const ProductItem = ({ item }: { item: ProductItemType }) => {
    return (
        <Link href={`/product/${item.uuid}`} className="w-full">
            <Image
                src={item.thumbnail || AlternativeImg}
                alt={item.name}
                height={296}
                className="w-full mb-5"
                onError={() => <Image src={AlternativeImg} alt={item.name} height={296} className="w-full mb-5" />}
            />

            <div>
                <div className="mb-1 text-g400 text-base font-medium">
                    {item.type === "plus" && "LineX Plus"}
                    {item.type === "max" && "LineX Max"}
                    {item.type === "max pro" && "LineX MAX PRO"}
                    {item.type === "color" && "LineX COLOR"}
                </div>
                <h4 className="text-g950 text-large leading-[30px] font-semibold">{item.name}</h4>
            </div>
        </Link>
    );
};
