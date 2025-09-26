"use client";

import Download from "@/public/svgs/download.svg";

const Software = () => {
    return (
        <div className="w-full flex justify-between pt-[80px]">
            <h3 className="text-g950 font-bold text-title ml-9">Software</h3>
            <div className="w-[955px]">
                <li className="w-full flex justify-between items-center py-6 border-b border-g200">
                    <div>
                        <p className="text-g400 text-small mb-1">25.11.23 Updated</p>
                        <p className="text-g950 font-bold text-large">Software Origin Name</p>
                    </div>
                    <button className="flex items-center justify-center bg-primay-950 text-white bg-g950 rounded-[2px] h-[48px] px-3 py-6 gap-3">
                        Download
                        <Download width={24} height={24} fill={"#ffffff"} />
                    </button>
                </li>
                <li className="w-full flex justify-between items-center py-6 border-b border-g200">
                    <div>
                        <p className="text-g400 text-small mb-1">25.11.23 Updated</p>
                        <p className="text-g950 font-bold text-large">Software Origin Name</p>
                    </div>
                    <button className="flex items-center justify-center bg-primay-950 text-white bg-g950 rounded-[2px] h-[48px] px-3 py-6 gap-3">
                        Download
                        <Download width={24} height={24} fill={"#ffffff"} />
                    </button>
                </li>
                <li className="w-full flex justify-between items-center py-6 border-b border-g200">
                    <div>
                        <p className="text-g400 text-small mb-1">25.11.23 Updated</p>
                        <p className="text-g950 font-bold text-large">Software Origin Name</p>
                    </div>
                    <button className="flex items-center justify-center bg-primay-950 text-white bg-g950 rounded-[2px] h-[48px] px-3 py-6 gap-3">
                        Download
                        <Download width={24} height={24} fill={"#ffffff"} />
                    </button>
                </li>
                <li className="w-full flex justify-between items-center py-6 border-b border-g200">
                    <div>
                        <p className="text-g400 text-small mb-1">25.11.23 Updated</p>
                        <p className="text-g950 font-bold text-large">Software Origin Name</p>
                    </div>
                    <button className="flex items-center justify-center bg-primay-950 text-white bg-g950 rounded-[2px] h-[48px] px-3 py-6 gap-3">
                        Download
                        <Download width={24} height={24} fill={"#ffffff"} />
                    </button>
                </li>
            </div>
        </div>
    );
};

export default Software;
