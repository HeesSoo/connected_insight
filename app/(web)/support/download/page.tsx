import Tab from "@/components/Tab";
import Software from "./_components/software";
import Document from "./_components/document";

const Download: React.FC = () => {
    return (
        <div className="w-full">
            <div className="flex items-center justify-center w-full h-[400px] bg-primary-950">
                <h2 className="text-white text-[32px] font-bold line-height-[48px]">Downloads</h2>
            </div>
            <div className="w-full max-w-[1440px] flex mx-auto pt-[80px] pb-[160px]">
                <Tab
                    items={[
                        { value: "software", label: "Software", children: <Software /> },
                        { value: "document", label: "Documents", children: <Document /> },
                    ]}
                    defaultTab="software"
                />
            </div>
        </div>
    );
};

export default Download;
