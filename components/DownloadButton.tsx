import { DownloadIco } from "@/icons/icons";
import Button from "./Button";

interface Props {
    label?: string;
    type?: "g950" | "ePrimary";
    file: {
        url: string;
        name: string;
    };
}

export default function DownloadButton({
    label = "Download",
    type = "g950",
    file,
}: Props) {
    const onClick = () => {
        const { name, url } = file;

        // 추후 다운로드 요청으로 변경
        if (url === "") {
            alert("다운로드 url이 없습니다.");
            return;
        }

        const link = document.createElement("a");
        link.href = url;
        link.download = name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <>
            <Button
                size="medium"
                btnType="primary"
                label="Download"
                icRight={<DownloadIco fill={"#ffffff"} />}
                className="max-md:hidden"
                onClick={onClick}
            />
            <button
                className={`hidden max-md:flex items-center gap-3 justify-center text-white 
        rounded-[2px] transition-colors font-[600] disabled:bg-g200 select-none bg-g950 hover:bg-ePrimary text-base h-[40px] px-2`}
                onClick={onClick}
                type="button"
            >
                <DownloadIco fill={"#ffffff"} />
            </button>
        </>
    );
}
