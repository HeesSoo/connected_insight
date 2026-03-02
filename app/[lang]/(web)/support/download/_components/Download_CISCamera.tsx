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
            <div className="w-[955px] overflow-x-auto max-md:overflow-x-visible">
                <table className="w-full min-w-[760px] max-md:min-w-0 table-fixed border-t-2 border-g950">
                    <colgroup>
                        <col className="w-[8%] max-md:w-[8%]" />
                        <col className="w-[16%] max-md:w-[18%]" />
                        <col className="w-[44%] max-md:w-[30%]" />
                        <col className="w-[14%] max-md:w-[22%]" />
                        <col className="w-[18%] max-md:w-[22%]" />
                    </colgroup>
                    <thead>
                        <tr className="bg-g950 text-white">
                            <th className="py-4 px-4 text-center text-md font-semibold max-md:py-2 max-md:px-1 max-md:text-sm max-md:font-semibold">
                                번호
                            </th>
                            <th className="py-4 px-4 text-center text-md font-semibold max-md:py-2 max-md:px-1 max-md:text-sm max-md:font-semibold">
                                구분
                            </th>
                            <th className="py-4 px-4 text-left text-md font-semibold max-md:py-2 max-md:px-1 max-md:text-sm max-md:font-semibold">
                                파일명
                            </th>
                            <th className="py-4 px-2 text-center text-md font-semibold max-md:py-2 max-md:px-0.5 max-md:text-sm max-md:font-semibold">
                                업데이트
                            </th>
                            <th className="py-4 px-2 text-center text-md font-semibold max-md:py-2 max-md:px-0.5 max-md:text-sm max-md:font-semibold">
                                다운로드
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data &&
                            data.map((item, index) => (
                                <tr
                                    key={item.uuid}
                                    className="border-b border-g200"
                                >
                                    <td className="py-5 px-4 text-center text-g700 text-base max-md:py-2.5 max-md:px-1 max-md:text-xs">
                                        {index + 1}
                                    </td>
                                    <td className="py-5 px-4 text-center text-g700 text-base max-md:py-2.5 max-md:px-1 max-md:text-xs max-md:leading-[16px]">
                                        CIS Camera
                                    </td>
                                    <td className="py-5 px-4 text-g950 font-bold text-large max-md:py-2.5 max-md:px-1 max-md:text-xs max-md:leading-[16px] max-md:font-semibold break-all">
                                        {item.name}
                                    </td>
                                    <td className="py-5 px-2 text-center text-g500 text-base max-md:py-2.5 max-md:px-0.5 max-md:text-xs whitespace-nowrap">
                                        {formatDateToYYMMDD(item.updated_at)}
                                    </td>
                                    <td className="py-5 px-2 max-md:py-2.5 max-md:px-0.5">
                                        <div className="flex justify-center">
                                            <Button
                                                size="medium"
                                                btnType="primary"
                                                label="Download"
                                                icRight={
                                                    <DownloadIco
                                                        fill={"#ffffff"}
                                                    />
                                                }
                                                className="max-md:hidden"
                                                onClick={() =>
                                                    onClickDownload(item)
                                                }
                                            />
                                            <button
                                                className={`hidden max-md:flex items-center gap-0 justify-center text-white 
                                                    rounded-[2px] transition-colors font-[600] disabled:bg-g200 select-none bg-g950 hover:bg-ePrimary h-[32px] w-[32px] min-w-[32px] p-0`}
                                                onClick={() =>
                                                    onClickDownload(item)
                                                }
                                                type="button"
                                            >
                                                <DownloadIco fill={"#ffffff"} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DownloadCISCamera;
