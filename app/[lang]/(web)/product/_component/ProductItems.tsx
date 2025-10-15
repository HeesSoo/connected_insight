import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import DummyImage from "../_dummys/DummyProductImg.png";

const dummyItems = [
    {
        id: 1,
        image: DummyImage,
        category: "LineX CIS Plus",
        title: "INS-CHVS-550-10GM",
    },
    {
        id: 2,
        image: DummyImage,
        category: "LineX CIS Plus",
        title: "INS-CHVS-550-10GM",
    },
    {
        id: 3,
        image: DummyImage,
        category: "LineX CIS Plus",
        title: "INS-CHVS-550-10GM",
    },
    {
        id: 4,
        image: DummyImage,
        category: "LineX CIS Plus",
        title: "INS-CHVS-550-10GM",
    },
    {
        id: 5,
        image: DummyImage,
        category: "LineX CIS Plus",
        title: "INS-CHVS-550-10GM",
    },
    {
        id: 6,
        image: DummyImage,
        category: "LineX CIS Plus",
        title: "INS-CHVS-550-10GM",
    },
    {
        id: 7,
        image: DummyImage,
        category: "LineX CIS Plus",
        title: "INS-CHVS-550-10GM",
    },
    {
        id: 8,
        image: DummyImage,
        category: "LineX CIS Plus",
        title: "INS-CHVS-550-10GM",
    },
    {
        id: 9,
        image: DummyImage,
        category: "LineX CIS Plus",
        title: "INS-CHVS-550-10GM",
    },
    {
        id: 10,
        image: DummyImage,
        category: "LineX CIS Plus",
        title: "INS-CHVS-550-10GM",
    },
    {
        id: 11,
        image: DummyImage,
        category: "LineX CIS Plus",
        title: "INS-CHVS-550-10GM",
    },
    {
        id: 12,
        image: DummyImage,
        category: "LineX CIS Plus",
        title: "INS-CHVS-550-10GM",
    },
];

interface ProductItemType {
    id: number;
    image: string | StaticImageData;
    category: string;
    title: string;
}

export default function ProductItems() {
    const hasFilter = true; // filter가 있을 때 없을 때 구분 필요 -> 추후 zustand로 상태관리 추가

    return (
        <div className="flex-1">
            <h3 className="text-large leading-[30px] font-semibold text-g950 mb-4">
                Total&nbsp;<span className="text-base leading-[30px] font-bold text-g400 ">(24)</span>
            </h3>

            <section className={`grid ${hasFilter ? "grid-cols-3" : "grid-cols-4"} gap-x-4 gap-y-12`}>
                {dummyItems.map((item) => (
                    <ProductItem key={item.id} item={item} />
                ))}
            </section>
        </div>
    );
}

const ProductItem = ({ item }: { item: ProductItemType }) => {
    return (
        <Link href={`/product/${item.id}`} className="w-full">
            <Image src={item.image} alt={item.title} height={296} className="w-full mb-5" />

            <div>
                <div className="mb-1 text-g400 text-base font-medium">{item.category}</div>
                <h4 className="text-g950 text-large leading-[30px] font-semibold">{item.title}</h4>
            </div>
        </Link>
    );
};
