import Image from "next/image";
import DummyImage from "../../_dummys/DummyProductImg.png";

const dummyItems = [
    {
        key: "drawing",
        title: "Drawing",
        image: DummyImage,
    },
    {
        key: "drawing",
        title: "Drawing",
        image: DummyImage,
    },
    {
        key: "drawing",
        title: "Drawing",
        image: DummyImage,
    },
    {
        key: "drawing",
        title: "Drawing",
        image: DummyImage,
    },
    {
        key: "drawing",
        title: "Drawing",
        image: DummyImage,
    },
    {
        key: "drawing",
        title: "Drawing",
        image: DummyImage,
    },
    {
        key: "drawing",
        title: "Drawing",
        image: DummyImage,
    },
    {
        key: "drawing",
        title: "Drawing",
        image: DummyImage,
    },
];

export default function ProductSpecifications() {
    return (
        <div className="w-full flex mt-[80px]">
            <h2 className="flex-1 pl-9 text-title font-bold text-g950">Drawing</h2>
            <div className="w-[955px] grid grid-cols-2 gap-6">
                {dummyItems.map((item) => {
                    return (
                        <div key={item.key} className="">
                            <h3 className="border-l-[5px] border-ePrimary text-g400 text-base mb-2 pl-2">{item.title}</h3>
                            <Image src={item.image} alt="product" height={500} className="w-full" />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
