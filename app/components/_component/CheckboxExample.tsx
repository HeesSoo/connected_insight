import Checkbox from "@/components/Checkbox";
import Content from "./Content";

const CheckboxExample = () => {
    return (
        <Content
            description="Checkbox Component 입니다."
            props={[
                { name: "checked", type: "boolean", description: "Checkbox 체크 여부" },
                { name: "value", type: "string", description: "Checkbox 값" },
                { name: "label", type: "string", description: "Checkbox 라벨" },
                { name: "onClick", type: "function", description: "Checkbox 클릭 시 실행될 함수" },
            ]}
            examples={[
                {
                    description: "체크되지 않음",
                    code: <Checkbox checked={false} indeterminate={false} value="option1" label="옵션 1" onChange={() => {}} />,
                },
                {
                    description: "부분 선택됨 (하위 항목이 일부 선택된 경우)",
                    code: <Checkbox checked={true} indeterminate={true} value="option1" label="옵션 1" onChange={() => {}} />,
                },
                {
                    description: "체크됨",
                    code: <Checkbox checked={true} indeterminate={false} value="option1" label="옵션 1" onChange={() => {}} />,
                },
            ]}
        />
    );
};

export default CheckboxExample;
