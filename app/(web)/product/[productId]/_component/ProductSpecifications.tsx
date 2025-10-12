import Image from "next/image";
import DummyImage from "../../_dummys/DummyProductImg.png";

const dummyItems = [
    { key: "Scanning Width", value: "550mm" },
    { key: "Pixel", value: "4498" },
    { key: "Mono / Color", value: "Mono" },
    { key: "Resolution (DPI)", value: "330DPI" },
    { key: "Accuracy (μm)", value: "84μm" },
    { key: "Working Distance (mm)", value: "7mm" },
    { key: "D.O.F (mm)", value: "± 1.3" },
    { key: "Line Frequency (kHz)", value: "110kHz" },
    { key: "Working Speed (m/s)", value: "2.8m/s" },
    { key: "Demension", value: "330mm * 70mm * 108mm" },
];

export default function ProductSpecifications() {
    return (
        <div className="w-full flex mt-[80px]">
            <h2 className="flex-1 pl-9 text-title font-bold text-g950">Information</h2>
            <div className="w-[955px]">
                {dummyItems.map((item) => {
                    return (
                        <div key={item.key} className="w-full border-b border-g200 flex">
                            <h3 className="w-[348px] px-4 py-5 text-g400 text-large font-medium">{item.key}</h3>
                            <div className="flex-1 px-4 py-5 text-g950 text-large font-semibold">{item.value}</div>
                        </div>
                    );
                })}
                <Image src={DummyImage} alt="product" height={500} className="w-full" />
            </div>
        </div>
    );
}
