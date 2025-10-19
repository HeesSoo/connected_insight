import Button from "@/components/Button";
import { ArrowRightIco } from "@/icons/icons";
import AlternativeImg from "@/public/common/alternativeImg.png";
import ContactUs from "@/public/main/contact_us.png";
import Image from "next/image";
import Link from "next/link";
import router from "next/router";
import { CisData, LingchenData, TokkData } from "../page";

const dummyData: CisData | LingchenData | TokkData = {
    fov: 1937,
    line_rate: 160,
    name: "Dummy Name",
    resolution: 3600,
    thumbnail: AlternativeImg,
    type: "plus",
    uuid: "dummy-uuid-1",
    wd: 48,
};

export default function ProductItems({ tab, data, hasFilter, loading }: { tab: "cis" | "lingchen" | "tokk"; data: CisData[] | LingchenData[] | TokkData[]; loading: boolean; hasFilter: boolean }) {
    return (
        <div className="flex-1">
            {tab === "tokk" && (
                <div className="w-full h-[360px] mx-auto relative mb-[80px]">
                    <div className="absolute w-full h-[360px] p-[60px]">
                        <h3 className="text-title font-semibold text-white mb-6">Contact Us</h3>
                        <div className="text-large text-white mb-12">
                            정밀 머신비전 솔루션에 대한 궁금한 점이 있나요?
                            <br />
                            EYEON이 도와드리겠습니다.
                        </div>
                        <Link href="/contact">
                            <Button
                                // label={t.contactUs}
                                label="문의하기"
                                btnType="secondary"
                                icRight={<ArrowRightIco />}
                                onClick={() => {
                                    router.push("/contact");
                                }}
                                size="large"
                                className="text-titleSmall"
                            />
                        </Link>
                    </div>
                    <Image src={ContactUs.src} alt="Contact Us" width={1440} height={400} className="w-full h-[360px]" />
                </div>
            )}
            <h3 className="text-large leading-[30px] font-semibold text-g950 mb-4">
                Total&nbsp;<span className="text-base leading-[30px] font-bold text-g400 ">({data.length})</span>
            </h3>

            {loading && (
                <section className={`grid ${hasFilter ? "grid-cols-3" : "grid-cols-4"} gap-x-4 gap-y-12`}>
                    {[1, 2, 3, 4, 5, 6].map((item, idx) => (
                        <ProductItem key={idx} type={tab} item={dummyData} />
                    ))}
                </section>
            )}

            {!loading && data.length === 0 && <div className="w-full text-gray-500 text-center pt-[240px]">검색된 제품이 없습니다.</div>}
            {!loading && data.length > 0 && (
                <section className={`grid ${hasFilter ? "grid-cols-3" : "grid-cols-4"} gap-x-4 gap-y-12`}>
                    {data.map((item) => (
                        <ProductItem key={item.uuid} type={tab} item={item} />
                    ))}
                </section>
            )}
        </div>
    );
}

const ProductItem = ({ item, type }: { item: CisData | LingchenData | TokkData; type: "cis" | "lingchen" | "tokk" }) => {
    const src = "thumbnail" in item ? item.thumbnail : (item as any).image || AlternativeImg;

    if (type === "cis") {
        return (
            <Link href={`/product/${item.uuid}`} className="w-full">
                <Image
                    src={src}
                    alt={item.name}
                    width={440}
                    height={296}
                    className="w-full mb-5"
                    onError={() => {
                        /* next/image의 onError는 JSX 반환이 아니므로 빈 핸들러로 둠.
                       필요하면 상태로 대체 이미지 처리 추가 가능 */
                    }}
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
    } else {
        return (
            <a href={(item as any).url} target="_blank" className="w-full cursor-pointer" rel="noopener noreferrer">
                <Image
                    src={src}
                    alt={item.name}
                    width={440}
                    height={296}
                    className="w-full mb-5"
                    onError={() => {
                        /* next/image의 onError는 JSX 반환이 아니므로 빈 핸들러로 둠.
                       필요하면 상태로 대체 이미지 처리 추가 가능 */
                    }}
                />

                <div>
                    <div className="mb-1 text-g400 text-base font-medium">
                        {type === "lingchen" && "LINGCHEN"}
                        {type === "tokk" && "TOKK"}
                    </div>
                    <h4 className="text-g950 text-large leading-[30px] font-semibold">{item.name}</h4>
                </div>
            </a>
        );
    }
};
