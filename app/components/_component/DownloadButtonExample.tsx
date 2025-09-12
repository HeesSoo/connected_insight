import DownloadButton from "@/components/DownloadButton";
import Content from "./Content";

const DownloadButtonExample = () => {
    return (
        <Content
            description="DownloadButton 입니다."
            props={[
                { name: "label?", type: "string", description: "라벨 (default : Download)" },
                { name: "type?", type: "g950 | ePrimary", description: "버튼 타입 (default : g950)" },
                { name: "file", type: "{ url: string; name: string; }", description: "파일 정보(url, 이름)" },
            ]}
            examples={[
                {
                    description: "기본 사용",
                    code: <DownloadButton file={{ url: "url", name: "filename" }} />,
                },
                {
                    description: "Primary Btn",
                    code: <DownloadButton type="ePrimary" file={{ url: "url", name: "filename" }} />,
                },
            ]}
        />
    );
};

export default DownloadButtonExample;
