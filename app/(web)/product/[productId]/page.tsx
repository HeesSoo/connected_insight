import Tab from "@/components/Tab";
import Image from "next/image";
import DummyImage from "../_dummys/DummyProductImg.png";
import ProductDownloads from "./_component/ProductDownloads";
import ProductSpecifications from "./_component/ProductSpecifications";

const dummyKeyFeatures = [
    {
        id: 1,
        key: "Resolution (DPI)",
        value: "330DPI",
    },
    {
        id: 2,
        key: "Accuracy (μm)",
        value: "84μm",
    },
    {
        id: 3,
        key: "Line Frequency (kHz)",
        value: "110kHz",
    },
    {
        id: 4,
        key: "Communication Interface",
        value: "10GigE",
    },
    {
        id: 5,
        key: "Scan Width (mm)",
        value: "550mm",
    },
];
const dummyOptions = [
    {
        id: 1,
        key: "Custom",
        value: "Standard",
    },
    {
        id: 2,
        key: "Colling System",
        value: "Air",
    },
    {
        id: 3,
        key: "Line Speed",
        value: "AA",
    },
    {
        id: 4,
        key: "Working Distance (mm)",
        value: "7mm",
    },
];

export default function ProductDetail() {
    return (
        <div className="max-w-[1440px] w-full mx-auto my-[80px]">
            <section className="w-full flex gap-[137px]">
                <div className="w-[712px]">
                    <Image src={DummyImage} alt="product" height={476} className="w-full mb-1" />
                    <div className="w-full grid grid-cols-3 gap-1">
                        {[1, 2, 3].map((v) => {
                            return <Image key={v} src={DummyImage} alt="product" height={158} className="w-full" />;
                        })}
                    </div>
                </div>

                <section className="flex flex-col gap-12 flex-1">
                    <div>
                        <div className="text-g950 font-semibold text-base mb-2">LineX CIS Plus</div>
                        <h1 className="text-[32px] leading-[48px] font-bold text-g950">INS-CHVS-550-10GM</h1>
                    </div>

                    <div>
                        <h2 className="text-ePrimary text-xl leading-[30px] font-bold pb-2 border-b border-g200 mb-4">Key Feature</h2>

                        <div className="grid grid-cols-2 gap-y-9">
                            {dummyKeyFeatures.map((v) => {
                                return (
                                    <div key={v.id}>
                                        <div className="text-g400 font-medium text-sm mb-0.5">{v.key}</div>
                                        <div className="text-g950 font-semibold text-xl leading-[30px]">{v.value}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-ePrimary text-xl leading-[30px] font-bold pb-2 border-b border-g200 mb-4">Options</h2>

                        <div className="grid grid-cols-2 gap-y-9">
                            {dummyOptions.map((v) => {
                                return (
                                    <div key={v.id}>
                                        <div className="text-g400 font-medium text-sm mb-0.5">{v.key}</div>
                                        <div className="text-g950 font-semibold text-xl leading-[30px]">{v.value}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </section>

            <section className="mt-[144px]">
                <Tab
                    items={[
                        { value: "specifications", label: "Specifications", children: <ProductSpecifications /> },
                        { value: "downloads", label: "Downloads", children: <ProductDownloads /> },
                    ]}
                    defaultTab="specifications"
                />
            </section>
        </div>
    );
}
