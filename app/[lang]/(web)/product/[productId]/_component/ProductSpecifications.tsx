import { ProductDetail } from "../page";

export default function ProductSpecifications({ data }: { data: ProductDetail }) {
    return (
        <div className="w-full flex mt-[80px]">
            <h2 className="flex-1 pl-9 text-title font-bold text-g950">Information</h2>
            <div className="w-[955px]">
                <div className="w-full border-b border-g200 flex">
                    <h3 className="w-[348px] px-4 py-5 text-g400 text-large font-medium">Mono or Color</h3>
                    <div className="flex-1 px-4 py-5 text-g950 text-large font-semibold">{data.mono_or_color}</div>
                </div>

                <div className="w-full border-b border-g200 flex">
                    <h3 className="w-[348px] px-4 py-5 text-g400 text-large font-medium">Interface</h3>
                    <div className="flex-1 px-4 py-5 text-g950 text-large font-semibold">{data.interface}</div>
                </div>

                <div className="w-full border-b border-g200 flex">
                    <h3 className="w-[348px] px-4 py-5 text-g400 text-large font-medium">FOV (mm)</h3>
                    <div className="flex-1 px-4 py-5 text-g950 text-large font-semibold">{data.fov}</div>
                </div>

                <div className="w-full border-b border-g200 flex">
                    <h3 className="w-[348px] px-4 py-5 text-g400 text-large font-medium">Resolution (DPI)</h3>
                    <div className="flex-1 px-4 py-5 text-g950 text-large font-semibold">{data.resolution}</div>
                </div>

                <div className="w-full border-b border-g200 flex">
                    <h3 className="w-[348px] px-4 py-5 text-g400 text-large font-medium">Accuracy (μm)</h3>
                    <div className="flex-1 px-4 py-5 text-g950 text-large font-semibold">{data.accuracy}</div>
                </div>

                <div className="w-full border-b border-g200 flex">
                    <h3 className="w-[348px] px-4 py-5 text-g400 text-large font-medium">DOF (mm)</h3>
                    <div className="flex-1 px-4 py-5 text-g950 text-large font-semibold">±&nbsp;{data.dof}</div>
                </div>

                <div className="w-full border-b border-g200 flex">
                    <h3 className="w-[348px] px-4 py-5 text-g400 text-large font-medium">WD (mm)</h3>
                    <div className="flex-1 px-4 py-5 text-g950 text-large font-semibold">{data.wd}</div>
                </div>

                <div className="w-full border-b border-g200 flex">
                    <h3 className="w-[348px] px-4 py-5 text-g400 text-large font-medium">Line Rate (kHz)</h3>
                    <div className="flex-1 px-4 py-5 text-g950 text-large font-semibold">{data.line_rate}</div>
                </div>

                <div className="w-full border-b border-g200 flex">
                    <h3 className="w-[348px] px-4 py-5 text-g400 text-large font-medium">WS (m/s)</h3>
                    <div className="flex-1 px-4 py-5 text-g950 text-large font-semibold">{data.ws}</div>
                </div>

                <div className="w-full border-b border-g200 flex">
                    <h3 className="w-[348px] px-4 py-5 text-g400 text-large font-medium">Ethernet Port</h3>
                    <div className="flex-1 px-4 py-5 text-g950 text-large font-semibold">{data.ethernet_port}</div>
                </div>

                <div className="w-full border-b border-g200 flex">
                    <h3 className="w-[348px] px-4 py-5 text-g400 text-large font-medium">Pixel (k)</h3>
                    <div className="flex-1 px-4 py-5 text-g950 text-large font-semibold">{data.pixel}</div>
                </div>

                <div className="w-full border-b border-g200 flex">
                    <h3 className="w-[348px] px-4 py-5 text-g400 text-large font-medium">Size</h3>
                    <div className="flex-1 px-4 py-5 text-g950 text-large font-semibold">
                        {data.size_width}mm*{data.size_height}mm*{data.size_length}mm
                    </div>
                </div>
            </div>
        </div>
    );
}
