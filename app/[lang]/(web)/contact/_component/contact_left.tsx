import Image from "next/image";
import contactLeft from "@/public/contact/contact.png";

const ContactLeft: React.FC = () => {
    return (
        <div className="w-full relative">
            <Image src={contactLeft.src} alt="EYEON" width={560} height={560} className="w-full h-[402px] object-cover" />
            <div className="text-white text-large text-center mx-auto py-[48px] bg-g950">
                EYEON의 머신 비전 솔루션에 대해 협업 및 공급 제안등이 필요하신가요?
                <br />
                문의 양식을 통해 담당자가 신속하게 답변 드리겠습니다.
            </div>
        </div>
    );
};

export default ContactLeft;
