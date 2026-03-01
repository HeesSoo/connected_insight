import Button from "@/components/Button";
import AlternativeImg from "@/public/common/alternativeImg.png";
import TokkFinderImg from "@/public/main/tokk_finder.png";
import Image from "next/image";
import Link from "next/link";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import {
    CisData,
    LingchenData,
    LMS_UV_Data,
    TokkData,
} from "./ProductListClient";

export default function ProductItems({
    tab,
    data,
    hasFilter,
}: {
    tab: "cis" | "lingchen" | "tokk" | "lms" | "uv";
    data: CisData[] | LingchenData[] | TokkData[] | LMS_UV_Data[];
    hasFilter: boolean;
}) {
    return (
        <div className="flex-1">
            {tab === "tokk" && (
                <div className="w-full h-[420px] mx-auto relative mb-[80px] max-md:mb-6 max-md:h-[250px]">
                    <div className="absolute w-full h-[420px] p-[60px] flex flex-col justify-end max-md:h-[250px] max-md:px-4 max-md:py-5 max-md:justify-between">
                        <div>
                            <div className="mb-2 text-[32px] leading-[48px] font-bold max-md:text-large max-md:mb-1">
                                Find the Perfect TOKK Solution
                            </div>
                            <div className="mb-12 text-2xl leading-9 font-medium max-md:text-base max-md:mb-0">
                                for Every Requeirement
                            </div>
                        </div>

                        {/* <a href="http://tokk.comp.yunqi3d.com/#/" target="_blank" rel="noopener noreferrer"> */}
                        <a
                            href="http://tokk.comp.yunqi3d.com/#/selection/params"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-fit"
                        >
                            <Button
                                label="Product Finder"
                                btnType="secondary"
                                icRight={
                                    <svg
                                        width="36"
                                        height="36"
                                        viewBox="0 0 36 36"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="max-md:w-6 max-md:h-6"
                                    >
                                        <path
                                            d="M7.96163 30.75C7.20387 30.75 6.5625 30.4875 6.0375 29.9625C5.5125 29.4375 5.25 28.7961 5.25 28.0384V7.96163C5.25 7.20387 5.5125 6.5625 6.0375 6.0375C6.5625 5.5125 7.20387 5.25 7.96163 5.25H17.4229V7.5H7.96163C7.84613 7.5 7.74038 7.54812 7.64438 7.64437C7.54813 7.74037 7.5 7.84613 7.5 7.96163V28.0384C7.5 28.1539 7.54813 28.2596 7.64438 28.3556C7.74038 28.4519 7.84613 28.5 7.96163 28.5H28.0384C28.1539 28.5 28.2596 28.4519 28.3556 28.3556C28.4519 28.2596 28.5 28.1539 28.5 28.0384V18.5771H30.75V28.0384C30.75 28.7961 30.4875 29.4375 29.9625 29.9625C29.4375 30.4875 28.7961 30.75 28.0384 30.75H7.96163ZM14.5789 23.0018L12.9983 21.4211L26.9194 7.5H21V5.25H30.75V15H28.5V9.08063L14.5789 23.0018Z"
                                            fill="white"
                                        />
                                    </svg>
                                }
                                onClick={() => {}}
                                size="large"
                                className="text-titleSmall max-md:text-base max-md:px-4 max-md:py-2 max-md:h-10"
                            />
                        </a>
                    </div>
                    <Image
                        src={TokkFinderImg.src}
                        alt="Contact Us"
                        width={1440}
                        height={400}
                        className="w-full h-[420px] max-md:h-[250px] max-md:object-cover"
                    />
                </div>
            )}
            <h3 className="text-large leading-[30px] font-semibold text-g950 mb-4 max-md:text-sm max-md:mb-3">
                Total&nbsp;
                <span className="text-base leading-[30px] font-bold text-g400 max-md:text-xs">
                    ({data.length})
                </span>
            </h3>

            {data.length === 0 && (
                <div className="w-full text-gray-500 text-center pt-[240px]">
                    검색된 제품이 없습니다.
                </div>
            )}
            {data.length > 0 && (
                <section
                    className={`grid ${
                        hasFilter ? "grid-cols-3" : "grid-cols-4"
                    } gap-x-4 gap-y-12 max-md:grid-cols-1 max-md:gap-6`}
                >
                    {data.map(
                        (
                            item:
                                | CisData
                                | LingchenData
                                | TokkData
                                | LMS_UV_Data
                        ) => (
                            <ProductItem
                                key={item.uuid}
                                type={tab}
                                item={item}
                            />
                        )
                    )}
                </section>
            )}
        </div>
    );
}

