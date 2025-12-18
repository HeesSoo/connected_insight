"use client";

import Button from "@/components/Button";
import Download from "@/public/svgs/download.svg";
import { DownloadItem } from "../page";
import { formatDateToYYMMDD } from "@/hooks/util";

interface DownloadCISCameraProps {
    data?: DownloadItem[];
}

const DownloadCISCamera = ({ data }: DownloadCISCameraProps) => {
    return (
        <div className="w-full flex justify-between pt-[80px]">
            <h3 className="text-g950 font-bold text-title ml-9">CIS Camera</h3>
            <div className="w-[955px]">
                {data &&
                    data.map((item) => (
                        <li
                            key={item.uuid}
                            className="w-full flex justify-between items-center py-6 border-b border-g200"
                        >
                            <div>
                                <p className="text-g400 text-small mb-1">
                                    {/* 25.11.23 Updated */}
                                    {formatDateToYYMMDD(item.updated_at)}{" "}
                                    Updated
                                </p>
                                <p className="text-g950 font-bold text-large">
                                    {item.name}
                                </p>
                            </div>
                            <Button
                                size="medium"
                                btnType="primary"
                                label="Download"
                                icRight={
                                    <Download
                                        width={24}
                                        height={24}
                                        fill={"#ffffff"}
                                    />
                                }
                                onClick={() => {
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
                                }}
                            />
                        </li>
                    ))}
            </div>
        </div>
    );
};

export default DownloadCISCamera;
