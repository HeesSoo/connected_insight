import Tab from "@/components/Tab";
import Content from "./Content";

const TabExample = () => {
    return (
        <Content
            description="Tab Component 입니다."
            props={[
                { name: "items", type: "{ value: string; label: string; children: React.ReactNode }[]", description: "Tab 아이템 목록" },
                { name: "defaultTab", type: "string", description: "기본 선택된 탭" },
            ]}
            examples={[
                {
                    description: "기본 사용",
                    code: (
                        <Tab
                            items={[
                                { value: "ev_battery", label: "EV Battery", children: <div>Tab1</div> },
                                { value: "electronic_devices", label: "Electronic Devices", children: <div>Tab2</div> },
                                { value: "smart_logistics", label: "Smart Logistics", children: <div>Tab3</div> },
                                { value: "automative_automation", label: "Automative&Automation", children: <div>Tab3</div> },
                            ]}
                            defaultTab="ev_battery"
                        />
                    ),
                },
            ]}
        />
    );
};

export default TabExample;