const ProductItem = ({
    item,
    type,
}: {
    item: CisData | LingchenData | TokkData | LMS_UV_Data;
    type: "cis" | "lingchen" | "tokk" | "lms" | "uv";
}) => {
    const localizedPath = useLocalizedPath();
    const src =
        "thumbnail" in item
            ? item.thumbnail
            : (item as any).image || AlternativeImg;

    if (type === "cis") {
        return (
            <Link
                href={localizedPath(`/product/${item.uuid}`)}
                className="group w-full bg-white shadow-sm hover:shadow-md rounded-lg border border-g100 hover:border-g400 transition-all duration-300 select-none overflow-hidden"
            >
                <Image
                    src={src}
                    alt={item.name}
                    width={440}
                    height={296}
                    className="w-full aspect-[440/296] object-contain rounded-t-lg bg-white transition-transform duration-300 group-hover:scale-110"
                    onError={() => {
                        /* next/image의 onError는 JSX 반환이 아니므로 빈 핸들러로 둠.
                       필요하면 상태로 대체 이미지 처리 추가 가능 */
                    }}
                />

                <div className="p-5">
                    <div className="mb-1 text-g400 text-base font-medium max-md:text-sm">
                        {item.type === "plus" && "LineX Plus"}
                        {item.type === "max" && "LineX Max"}
                        {item.type === "maxpro" && "LineX MAX PRO"}
                        {item.type === "color" && "LineX COLOR"}
                        {item.type === "-" && "-"}
                    </div>
                    <h4 className="text-g950 text-large leading-[30px] font-semibold max-md:text-base">
                        {item.name}
                    </h4>
                </div>
            </Link>
        );
    } else if (type === "lingchen" || type === "tokk") {
        return (
            <a
                href={(item as any).url}
                target="_blank"
                className="group w-full cursor-pointer bg-white shadow-sm hover:shadow-md rounded-lg border border-g100 hover:border-g400 transition-all select-none overflow-hidden"
                rel="noopener noreferrer"
            >
                <Image
                    src={src}
                    alt={item.name}
                    width={440}
                    height={296}
                    className="w-full aspect-[440/296] object-contain rounded-t-lg bg-white transition-transform duration-300 group-hover:scale-110"
                    onError={() => {
                        /* next/image의 onError는 JSX 반환이 아니므로 빈 핸들러로 둠.
                       필요하면 상태로 대체 이미지 처리 추가 가능 */
                    }}
                />

                <div className="p-5">
                    <div className="mb-1 text-g400 text-base font-medium max-md:text-sm">
                        {type === "lingchen" && "LINGCHEN"}
                        {type === "tokk" && "TOKK"}
                    </div>
                    <h4 className="text-g950 text-large leading-[30px] font-semibold max-md:text-base">
                        {item.name}
                    </h4>
                </div>
            </a>
        );
    } else {
        const lmsUvItem = item as LMS_UV_Data;
        console.log('lmsUvItem >>> ', lmsUvItem)
        return (
            <Link
                href={localizedPath(`/product/${item.uuid}`)}
                className="group w-full cursor-pointer bg-white shadow-sm hover:shadow-md rounded-lg border border-g100 hover:border-g400 transition-all select-none overflow-hidden"
            >
                <Image
                    src={lmsUvItem?.['thumbnail_files']?.[0]?.s3_url || AlternativeImg}
                    alt={lmsUvItem.name}
                    width={440}
                    height={296}
                    className="w-full aspect-[440/296] object-contain rounded-t-lg bg-white transition-transform duration-300 group-hover:scale-110"
                    onError={() => {
                        /* next/image의 onError는 JSX 반환이 아니므로 빈 핸들러로 둠.
                       필요하면 상태로 대체 이미지 처리 추가 가능 */
                    }}
                />

                <div className="p-5">
                    <div className="mb-1 text-g400 text-base font-medium max-md:text-sm">
                        {type === "lms" && "LMS"}
                        {type === "uv" && "UV"}
                    </div>
                    <h4 className="text-g950 text-large leading-[30px] font-semibold max-md:text-base">
                        {lmsUvItem.name}
                    </h4>
                </div>
            </Link>
        );
    }
};
