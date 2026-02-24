"use client";

import Button from "@/components/Button";
import { DownloadItem } from "../page";
import { formatDateToYYMMDD } from "@/hooks/util";
import { DownloadIco } from "@/icons/icons";

interface DownloadCISCameraProps {
    data?: DownloadItem[];
}

const DownloadCISCamera = ({ data }: DownloadCISCameraProps) => {
    const onClickDownload = (item: DownloadItem) => {
        const { name, s3_url } = item.file;

        // 추후 다운로드 요청으로 변경
        if (s3_url === "") {
            alert("다운로드 url이 없습니다.");
            return;
        }

        const link = document.createElement("a");
        link.href = s3_url;
        link.download = name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="w-full flex justify-between pt-[80px] max-md:pt-14">
            <h3 className="text-g950 font-bold text-title ml-9 max-md:hidden">
                CIS Camera
            </h3>
            <div className="w-[955px]">
                {data &&
                    data.map((item) => (
                        <li
                            key={item.uuid}
                            className="w-full flex justify-between items-center py-6 border-b border-g200 max-md:py-3"
                        >
                            <div>
                                <p className="text-g400 text-small mb-1 max-md:text-xs max-md:leading-[18px] max-md:font-medium">
                                    {/* 25.11.23 Updated */}
                                    {formatDateToYYMMDD(item.updated_at)}{" "}
                                    Updated
                                </p>
                                <p className="text-g950 font-bold text-large max-md:text-base">
                                    {item.name}
                                </p>
                            </div>
                            <Button
                                size="medium"
                                btnType="primary"
                                label="Download"
                                icRight={<DownloadIco fill={"#ffffff"} />}
                                className="max-md:hidden"
                                onClick={() => onClickDownload(item)}
                            />
                            <button
                                className={`hidden max-md:flex items-center gap-3 justify-center text-white 
                                    rounded-[2px] transition-colors font-[600] disabled:bg-g200 select-none bg-g950 hover:bg-ePrimary text-base h-[40px] px-2`}
                                onClick={() => onClickDownload(item)}
                                type="button"
                            >
                                <DownloadIco fill={"#ffffff"} />
                            </button>
                        </li>
                    ))}
            </div>
        </div>
    );
};

export default DownloadCISCamera;
