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

export default function DownloadButton({ label = "Download", type = "g950", file }: Props) {
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
        <Button size="medium" btnType="primary" label="Download" icRight={<DownloadIco fill={"#ffffff"} />} onClick={() => {}} />
        // <button className={`h-12 flex gap-3 items-center px-5 rounded-sm ${type === "g950" ? "bg-g950" : "bg-ePrimary"}`} onClick={onClick}>
        //     <div className="text-white">{label}</div>
        //     <DownloadIco fill={"#ffffff"} />
        // </button>
    );
}
