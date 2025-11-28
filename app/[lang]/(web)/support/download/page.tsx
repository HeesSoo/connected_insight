import Tab from "@/components/Tab";
import DownloadCISCamera from "./_components/Download_CISCamera";
import DownloadIndustrialControlDevices from "./_components/Download_IndustrialControlDevices";
import DownloadLinearActuator from "./_components/Download_LinearActuator";

const Download: React.FC = () => {
    return (
        <div className="w-full">
            <div className="flex items-end justify-start w-full h-[400px] bg-g950">
                <h2 className="text-white text-[32px] font-bold line-height-[48px] pb-[80px] pl-[240px]">
                    Downloads
                </h2>
            </div>
            <div className="w-full max-w-[1440px] flex mx-auto pt-[120px] pb-[160px]">
                <Tab
                    items={[
                        {
                            value: "cis",
                            label: "CIS Camera",
                            children: <DownloadCISCamera />,
                        },
                        {
                            value: "icd",
                            label: "Industrial Control Devices",
                            children: <DownloadIndustrialControlDevices />,
                        },
                        {
                            value: "linear",
                            label: "Linear Actuator",
                            children: <DownloadLinearActuator />,
                        },
                    ]}
                    defaultTab="cis"
                />
            </div>
        </div>
    );
};

export default Download;
