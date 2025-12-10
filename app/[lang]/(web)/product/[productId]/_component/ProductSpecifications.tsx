import { ProductDetail } from "./ProductDetailClient";

export default function ProductSpecifications({
    data,
}: {
    data: ProductDetail;
}) {
    return (
        <div className="w-full flex mt-[80px] max-md:mt-14">
            <h2 className="flex-1 pl-9 text-title font-bold text-g950 max-md:hidden">
                Information
            </h2>
            <div className="w-[955px] max-md:w-full">
                <div className="w-full border-b border-g200 flex max-md:grid max-md:grid-cols-2 max-md:gap-3">
                    <h3 className="w-[348px] px-4 py-5 text-g400 text-large font-medium max-md:text-base max-md:px-0 max-md:py-3 max-md:w-fit">
                        Mono or Color
                    </h3>
                    <div className="flex-1 px-4 py-5 text-g950 text-large font-semibold max-md:text-base max-md:px-0 max-md:py-3 max-md:break-words">
                        {data.mono_or_color}
                    </div>
                </div>

                <div className="w-full border-b border-g200 flex max-md:grid max-md:grid-cols-2 max-md:gap-3">
                    <h3 className="w-[348px] px-4 py-5 text-g400 text-large font-medium max-md:text-base max-md:px-0 max-md:py-3 max-md:w-fit">
                        Interface
                    </h3>
                    <div className="flex-1 px-4 py-5 text-g950 text-large font-semibold max-md:text-base max-md:px-0 max-md:py-3 max-md:break-words">
                        {data.interface}
                    </div>
                </div>

                <div className="w-full border-b border-g200 flex max-md:grid max-md:grid-cols-2 max-md:gap-3">
                    <h3 className="w-[348px] px-4 py-5 text-g400 text-large font-medium max-md:text-base max-md:px-0 max-md:py-3 max-md:w-fit">
                        FOV (mm)
                    </h3>
                    <div className="flex-1 px-4 py-5 text-g950 text-large font-semibold max-md:text-base max-md:px-0 max-md:py-3 max-md:break-words">
                        {data.fov}
                    </div>
                </div>

                <div className="w-full border-b border-g200 flex max-md:grid max-md:grid-cols-2 max-md:gap-3">
                    <h3 className="w-[348px] px-4 py-5 text-g400 text-large font-medium max-md:text-base max-md:px-0 max-md:py-3 max-md:w-fit">
                        Resolution (DPI)
                    </h3>
                    <div className="flex-1 px-4 py-5 text-g950 text-large font-semibold max-md:text-base max-md:px-0 max-md:py-3 max-md:break-words">
                        {data.resolution}
                    </div>
                </div>

                <div className="w-full border-b border-g200 flex max-md:grid max-md:grid-cols-2 max-md:gap-3">
                    <h3 className="w-[348px] px-4 py-5 text-g400 text-large font-medium max-md:text-base max-md:px-0 max-md:py-3 max-md:w-fit">
                        Accuracy (μm)
                    </h3>
                    <div className="flex-1 px-4 py-5 text-g950 text-large font-semibold max-md:text-base max-md:px-0 max-md:py-3 max-md:break-words">
                        {data.accuracy}
                    </div>
                </div>

                <div className="w-full border-b border-g200 flex max-md:grid max-md:grid-cols-2 max-md:gap-3">
                    <h3 className="w-[348px] px-4 py-5 text-g400 text-large font-medium max-md:text-base max-md:px-0 max-md:py-3 max-md:w-fit">
                        DOF (mm)
                    </h3>
                    <div className="flex-1 px-4 py-5 text-g950 text-large font-semibold max-md:text-base max-md:px-0 max-md:py-3 max-md:break-words">
                        ±&nbsp;{data.dof}
                    </div>
                </div>

                <div className="w-full border-b border-g200 flex max-md:grid max-md:grid-cols-2 max-md:gap-3">
                    <h3 className="w-[348px] px-4 py-5 text-g400 text-large font-medium max-md:text-base max-md:px-0 max-md:py-3 max-md:w-fit">
                        WD (mm)
                    </h3>
                    <div className="flex-1 px-4 py-5 text-g950 text-large font-semibold max-md:text-base max-md:px-0 max-md:py-3 max-md:break-words">
                        {data.wd}
                    </div>
                </div>

                <div className="w-full border-b border-g200 flex max-md:grid max-md:grid-cols-2 max-md:gap-3">
                    <h3 className="w-[348px] px-4 py-5 text-g400 text-large font-medium max-md:text-base max-md:px-0 max-md:py-3 max-md:w-fit">
                        Line Rate (kHz)
                    </h3>
                    <div className="flex-1 px-4 py-5 text-g950 text-large font-semibold max-md:text-base max-md:px-0 max-md:py-3 max-md:break-words">
                        {data.line_rate}
                    </div>
                </div>

                <div className="w-full border-b border-g200 flex max-md:grid max-md:grid-cols-2 max-md:gap-3">
                    <h3 className="w-[348px] px-4 py-5 text-g400 text-large font-medium max-md:text-base max-md:px-0 max-md:py-3 max-md:w-fit">
                        WS (m/s)
                    </h3>
                    <div className="flex-1 px-4 py-5 text-g950 text-large font-semibold max-md:text-base max-md:px-0 max-md:py-3 max-md:break-words">
                        {data.ws}
                    </div>
                </div>

                <div className="w-full border-b border-g200 flex max-md:grid max-md:grid-cols-2 max-md:gap-3">
                    <h3 className="w-[348px] px-4 py-5 text-g400 text-large font-medium max-md:text-base max-md:px-0 max-md:py-3 max-md:w-fit">
                        Ethernet Port
                    </h3>
                    <div className="flex-1 px-4 py-5 text-g950 text-large font-semibold max-md:text-base max-md:px-0 max-md:py-3 max-md:break-words">
                        {data.ethernet_port}
                    </div>
                </div>

                <div className="w-full border-b border-g200 flex max-md:grid max-md:grid-cols-2 max-md:gap-3">
                    <h3 className="w-[348px] px-4 py-5 text-g400 text-large font-medium max-md:text-base max-md:px-0 max-md:py-3 max-md:w-fit">
                        Pixel (k)
                    </h3>
                    <div className="flex-1 px-4 py-5 text-g950 text-large font-semibold max-md:text-base max-md:px-0 max-md:py-3 max-md:break-words">
                        {data.pixel}
                    </div>
                </div>

                <div className="w-full border-b border-g200 flex max-md:grid max-md:grid-cols-2 max-md:gap-3">
                    <h3 className="w-[348px] px-4 py-5 text-g400 text-large font-medium max-md:text-base max-md:px-0 max-md:py-3 max-md:w-fit">
                        Size
                    </h3>
                    <div className="flex-1 px-4 py-5 text-g950 text-large font-semibold max-md:text-base max-md:px-0 max-md:py-3 max-md:break-words">
                        {data.size_width}mm*{data.size_height}mm*
                        {data.size_length}mm
                    </div>
                </div>
            </div>
        </div>
    );
}
